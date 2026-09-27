"use client";

import { useState } from "react";
import Link from "next/link";

const categories = ["All", "Paper", "Plastic", "Metal", "E-waste", "Rubber", "Other"];

const scrapItems = [
  { name: "Newspaper", price: "₹11", unit: "/kg", category: "Paper", icon: "📰" },
  { name: "Carton", price: "₹4", unit: "/kg", category: "Paper", icon: "📦" },
  { name: "Mix Plastic", price: "₹10", unit: "/kg", category: "Plastic", icon: "🥤" },
  { name: "Books", price: "₹10", unit: "/kg", category: "Paper", icon: "📚" },
  { name: "Iron", price: "₹23", unit: "/kg", category: "Metal", icon: "🏗️" },
  { name: "Tin", price: "₹18", unit: "/kg", category: "Metal", icon: "🥫" },
  { name: "Grey Board", price: "₹3", unit: "/kg", category: "Paper", icon: "📄" },
  { name: "Soft Plastic", price: "₹10", unit: "/kg", category: "Plastic", icon: "🛍️" },
  { name: "Hard Plastic", price: "₹2", unit: "/kg", category: "Plastic", icon: "🪣" },
  { name: "E-waste", price: "₹10", unit: "/kg", category: "E-waste", icon: "🔌" },
  { name: "Plastic Jar (15 Litre)", price: "₹10", unit: "/kg", category: "Plastic", icon: "🫙" },
  { name: "Aluminium", price: "₹150", unit: "/kg", category: "Metal", icon: "⚙️" },
  { name: "Steel", price: "₹40", unit: "/kg", category: "Metal", icon: "🔩" },
  { name: "Plastic Jar (5 Litre)", price: "₹8", unit: "/kg", category: "Plastic", icon: "🧴" },
  { name: "Copy", price: "₹10", unit: "/kg", category: "Paper", icon: "📓" },
  { name: "Polythene Bags (LD)", price: "₹15", unit: "/kg", category: "Plastic", icon: "🥡" },
  { name: "Magazines", price: "₹8", unit: "/kg", category: "Paper", icon: "📖" },
  { name: "Brass", price: "₹400", unit: "/kg", category: "Metal", icon: "🎷" },
  { name: "Copper", price: "₹500", unit: "/kg", category: "Metal", icon: "🔌" },
  { name: "Plastic (PP) Bags", price: "₹4", unit: "/kg", category: "Plastic", icon: "🛍️" },
];

const localities = [
  "Shivajinagar", "Deccan Gymkhana", "Kothrud", "Erandwane", "Shaniwar Peth", 
  "Sadashiv Peth", "Camp (Pune Cantonment)", "Swargate", "Koregaon Park", 
  "Kalyani Nagar", "Viman Nagar", "Kharadi", "Wadgaon Sheri", "Hadapsar", 
  "Magarpatta City", "Wagholi", "Baner", "Aundh", "Balewadi", "Wakad", 
  "Bavdhan", "Pashan", "Katraj", "Dhankawadi", "Bibwewadi", "Sahakar Nagar", 
  "Kondhwa", "NIBM Road", "Wanowrie", "Undri", "Pimpri-Chinchwad", "Akurdi", 
  "Bhosari", "Moshi", "Pimple Saudagar", "Pimple Nilakh", "Ravet"
];

export default function ScrapPrices() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Pune");

  const filteredItems = scrapItems.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Services</Link>
            <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Company</Link>
            <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Careers</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/prices" className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              Check Rate List
            </Link>
            <Link href="/" className="px-5 py-2.5 rounded-full text-sm font-semibold text-[#060d1a] bg-emerald-400 hover:bg-emerald-300 transition-all shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              Sell Scrap
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
        {/* ─── HEADER ─── */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-5xl font-extrabold text-white tracking-tight mb-8">Scrap Prices</h1>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            {/* Location Dropdown */}
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-10 py-3.5 text-white focus:outline-none focus:border-emerald-500/50 appearance-none cursor-pointer"
              >
                <option value="Pune" className="bg-[#0a1122]">Pune</option>
                <option value="Mumbai" className="bg-[#0a1122]">Mumbai</option>
                <option value="Delhi" className="bg-[#0a1122]">Delhi</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input 
                type="text" 
                placeholder="Search any materials..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>
        </div>

        {/* ─── CATEGORIES ─── */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat 
                  ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ─── ITEMS GRID ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <div 
                key={item.name} 
                className={`gradient-card rounded-2xl p-5 flex items-center gap-4 group hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 stagger-${Math.min(idx + 1, 6)}`}
                style={{ opacity: 0 }}
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold mb-0.5">{item.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-emerald-400 font-extrabold text-lg">{item.price}</span>
                    <span className="text-slate-500 text-sm font-medium">{item.unit}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-slate-500 text-lg">No materials found matching your search.</p>
            </div>
          )}
        </div>

        {/* ─── DISCLAIMER ─── */}
        <div className="text-center mb-16">
          <p className="text-slate-400 text-sm">
            Note: For Bulk scrap (Commercial) prices may vary. <Link href="/" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">Contact us to know more →</Link>
          </p>
        </div>

        {/* ─── LOCALITIES ─── */}
        <div className="mb-20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-lg font-bold text-white mb-6">Check scrap rates of specific locality in {location}</h3>
          <div className="flex flex-wrap gap-3">
            {localities.map((loc) => (
              <Link 
                href="#" 
                key={loc}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-sm font-medium text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                {loc}
              </Link>
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
                <li><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">EPR</Link></li>
                <li><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Circular Economy</Link></li>
                <li><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Paper Shredding</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-400 font-bold mb-6">Individuals</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Scrap Collection</Link></li>
                <li><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Vehicle Scrapping</Link></li>
                <li><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Zero Waste Society</Link></li>
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
              <div className="flex gap-4">
                {/* Social Icons Placeholders */}
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
              </div>
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
