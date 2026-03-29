# 📊 StatistikPro - Kalkulator Statistik Interaktif

StatistikPro adalah aplikasi web modern berbasis **Next.js** yang dirancang untuk mempermudah analisis data statistik deskriptif. Aplikasi ini dapat menghitung tendensi sentral, ukuran penyebaran, hingga menganalisis bentuk kurva (Skewness & Kurtosis) secara instan, lengkap dengan penjabaran langkah demi langkah (Step-by-Step) layaknya perhitungan manual di atas kertas.

---

## 📸 Dokumentasi Tampilan / Screenshots

Berikut adalah cuplikan tampilan dari aplikasi StatistikPro:

### 1. Halaman Utama (Landing Page)
*Halaman depan yang edukatif, modern, dan responsif dengan animasi interaktif.*
<img width="1914" height="913" alt="image" src="https://github.com/user-attachments/assets/6b5eecda-2bd1-4903-aba9-d140ddf9fa9e" />


### 2. Workspace Kalkulator (Input Data)
*Antarmuka input data yang mudah digunakan, mendukung Data Tunggal & Kelompok, serta fitur Upload CSV.*
<img width="1490" height="881" alt="image" src="https://github.com/user-attachments/assets/ce382dc1-5c67-4ab6-9549-5985c2ab6fd8" />


### 3. Visualisasi Grafik & Diagram
*Hasil analisis otomatis diubah menjadi grafik Histogram yang mudah diinterpretasi.*
<img width="1271" height="914" alt="image" src="https://github.com/user-attachments/assets/e4c21334-c7f9-46da-b6f3-cd48fe302a57" />


### 4. Tabel Perhitungan & Penjabaran Langkah (Step-by-Step)
*Tabel distribusi frekuensi lengkap (Metode Biasa & Coding) beserta penjabaran rumus menggunakan LaTeX.*
<img width="702" height="809" alt="image" src="https://github.com/user-attachments/assets/54ecf76a-9ebc-45d7-a9a5-741c8b27c616" />
<img width="677" height="810" alt="image" src="https://github.com/user-attachments/assets/647c99cc-ff64-4611-9c01-eb364b4cea0d" />


---

## ✨ Fitur Utama

- **Dukungan Dua Jenis Data:** Mendukung perhitungan untuk Data Tunggal dan Data Kelompok (Interval).
- **Kalkulasi Otomatis:** Menghitung Mean, Median, Modus, Varians, Kuartil, Persentil, dan Simpangan Baku.
- **Analisis Kurva:** Mengukur tingkat kemiringan (*Skewness*) dan keruncingan (*Kurtosis*) distribusi data.
- **Dua Metode Perhitungan:** Menampilkan perbandingan menggunakan **Metode Biasa (Simpangan)** dan **Metode Coding ($u$)**.
- **Step-by-Step Process:** Menyajikan langkah penyelesaian detail menggunakan format rumus matematika profesional (LaTeX).
- **Visualisasi Interaktif:** Menampilkan grafik Histogram distribusi frekuensi.
- **Import & Export:** Mendukung upload data via file `.csv` dan cetak hasil analisis menjadi **PDF**.

---

## 🛠️ Teknologi yang Digunakan

Project ini dibangun menggunakan *modern tech-stack*:
- **Framework:** [Next.js](https://nextjs.org/) (React 19 / App Router)
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS
- **Animasi:** Framer Motion
- **Icons:** Lucide React
- **Math Rendering:** React-LaTeX-Next (KaTeX)
- **Charts:** Chart.js & React-Chartjs-2
- **Export PDF:** React-To-Print

---

## 🚀 Cara Instalasi & Menjalankan Project

Ikuti langkah-langkah di bawah ini untuk menjalankan project ini di komputer (lokal) kamu.

### Prasyarat
Pastikan kamu sudah menginstal [Node.js](https://nodejs.org/) (versi 18.x atau yang lebih baru) di komputermu.

### Langkah-langkah:

**1. Clone Repository**
Buka terminal dan clone *repository* ini ke komputer kamu:
```bash
git clone [https://github.com/username-kamu/statistik_kurtosis.git](https://github.com/username-kamu/statistik_kurtosis.git)
cd statistik_kurtosis
