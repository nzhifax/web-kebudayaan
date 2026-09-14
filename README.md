# Jelajah Nusantara (Peta Petualang Indonesia)

Aplikasi WebGIS interaktif edukasi budaya Indonesia dari 38 provinsi.

## Fitur Utama
- **Peta Interaktif**: Jelajahi pulau dan provinsi di Indonesia dengan Leaflet.
- **Kuis Budaya**: Uji pengetahuan mengenai tarian, makanan, rumah adat, dan alat musik.
- **Kartu Provinsi**: Informasi detail tiap daerah di Indonesia.

## Jalankan Secara Lokal (Development)

Prasyarat: Node.js (v18+)

```bash
# 1. Install dependensi
npm install

# 2. Jalankan server dev Vite
npm run dev
```

Buka browser di `http://localhost:5173`.

## Build untuk Produksi

```bash
npm run build
```

Hasil build akan berada di folder `dist/` dan siap dipublish di Vercel, Netlify, Cloudflare Pages, atau server VPS Nginx.
