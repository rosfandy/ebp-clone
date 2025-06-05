# E-Bebas Pustaka ITS (Librigo)

E-Bebas Pustaka ITS (Librigo) adalah aplikasi berbasis web yang dirancang untuk memudahkan administrasi persyaratan bebas pustaka mahasiswa di perpustakaan ITS. Dengan aplikasi ini, mahasiswa dapat dengan mudah mengajukan permohonan bebas pustaka, memantau status, hingga menerima surat bebas pustaka secara digital.

## Teknologi yang Digunakan

- **Frontend**: React.js  
- **Backend**: Laravel  
- **Database**: SQL Server  
- **Tools**:  
  - Vite (untuk build asset)
  - Composer
  - NPM/Yarn

## Pre-Installasi

- Setup virtual host `https://librigo.local` beserta SSL Certificate
- Setup SQL Server di `localhost`

## Instalasi

Ikuti langkah-langkah berikut untuk menjalankan proyek secara lokal:

### Prasyarat
Pastikan Anda sudah menginstal:
- PHP ^8.1
- Composer
- Node.js & NPM/Yarn
- MySQL

### Langkah-langkah
1. Clone repositori ini:
   ```bash
   git clone https://gitea.com/its-library/ebp-librigo
   cd ebp-librigo
   ```

2. Install dependensi backend:
   ```bash
   composer install
   cp .env.example .env
   php artisan key:generate
   ```

3. Konfigurasi file `.env` untuk database:
   ```env
   DB_CONNECTION=sqlsrv
   DB_HOST=127.0.0.1
   DB_PORT=1433
   DB_DATABASE=ebp_librigo
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

4. Jalankan migrasi dan seeder:
   ```bash
   php artisan migrate --seed
   ```

5. Install dependensi frontend:
   ```bash
   npm install
   ```

6. Build aset frontend (untuk development):
   ```bash
   npm run dev
   ```

7. Build aset frontend (untuk production):
   ```bash
   npm run build
   ```

8. Testing frontend
   ```bash
   npm test
   ```

7. Jalankan server lokal

Aplikasi akan berjalan di `https://librigo.local`.

---

**Dibuat dengan ❤️ oleh Tim E-BP Librigo ITS.**
