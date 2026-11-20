"use client";
import React from 'react';
import Latex from './Latex';

interface TableRow { intervalString?: string; interval?: string; mid: number; f: number; u: number; u2: number; fu: number; fu2: number; fu3: number; fu4: number; fx: number; diff: number; diffSq: number; fDiffSq: number; }
interface StatsTableData { detailedTable: TableRow[]; tableTotals: { freq: number; fu: number; fu2: number; fu3: number; fu4: number; fx: number; fDiffSq: number; }; }
interface StatsTableProps { stats: StatsTableData; }

const StatsTable: React.FC<StatsTableProps> = ({ stats }) => {
  if (!stats || !stats.detailedTable) return null;

  const fmt = (num: number) => new Intl.NumberFormat('id-ID', { maximumFractionDigits: 3 }).format(num || 0);
  
  const zeroRow = stats.detailedTable?.find((r) => r.u === 0);
  const zeroLabel = zeroRow ? (zeroRow.intervalString || zeroRow.interval || 'N/A') : 'N/A';

  return (
    <div className="space-y-10">
      
      {/* TABEL CODING */}
      {stats.detailedTable && stats.detailedTable.length > 0 && (
        <div className="overflow-hidden rounded border border-stone-200">
           <div className="flex flex-col justify-between gap-3 border-b border-stone-200 bg-stone-50 px-5 py-4 sm:flex-row sm:items-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-stone-800">Tabel distribusi, metode coding</span>
              <span className="w-fit rounded border border-stone-300 bg-white px-2.5 py-1 text-xs font-medium text-stone-700">Pusat asumsi (u=0): {zeroLabel}</span>
           </div>
           <div className="custom-scrollbar overflow-x-auto">
             <table className="w-full min-w-[900px] whitespace-nowrap text-right">
               <thead className="border-b border-stone-300 text-xs font-semibold uppercase tracking-wide text-stone-600">
                 <tr>
                   <th scope="col" className="p-4 text-left"><Latex>{"Interval"}</Latex></th>
                   <th scope="col" className="p-4 text-center"><Latex>{"$x_i$"}</Latex></th>
                   <th scope="col" className="p-4 text-center"><Latex>{"$f_i$"}</Latex></th>
                   <th scope="col" className="p-4 text-center"><Latex>{"$u$"}</Latex></th>
                   <th scope="col" className="p-4 text-center"><Latex>{"$u^2$"}</Latex></th>
                   <th scope="col" className="p-4 text-center"><Latex>{"$f \\cdot u$"}</Latex></th>
                   <th scope="col" className="p-4 text-center"><Latex>{"$f \\cdot u^2$"}</Latex></th>
                   <th scope="col" className="p-4 text-center"><Latex>{"$f \\cdot u^3$"}</Latex></th>
                   <th scope="col" className="p-4 text-center"><Latex>{"$f \\cdot u^4$"}</Latex></th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-stone-100 text-sm font-medium text-stone-700">
                 {stats.detailedTable.map((row, idx: number) => (
                   <tr key={idx} className={row.u === 0 ? "bg-amber-50" : "hover:bg-stone-50"}>
                     <td className="p-4 text-left font-semibold text-stone-900">{row.intervalString || row.interval}</td>
                     <td className="p-4 text-center">{fmt(row.mid)}</td>
                     <td className="p-4 text-center font-semibold text-stone-900">{row.f}</td>
                     <td className="p-4 text-center font-semibold">{row.u}</td>
                     <td className="p-4 text-center">{row.u2}</td>
                     <td className="p-4 text-center">{fmt(row.fu)}</td>
                     <td className="p-4 text-center">{fmt(row.fu2)}</td>
                     <td className="p-4 text-center text-stone-500">{fmt(row.fu3)}</td>
                     <td className="p-4 text-center text-stone-500">{fmt(row.fu4)}</td>
                   </tr>
                 ))}
               </tbody>
               <tfoot className="border-t-2 border-stone-300 bg-stone-100 text-sm font-semibold text-stone-900">
                 <tr>
                   <td className="p-4 text-left uppercase tracking-wide">Total (<Latex>{"$\\Sigma$"}</Latex>)</td>
                   <td className="p-4 text-center">-</td>
                   <td className="p-4 text-center">{stats.tableTotals.freq}</td>
                   <td className="p-4 text-center">-</td>
                   <td className="p-4 text-center">-</td>
                   <td className="p-4 text-center">{fmt(stats.tableTotals.fu)}</td>
                   <td className="p-4 text-center">{fmt(stats.tableTotals.fu2)}</td>
                   <td className="p-4 text-center">{fmt(stats.tableTotals.fu3)}</td>
                   <td className="p-4 text-center">{fmt(stats.tableTotals.fu4)}</td>
                 </tr>
               </tfoot>
             </table>
           </div>
        </div>
      )}

      {/* TABEL SIMPANGAN */}
      {stats.detailedTable && stats.detailedTable.length > 0 && (
        <div className="overflow-hidden rounded border border-stone-200">
           <div className="border-b border-stone-200 bg-stone-50 px-5 py-4">
              <span className="text-sm font-semibold uppercase tracking-wide text-stone-800">Tabel simpangan, metode biasa</span>
           </div>
           <div className="custom-scrollbar overflow-x-auto">
             <table className="w-full min-w-[800px] whitespace-nowrap text-right">
               <thead className="border-b border-stone-300 text-xs font-semibold uppercase tracking-wide text-stone-600">
                 <tr>
                   <th scope="col" className="p-4 text-left"><Latex>{"Interval"}</Latex></th>
                   <th scope="col" className="p-4 text-center"><Latex>{"$f_i$"}</Latex></th>
                   <th scope="col" className="p-4 text-center"><Latex>{"$x_i$"}</Latex></th>
                   <th scope="col" className="p-4 text-center"><Latex>{"$f_i \\cdot x_i$"}</Latex></th>
                   <th scope="col" className="p-4 text-center"><Latex>{"$x_i - \\bar{x}$"}</Latex></th>
                   <th scope="col" className="p-4 text-center"><Latex>{"$(x_i - \\bar{x})^2$"}</Latex></th>
                   <th scope="col" className="p-4 text-center"><Latex>{"$f_i(x_i - \\bar{x})^2$"}</Latex></th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-stone-100 text-sm font-medium text-stone-700">
                 {stats.detailedTable.map((row, idx: number) => (
                   <tr key={idx} className="hover:bg-stone-50">
                     <td className="p-4 text-left font-semibold text-stone-900">{row.intervalString || row.interval}</td>
                     <td className="p-4 text-center font-semibold text-stone-900">{row.f}</td>
                     <td className="p-4 text-center">{fmt(row.mid)}</td>
                     <td className="p-4 text-center font-semibold">{fmt(row.fx)}</td>
                     <td className="p-4 text-center text-stone-500">{fmt(row.diff)}</td>
                     <td className="p-4 text-center text-stone-500">{fmt(row.diffSq)}</td>
                     <td className="p-4 text-center font-semibold">{fmt(row.fDiffSq)}</td>
                   </tr>
                 ))}
               </tbody>
               <tfoot className="border-t-2 border-stone-300 bg-stone-100 text-sm font-semibold text-stone-900">
                 <tr>
                   <td className="p-4 text-left uppercase tracking-wide">Total (<Latex>{"$\\Sigma$"}</Latex>)</td>
                   <td className="p-4 text-center">{stats.tableTotals.freq}</td>
                   <td className="p-4 text-center">-</td>
                   <td className="p-4 text-center">{fmt(stats.tableTotals.fx)}</td>
                   <td className="p-4 text-center">-</td>
                   <td className="p-4 text-center">-</td>
                   <td className="p-4 text-center">{fmt(stats.tableTotals.fDiffSq)}</td>
                 </tr>
               </tfoot>
             </table>
           </div>
        </div>
      )}

      {/* PANDUAN MEMBACA TABEL */}
      <div className="rounded border border-stone-200 bg-white p-6 print:hidden">
         <h4 className="font-serif text-lg text-stone-900">Panduan membaca tabel</h4>
         <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 text-sm leading-relaxed text-stone-700 md:grid-cols-2">
            
            <div className="space-y-4">
                <div className="border-t border-stone-200 pt-3">
                   <span className="block font-semibold text-stone-900"><Latex>{"$x_i$"}</Latex> (nilai tengah)</span>
                   <p className="mt-1 text-stone-700">Diperoleh dari <Latex>{"$\\frac{\\text{Batas Bawah} + \\text{Batas Atas}}{2}$"}</Latex> tiap kelas interval. Untuk data tunggal, nilainya adalah data itu sendiri.</p>
                </div>
                <div className="border-t border-stone-200 pt-3">
                   <span className="block font-semibold text-stone-900"><Latex>{"$f_i$"}</Latex> (frekuensi)</span>
                   <p className="mt-1 text-stone-700">Banyaknya data pada kelas interval tersebut, sesuai angka yang Anda masukkan.</p>
                </div>
                <div className="border-t border-stone-200 pt-3">
                   <span className="block font-semibold text-stone-900"><Latex>{"$f_i \\cdot x_i$"}</Latex> (frekuensi kali nilai tengah)</span>
                   <p className="mt-1 text-stone-700">Nilai tengah dikalikan frekuensinya. Jumlah kolom ini dibagi total frekuensi menghasilkan <b className="text-stone-900">mean</b>.</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="border-t border-stone-200 pt-3">
                   <span className="block font-semibold text-stone-900"><Latex>{"$u$"}</Latex> (metode coding)</span>
                   <p className="mt-1 text-stone-700">Angka 0 diletakkan pada kelas dengan frekuensi tertinggi sebagai rata-rata sementara. Kelas di atasnya bernilai negatif, di bawahnya positif.</p>
                </div>
                <div className="border-t border-stone-200 pt-3">
                   <span className="block font-semibold text-stone-900"><Latex>{"$f \\cdot u^n$"}</Latex> (perkalian coding)</span>
                   <p className="mt-1 text-stone-700">Frekuensi dikali nilai coding yang dipangkatkan. Jumlahnya dipakai menghitung momen asal.</p>
                </div>
                <div className="border-t border-stone-200 pt-3">
                   <span className="block font-semibold text-stone-900"><Latex>{"$(x_i - \\bar{x})^2$"}</Latex> (simpangan kuadrat)</span>
                   <p className="mt-1 text-stone-700">Jarak tiap nilai tengah ke rata-rata, lalu dikuadratkan. Dikalikan <Latex>{"$f_i$"}</Latex> untuk menghitung varians dan simpangan baku.</p>
                </div>
            </div>

         </div>
      </div>

    </div>
  );
};

export default StatsTable;
