"use client";
import React from 'react';
import Latex from 'react-latex-next';

interface StatsTableProps { stats: any; }

const StatsTable: React.FC<StatsTableProps> = ({ stats }) => {
  if (!stats || !stats.detailedTable) return null;

  const fmt = (num: number) => new Intl.NumberFormat('id-ID', { maximumFractionDigits: 3 }).format(num || 0);
  
  const zeroRow = stats.detailedTable?.find((r: any) => r.u === 0);
  const zeroLabel = zeroRow ? (zeroRow.intervalString || zeroRow.interval || 'N/A') : 'N/A';

  return (
    <div className="space-y-12">
      
      {/* ========================================== */}
      {/* 1. TABEL CODING                            */}
      {/* ========================================== */}
      {stats.detailedTable && stats.detailedTable.length > 0 && (
        <div className="border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
           <div className="bg-indigo-50/50 px-6 py-4 border-b border-indigo-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <span className="font-black text-sm text-indigo-900 uppercase tracking-widest">Tabel Distribusi (Metode Coding)</span>
              <span className="text-xs font-bold text-indigo-700 bg-white px-3 py-1.5 rounded-xl border border-indigo-200 shadow-sm w-fit">Pusat Asumsi (u=0): {zeroLabel}</span>
           </div>
           <div className="overflow-x-auto custom-scrollbar">
             <table className="w-full text-right whitespace-nowrap min-w-[900px]">
               <thead className="bg-white font-black border-b text-sm text-slate-800">
                 <tr>
                   <th className="p-4 text-left"><Latex>{"Interval"}</Latex></th>
                   <th className="p-4 text-center"><Latex>{"$x_i$"}</Latex></th>
                   <th className="p-4 text-center text-indigo-600"><Latex>{"$f_i$"}</Latex></th>
                   <th className="p-4 text-center bg-indigo-50/50"><Latex>{"$u$"}</Latex></th>
                   <th className="p-4 text-center bg-indigo-50/50"><Latex>{"$u^2$"}</Latex></th>
                   <th className="p-4 text-center"><Latex>{"$f \\cdot u$"}</Latex></th>
                   <th className="p-4 text-center"><Latex>{"$f \\cdot u^2$"}</Latex></th>
                   <th className="p-4 text-center"><Latex>{"$f \\cdot u^3$"}</Latex></th>
                   <th className="p-4 text-center"><Latex>{"$f \\cdot u^4$"}</Latex></th>
                 </tr>
               </thead>
               <tbody className="divide-y border-b text-base text-slate-700 font-medium">
                 {stats.detailedTable.map((row: any, idx: number) => (
                   <tr key={idx} className={`transition-colors hover:bg-slate-50 ${row.u === 0 ? "bg-amber-50/60 hover:bg-amber-100/60" : ""}`}>
                     <td className="p-4 text-left font-bold">{row.intervalString || row.interval}</td>
                     <td className="p-4 text-center">{fmt(row.mid)}</td>
                     <td className="p-4 text-center font-black text-slate-900">{row.f}</td>
                     <td className="p-4 text-center font-bold text-indigo-700 bg-indigo-50/30">{row.u}</td>
                     <td className="p-4 text-center text-indigo-700 bg-indigo-50/30">{row.u2}</td>
                     <td className="p-4 text-center font-semibold">{fmt(row.fu)}</td>
                     <td className="p-4 text-center font-semibold">{fmt(row.fu2)}</td>
                     <td className="p-4 text-center text-slate-500">{fmt(row.fu3)}</td>
                     <td className="p-4 text-center text-slate-500">{fmt(row.fu4)}</td>
                   </tr>
                 ))}
               </tbody>
               <tfoot className="bg-slate-100 font-black text-base text-slate-800">
                 <tr>
                   <td className="p-5 text-left text-sm uppercase tracking-widest">TOTAL (<Latex>{"$\\Sigma$"}</Latex>)</td>
                   <td className="p-5 text-center">-</td>
                   <td className="p-5 text-center text-indigo-700 text-lg">{stats.tableTotals.freq}</td>
                   <td className="p-5 text-center">-</td>
                   <td className="p-5 text-center">-</td>
                   <td className="p-5 text-center text-indigo-700">{fmt(stats.tableTotals.fu)}</td>
                   <td className="p-5 text-center text-slate-900">{fmt(stats.tableTotals.fu2)}</td>
                   <td className="p-5 text-center text-slate-900">{fmt(stats.tableTotals.fu3)}</td>
                   <td className="p-5 text-center text-slate-900">{fmt(stats.tableTotals.fu4)}</td>
                 </tr>
               </tfoot>
             </table>
           </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 2. TABEL SIMPANGAN (MANUAL)                */}
      {/* ========================================== */}
      {stats.detailedTable && stats.detailedTable.length > 0 && (
        <div className="border border-slate-200 rounded-3xl overflow-hidden shadow-sm mt-8">
           <div className="bg-emerald-50/50 px-6 py-4 border-b border-emerald-100">
              <span className="font-black text-sm text-emerald-900 uppercase tracking-widest">Tabel Simpangan (Metode Biasa)</span>
           </div>
           <div className="overflow-x-auto custom-scrollbar">
             <table className="w-full text-right whitespace-nowrap min-w-[800px]">
               <thead className="bg-white font-black border-b text-sm text-slate-800">
                 <tr>
                   <th className="p-4 text-left"><Latex>{"Interval"}</Latex></th>
                   <th className="p-4 text-center"><Latex>{"$f_i$"}</Latex></th>
                   <th className="p-4 text-center"><Latex>{"$x_i$"}</Latex></th>
                   <th className="p-4 text-center text-emerald-700 bg-emerald-50/30"><Latex>{"$f_i \\cdot x_i$"}</Latex></th>
                   <th className="p-4 text-center text-slate-500"><Latex>{"$x_i - \\bar{x}$"}</Latex></th>
                   <th className="p-4 text-center text-slate-500"><Latex>{"$(x_i - \\bar{x})^2$"}</Latex></th>
                   <th className="p-4 text-center text-emerald-700"><Latex>{"$f_i(x_i - \\bar{x})^2$"}</Latex></th>
                 </tr>
               </thead>
               <tbody className="divide-y border-b text-base text-slate-700 font-medium">
                 {stats.detailedTable.map((row: any, idx: number) => (
                   <tr key={idx} className="hover:bg-slate-50 transition-colors">
                     <td className="p-4 text-left font-bold">{row.intervalString || row.interval}</td>
                     <td className="p-4 text-center font-black text-slate-900">{row.f}</td>
                     <td className="p-4 text-center">{fmt(row.mid)}</td>
                     <td className="p-4 text-center font-bold text-emerald-700 bg-emerald-50/30">{fmt(row.fx)}</td>
                     <td className="p-4 text-center text-slate-500">{fmt(row.diff)}</td>
                     <td className="p-4 text-center text-slate-500">{fmt(row.diffSq)}</td>
                     <td className="p-4 text-center font-bold text-emerald-700">{fmt(row.fDiffSq)}</td>
                   </tr>
                 ))}
               </tbody>
               <tfoot className="bg-emerald-50 font-black text-base text-emerald-900">
                 <tr>
                   <td className="p-5 text-left text-sm uppercase tracking-widest">TOTAL (<Latex>{"$\\Sigma$"}</Latex>)</td>
                   <td className="p-5 text-center text-lg">{stats.tableTotals.freq}</td>
                   <td className="p-5 text-center">-</td>
                   <td className="p-5 text-center text-emerald-700 text-lg">{fmt(stats.tableTotals.fx)}</td>
                   <td className="p-5 text-center">-</td>
                   <td className="p-5 text-center">-</td>
                   <td className="p-5 text-center text-emerald-700 text-lg">{fmt(stats.tableTotals.fDiffSq)}</td>
                 </tr>
               </tfoot>
             </table>
           </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 3. PANDUAN MEMBACA TABEL                 */}
      {/* ========================================== */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100/50 rounded-3xl p-8 shadow-sm print:hidden">
         <h4 className="font-black text-indigo-900 mb-6 flex items-center gap-3 text-lg">
            <span className="bg-white p-2 rounded-xl shadow-sm">💡</span> Panduan Membaca Tabel
         </h4>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm text-slate-700 leading-relaxed">
            
            <div className="space-y-4">
                <div className="bg-white/80 p-5 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow">
                   <span className="font-extrabold text-indigo-700 text-base block mb-1"><Latex>{"$x_i$"}</Latex> (Nilai Tengah):</span>
                   <p className="text-slate-600 font-medium">Diperoleh dari <Latex>{"$\\frac{\\text{Batas Bawah} + \\text{Batas Atas}}{2}$"}</Latex> tiap kelas interval. Jika data tunggal, nilainya adalah data itu sendiri.</p>
                </div>
                <div className="bg-white/80 p-5 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow">
                   <span className="font-extrabold text-indigo-700 text-base block mb-1"><Latex>{"$f_i$"}</Latex> (Frekuensi):</span>
                   <p className="text-slate-600 font-medium">Banyaknya data yang jatuh pada kelas interval tersebut. Merupakan angka inputan asli Anda.</p>
                </div>
                <div className="bg-white/80 p-5 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow">
                   <span className="font-extrabold text-emerald-700 text-base block mb-1"><Latex>{"$f_i \\cdot x_i$"}</Latex> (Frek × Nilai Tengah):</span>
                   <p className="text-slate-600 font-medium">Nilai tengah dikalikan frekuensinya. Total penjumlahan ini dibagi Total Frekuensi digunakan untuk mendapatkan nilai <b className="text-slate-800">Mean</b>.</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-white/80 p-5 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow">
                   <span className="font-extrabold text-indigo-700 text-base block mb-1"><Latex>{"$u$"}</Latex> (Metode Coding):</span>
                   <p className="text-slate-600 font-medium">Teknik penyederhanaan. Angka 0 diletakkan di frekuensi tertinggi (Asumsi Mean). Kelas di atasnya bernilai negatif, di bawahnya bernilai positif.</p>
                </div>
                <div className="bg-white/80 p-5 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow">
                   <span className="font-extrabold text-indigo-700 text-base block mb-1"><Latex>{"$f \\cdot u^n$"}</Latex> (Perkalian Coding):</span>
                   <p className="text-slate-600 font-medium">Hasil frekuensi (<Latex>{"$f_i$"}</Latex>) dikali nilai coding yang dipangkatkan. Totalnya dipakai mencari <b className="text-slate-800">Momen Asal</b>.</p>
                </div>
                <div className="bg-white/80 p-5 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow">
                   <span className="font-extrabold text-emerald-700 text-base block mb-1"><Latex>{"$(x_i - \\bar{x})^2$"}</Latex> (Simpangan Kuadrat):</span>
                   <p className="text-slate-600 font-medium">Jarak tiap nilai tengah ke Rata-rata lalu dikuadratkan. Dikalikan <Latex>{"$f_i$"}</Latex> untuk menghitung <b className="text-slate-800">Varians</b> & <b className="text-slate-800">Simpangan Baku</b>.</p>
                </div>
            </div>

         </div>
      </div>

    </div>
  );
};

export default StatsTable;