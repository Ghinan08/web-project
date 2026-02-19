import slugify from 'slugify';
import { query } from '../../config/database.js';
import { ApiError } from '../../shared/errors/ApiError.js';

const TABLES = {
  programs: 'programs',
  news: 'news',
  testimonials: 'testimonials',
  'store-items': 'store_items',
  'annual-reports': 'annual_reports',
};

const TABLE_EXTRA_FIELDS = {
  programs: ['location', 'event_date', 'price'],
  news: ['published_at'],
  testimonials: ['author_name', 'author_role'],
  'store-items': ['price', 'stock'],
  'annual-reports': ['report_year', 'file_url'],
};

const baseFields = ['title', 'slug', 'summary', 'content', 'image_url', 'published'];

const mapInput = (type, payload) => {
  const title = (payload.title ?? '').trim();
  if (!title) {
    throw new ApiError(400, 'title is required');
  }

  const slug = slugify(payload.slug || title, { lower: true, strict: true, trim: true });
  if (!slug) {
    throw new ApiError(400, 'invalid slug');
  }

  const data = {
    title,
    slug,
    summary: payload.summary ?? null,
    content: payload.content ?? null,
    image_url: payload.imageUrl ?? null,
    published: payload.published === false ? 0 : 1,
  };

  const extras = TABLE_EXTRA_FIELDS[type] ?? [];
  if (extras.includes('location')) data.location = payload.location ?? null;
  if (extras.includes('event_date')) data.event_date = payload.eventDate ?? null;
  if (extras.includes('price')) data.price = payload.price ?? null;
  if (extras.includes('published_at')) data.published_at = payload.publishedAt ?? null;
  if (extras.includes('author_name')) data.author_name = payload.authorName ?? null;
  if (extras.includes('author_role')) data.author_role = payload.authorRole ?? null;
  if (extras.includes('stock')) data.stock = payload.stock ?? null;
  if (extras.includes('report_year')) data.report_year = payload.reportYear ?? null;
  if (extras.includes('file_url')) data.file_url = payload.fileUrl ?? null;

  return data;
};

const resolveTable = (type) => {
  const table = TABLES[type];
  if (!table) {
    throw new ApiError(404, 'content type not found');
  }
  return table;
};

const selectFields = (type) => {
  const extras = TABLE_EXTRA_FIELDS[type] ?? [];
  const fields = [...baseFields, ...extras, 'id', 'created_at', 'updated_at'];
  return Array.from(new Set(fields));
};

const toPublic = (row) => ({
  id: Number(row.id),
  title: row.title,
  slug: row.slug,
  summary: row.summary,
  content: row.content,
  imageUrl: row.image_url,
  published: Boolean(row.published),
  location: row.location,
  eventDate: row.event_date,
  price: row.price,
  publishedAt: row.published_at,
  authorName: row.author_name,
  authorRole: row.author_role,
  stock: row.stock,
  reportYear: row.report_year,
  fileUrl: row.file_url,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const contentRepository = {
  async list(type, { page = 1, limit = 10, search = '', publishedOnly = false }) {
    const table = resolveTable(type);
    const safePage = Number.isInteger(page) && page > 0 ? page : 1;
    const safeLimit = Number.isInteger(limit) && limit > 0 ? Math.min(limit, 100) : 10;
    const offset = (safePage - 1) * safeLimit;
    const where = [];
    const params = [];

    if (search) {
      where.push('(title LIKE ? OR summary LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }

    if (publishedOnly) {
      where.push('published = 1');
    }

    const whereClause = where.length > 0 ? `WHERE ${where.join(' AND ')}` : '';

    const totalRows = await query(`SELECT COUNT(*) AS total FROM ${table} ${whereClause}`, params);
    const rows = await query(
      `SELECT ${selectFields(type).join(', ')} FROM ${table} ${whereClause} ORDER BY created_at DESC LIMIT ${safeLimit} OFFSET ${offset}`,
      params,
    );

    return {
      items: rows.map(toPublic),
      page: safePage,
      limit: safeLimit,
      total: Number(totalRows[0].total),
    };
  },

  async findById(type, id) {
    const table = resolveTable(type);
    const rows = await query(`SELECT ${selectFields(type).join(', ')} FROM ${table} WHERE id = ? LIMIT 1`, [id]);
    if (rows.length === 0) {
      throw new ApiError(404, 'content not found');
    }
    return toPublic(rows[0]);
  },

  async create(type, payload) {
    const table = resolveTable(type);
    const data = mapInput(type, payload);
    const fields = Object.keys(data);
    const placeholders = fields.map(() => '?').join(', ');
    const values = fields.map((field) => data[field]);

    try {
      const result = await query(
        `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${placeholders})`,
        values,
      );
      return this.findById(type, result.insertId);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ApiError(409, 'slug already exists');
      }
      throw error;
    }
  },

  async update(type, id, payload) {
    const table = resolveTable(type);
    const existing = await this.findById(type, id);
    const data = mapInput(type, {
      ...existing,
      ...payload,
      imageUrl: payload.imageUrl ?? existing.imageUrl,
      eventDate: payload.eventDate ?? existing.eventDate,
      authorName: payload.authorName ?? existing.authorName,
      authorRole: payload.authorRole ?? existing.authorRole,
      reportYear: payload.reportYear ?? existing.reportYear,
      fileUrl: payload.fileUrl ?? existing.fileUrl,
      publishedAt: payload.publishedAt ?? existing.publishedAt,
    });

    const fields = Object.keys(data);
    const values = fields.map((field) => data[field]);
    const setClause = fields.map((field) => `${field} = ?`).join(', ');

    try {
      await query(`UPDATE ${table} SET ${setClause} WHERE id = ?`, [...values, id]);
      return this.findById(type, id);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ApiError(409, 'slug already exists');
      }
      throw error;
    }
  },

  async remove(type, id) {
    const table = resolveTable(type);
    await this.findById(type, id);
    await query(`DELETE FROM ${table} WHERE id = ?`, [id]);
  },
};
