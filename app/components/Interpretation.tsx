"use client";
import React from 'react';

interface InterpretationProps { skewness: number; kurtosis: number; }

const Interpretation: React.FC<InterpretationProps> = ({ skewness, kurtosis }) => {
  
  // Logic Skewness (Alpha 3) - Normal ≈ 0
  let skewData = { title: "Simetris", color: "border-stone-300 bg-stone-50 text-stone-900", desc: "Kurva setimbang, mendekati normal." };
  if (skewness > 0.05) skewData = { title: "Positif (miring kanan)", color: "border-amber-300 bg-amber-50 text-amber-900", desc: "Ekor kurva memanjang ke kanan." };
  else if (skewness < -0.05) skewData = { title: "Negatif (miring kiri)", color: "border-amber-300 bg-amber-50 text-amber-900", desc: "Ekor kurva memanjang ke kiri." };

  // Logic Kurtosis (Alpha 4) - Normal ≈ 3
  let kurtData = { title: "Mesokurtik (normal)", color: "border-stone-300 bg-stone-50 text-stone-900", desc: "Keruncingan mendekati normal (α4 ≈ 3)." };
  if (kurtosis > 3.05) {
    kurtData = { title: "Leptokurtik (runcing)", color: "border-red-300 bg-red-50 text-red-900", desc: "Puncak kurva tinggi dan tajam (α4 > 3)." };
  } else if (kurtosis < 2.95) {
    kurtData = { title: "Platikurtik (datar)", color: "border-stone-300 bg-stone-100 text-stone-900", desc: "Puncak kurva datar dan lebar (α4 < 3)." };
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className={`rounded border p-4 ${skewData.color}`}>
         <h4 className="text-xs font-semibold uppercase tracking-wide opacity-80">Kemiringan (skewness)</h4>
         <div className="mt-1 font-serif text-xl">{skewData.title}</div>
         <p className="mt-1 text-sm leading-relaxed">{skewData.desc}</p>
      </div>
      <div className={`rounded border p-4 ${kurtData.color}`}>
         <h4 className="text-xs font-semibold uppercase tracking-wide opacity-80">Keruncingan (kurtosis)</h4>
         <div className="mt-1 font-serif text-xl">{kurtData.title}</div>
         <p className="mt-1 text-sm leading-relaxed">{kurtData.desc}</p>
      </div>
    </div>
  );
};

export default Interpretation;
