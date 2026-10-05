import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Gift, Award, Zap } from 'lucide-react';
import { GiftiIsotype } from './GiftiLogo';

interface HeroBannerProps {
  onExplore: () => void;
  onOpenGiftBuilder: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExplore, onOpenGiftBuilder }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1B3D] via-[#10224a] to-[#07132c] text-white py-12 md:py-20 lg:py-24">
      {/* Decorative gradient glowing spheres */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#E06A55]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-20 w-80 h-80 rounded-full bg-[#38FFD0]/15 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Story & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#38FFD0]">
              <Sparkles className="w-3.5 h-3.5 text-[#E06A55] animate-spin" />
              <span>Regalos Curados & Detalles que Tocan el Alma</span>
              <span className="bg-[#E06A55] text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                México
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-[1.1] font-['Inter',sans-serif]">
              Regalos que hablan,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E06A55] via-[#ff8d75] to-[#ffb3a1]">
                emociones
              </span>{' '}
              que trascienden.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Diseñamos piezas únicas grabadas con láser, termos de alta gama, hoodies artísticos y detalles personalizados para celebrar el amor infinito hacia tus mascotas y seres queridos.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenGiftBuilder}
                className="flex items-center justify-center gap-3 bg-[#E06A55] hover:bg-[#c95844] text-white font-bold px-7 py-3.5 rounded-full shadow-lg shadow-[#E06A55]/30 hover:shadow-xl hover:scale-[1.02] transition-all text-sm group"
              >
                <Gift className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Arma tu Regalo en 3 Pasos</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExplore}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3.5 rounded-full border border-white/20 backdrop-blur-sm transition-all text-sm"
              >
                <span>Explorar Catálogo</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-slate-300">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#38FFD0] shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">4.9/5 Estrellas</p>
                  <p className="text-[11px] text-slate-400">+10,000 felices</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#E06A55] shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Envío Rápido</p>
                  <p className="text-[11px] text-slate-400">Todo México</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#38FFD0] shrink-0">
                  <GiftiIsotype className="w-4 h-4" color="#38FFD0" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Caja de Lujo</p>
                  <p className="text-[11px] text-slate-400">Listón & Sello</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Mockups */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Feature Card */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-4 right-4 bg-[#E06A55] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Personalizable ✨
                </div>

                <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-900 mb-5">
                  <img
                    src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80"
                    alt="Llavero grabado madera Luna Cat"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Overlay text simulation */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-medium text-[#38FFD0] uppercase tracking-wider">
                      Grabado Láser Artesanal
                    </p>
                    <p className="text-lg font-bold">
                      Llavero Día de los Muertos &quot;Luna&quot;
                    </p>
                    <p className="text-xs text-slate-300">
                      Nombre grabado: <span className="text-[#ff9883] font-bold">LUNA</span> con flores de cempasúchil
                    </p>
                  </div>
                </div>

                {/* Micro Product Pill Row */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/10 hover:bg-white/15 transition-colors cursor-pointer">
                    <span className="text-base block mb-0.5">🐾</span>
                    <span className="font-semibold block text-slate-200 text-[11px]">Madera Fina</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/10 hover:bg-white/15 transition-colors cursor-pointer">
                    <span className="text-base block mb-0.5">🎀</span>
                    <span className="font-semibold block text-slate-200 text-[11px]">Caja Regalo</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/10 hover:bg-white/15 transition-colors cursor-pointer">
                    <span className="text-base block mb-0.5">💌</span>
                    <span className="font-semibold block text-slate-200 text-[11px]">Nota Incluida</span>
                  </div>
                </div>
              </div>

              {/* Floating floating mini-badge */}
              <div className="absolute -bottom-6 -left-6 bg-white text-[#0B1B3D] p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce">
                <div className="w-10 h-10 rounded-full bg-[#E06A55]/10 flex items-center justify-center text-[#E06A55]">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="text-xs font-bold">¡Envío Gratis!</p>
                  <p className="text-[11px] text-slate-500">En pedidos desde $1,200 MXN</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
