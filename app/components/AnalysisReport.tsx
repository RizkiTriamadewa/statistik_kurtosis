"use client";
import React from 'react';
import Latex from './Latex';

interface ReportTotals { freq: number; fu: number; fu2: number; fu3: number; fu4: number; }

interface ReportStats {
  codingP: number;
  assumedMean: number;
  tableTotals: ReportTotals;
  mean: number;
  stdDev: number;
  variance: number;
  mu1_u: number;
  mu2_u: number;
  mu3_u: number;
  mu4_u: number;
  m2_x: number;
  m3_x: number;
  m4_x: number;
  gamma1: number;
  gamma2: number;
  sk1: number;
  sk2: number;
  median: number;
  q1: number;
  q3: number;
  mode: number | number[];
  medL: number;
  medFk: number;
  medF: number;
  q1L: number;
  q1Fk: number;
  q1F: number;
  q3L: number;
  q3Fk: number;
  q3F: number;
  modeL: number;
  modeD1: number;
  modeD2: number;
}

const AnalysisReport = ({ stats }: { stats: ReportStats }) => {
  // Helper untuk format angka
  const fmt = (n: number) => n ? n.toLocaleString('id-ID', { maximumFractionDigits: 4 }) : '0';

  const { 
     codingP, assumedMean, tableTotals, 
     mean, stdDev, variance,
     mu1_u, mu2_u, mu3_u, mu4_u,
     m2_x, m3_x, m4_x,
     gamma1, gamma2, sk1, sk2,
     median, q1, q3, mode,
     medL, medFk, medF,
     q1L, q1Fk, q1F,
     q3L, q3Fk, q3F,
     modeL, modeD1, modeD2
  } = stats;
  
  const n = tableTotals.freq;

  return (
    <div className="mt-2 space-y-8 text-sm text-stone-700">
       <div className="border-b pb-2 mb-4">
          <h3 className="font-serif text-lg text-stone-900">Proses (detail perhitungan)</h3>
          <p className="text-xs text-stone-600">Penjabaran langkah demi langkah.</p>
       </div>

       {/* 1. TOTAL FREKUENSI */}
       <div className="border-b pb-4">
          <h4 className="font-bold text-red-800 mb-2">1. Menghitung Total Frekuensi (N)</h4>
          <p className="mb-1 text-xs">Menjumlahkan seluruh kolom frekuensi.</p>
          <div className="bg-stone-50 p-3 rounded border border-stone-100">
             <p className="font-bold text-lg"><Latex>{`$N = \\sum f_i = ${n}$`}</Latex></p>
          </div>
       </div>

       {/* 2. MOMEN ASAL */}
       <div className="border-b pb-4">
          <h4 className="font-bold text-red-800 mb-2"><Latex>{"2. Menghitung Momen Asal (Coding $u$)"}</Latex></h4>
          <p className="text-xs text-stone-500 mb-2 italic">
             Rumus: <Latex>{`$m'_r = \\frac{\\sum f u^r}{N}$`}</Latex>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-stone-50 p-4 rounded border border-stone-100 text-xs">
             <div className="space-y-2">
                <p><Latex>{`$m'_1 = \\frac{${tableTotals.fu}}{${n}} = ${fmt(mu1_u)}$`}</Latex></p>
                <p><Latex>{`$m'_2 = \\frac{${tableTotals.fu2}}{${n}} = ${fmt(mu2_u)}$`}</Latex></p>
             </div>
             <div className="space-y-2">
                <p><Latex>{`$m'_3 = \\frac{${tableTotals.fu3}}{${n}} = ${fmt(mu3_u)}$`}</Latex></p>
                <p><Latex>{`$m'_4 = \\frac{${tableTotals.fu4}}{${n}} = ${fmt(mu4_u)}$`}</Latex></p>
             </div>
          </div>
       </div>

       {/* 3. RATA-RATA */}
       <div className="border-b pb-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center gap-1">
             <Latex>{"3. Menghitung Rata-rata ($\\bar{x}$)"}</Latex>
          </h4>
          <div className="bg-stone-50 p-3 rounded">
             <p className="mb-2 font-semibold">Diketahui:</p>
             <ul className="list-disc list-inside mb-3 text-xs text-stone-600">
                <li><Latex>{"Rata-rata Sementara ($M$) ="}</Latex> {assumedMean}</li>
                <li><Latex>{"Panjang Kelas ($p$) ="}</Latex> {codingP}</li>
             </ul>
             <p className="mb-2"><Latex>{`$\\bar{x} = M + p(m'_1)$`}</Latex></p>
             <p className="mb-2"><Latex>{`$\\bar{x} = ${assumedMean} + ${codingP}(${fmt(mu1_u)})$`}</Latex></p>
             <p className="font-bold text-xl text-stone-800"><Latex>{`$\\bar{x} = ${fmt(mean)}$`}</Latex></p>
          </div>
       </div>

       {/* 4. MOMEN SENTRAL */}
       <div className="border-b pb-4">
          <h4 className="font-bold text-red-800 mb-2"><Latex>{"4. Menghitung Momen Sentral ($m_r$)"}</Latex></h4>
          <p className="text-xs text-stone-500 mb-3 italic">Konversi dari Momen Coding ke Data Asli menggunakan rumus Sheppard.</p>
          
          <div className="space-y-4 text-xs">
             {/* m2 */}
             <div className="bg-white border p-3 rounded shadow-sm">
                <p className="font-bold text-stone-900 mb-1"><Latex>{"Momen ke-2 ($m_2$):"}</Latex></p>
                <p className="mb-1"><Latex>{`$m_2 = p^2 [m'_2 - (m'_1)^2]$`}</Latex></p>
                <p className="mb-1"><Latex>{`$m_2 = (${codingP})^2 [${fmt(mu2_u)} - (${fmt(mu1_u)})^2]$`}</Latex></p>
                <p className="font-bold text-red-800"><Latex>{`$m_2 = ${fmt(m2_x)}$`}</Latex></p>
             </div>

             {/* m3 */}
             <div className="bg-white border p-3 rounded shadow-sm">
                <p className="font-bold text-stone-900 mb-1"><Latex>{"Momen ke-3 ($m_3$):"}</Latex></p>
                <p className="mb-1"><Latex>{`$m_3 = p^3 [m'_3 - 3 m'_1 m'_2 + 2(m'_1)^3]$`}</Latex></p>
                <p className="mb-1"><Latex>{`$m_3 = ${codingP}^3 [${fmt(mu3_u)} - 3(${fmt(mu1_u)})(${fmt(mu2_u)}) + 2(${fmt(mu1_u)})^3]$`}</Latex></p>
                <p className="font-bold text-red-800"><Latex>{`$m_3 = ${fmt(m3_x)}$`}</Latex></p>
             </div>

             {/* m4 */}
             <div className="bg-white border p-3 rounded shadow-sm">
                <p className="font-bold text-stone-900 mb-1"><Latex>{"Momen ke-4 ($m_4$):"}</Latex></p>
                <p className="mb-1"><Latex>{`$m_4 = p^4 [m'_4 - 4 m'_1 m'_3 + 6(m'_1)^2 m'_2 - 3(m'_1)^4]$`}</Latex></p>
                <p className="font-bold text-red-800"><Latex>{`$m_4 = ${fmt(m4_x)}$`}</Latex></p>
             </div>
          </div>
       </div>

       {/* 5. VARIANS & SIMPANGAN BAKU */}
       <div className="border-b pb-4">
          <h4 className="font-bold text-red-800 mb-2">5. Varians dan Simpangan Baku</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-stone-50 border p-3 rounded">
                <p className="mb-1 text-xs text-stone-500 font-bold uppercase">Varians</p>
                <p className="text-sm"><Latex>{`$s^2 = m_2 = ${fmt(variance)}$`}</Latex></p>
             </div>
             <div className="bg-stone-50 border p-3 rounded">
                <p className="mb-1 text-xs text-stone-500 font-bold uppercase">Simpangan Baku</p>
                <p className="text-sm mb-1"><Latex>{`$s = \\sqrt{m_2} = \\sqrt{${fmt(variance)}}$`}</Latex></p>
                <p className="font-bold text-lg text-red-800"><Latex>{`$s = ${fmt(stdDev)}$`}</Latex></p>
             </div>
          </div>
       </div>

       {/* 6 & 7. KOEFISIEN SKEWNESS & KURTOSIS */}
       <div className="border-b pb-4">
          <h4 className="font-bold text-red-800 mb-2">6 & 7. Koefisien Skewness & Kurtosis (Momen)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* Skewness */}
             <div className="bg-amber-50 p-3 rounded border border-amber-100">
                <p className="font-bold text-amber-900 text-xs mb-1"><Latex>{"Skewness ($\\gamma_1$)"}</Latex></p>
                <p className="mb-1 text-xs"><Latex>{`$\\gamma_1 = \\frac{m_3}{s^3} = \\frac{${fmt(m3_x)}}{(${fmt(stdDev)})^3}$`}</Latex></p>
                <p className="font-bold text-lg text-amber-700 mt-2"><Latex>{`$\\gamma_1 = ${fmt(gamma1)}$`}</Latex></p>
             </div>
             {/* Kurtosis */}
             <div className="bg-stone-100 p-3 rounded border border-stone-200">
                <p className="font-bold text-stone-900 text-xs mb-1"><Latex>{"Kurtosis ($\\gamma_2$)"}</Latex></p>
                <p className="mb-1 text-xs"><Latex>{`$\\gamma_2 = \\frac{m_4}{s^4} = \\frac{${fmt(m4_x)}}{(${fmt(stdDev)})^4}$`}</Latex></p>
                <p className="font-bold text-lg text-stone-900 mt-2"><Latex>{`$\\gamma_2 = ${fmt(gamma2)}$`}</Latex></p>
             </div>
          </div>
       </div>

       {/* 8. UKURAN POSISI */}
       <div className="border-b pb-4">
          <h4 className="font-bold text-red-800 mb-2">8. Ukuran Posisi (Interpolasi)</h4>
          
          {/* Median */}
          <div className="bg-white border p-3 rounded mb-3 shadow-sm">
             <p className="font-bold text-stone-900 mb-1 border-b pb-1"><Latex>{"Median ($Me$)"}</Latex></p>
             <p className="text-xs mb-1"><Latex>{`Letak = $1/2 N = ${n/2}$`}</Latex></p>
             <p className="text-xs mb-1"><Latex>{`$Me = Tb + p \\left( \\frac{1/2 N - F_k}{f} \\right)$`}</Latex></p>
             <p className="text-xs mb-1"><Latex>{`$Me = ${medL} + ${codingP} \\left( \\frac{${n/2} - ${medFk}}{${medF}} \\right)$`}</Latex></p>
             <p className="font-bold text-red-800 mt-1"><Latex>{`$Me = ${fmt(median)}$`}</Latex></p>
          </div>

          {/* Modus */}
          <div className="bg-white border p-3 rounded mb-3 shadow-sm">
             <p className="font-bold text-stone-900 mb-1 border-b pb-1"><Latex>{"Modus ($Mo$)"}</Latex></p>
             <p className="text-xs mb-1"><Latex>{`$Mo = Tb + p \\left( \\frac{d_1}{d_1 + d_2} \\right)$`}</Latex></p>
             <p className="text-xs mb-1"><Latex>{`$Mo = ${modeL} + ${codingP} \\left( \\frac{${modeD1}}{${modeD1} + ${modeD2}} \\right)$`}</Latex></p>
             <p className="font-bold text-red-800 mt-1"><Latex>{`$Mo = ${fmt(Array.isArray(mode) ? (mode[0] ?? 0) : mode)}$`}</Latex></p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
             <div className="bg-stone-50 p-2 rounded">
                <p className="font-bold"><Latex>{"Kuartil 1 ($Q_1$)"}</Latex></p>
                <p><Latex>{`$Q_1 = ${q1L} + ${codingP}(\\frac{${n/4} - ${q1Fk}}{${q1F}})$`}</Latex></p>
                <p className="font-bold mt-1">= {fmt(q1)}</p>
             </div>
             <div className="bg-stone-50 p-2 rounded">
                <p className="font-bold"><Latex>{"Kuartil 3 ($Q_3$)"}</Latex></p>
                <p><Latex>{`$Q_3 = ${q3L} + ${codingP}(\\frac{${3*n/4} - ${q3Fk}}{${q3F}})$`}</Latex></p>
                <p className="font-bold mt-1">= {fmt(q3)}</p>
             </div>
          </div>
       </div>

       {/* 9. UKURAN KEMIRINGAN LAIN */}
       <div className="border-b pb-4">
          <h4 className="font-bold text-red-800 mb-2">9. Ukuran Kemiringan Lainnya</h4>
          <div className="grid grid-cols-1 gap-3 text-xs">
             <div className="border p-2 rounded bg-white">
                 <p className="font-bold text-stone-700"><Latex>{"Pearson I ($Sk_1$)"}</Latex></p>
                 <p className="mb-1"><Latex>{`$Sk_1 = \\frac{\\bar{x} - Mo}{s} = \\frac{${fmt(mean)} - ${fmt(Array.isArray(mode) ? (mode[0] ?? 0) : mode)}}{${fmt(stdDev)}}$`}</Latex></p>
                 <p className="font-semibold text-red-800">= {fmt(sk1)}</p>
             </div>
             <div className="border p-2 rounded bg-white">
                 <p className="font-bold text-stone-700"><Latex>{"Pearson II ($Sk_2$)"}</Latex></p>
                 <p className="mb-1"><Latex>{`$Sk_2 = \\frac{3(\\bar{x} - Me)}{s} = \\frac{3(${fmt(mean)} - ${fmt(median)})}{${fmt(stdDev)}}$`}</Latex></p>
                 <p className="font-semibold text-red-800">= {fmt(sk2)}</p>
             </div>
          </div>
       </div>

       {/* 10. CHART */}
       <div>
          <h4 className="font-bold text-red-800 mb-2">10. Visualisasi Grafik</h4>
          <p className="text-sm text-stone-500">
             Grafik Histogram (Batang) dan Kurva Normal telah dibuat berdasarkan data distribusi frekuensi di atas untuk melihat pola penyebaran data secara visual.
          </p>
       </div>

    </div>
  );
};

export default AnalysisReport;