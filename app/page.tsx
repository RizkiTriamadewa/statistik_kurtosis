"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; 
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Building2, Menu, X, ChevronRight, Calculator, BarChart3, LineChart, PieChart,
  ShieldCheck, Target, GraduationCap, Plus, Minus, Lightbulb, BookOpen, MousePointerClick
} from "lucide-react";
import iconSrc from './icon.png';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

export default function LandingPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFaq = (index: number) => setActiveFaqIndex(activeFaqIndex === index ? null : index);
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { name: "Teori Statistika", id: "theory" },
    { name: "Fitur Utama", id: "features" },
    { name: "Mengapa Kami", id: "why-us" },
    { name: "FAQ", id: "faq" },
  ];

  const animationSettings = { initial: "hidden", whileInView: "visible", viewport: { once: false, amount: 0.3 } };

  return (
    <div className="w-full bg-white text-slate-800 font-sans selection:bg-indigo-600 selection:text-white">
      <style jsx global>{`
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #f8fafc; }
        ::-webkit-scrollbar-thumb { background-color: #4f46e5; border-radius: 20px; border: 2px solid #f8fafc; }
        ::-webkit-scrollbar-thumb:hover { background-color: #4338ca; }
      `}</style>

      {/* HEADER */}
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="fixed top-0 left-0 right-0 z-50 flex flex-col shadow-sm transition-all duration-300">
        <div className="bg-slate-900 text-white py-2 px-4 sm:px-8 text-sm">
          <div className="mx-auto max-w-7xl flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <span className="hidden sm:flex items-center gap-2 text-indigo-400 font-medium"><BookOpen size={14} /> Platform Edukasi & Kalkulasi Statistik Gratis</span>
            </div>
            <a href="https://drive.google.com/file/d/1k3ggEQlJrGYEMFdzQGqKHxEflhPuUQtd/view?usp=sharing" target="_blank" rel="noreferrer" className="hover:text-indigo-400 cursor-pointer transition-colors flex items-center gap-2 text-xs font-bold">
              <Lightbulb size={14}/> Baca Panduan
            </a>
          </div>
        </div>

        <div className={`bg-white border-b border-slate-100 transition-all ${isScrolled ? 'py-2 shadow-md' : 'py-4'}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}>
              <div className="flex items-center justify-center bg-indigo-100 text-indigo-700 w-10 h-10 rounded-xl"><BarChart3 size={24} /></div>
              <div className="flex flex-col justify-center">
                <span className="text-xl font-extrabold leading-none text-slate-900 tracking-tight">Statistik<span className="text-indigo-600">Pro</span></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Analisis Data Interaktif</span>
              </div>
            </div>
            <nav className="hidden lg:flex items-center gap-8 font-medium text-slate-600">
              {navItems.map((item) => (
                <button key={item.name} onClick={() => scrollToSection(item.id)} className="hover:text-indigo-600 hover:font-bold transition-all text-sm uppercase tracking-wide">{item.name}</button>
              ))}
              <motion.button whileHover={{ scale: 1.05 }} onClick={() => router.push("/kalkulator")} className="ml-4 px-6 py-2.5 bg-slate-900 text-white rounded-full font-bold shadow-md hover:bg-slate-800 transition-all text-sm">
                Coba Kalkulator
              </motion.button>
            </nav>
            <button className="lg:hidden text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-white border-t border-slate-100 lg:hidden shadow-xl overflow-hidden">
               <div className="flex flex-col p-6 gap-4">
                  {navItems.map((item) => <button key={item.name} onClick={() => scrollToSection(item.id)} className="text-left text-lg font-medium text-slate-700 py-2 border-b border-slate-50">{item.name}</button>)}
                  <div className="mt-4"><button onClick={() => router.push("/kalkulator")} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"><Calculator size={20} /> Buka Kalkulator</button></div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main className="pt-[110px]">
        {/* HERO SECTION */}
        <section className="relative bg-slate-50 overflow-hidden pb-16 pt-10 lg:pt-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div {...animationSettings} variants={fadeInUp} className="space-y-6 z-10">
                <div className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-extrabold uppercase tracking-widest mb-2 border border-indigo-200">Tool Statistika Modern</div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight">Analisis Data, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Lebih Cepat & Akurat.</span></h1>
                <p className="text-lg text-slate-600 max-w-lg leading-relaxed font-medium">Aplikasi web interaktif untuk menghitung tendensi sentral, ukuran penyebaran, hingga analisis bentuk kurva (Skewness & Kurtosis) dengan mudah.</p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <motion.button whileHover={{ scale: 1.05 }} onClick={() => router.push("/kalkulator")} className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold shadow-xl shadow-indigo-200 flex items-center gap-2"><MousePointerClick size={20} /> Mulai Kalkulasi</motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} onClick={() => scrollToSection('theory')} className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-200 rounded-full font-bold hover:bg-slate-50 flex items-center gap-2">Pelajari Teori</motion.button>
                </div>
              </motion.div>

              <motion.div {...animationSettings} variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }} className="relative w-full">
                <div className="absolute -inset-4 bg-indigo-600/20 rounded-[3rem] blur-2xl -z-10"></div>
                <div className="rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-[6px] border-white relative bg-slate-900 aspect-square md:aspect-[4/3] md:max-w-lg md:mx-auto lg:max-w-none group">
                   <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 flex flex-col items-center justify-start pt-12 pb-24">
                      <div className="w-3/4 h-[55%] relative mt-4">
                         <div className="absolute bottom-0 left-[10%] w-[15%] h-[40%] bg-indigo-500/50 rounded-t-md"></div>
                         <div className="absolute bottom-0 left-[30%] w-[15%] h-[70%] bg-indigo-400/80 rounded-t-md"></div>
                         <div className="absolute bottom-0 left-[50%] w-[15%] h-[100%] bg-indigo-400 rounded-t-md shadow-[0_0_30px_rgba(99,102,241,0.5)]"></div>
                         <div className="absolute bottom-0 left-[70%] w-[15%] h-[60%] bg-indigo-500/50 rounded-t-md"></div>
                         <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0,100 C20,90 35,30 57,0 C75,30 85,80 100,100" fill="none" stroke="#a78bfa" strokeWidth="2" className="drop-shadow-lg opacity-80" />
                         </svg>
                      </div>
                      <div className="mt-6 mb-12 text-center text-white z-10">
                         <p className="text-3xl font-extrabold mb-1 tracking-tight">Kurva Normal</p>
                         <p className="text-indigo-200 font-medium text-sm bg-white/10 px-4 py-1 rounded-full inline-block backdrop-blur-md">Distribusi Data Simetris</p>
                      </div>
                   </div>
                   
                   <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute bottom-6 left-6 right-6 sm:right-auto sm:bottom-8 sm:left-8 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-4 z-20">
                      <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600 shrink-0"><ShieldCheck size={24} /></div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">Metode Kalkulasi</p>
                        <p className="text-sm sm:text-base text-slate-800 font-extrabold">Coding & Interpolasi</p>
                      </div>
                   </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PARTNERS */}
        <section className="py-12 border-y border-slate-100 bg-white/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <motion.div {...animationSettings} variants={fadeInUp} className="text-center mb-10"><p className="text-xs font-extrabold text-slate-400 uppercase tracking-[0.2em]">Cocok Digunakan Untuk Berbagai Kebutuhan</p></motion.div>
            <motion.div {...animationSettings} variants={staggerContainer} className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10">
               {[{ icon: <GraduationCap size={32} />, name: "Mahasiswa" }, { icon: <LineChart size={32} />, name: "Data Analyst" }, { icon: <Building2 size={32} />, name: "Riset Akademis" }, { icon: <PieChart size={32} />, name: "Tugas Akhir" }, { icon: <Target size={32} />, name: "Penelitian" }].map((partner, idx) => (
                  <motion.div key={idx} variants={fadeInUp} className="flex flex-col items-center gap-3 group cursor-pointer opacity-60 hover:opacity-100 transition-all duration-300 w-[140px]" whileHover={{ scale: 1.1, y: -5 }}>
                     <div className="p-4 rounded-2xl bg-slate-50 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors border border-slate-100 group-hover:border-indigo-200">{partner.icon}</div>
                     <span className="text-xs font-bold text-slate-500 group-hover:text-indigo-700 transition-colors text-center leading-tight">{partner.name}</span>
                  </motion.div>
               ))}
            </motion.div>
          </div>
        </section>

        {/* TEORI STATISTIKA */}
        <section id="theory" className="py-24 px-4 sm:px-8 bg-white scroll-mt-20">
           <div className="mx-auto max-w-7xl">
              <div className="flex flex-col lg:flex-row gap-16 items-start">
                 <motion.div {...animationSettings} variants={fadeInUp} className="lg:w-5/12 sticky top-32">
                    <h4 className="text-indigo-600 font-extrabold uppercase tracking-widest mb-3 text-sm flex items-center gap-2"><BookOpen size={18}/> Dasar Teori</h4>
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">Pahami Distribusi Data Anda.</h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">Statistika deskriptif bukan sekadar menghasilkan angka rata-rata, melainkan menceritakan bagaimana suatu data berperilaku dan menyebar dari pusatnya.</p>
                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                        <p className="text-sm text-slate-500 font-medium italic">"Melihat bentuk kurva (Skewness & Kurtosis) jauh lebih penting untuk mendeteksi anomali data dibandingkan hanya melihat rata-ratanya saja."</p>
                    </div>
                 </motion.div>

                 <motion.div {...animationSettings} variants={staggerContainer} className="lg:w-7/12 grid gap-6">
                    <motion.div variants={fadeInUp} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group relative overflow-hidden">
                       <div className="absolute -right-6 -top-6 text-slate-50 opacity-50 group-hover:scale-150 group-hover:text-blue-50 transition-all duration-500"><BarChart3 size={150}/></div>
                       <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-4"><div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Calculator size={24} /></div><h3 className="font-extrabold text-2xl text-slate-900">1. Tendensi Sentral</h3></div>
                          <p className="text-slate-600 leading-relaxed font-medium">Menentukan letak pemusatan data. Meliputi <b>Mean</b> (Rata-rata), <b>Median</b> (Nilai Tengah), dan <b>Modus</b> (Nilai yang sering muncul). Jika ketiga nilai ini sama, kurva akan berbentuk simetris sempurna.</p>
                       </div>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-amber-100 transition-all group relative overflow-hidden">
                       <div className="absolute -right-6 -top-6 text-slate-50 opacity-50 group-hover:scale-150 group-hover:text-amber-50 transition-all duration-500"><LineChart size={150}/></div>
                       <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-4"><div className="p-3 bg-amber-100 text-amber-600 rounded-xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16"/><path d="M4 16c2-4 6-8 10-8s4 4 6 8"/></svg></div><h3 className="font-extrabold text-2xl text-slate-900">2. Kemiringan (Skewness)</h3></div>
                          <p className="text-slate-600 leading-relaxed font-medium">Mengukur ketidaksimetrisan kurva distribusi data. <br/><br/><span className="bg-amber-50 px-2 py-1 rounded text-amber-800 border border-amber-100">Positif (+): Ekor memanjang ke kanan</span><br className="my-2"/><span className="bg-slate-100 px-2 py-1 rounded text-slate-600 border border-slate-200 mt-2 inline-block">Nol (0): Simetris Normal</span><br/><span className="bg-blue-50 px-2 py-1 rounded text-blue-800 border border-blue-100 mt-2 inline-block">Negatif (-): Ekor memanjang ke kiri</span></p>
                       </div>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-purple-100 transition-all group relative overflow-hidden">
                       <div className="absolute -right-6 -top-6 text-slate-50 opacity-50 group-hover:scale-150 group-hover:text-purple-50 transition-all duration-500"><svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M2 20h20"/><path d="M5 20L12 4l7 16"/></svg></div>
                       <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-4"><div className="p-3 bg-purple-100 text-purple-600 rounded-xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M5 20L12 4l7 16"/></svg></div><h3 className="font-extrabold text-2xl text-slate-900">3. Keruncingan (Kurtosis)</h3></div>
                          <p className="text-slate-600 leading-relaxed font-medium">Mengukur derajat keruncingan puncak kurva dibandingkan dengan kurva normal. <br/><br/><span className="bg-purple-50 px-2 py-1 rounded text-purple-800 border border-purple-100">Leptokurtik {'>'} 3: Puncak sangat runcing</span><br className="my-2"/><span className="bg-slate-100 px-2 py-1 rounded text-slate-600 border border-slate-200 mt-2 inline-block">Mesokurtik = 3: Normal seimbang</span><br/><span className="bg-emerald-50 px-2 py-1 rounded text-emerald-800 border border-emerald-100 mt-2 inline-block">Platikurtik {'<'} 3: Puncak datar/landai</span></p>
                       </div>
                    </motion.div>
                 </motion.div>
              </div>
           </div>
        </section>

        {/* FITUR UTAMA */}
        <section id="features" className="py-24 px-4 sm:px-8 bg-slate-50 scroll-mt-20 border-t border-slate-200">
          <div className="mx-auto max-w-7xl">
            <motion.div {...animationSettings} variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
               <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Fitur Kalkulator</h2>
               <p className="text-slate-600 font-medium text-lg">Dilengkapi dengan metode perhitungan manual dan metode coding untuk mempermudah pengecekan tugas atau riset Anda.</p>
            </motion.div>
            <motion.div {...animationSettings} variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
               <motion.div variants={fadeInUp} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 border border-indigo-100"><Calculator size={32} /></div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Hitung Otomatis</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed font-medium">Cukup masukkan interval dan frekuensi. Sistem akan menghitung otomatis nilai $x_i$, frekuensi kumulatif, Mean, Median, dan Modus dalam hitungan detik.</p>
               </motion.div>
               <motion.div variants={fadeInUp} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 border border-emerald-100"><BookOpen size={32} /></div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Step-by-Step (Process)</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed font-medium">Tidak hanya menampilkan hasil akhir. Kalkulator ini menyediakan penjabaran langkah demi langkah beserta rumus LaTeX persis seperti hitungan di kertas.</p>
               </motion.div>
               <motion.div variants={fadeInUp} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-8 border border-purple-100"><BarChart3 size={32} /></div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Visualisasi Kurva</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed font-medium">Tabel distribusi otomatis diubah menjadi grafik Histogram interaktif untuk memudahkan proses interpretasi bentuk kurva secara visual.</p>
               </motion.div>
            </motion.div>
          </div>
        </section>

        {/* MENGAPA KAMI */}
        <section id="why-us" className="py-24 px-4 sm:px-8 bg-white scroll-mt-20">
           <motion.div {...animationSettings} variants={fadeInUp} className="mx-auto max-w-7xl bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-20"></div>
              <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
                 <div className="lg:w-1/2">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Bukan Sekadar <br/><span className="text-indigo-400">Kalkulator Biasa.</span></h2>
                    <p className="text-slate-300 text-lg leading-relaxed mb-10 font-medium">Dibuat khusus untuk akademisi dan mahasiswa. Kami menghilangkan kesulitan menghitung manual yang memakan waktu dan rentan human-error.</p>
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => router.push("/kalkulator")} className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold shadow-xl flex items-center gap-2">Coba Gratis Sekarang <ChevronRight size={18}/></motion.button>
                 </div>
                 <div className="lg:w-1/2 grid gap-4 w-full">
                    {[{ title: "Metode Coding Terintegrasi", desc: "Mendukung metode coding (u) untuk menyederhanakan angka besar." }, { title: "Export Laporan PDF", desc: "Hasil analisis, tabel, dan grafik dapat langsung dicetak atau di-save sebagai PDF." }, { title: "Import Data CSV", desc: "Tidak perlu input manual satu per satu, cukup upload file Excel/CSV Anda." }].map((item, idx) => (
                       <motion.div key={idx} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: idx * 0.1 }} className="flex gap-5 p-5 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                          <div className="mt-1 bg-white/10 p-2 rounded-lg h-fit"><ShieldCheck className="text-indigo-400" size={24}/></div>
                          <div><h4 className="font-bold text-xl mb-1">{item.title}</h4><p className="text-sm text-slate-400 font-medium leading-relaxed">{item.desc}</p></div>
                       </motion.div>
                    ))}
                 </div>
              </div>
           </motion.div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 px-4 sm:px-8 bg-slate-50 scroll-mt-20 border-t border-slate-200">
           <div className="mx-auto max-w-4xl">
              <motion.div {...animationSettings} variants={fadeInUp} className="text-center mb-16">
                 <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Pertanyaan Umum (FAQ)</h2>
                 <p className="text-slate-600 font-medium text-lg">Seputar penggunaan aplikasi Kalkulator StatistikPro.</p>
              </motion.div>
              <motion.div {...animationSettings} variants={staggerContainer} className="space-y-4">
                 {[{ q: "Apakah aplikasi ini gratis digunakan?", a: "Ya, 100% gratis. Anda bisa menggunakan seluruh fitur kalkulator, visualisasi, hingga export PDF tanpa batasan." }, { q: "Apa bedanya Data Tunggal dan Data Kelompok?", a: "Data tunggal adalah data mentah yang belum dikelompokkan (contoh: 70, 75, 80). Sedangkan Data Kelompok adalah data yang sudah dimasukkan ke dalam kelas interval (contoh: 31-40, 41-50)." }, { q: "Kenapa ada dua jenis tabel (Coding dan Biasa)?", a: "Untuk keperluan pembelajaran. Metode biasa mengandalkan perkalian nilai tengah langsung, sedangkan Metode Coding menyederhanakan perhitungan dengan memberikan nilai '0' pada asumsi rata-rata." }, { q: "Bagaimana format upload CSV-nya?", a: "Sangat mudah. Buat 2 kolom di Excel. Kolom A untuk Nilai/Interval, Kolom B untuk Frekuensi. Lalu save as .csv." }].map((item, idx) => (
                    <motion.div key={idx} variants={fadeInUp} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                       <button onClick={() => toggleFaq(idx)} className="w-full flex justify-between items-center p-6 text-left hover:bg-slate-50 transition-colors">
                          <span className="font-extrabold text-slate-800 text-lg pr-8">{item.q}</span>
                          <div className={`p-2 rounded-full transition-colors ${activeFaqIndex === idx ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                            {activeFaqIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                          </div>
                       </button>
                       <AnimatePresence initial={false}>
                          {activeFaqIndex === idx && (
                             <motion.div initial="collapsed" animate="open" exit="collapsed" variants={{ open: { opacity: 1, height: "auto" }, collapsed: { opacity: 0, height: 0 } }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                                <div className="px-6 pb-6 text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-5">{item.a}</div>
                             </motion.div>
                          )}
                       </AnimatePresence>
                    </motion.div>
                 ))}
              </motion.div>
           </div>
        </section>

        {/* CTA BOTTOM */}
        <section className="py-24 px-4 sm:px-8 text-center bg-white border-t border-slate-200">
           <motion.div {...animationSettings} variants={fadeInUp} className="mx-auto max-w-3xl">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Siap Menganalisis Data Anda?</h2>
              <p className="text-slate-600 text-lg mb-10 font-medium">Tinggalkan perhitungan manual yang rumit. Dapatkan laporan analisis statistik lengkap dalam hitungan detik.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <motion.button whileHover={{ scale: 1.05 }} onClick={() => router.push("/kalkulator")} className="bg-indigo-600 text-white px-8 py-4 rounded-full font-extrabold shadow-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 text-lg"><Calculator size={20} /> Buka Kalkulator Sekarang</motion.button>
              </div>
           </motion.div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-4 sm:px-8 font-medium">
        <motion.div {...animationSettings} variants={staggerContainer} className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            <motion.div variants={fadeInUp} className="md:col-span-5">
               <div className="flex items-center gap-3 mb-6 text-white">
                  <div className="flex items-center justify-center bg-indigo-500 text-white w-10 h-10 rounded-xl"><BarChart3 size={24} /></div>
                  <span className="font-extrabold text-2xl tracking-tight">Statistik<span className="text-indigo-400">Pro</span></span>
               </div>
               <p className="text-sm leading-relaxed text-slate-400 mb-6 max-w-md">Aplikasi web edukatif yang dirancang untuk mempermudah perhitungan Statistika Deskriptif, Skewness, dan Kurtosis secara interaktif dan komprehensif.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="md:col-span-3">
              <h4 className="text-white font-extrabold mb-6 text-lg uppercase tracking-wider text-sm">Fitur</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Tendensi Sentral</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Ukuran Penyebaran</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Skewness & Kurtosis</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Cetak Laporan PDF</a></li>
              </ul>
            </motion.div>
            <motion.div variants={fadeInUp} className="md:col-span-4">
              <h4 className="text-white font-extrabold mb-6 text-lg uppercase tracking-wider text-sm">Navigasi</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><button onClick={() => scrollToSection('theory')} className="hover:text-indigo-400 transition-colors text-left">Teori Dasar</button></li>
                <li><button onClick={() => scrollToSection('features')} className="hover:text-indigo-400 transition-colors text-left">Panduan Fitur</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="hover:text-indigo-400 transition-colors text-left">FAQ</button></li>
              </ul>
            </motion.div>
          </div>
          <motion.div variants={fadeInUp} className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
             <p>&copy; {new Date().getFullYear()} StatistikPro. Bebas digunakan untuk keperluan edukasi.</p>
             <div className="flex gap-6 mt-4 md:mt-0 font-bold">
                <a href="#" className="hover:text-white transition-colors">Dibuat dengan Next.js</a>
                <a href="#" className="hover:text-white transition-colors">Tailwind CSS</a>
             </div>
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
}