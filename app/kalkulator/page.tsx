"use client";

import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Link from 'next/link';
import { Info, Printer } from 'lucide-react';

import StatsChart from '../components/StatsChart';
import StatsTable from '../components/StatsTable';
import AnalysisReport from '../components/AnalysisReport';
import Interpretation from '../components/Interpretation';

// ==========================================
// 1. TIPE DATA & INTERFACE
// ==========================================
export interface DetailedRow { interval: string; mid: number; f: number; freq: number; u: number; u2: number; u3: number; u4: number; fu: number; fu2: number; fu3: number; fu4: number; fx: number; diff: number; diffSq: number; fDiffSq: number; absDev: number; fAbsDev: number; fk: number; }
export interface HistogramResult { bins: { label: string; count: number; }[]; min: number; max: number; binWidth: number; }
interface SumsAccumulator { fu: number; fu2: number; fu3: number; fu4: number; }
export interface TableTotals extends SumsAccumulator { freq: number; f: number; fAbsDev: number; fx: number; fDiffSq: number; }
export interface StatsResult { mean: number; median: number; mode: number | number[]; stdDev: number; variance: number; meanDeviation: number; coeffVariation: number; sk1: number; sk2: number; gamma1: number; gamma2: number; sk4: number; sk5: number; skewness: number; kurtosis: number; q1: number; q3: number; p10: number; p90: number; min: number; max: number; range: number; histogram: HistogramResult; rawDataArray: number[]; detailedTable: DetailedRow[]; tableTotals: TableTotals; codingP: number; assumedMean: number; mu1_u: number; mu2_u: number; mu3_u: number; mu4_u: number; m2_x: number; m3_x: number; m4_x: number; medL: number; medFk: number; medF: number; q1L: number; q1Fk: number; q1F: number; q3L: number; q3Fk: number; q3F: number; modeL: number; modeD1: number; modeD2: number; isSingleMode: boolean; }
interface DataRow { id: number; x: string; f: string; }
type InputMode = 'single' | 'interval';
type ResultTab = 'ringkasan' | 'tabel' | 'langkah';

// ==========================================
// 2. LOGIKA KALKULATOR
// ==========================================
const calculateGroupedStats = (rows: DataRow[]): StatsResult => {
  const data = rows.map(r => {
    const f = parseInt(r.f) || 0; 
    const cleanX = r.x.replace(/\s/g, '');
    let lower = 0, upper = 0, mid = 0;
    if (cleanX.includes('-')) { const parts = cleanX.split('-'); lower = parseFloat(parts[0]); upper = parseFloat(parts[1]); mid = (lower + upper) / 2; } 
    else { lower = parseFloat(cleanX); upper = parseFloat(cleanX); mid = lower; }
    return { lower, upper, mid, f, intervalString: cleanX };
  }).filter(d => !isNaN(d.mid) && d.f > 0);
  const n = data.reduce((acc, cur) => acc + cur.f, 0);
  const p = data.length > 0 ? (data[0].upper - data[0].lower + 1) : 1; 
  let maxFreq = -1; let modeIdx = -1; data.forEach((d, i) => { if (d.f > maxFreq) { maxFreq = d.f; modeIdx = i; } });
  const assumedMean = data[modeIdx]?.mid || 0; 
  let currentFk = 0;
  const tempTablePre = data.map((d, i) => {
    const u = i - modeIdx; currentFk += d.f; const u2 = u*u; const u3 = u*u*u; const u4 = u*u*u*u;
    return { interval: d.intervalString, mid: d.mid, freq: d.f, f: d.f, u, u2, u3, u4, fu: d.f * u, fu2: d.f * u2, fu3: d.f * u3, fu4: d.f * u4, fk: currentFk };
  });
  const sums = tempTablePre.reduce((acc, cur) => ({ fu: acc.fu + cur.fu, fu2: acc.fu2 + cur.fu2, fu3: acc.fu3 + cur.fu3, fu4: acc.fu4 + cur.fu4 }), { fu: 0, fu2: 0, fu3: 0, fu4: 0 });
  const mu1_u = sums.fu / n; const mu2_u = sums.fu2 / n; const mu3_u = sums.fu3 / n; const mu4_u = sums.fu4 / n;
  const mean = assumedMean + (p * mu1_u);
  const m2_x = Math.pow(p, 2) * (mu2_u - Math.pow(mu1_u, 2)); const m3_x = Math.pow(p, 3) * (mu3_u - 3 * mu1_u * mu2_u + 2 * Math.pow(mu1_u, 3)); const m4_x = Math.pow(p, 4) * (mu4_u - 4 * mu1_u * mu3_u + 6 * Math.pow(mu1_u, 2) * mu2_u - 3 * Math.pow(mu1_u, 4));
  const variance = m2_x; const stdDev = Math.sqrt(variance); const gamma1 = m3_x / Math.pow(stdDev, 3); const gamma2 = m4_x / Math.pow(stdDev, 4); 
  const getInterpolation = (target: number) => { let idx = 0; for(let i=0; i<tempTablePre.length; i++) { if (tempTablePre[i].fk >= target) { idx = i; break; } } const row = data[idx]; const L = row ? row.lower - 0.5 : 0; const Fk = idx > 0 ? tempTablePre[idx - 1].fk : 0; const f = tempTablePre[idx]?.f || 1; const res = L + p * ((target - Fk) / f); return { res, L, Fk, f }; };
  const medData = getInterpolation(n / 2); const q1Data = getInterpolation(n / 4); const q3Data = getInterpolation(3 * n / 4); const p10 = getInterpolation(10 * n / 100).res; const p90 = getInterpolation(90 * n / 100).res;
  const d1 = data[modeIdx].f - (modeIdx > 0 ? data[modeIdx - 1].f : 0); const d2 = data[modeIdx].f - (modeIdx < data.length - 1 ? data[modeIdx + 1].f : 0);
  const modeL = data[modeIdx].lower - 0.5; const mode = modeL + p * (d1 / (d1 + d2));
  const sk1 = (mean - mode) / stdDev; const sk2 = (3 * (mean - medData.res)) / stdDev; const sk4 = (q3Data.res + q1Data.res - 2 * medData.res) / (q3Data.res - q1Data.res); const sk5 = (p90 + p10 - 2 * medData.res) / (p90 - p10); 
  const detailedTable: DetailedRow[] = tempTablePre.map(row => { const absDev = Math.abs(row.mid - mean); const fAbsDev = row.f * absDev; const fx = row.f * row.mid; const diff = row.mid - mean; const diffSq = Math.pow(diff, 2); const fDiffSq = row.f * diffSq; return { ...row, absDev, fAbsDev, fx, diff, diffSq, fDiffSq }; });
  const totals = detailedTable.reduce((acc, cur) => ({ fAbsDev: acc.fAbsDev + cur.fAbsDev, fx: acc.fx + cur.fx, fDiffSq: acc.fDiffSq + cur.fDiffSq }), { fAbsDev: 0, fx: 0, fDiffSq: 0 });
  const meanDeviation = totals.fAbsDev / n; const coeffVariation = (stdDev / mean) * 100;
  const rawDataArray: number[] = []; data.forEach(d => { for(let i=0; i<d.f; i++) rawDataArray.push(d.mid); }); const min = Math.min(...rawDataArray); const max = Math.max(...rawDataArray); const bins = data.map(d => ({ label: d.mid.toString(), count: d.f })); const finalTotals: TableTotals = { freq: n, f: n, ...sums, ...totals };
  return { mean, median: medData.res, mode, stdDev, variance, meanDeviation, coeffVariation, sk1, sk2, gamma1, gamma2, sk4, sk5, skewness: gamma1, kurtosis: gamma2, q1: q1Data.res, q3: q3Data.res, p10, p90, min, max, range: max - min, histogram: { bins, min: data[0]?.lower || 0, max: data[data.length-1]?.upper || 0, binWidth: p }, rawDataArray, detailedTable, tableTotals: finalTotals, codingP: p, assumedMean, mu1_u, mu2_u, mu3_u, mu4_u, m2_x, m3_x, m4_x, medL: medData.L, medFk: medData.Fk, medF: medData.f, q1L: q1Data.L, q1Fk: q1Data.Fk, q1F: q1Data.f, q3L: q3Data.L, q3Fk: q3Data.Fk, q3F: q3Data.f, modeL, modeD1: d1, modeD2: d2, isSingleMode: false };
};

const calculateSingleStats = (rows: DataRow[]): StatsResult => {
  const data = rows.map(r => { const f = parseInt(r.f) || 0; const val = parseFloat(r.x.replace(/,/g, '.').replace(/[^0-9.]/g, '')); return { lower: val, upper: val, mid: val, f, intervalString: val.toString() }; }).filter(d => !isNaN(d.mid) && d.f > 0);
  const n = data.reduce((acc, cur) => acc + cur.f, 0); const p = 1; let maxFreq = -1; let modeIdx = -1; data.forEach((d, i) => { if (d.f > maxFreq) { maxFreq = d.f; modeIdx = i; } });
  const assumedMean = data[modeIdx]?.mid || 0; let currentFk = 0;
  const tempTablePre = data.map((d, i) => { const u = i - modeIdx; currentFk += d.f; const u2 = u*u; const u3 = u*u*u; const u4 = u*u*u*u; return { interval: d.intervalString, mid: d.mid, freq: d.f, f: d.f, u, u2, u3, u4, fu: d.f * u, fu2: d.f * u2, fu3: d.f * u3, fu4: d.f * u4, fk: currentFk }; });
  const sums = tempTablePre.reduce((acc, cur) => ({ fu: acc.fu + cur.fu, fu2: acc.fu2 + cur.fu2, fu3: acc.fu3 + cur.fu3, fu4: acc.fu4 + cur.fu4 }), { fu: 0, fu2: 0, fu3: 0, fu4: 0 });
  const mu1_u = sums.fu / n; const mu2_u = sums.fu2 / n; const mu3_u = sums.fu3 / n; const mu4_u = sums.fu4 / n;
  const mean = assumedMean + (p * mu1_u); const m2_x = (mu2_u - Math.pow(mu1_u, 2)); const m3_x = (mu3_u - 3 * mu1_u * mu2_u + 2 * Math.pow(mu1_u, 3)); const m4_x = (mu4_u - 4 * mu1_u * mu3_u + 6 * Math.pow(mu1_u, 2) * mu2_u - 3 * Math.pow(mu1_u, 4));
  const variance = m2_x; const stdDev = Math.sqrt(variance); const gamma1 = m3_x / Math.pow(stdDev, 3); const gamma2 = m4_x / Math.pow(stdDev, 4); 
  const getValueAtPos = (pos: number) => { for(const r of tempTablePre) { if(r.fk >= pos) return r.mid; } return 0; };
  let median = 0; if (n % 2 === 1) median = getValueAtPos((n + 1) / 2); else median = (getValueAtPos(n/2) + getValueAtPos((n/2)+1)) / 2;
  const q1 = getValueAtPos(Math.ceil(n * 0.25)); const q3 = getValueAtPos(Math.ceil(n * 0.75)); const p10 = getValueAtPos(Math.ceil(n * 0.10)); const p90 = getValueAtPos(Math.ceil(n * 0.90));
  const mode = data[modeIdx]?.mid || 0; const sk1 = (mean - mode) / stdDev; const sk2 = (3 * (mean - median)) / stdDev; const sk4 = (q3 + q1 - 2 * median) / (q3 - q1); const sk5 = (p90 + p10 - 2 * median) / (p90 - p10); 
  const detailedTable = tempTablePre.map(row => { const absDev = Math.abs(row.mid - mean); const fAbsDev = row.f * absDev; const fx = row.f * row.mid; const diff = row.mid - mean; const diffSq = Math.pow(diff, 2); const fDiffSq = row.f * diffSq; return { ...row, absDev, fAbsDev, fx, diff, diffSq, fDiffSq }; });
  const totals = detailedTable.reduce((acc, cur) => ({ fAbsDev: acc.fAbsDev + cur.fAbsDev, fx: acc.fx + cur.fx, fDiffSq: acc.fDiffSq + cur.fDiffSq }), { fAbsDev: 0, fx: 0, fDiffSq: 0 });
  const meanDeviation = totals.fAbsDev / n; const coeffVariation = (stdDev / mean) * 100;
  const rawDataArray: number[] = []; data.forEach(d => { for(let i=0; i<d.f; i++) rawDataArray.push(d.mid); }); const min = Math.min(...rawDataArray); const max = Math.max(...rawDataArray); const bins = data.map(d => ({ label: d.mid.toString(), count: d.f })); const finalTotals: TableTotals = { freq: n, f: n, ...sums, ...totals };
  return { mean, median, mode, stdDev, variance, meanDeviation, coeffVariation, sk1, sk2, gamma1, gamma2, sk4, sk5, skewness: gamma1, kurtosis: gamma2, q1, q3, p10, p90, min, max, range: max - min, histogram: { bins, min: data[0]?.lower || 0, max: data[data.length-1]?.upper || 0, binWidth: 1 }, rawDataArray, detailedTable, tableTotals: finalTotals, codingP: 1, assumedMean, mu1_u, mu2_u, mu3_u, mu4_u, m2_x, m3_x, m4_x, medL: 0, medFk: 0, medF: 0, q1L: 0, q1Fk: 0, q1F: 0, q3L: 0, q3Fk: 0, q3F: 0, modeL: 0, modeD1: 0, modeD2: 0, isSingleMode: true };
};

// ==========================================
// 3. UI LAYOUT KALKULATOR
// ==========================================
const SummaryCard = ({ title, value, sub }: { title: string; value: string; sub?: string }) => (
  <div className="rounded border border-stone-200 bg-white p-5 print:break-inside-avoid">
    <p className="text-xs font-semibold uppercase tracking-wide text-stone-600">{title}</p>
    <p className="mt-2 font-serif text-3xl text-stone-900">{value}</p>
    {sub && <p className="mt-2 text-xs font-medium text-stone-600">{sub}</p>}
  </div>
);

export default function KalkulatorPage() {
  const [inputMode, setInputMode] = useState<InputMode>('interval');
  const [activeTab, setActiveTab] = useState<ResultTab>('ringkasan');
  const [rows, setRows] = useState<DataRow[]>([
    { id: 1, x: '31-40', f: '4' }, { id: 2, x: '41-50', f: '3' }, { id: 3, x: '51-60', f: '5' },
    { id: 4, x: '61-70', f: '8' }, { id: 5, x: '71-80', f: '11' }, { id: 6, x: '81-90', f: '7' }, { id: 7, x: '91-100', f: '2' },
  ]);
  const [results, setResults] = useState<StatsResult | null>(null);
  const [error, setError] = useState<string>('');
  const printRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePrint = useReactToPrint({ contentRef: printRef, documentTitle: `Laporan_Statistik_Pro` });

  const changeMode = (mode: InputMode) => {
    setInputMode(mode);
    setRows(mode === 'interval'
      ? [{ id: 1, x: '31-40', f: '4' }, { id: 2, x: '41-50', f: '3' }, { id: 3, x: '51-60', f: '5' }, { id: 4, x: '61-70', f: '8' }, { id: 5, x: '71-80', f: '11' }, { id: 6, x: '81-90', f: '7' }, { id: 7, x: '91-100', f: '2' }]
      : [{ id: 1, x: '60', f: '2' }, { id: 2, x: '65', f: '5' }, { id: 3, x: '70', f: '10' }, { id: 4, x: '75', f: '8' }, { id: 5, x: '80', f: '4' }]);
    setResults(null);
    setError('');
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if(e) e.preventDefault(); setError(''); setResults(null);
    try { 
        if (inputMode === 'single') setResults(calculateSingleStats(rows)); 
        else setResults(calculateGroupedStats(rows));
        
        setActiveTab('ringkasan');
    } catch (err) { console.error(err); setError('Pastikan input angka valid dan tidak kosong.'); }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string; if (!text) return;
      const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
      const newRows: DataRow[] = [];
      const startIndex = isNaN(parseFloat(lines[0].split(/[;,]/)[0])) ? 1 : 0;
      for (let i = startIndex; i < lines.length; i++) {
        const cols = lines[i].split(/[;,]/);
        if (cols.length >= 2) newRows.push({ id: Date.now() + i, x: cols[0].trim(), f: cols[1].trim() });
      }
      if (newRows.length > 0) { setRows(newRows); setInputMode(newRows[0].x.includes('-') ? 'interval' : 'single'); } 
      else setError("Format CSV salah. Gunakan dua kolom: nilai atau interval, lalu frekuensi.");
    };
    reader.readAsText(file); e.target.value = '';
  };

  const handleDownloadTemplate = () => {
    const header = inputMode === 'interval' ? "Interval,Frekuensi\n31-40,5\n41-50,8" : "Nilai,Frekuensi\n60,3\n70,5";
    const blob = new Blob([header], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `template_${inputMode}.csv`;
    a.click(); window.URL.revokeObjectURL(url);
  };

  const addRow = () => setRows([...rows, { id: Date.now(), x: '', f: '1' }]);
  const removeRow = (id: number) => { if (rows.length > 1) setRows(rows.filter(r => r.id !== id)); };
  const updateRow = (id: number, field: 'x' | 'f', value: string) => setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));

  const tabs: { key: ResultTab; label: string }[] = [
    { key: 'ringkasan', label: 'Ringkasan dan kurva' },
    { key: 'tabel', label: 'Tabel analisis' },
    { key: 'langkah', label: 'Langkah penyelesaian' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F3] pb-20 text-stone-800">
      <style jsx global>{`
        @media print {
          @page { size: auto; margin: 15mm; }
          body { background-color: white !important; color: black !important; }
          .print\\:break-inside-avoid { break-inside: avoid !important; }
          .print\\:hidden { display: none !important; }
          .print\\:w-full { width: 100% !important; max-width: none !important; }
          .print\\:block { display: block !important; }
          .print\\:grid { display: grid !important; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #a8a29e; border-radius: 4px; }
      `}</style>

      <header className="sticky top-0 z-40 border-b border-stone-200 bg-[#FAF8F3] print:hidden">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="rounded border border-stone-300 bg-white px-3 py-2 text-sm font-semibold text-stone-800 transition-colors hover:border-stone-900 hover:text-stone-900"
          >
            Kembali ke beranda
          </Link>
          <h1 className="font-serif text-xl text-stone-900">
            Kalkulator <span className="text-red-800">StatistikPro</span>
          </h1>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-4 pt-8 sm:px-6 lg:grid-cols-12">
        <div className="flex justify-center lg:col-span-12 print:hidden">
          <div role="group" aria-label="Jenis data" className="inline-flex rounded border border-stone-300 bg-white p-1">
            <button
              type="button"
              aria-pressed={inputMode === 'single'}
              onClick={() => changeMode('single')}
              className={`rounded px-5 py-2 text-sm font-semibold transition-colors ${inputMode === 'single' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100'}`}
            >
              Data tunggal
            </button>
            <button
              type="button"
              aria-pressed={inputMode === 'interval'}
              onClick={() => changeMode('interval')}
              className={`rounded px-5 py-2 text-sm font-semibold transition-colors ${inputMode === 'interval' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100'}`}
            >
              Data kelompok
            </button>
          </div>
        </div>

        <section aria-labelledby="judul-input" className="lg:col-span-4 xl:col-span-3 print:hidden">
          <div className="rounded border border-stone-200 bg-white lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-3 border-b border-stone-200 px-5 py-4">
              <h2 id="judul-input" className="text-sm font-semibold uppercase tracking-wide text-stone-700">
                Input data
              </h2>
              <button
                type="button"
                onClick={() => setRows([{ id: Date.now(), x: '', f: '1' }])}
                className="rounded px-2 py-1 text-xs font-semibold text-red-800 hover:bg-red-50"
              >
                Reset
              </button>
            </div>

            <div className="p-5">
              <div className="mb-5 flex gap-2">
                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  className="flex-1 rounded border border-stone-300 px-3 py-2 text-xs font-semibold text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
                >
                  Unduh template CSV
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 rounded border border-stone-300 bg-stone-50 px-3 py-2 text-xs font-semibold text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
                >
                  Unggah CSV
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".csv"
                  aria-label="Unggah file CSV berisi nilai dan frekuensi"
                  className="hidden"
                />
              </div>

              <div className="mb-2 grid grid-cols-12 gap-2 border-b border-stone-200 pb-2 text-[11px] font-semibold uppercase tracking-wide text-stone-600">
                <div className="col-span-7">{inputMode === 'single' ? 'Nilai (x)' : 'Interval kelas'}</div>
                <div className="col-span-3 text-center">Frekuensi</div>
                <div className="col-span-2 text-center">Hapus</div>
              </div>

              <div className="custom-scrollbar max-h-[45vh] space-y-3 overflow-y-auto pb-2 pr-1">
                {rows.map((r, index) => (
                  <div key={r.id} className="grid grid-cols-12 items-center gap-2">
                    <div className="col-span-7">
                      <label htmlFor={`nilai-${r.id}`} className="sr-only">
                        {inputMode === 'single' ? 'Nilai data' : 'Interval kelas'} baris {index + 1}
                      </label>
                      <input
                        id={`nilai-${r.id}`}
                        value={r.x}
                        onChange={e => updateRow(r.id, 'x', e.target.value)}
                        className="w-full rounded border border-stone-300 bg-white px-3 py-2.5 text-sm font-medium text-stone-900 outline-none transition-colors focus:border-red-800"
                        placeholder={inputMode === 'single' ? 'Contoh: 75' : 'Contoh: 31-40'}
                      />
                    </div>
                    <div className="col-span-3">
                      <label htmlFor={`frekuensi-${r.id}`} className="sr-only">
                        Frekuensi baris {index + 1}
                      </label>
                      <input
                        id={`frekuensi-${r.id}`}
                        type="number"
                        value={r.f}
                        onChange={e => updateRow(r.id, 'f', e.target.value)}
                        className="w-full rounded border border-stone-300 bg-white px-2 py-2.5 text-center text-sm font-semibold text-stone-900 outline-none transition-colors focus:border-red-800"
                      />
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <button
                        type="button"
                        onClick={() => removeRow(r.id)}
                        aria-label={`Hapus baris ${index + 1}`}
                        disabled={rows.length === 1}
                        className="rounded px-1.5 py-2 text-xs font-semibold text-stone-500 hover:bg-red-50 hover:text-red-800 disabled:opacity-40"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 border-t border-stone-200 bg-stone-50 p-5">
              <button
                type="button"
                onClick={addRow}
                className="w-full rounded border border-dashed border-stone-400 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
              >
                + Tambah baris
              </button>
              {error && (
                <div role="alert" className="flex items-center gap-2 rounded border border-red-300 bg-red-50 p-3 text-xs font-semibold text-red-900">
                  <Info size={14} aria-hidden="true" /> {error}
                </div>
              )}
              <button
                type="button"
                onClick={() => handleCalculate()}
                className="w-full rounded bg-stone-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-800"
              >
                Hitung statistik
              </button>
            </div>
          </div>
        </section>

        <section aria-labelledby="judul-hasil" className="space-y-6 lg:col-span-8 xl:col-span-9 print:col-span-12 print:w-full">
          {results ? (
            <div className="space-y-6">
              <div className="rounded border border-stone-200 bg-white p-4 md:p-5 print:hidden">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h2 id="judul-hasil" className="font-serif text-2xl text-stone-900">Laporan analisis</h2>
                    <p className="mt-1 text-sm text-stone-600">
                      Data {results.isSingleMode ? 'tunggal' : 'kelompok'} sudah dihitung.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePrint()}
                    className="inline-flex items-center justify-center gap-2 rounded border border-stone-900 bg-white px-5 py-2.5 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
                  >
                    <Printer size={16} aria-hidden="true" /> Cetak atau simpan PDF
                  </button>
                </div>

                <div role="tablist" aria-label="Bagian laporan" className="custom-scrollbar mt-5 flex gap-1 overflow-x-auto border-b border-stone-200 pb-px">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      role="tab"
                      type="button"
                      aria-selected={activeTab === tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`whitespace-nowrap rounded-t px-4 py-2.5 text-sm font-semibold transition-colors ${activeTab === tab.key ? 'border-b-2 border-red-800 text-stone-900' : 'text-stone-600 hover:text-stone-900'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div ref={printRef} className="w-full space-y-8 print:bg-white print:p-8">
                <div className="mb-10 hidden border-b-2 border-stone-900 pb-4 print:block">
                  <p className="font-serif text-4xl text-stone-900">Laporan StatistikPro</p>
                  <p className="mt-1 text-sm font-medium text-stone-600">Dokumen analisis otomatis</p>
                </div>

                <div className={`space-y-8 ${activeTab === 'ringkasan' ? 'block' : 'hidden print:block'}`}>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4">
                    <SummaryCard title="Rata-rata (mean)" value={(results.mean ?? 0).toLocaleString('id-ID', { maximumFractionDigits: 2 })} />
                    <SummaryCard title="Modus" value={Array.isArray(results.mode) ? results.mode.join(', ') : (results.mode ?? 0).toLocaleString('id-ID', { maximumFractionDigits: 2 })} />
                    <SummaryCard title="Simpangan baku" value={(results.stdDev ?? 0).toLocaleString('id-ID', { maximumFractionDigits: 2 })} />
                    <SummaryCard title="Skewness (momen)" value={(results.gamma1 ?? 0).toLocaleString('id-ID', { maximumFractionDigits: 3 })} sub={`Kurtosis: ${(results.gamma2 ?? 0).toFixed(3)}`} />
                  </div>

                  <div className="overflow-hidden rounded border border-stone-200 bg-white print:overflow-visible print:break-inside-avoid">
                    <div className="border-b border-stone-200 px-6 py-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-700">Visualisasi histogram</h3>
                    </div>
                    <div className="relative h-[450px] w-full p-6">
                      <StatsChart stats={results} histogram={results.histogram} rawData={results.rawDataArray} />
                    </div>
                  </div>

                  <div className="overflow-hidden rounded border border-stone-200 bg-white print:overflow-visible print:break-inside-avoid">
                    <div className="border-b border-stone-200 px-6 py-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-700">Analisis kurva</h3>
                    </div>
                    <div className="w-full p-6">
                      <Interpretation skewness={results.gamma1} kurtosis={results.gamma2} />
                    </div>
                  </div>
                </div>

                <div className={`space-y-8 ${activeTab === 'tabel' ? 'block' : 'hidden print:block'}`}>
                  <div className="mb-4 mt-8 hidden print:block">
                    <h2 className="border-b border-stone-300 pb-2 font-serif text-2xl text-stone-900">Bagian 2: Tabel analisis detail</h2>
                  </div>

                  <div className="w-full overflow-hidden rounded border border-stone-200 bg-white print:overflow-visible print:break-inside-avoid">
                    <div className="border-b border-stone-200 px-6 py-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-700">Tabel distribusi dan simpangan</h3>
                    </div>
                    <div className="custom-scrollbar w-full overflow-x-auto p-6">
                      <StatsTable stats={results} />
                    </div>
                  </div>
                </div>

                <div className={`space-y-8 ${activeTab === 'langkah' ? 'block' : 'hidden print:block'}`}>
                  <div className="mb-4 mt-8 hidden print:block">
                    <h2 className="border-b border-stone-300 pb-2 font-serif text-2xl text-stone-900">Bagian 3: Penjabaran rumus dan langkah</h2>
                  </div>

                  <div className="w-full overflow-hidden rounded border border-stone-200 bg-white print:overflow-visible print:break-inside-avoid">
                    <div className="border-b border-stone-200 px-6 py-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-700">Detail langkah penyelesaian</h3>
                    </div>
                    <div className="custom-scrollbar w-full overflow-x-auto p-6">
                      <AnalysisReport stats={results} />
                    </div>
                  </div>
                </div>

                <div className="mt-16 hidden border-t border-stone-200 pt-6 text-center text-xs font-medium text-stone-500 print:block">
                  Dicetak dari StatistikPro, {new Date().getFullYear()}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-[70vh] flex-col items-center justify-center rounded border border-dashed border-stone-300 bg-white/60 p-8 text-center">
              <h2 id="judul-hasil" className="font-serif text-3xl text-stone-900">Ruang kerja masih kosong</h2>
              <p className="mt-3 max-w-md text-base leading-relaxed text-stone-600">
                Masukkan data pada panel kiri, lalu tekan tombol
                <span className="mx-1 rounded bg-stone-100 px-2 py-0.5 font-semibold text-stone-900">Hitung statistik</span>
                untuk melihat ringkasan, tabel, dan langkah perhitungan.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
