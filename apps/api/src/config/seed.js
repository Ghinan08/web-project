import bcrypt from 'bcryptjs';
import { query } from './database.js';
import { env } from './env.js';

const countRows = async (tableName) => {
  const rows = await query(`SELECT COUNT(*) AS total FROM ${tableName}`);
  return Number(rows[0].total);
};

const insertMany = async (tableName, columns, rows) => {
  if (rows.length === 0) {
    return;
  }

  const rowPlaceholder = `(${columns.map(() => '?').join(',')})`;
  const sql = `INSERT INTO ${tableName} (${columns.join(',')}) VALUES ${rows.map(() => rowPlaceholder).join(',')}`;
  const values = rows.flatMap((row) => columns.map((column) => row[column]));

  await query(sql, values);
};

const seedUsers = async () => {
  const existingAdmin = await query(`SELECT id FROM users WHERE email = ? LIMIT 1`, [env.seed.adminEmail]);
  if (existingAdmin.length > 0) {
    return;
  }

  const passwordHash = await bcrypt.hash(env.seed.adminPassword, 12);

  await query(
    `INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, 'admin')`,
    [env.seed.adminName, env.seed.adminEmail, passwordHash],
  );
};

const seedPrograms = async () => {
  const total = await countRows('programs');
  if (total > 0) {
    return;
  }

  await insertMany(
    'programs',
    ['title', 'slug', 'summary', 'content', 'image_url', 'location', 'event_date', 'price', 'published'],
    [
      {
        title: 'Malang Menyapa #3',
        slug: 'malang-menyapa-3',
        summary: 'Kegiatan sosial rutin untuk lansia dan masyarakat rentan.',
        content: 'Program kolaborasi relawan untuk memberikan dukungan sosial, kesehatan, dan edukasi.',
        image_url: 'https://images.unsplash.com/photo-1542601902044-22b4676c77e3?q=80&w=1200&auto=format&fit=crop',
        location: 'Panti Jompo Kasih',
        event_date: '2026-02-22',
        price: 55000,
        published: 1,
      },
      {
        title: 'Project Leader Recruitment',
        slug: 'project-leader-recruitment',
        summary: 'Perekrutan pemimpin proyek relawan nasional.',
        content: 'Program ini mencari pemimpin komunitas yang siap mengelola program dampak sosial regional.',
        image_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop',
        location: 'Online (Zoom)',
        event_date: '2026-03-15',
        price: 0,
        published: 1,
      },
      {
        title: 'Bandung Menyapa #10',
        slug: 'bandung-menyapa-10',
        summary: 'Aksi sosial lintas komunitas untuk wilayah Bandung.',
        content: 'Sesi mentoring, bantuan pangan, dan dukungan pendidikan berbasis sukarelawan.',
        image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
        location: 'Rumah Quran Isyarah',
        event_date: '2026-04-05',
        price: 60000,
        published: 1,
      },
    ],
  );
};

const seedNews = async () => {
  const total = await countRows('news');
  if (total > 0) {
    return;
  }

  await insertMany(
    'news',
    ['title', 'slug', 'summary', 'content', 'image_url', 'published', 'published_at'],
    [
      {
        title: 'Sankara Gandeng 12 Komunitas Lokal',
        slug: 'sankara-gandeng-12-komunitas-lokal',
        summary: 'Kolaborasi baru untuk memperluas dampak program sosial tahun ini.',
        content: 'Kemitraan ini fokus pada pendidikan, pemberdayaan ekonomi, dan kesehatan komunitas.',
        image_url: 'https://images.unsplash.com/photo-1469571486292-b53601020f90?q=80&w=1200&auto=format&fit=crop',
        published: 1,
        published_at: '2026-01-10 08:00:00',
      },
      {
        title: 'Pelatihan Relawan Nasional Dibuka',
        slug: 'pelatihan-relawan-nasional-dibuka',
        summary: 'Program pelatihan batch baru resmi dibuka untuk seluruh regional.',
        content: 'Pelatihan meliputi manajemen program, komunikasi publik, dan keselamatan lapangan.',
        image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
        published: 1,
        published_at: '2026-01-18 09:30:00',
      },
    ],
  );
};

const seedTestimonials = async () => {
  const total = await countRows('testimonials');
  if (total > 0) {
    return;
  }

  await insertMany(
    'testimonials',
    ['title', 'slug', 'summary', 'content', 'image_url', 'author_name', 'author_role', 'published'],
    [
      {
        title: 'Program yang Mengubah Cara Kami Bergerak',
        slug: 'program-yang-mengubah-cara-kami-bergerak',
        summary: 'Koordinasi lebih rapi dan dampak lebih terukur.',
        content: 'Kami merasakan peningkatan kolaborasi lintas tim sejak mengikuti framework program Sankara.',
        image_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
        author_name: 'Rika Dewanti',
        author_role: 'Koordinator Regional',
        published: 1,
      },
      {
        title: 'Relawan Lebih Siap Turun Lapangan',
        slug: 'relawan-lebih-siap-turun-lapangan',
        summary: 'Pelatihan dan modul cukup membantu relawan baru.',
        content: 'Dengan materi yang terstruktur, relawan baru bisa beradaptasi lebih cepat di program nyata.',
        image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
        author_name: 'Arif Setiawan',
        author_role: 'Volunteer Lead',
        published: 1,
      },
    ],
  );
};

const seedStoreItems = async () => {
  const total = await countRows('store_items');
  if (total > 0) {
    return;
  }

  await insertMany(
    'store_items',
    ['title', 'slug', 'summary', 'content', 'image_url', 'price', 'stock', 'published'],
    [
      {
        title: 'Kaos Relawan Sankara',
        slug: 'kaos-relawan-sankara',
        summary: 'Kaos resmi relawan berbahan premium.',
        content: 'Produk merchandise untuk mendukung kegiatan operasional sosial.',
        image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop',
        price: 149000,
        stock: 120,
        published: 1,
      },
      {
        title: 'Tumbler Eco Initiative',
        slug: 'tumbler-eco-initiative',
        summary: 'Tumbler ramah lingkungan edisi komunitas.',
        content: 'Mendorong kebiasaan minim sampah plastik selama aktivitas relawan.',
        image_url: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=1200&auto=format&fit=crop',
        price: 99000,
        stock: 80,
        published: 1,
      },
    ],
  );
};

const seedAnnualReports = async () => {
  const total = await countRows('annual_reports');
  if (total > 0) {
    return;
  }

  await insertMany(
    'annual_reports',
    ['title', 'slug', 'summary', 'content', 'image_url', 'report_year', 'file_url', 'published'],
    [
      {
        title: 'Laporan Tahunan Sankara 2024',
        slug: 'laporan-tahunan-sankara-2024',
        summary: 'Ringkasan capaian dampak sosial dan operasional tahun 2024.',
        content: 'Memuat indikator capaian, akuntabilitas program, serta rencana pengembangan 2025.',
        image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
        report_year: 2024,
        file_url: 'https://example.com/reports/sankara-2024.pdf',
        published: 1,
      },
      {
        title: 'Laporan Tahunan Sankara 2025',
        slug: 'laporan-tahunan-sankara-2025',
        summary: 'Laporan komprehensif aktivitas program lintas regional tahun 2025.',
        content: 'Fokus pada pertumbuhan relawan, perluasan regional, dan evaluasi program prioritas.',
        image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop',
        report_year: 2025,
        file_url: 'https://example.com/reports/sankara-2025.pdf',
        published: 1,
      },
    ],
  );
};

export const seedDatabase = async () => {
  await seedUsers();
  await seedPrograms();
  await seedNews();
  await seedTestimonials();
  await seedStoreItems();
  await seedAnnualReports();
};