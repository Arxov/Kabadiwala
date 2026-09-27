"use client";

import { useState } from "react";
import Link from "next/link";

const businessServices = [
  {
    title: "EPR (Extended Producer Responsibility)",
    description: "We help brands and manufacturers fulfill their EPR obligations under the Plastic & E-waste Management Rules. Complete end-to-end compliance, collection, and recycling with transparent reporting.",
    icon: "📜",
    category: "Compliance"
  },
  {
    title: "Zero Waste Campus",
    description: "Tailored waste management solutions for IT parks, educational institutions, and large corporate campuses to achieve zero waste to landfill goals.",
    icon: "🏢",
    category: "Operations"
  },
  {
    title: "Circular Economy Integration",
    description: "Partner with us to close the loop on your product lifecycle. We recover valuable materials and reintroduce them into your supply chain.",
    icon: "♻️",
    category: "Sustainability"
  },
  {
    title: "Secure Data Destruction",
    description: "Certified and compliant physical destruction of hard drives, SSDs, magnetic tapes, and proprietary hardware to ensure data security.",
    icon: "🛡️",
    category: "Security"
  },
  {
    title: "Paper Shredding Services",
    description: "Confidential and secure shredding of sensitive documents and archives, right at your premises or at our secure facilities.",
    icon: "📄",
    category: "Security"
  },
  {
    title: "CSR Activities",
    description: "Collaborate on impactful environmental CSR initiatives. We organize collection drives, awareness campaigns, and community recycling programs.",
    icon: "🤝",
    category: "Sustainability"
  },
];

const partners = [
  "Infosys", "TCS", "Wipro", "Amazon", "Flipkart", "Reliance", "Tata Motors"
];

export default function BusinessServices() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen pb-0 flex flex-col font-sans">
      {/* ─── NAVIGATION ─── */}
      <nav className="glass-header sticky top-0 z-50 px-6 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
              <span className="font-bold text-white text-xl">क</span>
            </div>
            <span className="text-xl font-bold text-gradient tracking-tight">thekabadiwala</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Individuals</Link>
            <Link href="/business" className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">Business</Link>
            <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Company</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/prices" className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              Check Rate List
            </Link>
            <Link href="/" className="px-5 py-2.5 rounded-full text-sm font-semibold text-[#060d1a] bg-emerald-400 hover:bg-emerald-300 transition-all shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              Partner with Us
            </Link>
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 hover:bg-white/10 transition">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition"
          >
            <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-10 py-12">
        {/* ─── HERO SECTION ─── */}
        <div className="text-center mb-20 animate-slide-up">
          <p className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-3">Enterprise Solutions</p>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Services for <span className="text-gradient">Business</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            Comprehensive waste management, EPR compliance, and circular economy solutions for modern enterprises committed to sustainability.
          </p>
          <div className="flex justify-center gap-4">
            <button className="glass-button px-8 py-3.5 rounded-xl font-bold text-white shadow-lg">
              Get a Proposal
            </button>
            <button className="glass-button-outline px-8 py-3.5 rounded-xl font-bold text-slate-300">
              View Case Studies
            </button>
          </div>
        </div>

        {/* ─── SERVICES GRID ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {businessServices.map((service, idx) => (
            <div 
              key={service.title} 
              className={`gradient-card p-8 rounded-2xl group hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-400 stagger-${Math.min(idx + 1, 6)}`}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all">
                  {service.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  {service.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* ─── BULK SCRAP RATES BANNER ─── */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl mb-24 flex flex-col md:flex-row items-center justify-between gap-8 border border-emerald-500/20 bg-gradient-to-r from-emerald-900/20 to-[#060d1a] relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-bold text-white mb-4">Scrap Rates for Businesses</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Industrial and commercial bulk scrap rates vary based on volume, material purity, and logistics. We offer highly competitive, transparent pricing linked to market indices.
            </p>
            <Link href="/prices" className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
              View standard rate list 
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
          </div>
          <div className="relative z-10">
            <button className="glass-button px-8 py-4 rounded-xl font-bold text-white shadow-xl shadow-emerald-500/20">
              Request Bulk Pricing
            </button>
          </div>
        </div>

        {/* ─── TRUSTED BY ─── */}
        <div className="text-center mb-24 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-slate-500 text-sm font-semibold tracking-wider uppercase mb-8">Trusted by leading enterprises</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {partners.map(partner => (
              <span key={partner} className="text-xl md:text-2xl font-bold text-slate-300">{partner}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/10 bg-[#060d1a] pt-16 pb-8 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
            <div>
              <h4 className="text-emerald-400 font-bold mb-6">Businesses</h4>
              <ul className="space-y-4">
                <li><Link href="/business" className="text-sm text-slate-400 hover:text-white transition-colors">EPR</Link></li>
                <li><Link href="/business" className="text-sm text-slate-400 hover:text-white transition-colors">Circular Economy</Link></li>
                <li><Link href="/business" className="text-sm text-slate-400 hover:text-white transition-colors">Paper Shredding</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-400 font-bold mb-6">Individuals</h4>
              <ul className="space-y-4">
                <li><Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">Scrap Collection</Link></li>
                <li><Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">Vehicle Scrapping</Link></li>
                <li><Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">Zero Waste Society</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-400 font-bold mb-6">Company</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Franchise</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-400 font-bold mb-6">Help</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <span className="font-bold text-white text-lg">क</span>
                </div>
                <span className="text-xl font-bold text-white">thekabadiwala</span>
              </div>
              <div className="space-y-2 mb-6">
                <p className="text-sm text-slate-400">+91-76972 60260</p>
                <p className="text-sm text-slate-400">contact@thekabadiwala.com</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                The Kabadiwala, 3rd floor, Plot No. 22, Beside SOM office, Zone-2, Bhopal, Madhya Pradesh 462011
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">© 2024 The Kabadiwala. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
