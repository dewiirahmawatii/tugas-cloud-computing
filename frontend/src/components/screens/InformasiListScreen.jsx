import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, ChevronRight, Search, Shield, ArrowRight } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';
import { api } from '../../services/api';

export default function InformasiListScreen({ onBack, onSelectArticle }) {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.getArticles().then((res) => {
      if (res && res.articles) {
        setArticles(res.articles);
      }
    });
  }, []);

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col bg-[#070d1a] text-slate-100 select-none pb-4">
      
      <HeaderBar title="Panduan & Edukasi (Inf...)" showBack={true} onBack={onBack} />

      {/* Search Input */}
      <div className="px-5 pt-3 pb-2">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari SOP keselamatan, panduan PPKS..."
            className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Featured Banner */}
      <div className="px-5 mb-2">
        <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/40 border border-blue-700/40 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black tracking-wider uppercase text-cyan-300">
              SOP RESMI KAMPUS UTDI
            </span>
            <h3 className="text-xs font-bold text-white mt-0.5">
              Prosedur Tanggap Darurat Bencana
            </h3>
            <p className="text-[10px] text-slate-300 mt-1">
              Kenali jalur evakuasi dan tindakan cepat saat krisis.
            </p>
          </div>
          <BookOpen className="w-8 h-8 text-blue-400 shrink-0 ml-2" />
        </div>
      </div>

      {/* Article Cards List */}
      <div className="px-5 py-2 space-y-3 flex-1 overflow-y-auto">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectArticle(item)}
            className="bg-[#0e1d3b] hover:bg-[#142850] border border-blue-900/50 rounded-2xl overflow-hidden transition cursor-pointer shadow-md active:scale-98"
          >
            <div className="h-28 w-full overflow-hidden relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 text-[9px] font-bold bg-[#0b162c]/90 text-cyan-300 border border-blue-500/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
                {item.category}
              </span>
            </div>

            <div className="p-3.5">
              <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {item.summary}
              </p>

              <div className="mt-3 pt-2 border-t border-blue-950 flex items-center justify-between text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-blue-400" /> {item.readTime}
                </span>
                <span className="text-blue-400 font-bold flex items-center gap-0.5">
                  Baca Selengkapnya <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
