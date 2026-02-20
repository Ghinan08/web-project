# Project Genvis

Implementasi awal sudah mencakup:

- Frontend publik React (route-based, tanpa hash `#`)
- Backend API Express + MySQL (auth register/login/logout/refresh + CRUD konten)
- Aplikasi admin terpisah untuk CRUD konten

## Struktur

- `src/` : aplikasi web publik (Vite)
- `apps/api/` : backend Express + MySQL
- `apps/admin/` : aplikasi admin React (Vite)

## Menjalankan proyek

### Opsi cepat (dari root)

```bash
npm run start:fe      # web publik saja
npm run start:be      # backend API saja
npm run start:fe-be   # web + backend sekaligus
npm run start:all     # web + backend + admin sekaligus
```

### 1) Web publik

```bash
npm install
npm run dev:web
```

### 2) API

```bash
npm --prefix apps/api install
cp apps/api/.env.example apps/api/.env
npm --prefix apps/api run dev
```

Saat pertama kali dijalankan, API akan otomatis membuat database sesuai nilai `DB_NAME` jika belum ada, lalu membuat semua tabel yang dibutuhkan.

Catatan: user MySQL pada `DB_USER` harus punya permission `CREATE DATABASE`.

Setelah tabel dibuat, API juga menjalankan seeder otomatis (idempotent):

- Membuat akun admin default jika belum ada
- Mengisi data contoh untuk Programs, News, Testimonials, Store Items, dan Annual Reports jika tabel masih kosong

Default akun admin seed:

- Email: `admin@genvis.local`
- Password: `Admin#12345`

Kredensial default dapat diubah melalui `SEED_ADMIN_NAME`, `SEED_ADMIN_EMAIL`, dan `SEED_ADMIN_PASSWORD` di `apps/api/.env`.

### 3) Admin

```bash
npm --prefix apps/admin install
cp apps/admin/.env.example apps/admin/.env
npm --prefix apps/admin run dev
```

## Environment penting

### Web publik (`.env`)

- `VITE_API_BASE_URL` (default: `http://localhost:4000/api/v1`)

### API (`apps/api/.env`)

- `PORT`
- `APP_ORIGIN` (pisahkan dengan koma, contoh: `http://localhost:5173,http://localhost:5174`)
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`
- `ACCESS_TOKEN_TTL`, `REFRESH_TOKEN_TTL_DAYS`, `REFRESH_COOKIE_NAME`

## Endpoint utama API

Base URL: `/api/v1`

- Auth
	- `POST /auth/register`
	- `POST /auth/login`
	- `POST /auth/refresh`
	- `POST /auth/logout`
	- `GET /auth/me`

- Konten
	- `GET /programs|news|testimonials|store-items|annual-reports`
	- `GET /{type}/:id`
	- `POST /{type}` (admin)
	- `PUT /{type}/:id` (admin)
	- `DELETE /{type}/:id` (admin)

## Catatan auth

- Access token di `Authorization: Bearer <token>`
- Refresh token disimpan sebagai HttpOnly cookie
- Endpoint CRUD dilindungi role `admin`
