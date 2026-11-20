# DESIGN.md

Arah visual untuk StatistikPro. Dokumen ini memberi identitas; aturan antislop hanya menyaring.

## Reading

Reading this as: an academic statistics calculator for Indonesian students and lecturers, in an editorial journal language, dial ENERGY 1 / RHYTHM 2 / MOTION 1.

## Identity

- **Product:** kalkulator statistika deskriptif (data tunggal dan data kelompok).
- **Audience:** mahasiswa, dosen, dan peneliti yang memeriksa hitungan.
- **Mood:** tenang, kredibel, seperti halaman jurnal atau buku ajar. Bukan produk SaaS.
- **Karakter:** tinta di atas kertas, aturan garis tipis, angka yang dibaca dengan jelas.

## Dial

| Dial | Nilai | Alasan |
|---|---|---|
| ENERGY | 1 | Alat akademik; tidak perlu berteriak. Fokus ke angka dan rumus. |
| RHYTHM | 2 | Bagian boleh berbeda komposisi, tetapi halaman tetap teratur seperti jurnal. |
| MOTION | 1 | Hanya hover dan focus. Tidak ada animasi masuk, floating, atau pulse. |

## Palette (2 core + 1 accent)

| Peran | Nilai | Alasan |
|---|---|---|
| Paper | `#FAF8F3` | Kertas hangat, bukan putih aplikasi generik. |
| Ink | `#1C1917` / `stone-900` | Teks utama, kontras tinggi untuk membaca rumus. |
| Accent | `#991B1B` / `red-800` | Oxblood editorial: menandai aksi utama dan angka kunci. Satu warna, dipakai hemat. |
| Line | `stone-200` / `stone-300` | Pemisah section seperti garis tabel jurnal. |
| Semantic | amber / red / stone | Hanya untuk status skewness dan kurtosis, karena warna itu membawa makna. |

## Typography

- **Judul dan angka besar:** Source Serif 4, karena terasa seperti judul jurnal dan membedakan diri dari sans-serif default AI.
- **Teks dan label:** IBM Plex Sans, dibuat untuk teks teknis dan tabel; alasan: keterbacaan angka dan istilah statistika.
- Tidak memakai monospace untuk judul. Monospace hanya untuk angka hasil bila perlu.

## Bentuk

- Radius 4-6 px pada kontrol, 6 px pada panel. Bukan pill, bukan `2rem`.
- Bayangan hampir tidak ada. Pemisah memakai border, bukan floating cards.
- Ikon hanya jika membawa aksi (menu, unggah, hapus, cetak). Tidak ada ikon dekoratif.

## Composition

- Beranda editorial: hero asimetris dengan satu figur kurva, lalu teori berbentuk artikel bernomor, lalu fitur dengan satu item utama dan dua item pendukung, lalu FAQ, lalu footer.
- Halaman kalkulator: panel input di kiri, hasil di kanan. Tabel dan rumus menjadi fokus, bukan dekorasi.

## Rules that shaped this

- R-01/R-13: gradien indigo-ungu, glow, dan orb dihapus. Accent datar saja.
- R-05/C-3: section "partner" palsu dan blok "Mengapa kami" dihapus karena hanya mengisi template.
- R-09: badge di atas H1 dihapus; headline berbicara sendiri.
- R-15/R-16: CTA ditulis spesifik ("Mulai menghitung data"), bukan "Get Started".
- R-19: semua animasi masuk dan loop dihapus; MOTION 1.
- R-24/R-26: semua link footer `#` diganti tujuan nyata atau dihapus.
- R-29: indigo, ungu, biru, emerald dekoratif diganti satu accent.
- R-31: setiap keputusan di atas punya satu alasan yang tertulis di tabel ini.
