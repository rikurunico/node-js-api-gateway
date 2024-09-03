# README

## Deskripsi Proyek

Proyek ini adalah aplikasi berbasis microservices yang terdiri dari beberapa komponen:

1. **Auth Service**: Layanan untuk autentikasi dan otorisasi pengguna.
2. **Item Service**: Layanan untuk mengelola item, termasuk operasi CRUD untuk admin dan akses tampilan untuk pengguna biasa.
3. **API Gateway**: Pusat untuk mengelola rute dan middleware, serta mengarahkan permintaan ke layanan yang sesuai.

## Struktur Proyek

- **auth-service**: Layanan untuk autentikasi dan otorisasi.
- **item-service**: Layanan untuk mengelola item dengan operasi CRUD.
- **api-gateway**: Gerbang masuk untuk API yang mengarahkan permintaan ke layanan yang tepat dan mengelola otorisasi.
- **migration-service**: Layanan untuk menjalankan migrasi basis data menggunakan Prisma.
- **redis**: Cache untuk validasi token.

## Prasyarat

Pastikan Anda memiliki perangkat lunak berikut yang terinstal di sistem Anda:

- Docker
- Docker Compose
- Node.js
- Python
- PostgreSQL
- Redis

## Instalasi

1. **Clone Repositori**

   ```bash
   git clone <URL_REPOSITORI>
   cd <NAMA_REPOSITORI>
   ```

2. **Menjalankan Proyek**

   Gunakan Docker Compose untuk membangun dan menjalankan semua layanan:

   ```bash
   docker-compose up --build
   ```

   Ini akan membangun image Docker untuk setiap layanan, menjalankan container, dan mengatur jaringan yang diperlukan.

## Struktur Folder

- **auth-service/**: Layanan autentikasi.
  - `main.go`: Kode utama untuk layanan autentikasi.
  - `utils/`: Utilitas seperti JWT token generator.
  - `model/`: Model database untuk pengguna.
  - `handler/`: Handler untuk rute autentikasi.
  
- **item-service/**: Layanan item.
  - `main.py`: Kode utama untuk layanan item menggunakan FastAPI.
  - `model.py`: Model database untuk item.
  - `routes/`: Rute untuk operasi item.

- **api-gateway/**: Gerbang masuk API.
  - `server.js`: Kode utama untuk API Gateway.
  - `routes/`: Rute untuk autentikasi dan item.
  - `middleware/`: Middleware untuk otorisasi.

- **migration-service/**: Layanan migrasi database.
  - `migrate.js`: Skrip untuk menjalankan migrasi menggunakan Prisma.

## Dokumentasi API

Dokumentasi API dapat diakses melalui file Postman JSON yang disediakan. Import file ini ke Postman untuk melihat semua rute yang tersedia dan spesifikasi permintaan serta responsnya.

## Penggunaan

- **Autentikasi**: Gunakan endpoint `/auth/login` untuk mendapatkan token JWT.
- **Item CRUD (Admin)**: 
  - POST `/items/admin` untuk membuat item.
  - PUT `/items/admin/:id` untuk memperbarui item.
  - DELETE `/items/admin/:id` untuk menghapus item.
- **Item Show (Pengguna Biasa)**:
  - GET `/items/show` untuk melihat semua item.
  - GET `/items/show/:id` untuk melihat item berdasarkan ID.

## Pengujian

Untuk menguji aplikasi, Anda dapat menggunakan Postman atau alat lain untuk mengirim permintaan ke endpoint API yang tersedia. Pastikan Anda telah menjalankan semua layanan dengan benar dan memiliki token JWT yang valid untuk autentikasi.

## Troubleshooting

- **Masalah Koneksi Database**: Pastikan PostgreSQL berjalan dan variabel `DATABASE_URL` diatur dengan benar.
- **Masalah Koneksi Redis**: Pastikan Redis berjalan dan variabel `REDIS_HOST` diatur dengan benar.
- **Masalah Autentikasi**: Periksa bahwa token JWT yang digunakan valid dan tidak kedaluwarsa.

