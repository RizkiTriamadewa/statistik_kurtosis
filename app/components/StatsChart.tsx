"use client";

import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions // Pastikan ini terimport
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// --- DEFINISI TIPE DATA ---
interface HistogramBin { label: string; count: number; }
interface HistogramResult { bins: HistogramBin[]; min: number; max: number; binWidth: number; }
interface StatsResult { mean: number; stdDev: number; skewness: number; kurtosis: number; detailedTable: unknown[]; }
interface StatsChartProps { stats: StatsResult; histogram: HistogramResult; rawData: number[]; }

const StatsChart: React.FC<StatsChartProps> = ({ stats, histogram, rawData }) => {
  const [activeTab, setActiveTab] = useState<'histogram' | 'ogive'>('histogram');

  // 1. SAFETY CHECK
  if (!histogram || !histogram.bins || !stats || !rawData) {
    return <div className="p-4 text-center text-stone-600 text-sm">Memuat grafik...</div>;
  }

  const { mean, stdDev } = stats;
  const totalData = rawData.length;

  const binLabels = histogram.bins.map(bin => bin.label);
  const binCounts = histogram.bins.map(bin => bin.count);

  // --- 2. DATA KURVA NORMAL ---
  const normalCurvePoints = histogram.bins.map((bin) => {
      const x_val = parseFloat(bin.label); 
      const effectiveStd = stdDev || 1;
      const exponent = -0.5 * Math.pow((x_val - mean) / effectiveStd, 2);
      const pdf = (1 / (effectiveStd * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
      return pdf * totalData * histogram.binWidth;
  });

  // --- 3. DATA OGIVE ---
  const ogivePositive: number[] = [];
  let cumPos = 0;
  for (const count of binCounts) {
    cumPos += count;
    ogivePositive.push(cumPos);
  }

  const ogiveNegative: number[] = [];
  let cumNeg = totalData;
  for (const count of binCounts) {
    ogiveNegative.push(cumNeg);
    cumNeg -= count;
  }

  // --- 4. CONFIG CHART (FIXED TYPE) ---
  // PERBAIKAN DISINI: Gunakan ChartOptions<'bar'>['scales'] agar tidak dianggap Radial/Radar chart
  const commonScales: ChartOptions<'bar'>['scales'] = {
    y: { 
      beginAtZero: true, 
      grid: { color: '#e7e5e4' }, 
      title: { display: true, text: 'Frekuensi' } 
    },
    x: { 
      type: 'category', 
      grid: { display: false }, 
      title: { display: true, text: 'Nilai Tengah (X)' }, 
      ticks: { autoSkip: false } 
    }
  };

  // DATA TAB 1: HISTOGRAM
  const histogramData: ChartData<'bar' | 'line', number[], string> = {
    labels: binLabels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Kurva Normal',
        data: normalCurvePoints,
        borderColor: '#991b1b', 
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        order: 1,
        fill: false,
      },
      {
        type: 'bar' as const,
        label: 'Frekuensi',
        data: binCounts,
        backgroundColor: '#d6d3d1',
        borderColor: '#78716c',
        borderWidth: 1,
        order: 2,
        barPercentage: 1.0,
        categoryPercentage: 1.0
      },
    ],
  };

  // DATA TAB 2: OGIVE
  const ogiveData: ChartData<'line', number[], string> = {
    labels: binLabels,
    datasets: [
      {
        label: 'Ogive Positif (≤)',
        data: ogivePositive,
        borderColor: '#991b1b',
        backgroundColor: 'rgba(153, 27, 27, 0.08)',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#991b1b',
        tension: 0.3,
        fill: false
      },
      {
        label: 'Ogive Negatif (≥)',
        data: ogiveNegative,
        borderColor: '#57534e',
        backgroundColor: 'rgba(87, 83, 78, 0.08)',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#57534e',
        tension: 0.3,
        fill: false
      }
    ]
  };

  return (
    <div className="flex flex-col h-full">
       <div className="flex gap-1 mb-4 w-fit border-b border-stone-200" role="tablist" aria-label="Jenis grafik">
          <button 
            type="button"
            role="tab"
            aria-selected={activeTab === 'histogram'}
            onClick={() => setActiveTab('histogram')} 
            className={`px-4 py-2 text-xs font-semibold transition-colors ${activeTab === 'histogram' ? 'border-b-2 border-red-800 text-stone-900' : 'text-stone-600 hover:text-stone-900'}`}
          >
            Histogram
          </button>
          <button 
            type="button"
            role="tab"
            aria-selected={activeTab === 'ogive'}
            onClick={() => setActiveTab('ogive')} 
            className={`px-4 py-2 text-xs font-semibold transition-colors ${activeTab === 'ogive' ? 'border-b-2 border-red-800 text-stone-900' : 'text-stone-600 hover:text-stone-900'}`}
          >
            Ogive kumulatif
          </button>
       </div>

       <div className="relative w-full h-full min-h-[300px]">
          {activeTab === 'histogram' ? (
             <Bar 
                data={histogramData as ChartData<'bar', number[], string>} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false, 
                  plugins: { 
                    legend: { position: 'bottom', labels: { font: { size: 11 } } },
                    title: { display: true, text: 'Distribusi Frekuensi & Normal', color: '#57534e', font: { weight: 'normal' } } 
                  },
                  scales: commonScales 
                }} 
             />
             
          ) : (
             <Line 
                data={ogiveData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false, 
                  plugins: { 
                    legend: { position: 'bottom', labels: { font: { size: 11 } } },
                    title: { display: true, text: 'Titik Potong = Letak Median', color: '#57534e', font: { weight: 'normal' } } 
                  },
                  // Kita definisikan ulang scales secara manual agar aman dari error spread operator pada tipe union
                  scales: {
                    x: commonScales!.x,
                    y: {
                        ...commonScales!.y, // Spread properti Y dari commonScales
                        title: { display: true, text: 'Frekuensi Kumulatif' } // Override title
                    } as unknown as ChartOptions<'line'>['scales']
                  }
                }} 
             />
          )}
       </div>
    </div>
  );
};

export default StatsChart;