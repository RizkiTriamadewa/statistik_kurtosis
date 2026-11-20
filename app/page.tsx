"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const faqItems = [
  {
    q: "Apakah kalkulator ini perlu akun?",
    a: "Tidak. Semua perhitungan berjalan langsung di halaman ini tanpa pendaftaran.",
  },
  {
    q: "Apa bedanya data tunggal dan data kelompok?",
    a: "Data tunggal adalah nilai mentah yang belum dikelompokkan, misalnya 70, 75, 80. Data kelompok sudah disusun dalam interval kelas, misalnya 31-40, 41-50, dan seterusnya.",
  },
  {
    q: "Kenapa ada dua tabel perhitungan?",
    a: "Tabel metode coding memakai nilai u untuk menyederhanakan angka besar. Tabel metode biasa menghitung langsung dari nilai tengah. Keduanya disediakan agar langkah hitung bisa dibandingkan dengan cara di kertas.",
  },
  {
    q: "Bagaimana format CSV yang diterima?",
    a: "Dua kolom: kolom pertama nilai atau interval, kolom kedua frekuensi. Baris judul boleh ada. File dibaca di peramban dan tidak diunggah ke server.",
  },
];

const navLinks = [
  { label: "Teori", href: "#teori" },
  { label: "Fitur", href: "#fitur" },
  { label: "FAQ", href: "#faq" },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <div id="atas" className="min-h-screen bg-[#FAF8F3] text-stone-900">
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-stone-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Lewati ke konten
      </a>

      <header className="sticky top-0 z-40 border-b border-stone-200 bg-[#FAF8F3]/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <a href="#atas" className="flex flex-col leading-none">
            <span className="font-serif text-xl text-stone-900">
              Statistik<span className="text-red-800">Pro</span>
            </span>
            <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-stone-600">
              Kalkulator statistika deskriptif
            </span>
          </a>

          <nav aria-label="Navigasi utama" className="hidden items-center gap-7 text-sm md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-stone-700 underline-offset-4 transition-colors hover:text-red-800 hover:underline"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/kalkulator/"
              className="rounded border border-stone-900 bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-red-800 hover:bg-red-800"
            >
              Buka kalkulator
            </Link>
          </nav>

          <button
            type="button"
            aria-label={isMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={isMenuOpen}
            aria-controls="menu-seluler"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded border border-stone-300 p-2 text-stone-800 md:hidden"
          >
            {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>

        {isMenuOpen && (
          <div id="menu-seluler" className="border-t border-stone-200 px-4 pb-4 pt-2 md:hidden">
            <nav aria-label="Navigasi seluler" className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="border-b border-stone-200 py-3 text-sm font-medium text-stone-800 hover:text-red-800"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/kalkulator/"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 rounded border border-stone-900 bg-stone-900 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:border-red-800 hover:bg-red-800"
              >
                Buka kalkulator
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main id="konten">
        <section className="border-b border-stone-200">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-800">
                Statistika deskriptif
              </p>
              <h1 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-stone-900 sm:text-5xl">
                Hitung statistik deskriptif tanpa mengulang aritmetika.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-700 sm:text-lg">
                Masukkan data tunggal atau data kelompok, lalu baca mean, median, modus, simpangan
                baku, skewness, dan kurtosis. Setiap hasil disertai langkah perhitungan, sehingga
                angkanya bisa diperiksa, bukan hanya dipercaya.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/kalkulator/"
                  className="rounded border border-stone-900 bg-stone-900 px-6 py-3 text-center font-semibold text-white transition-colors hover:border-red-800 hover:bg-red-800"
                >
                  Mulai menghitung data
                </Link>
                <a
                  href="#teori"
                  className="rounded border border-stone-400 px-6 py-3 text-center font-semibold text-stone-900 transition-colors hover:border-stone-900 hover:bg-white"
                >
                  Baca teori dasar
                </a>
              </div>
              <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-stone-200 pt-6 text-sm sm:grid-cols-3">
                <div>
                  <dt className="font-semibold text-stone-900">Dua jenis data</dt>
                  <dd className="mt-1 text-stone-600">Tunggal dan interval kelas.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-stone-900">Langkah lengkap</dt>
                  <dd className="mt-1 text-stone-600">Rumus ditulis sampai hasil.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-stone-900">Impor CSV</dt>
                  <dd className="mt-1 text-stone-600">Dibaca lokal di peramban.</dd>
                </div>
              </dl>
            </div>

            <figure className="rounded border border-stone-300 bg-white p-6 sm:p-8">
              <svg
                viewBox="0 0 480 280"
                role="img"
                aria-labelledby="judul-figur-kurva"
                className="h-auto w-full"
              >
                <title id="judul-figur-kurva">
                  Kurva distribusi normal dengan garis mean, median, dan modus berimpit di tengah.
                </title>
                <line x1="40" y1="230" x2="440" y2="230" stroke="#1c1917" strokeWidth="1.5" />
                <line x1="40" y1="230" x2="40" y2="40" stroke="#1c1917" strokeWidth="1.5" />
                <path
                  d="M48 228 C120 228 150 58 240 58 C330 58 360 228 432 228"
                  fill="none"
                  stroke="#991b1b"
                  strokeWidth="2"
                />
                <line
                  x1="240"
                  y1="58"
                  x2="240"
                  y2="230"
                  stroke="#57534e"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text x="248" y="96" fill="#57534e" fontSize="12">
                  mean = median = modus
                </text>
                <text x="40" y="256" fill="#57534e" fontSize="12">
                  nilai data
                </text>
                <text x="52" y="48" fill="#57534e" fontSize="12">
                  frekuensi
                </text>
              </svg>
              <figcaption className="mt-4 border-t border-stone-200 pt-3 text-sm leading-relaxed text-stone-600">
                Gambar 1. Pada distribusi simetris, mean, median, dan modus berimpit di puncak
                kurva. Kalkulator menampilkan ketiganya agar penyimpangan dari bentuk ini terlihat.
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="teori" className="scroll-mt-24 border-b border-stone-200">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.4fr_0.6fr] lg:py-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-600">
                Bagian 01
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-stone-900">
                Pahami bentuk distribusi sebelum membaca angkanya.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-700">
                Statistika deskriptif bukan hanya soal rata-rata. Bentuk sebaran menentukan apakah
                rata-rata itu mewakili data dengan jujur.
              </p>
            </div>
            <div className="divide-y divide-stone-200 border-t border-stone-300">
              <article className="py-7 first:pt-6 last:pb-0">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-lg text-red-800">01</span>
                  <h3 className="font-serif text-2xl text-stone-900">Tendensi sentral</h3>
                </div>
                <p className="mt-3 pl-10 text-base leading-relaxed text-stone-700">
                  Mean, median, dan modus menunjukkan di mana data memusat. Ketika ketiganya
                  berimpit, kurva cenderung simetris. Selisih di antara ketiganya adalah tanda
                  pertama bahwa distribusi tidak seimbang.
                </p>
              </article>
              <article className="py-7 first:pt-6 last:pb-0">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-lg text-red-800">02</span>
                  <h3 className="font-serif text-2xl text-stone-900">Kemiringan (skewness)</h3>
                </div>
                <p className="mt-3 pl-10 text-base leading-relaxed text-stone-700">
                  Skewness mengukur arah ekor distribusi. Nilai positif berarti ekor memanjang ke
                  kanan, nilai negatif berarti ekor memanjang ke kiri, dan nilai mendekati nol
                  berarti distribusi mendekati simetris.
                </p>
              </article>
              <article className="py-7 first:pt-6 last:pb-0">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-lg text-red-800">03</span>
                  <h3 className="font-serif text-2xl text-stone-900">Keruncingan (kurtosis)</h3>
                </div>
                <p className="mt-3 pl-10 text-base leading-relaxed text-stone-700">
                  Kurtosis membandingkan tinggi puncak dan ketebalan ekor terhadap kurva normal.
                  Leptokurtik lebih runcing, mesokurtik seimbang, dan platikurtik lebih datar.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="fitur" className="scroll-mt-24 border-b border-stone-200">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="flex flex-col justify-between gap-6 border-b border-stone-300 pb-6 md:flex-row md:items-end">
              <h2 className="max-w-lg font-serif text-3xl leading-tight text-stone-900">
                Yang bisa dilakukan kalkulator ini.
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-stone-600">
                Dibangun untuk memeriksa tugas dan riset: hasil akhir selalu disertai tabel dan
                langkah yang bisa dicocokkan dengan hitungan manual.
              </p>
            </div>
            <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <article className="border-t-2 border-stone-900 pt-6">
                <h3 className="font-serif text-2xl text-stone-900">Langkah penyelesaian</h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-stone-700">
                  Setiap rumus ditulis lengkap dengan angka yang Anda masukkan: momen, varians,
                  simpangan baku, ukuran posisi, lalu skewness dan kurtosis. Tujuannya satu, hasil
                  bisa dilacak baris per baris.
                </p>
                <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <dt className="text-stone-600">Mean dan momen</dt>
                    <dd className="font-semibold text-stone-900">Lengkap</dd>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <dt className="text-stone-600">Median dan kuartil</dt>
                    <dd className="font-semibold text-stone-900">Interpolasi</dd>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <dt className="text-stone-600">Skewness</dt>
                    <dd className="font-semibold text-stone-900">Empat ukuran</dd>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <dt className="text-stone-600">Kurtosis</dt>
                    <dd className="font-semibold text-stone-900">Momen keempat</dd>
                  </div>
                </dl>
              </article>
              <div className="space-y-8">
                <article className="border-t border-stone-300 pt-5">
                  <h3 className="font-serif text-xl text-stone-900">Hitung otomatis</h3>
                  <p className="mt-2 text-base leading-relaxed text-stone-700">
                    Masukkan interval dan frekuensi. Nilai tengah, frekuensi kumulatif, dan seluruh
                    ukuran statistik dihitung seketika.
                  </p>
                </article>
                <article className="border-t border-stone-300 pt-5">
                  <h3 className="font-serif text-xl text-stone-900">Histogram dan ogive</h3>
                  <p className="mt-2 text-base leading-relaxed text-stone-700">
                    Tabel distribusi diubah menjadi histogram dengan kurva normal pembanding, atau
                    ogive untuk membaca median secara visual.
                  </p>
                </article>
                <article className="border-t border-stone-300 pt-5">
                  <h3 className="font-serif text-xl text-stone-900">Impor dan cetak</h3>
                  <p className="mt-2 text-base leading-relaxed text-stone-700">
                    Data bisa diunggah dari CSV, dan laporan lengkap dapat dicetak atau disimpan
                    sebagai PDF dari dialog cetak peramban.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 border-b border-stone-200">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.35fr_0.65fr] lg:py-20">
            <div>
              <h2 className="font-serif text-3xl leading-tight text-stone-900">
                Pertanyaan yang sering muncul
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-700">
                Jika ada yang belum terjawab, coba langsung di kalkulator. Tidak ada akun yang perlu
                dibuat.
              </p>
            </div>
            <div className="border-t border-stone-300">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                const panelId = `faq-panel-${index}`;
                return (
                  <div key={item.q} className="border-b border-stone-200">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="flex w-full items-start justify-between gap-6 py-5 text-left text-base font-semibold text-stone-900 hover:text-red-800"
                      >
                        <span>{item.q}</span>
                        <span
                          aria-hidden="true"
                          className="font-serif text-xl leading-none text-red-800"
                        >
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      hidden={!isOpen}
                      className="pb-6 pr-8 text-base leading-relaxed text-stone-700"
                    >
                      {item.a}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col justify-between gap-8 border-t border-stone-300 pt-8 md:flex-row">
          <div>
            <p className="font-serif text-lg text-stone-900">
              Statistik<span className="text-red-800">Pro</span>
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-600">
              Alat bantu belajar statistika deskriptif. Hasil perhitungan tetap perlu diperiksa
              terhadap data dan metode yang Anda pakai.
            </p>
          </div>
          <nav aria-label="Navigasi footer" className="flex flex-col gap-2 text-sm md:items-end">
            <a href="#teori" className="text-stone-700 underline-offset-4 hover:text-red-800 hover:underline">
              Teori dasar
            </a>
            <a href="#fitur" className="text-stone-700 underline-offset-4 hover:text-red-800 hover:underline">
              Fitur kalkulator
            </a>
            <a href="#faq" className="text-stone-700 underline-offset-4 hover:text-red-800 hover:underline">
              FAQ
            </a>
            <Link
              href="/kalkulator/"
              className="text-stone-700 underline-offset-4 hover:text-red-800 hover:underline"
            >
              Buka kalkulator
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-xs text-stone-600">
          © {new Date().getFullYear()} StatistikPro. Dibangun dengan Next.js dan Tailwind CSS.
        </p>
      </footer>
    </div>
  );
}
