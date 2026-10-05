import React, { useState } from 'react';
import { GiftiLogo } from './GiftiLogo';
import { Send, ShieldCheck, Heart, MessageCircle, Truck, RefreshCw } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0B1B3D] text-white pt-16 pb-12 border-t border-[#0B1B3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand Story */}
          <div className="lg:col-span-2 space-y-4">
            <GiftiLogo variant="light" size="lg" />
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              En Gifti Club creemos que los mejores regalos no son cosas materiales, sino emociones grabadas para siempre. Diseñamos piezas personalizadas con empaques prémium que hacen latir corazones en todo México.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/525512345678?text=Hola%20Gifti%20Club,%20quisiera%20ayuda%20para%20personalizar%20un%20regalo"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-full transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Asistencia por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 3: Categorías */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Categorías
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#catalogo" className="hover:text-[#E06A55] transition-colors">Llaveros Grabados</a></li>
              <li><a href="#catalogo" className="hover:text-[#E06A55] transition-colors">Vasos Stanley & Tazas</a></li>
              <li><a href="#catalogo" className="hover:text-[#E06A55] transition-colors">Hoodies & Playeras Art</a></li>
              <li><a href="#catalogo" className="hover:text-[#E06A55] transition-colors">Cuadros Memoriales Ofrenda</a></li>
              <li><a href="#catalogo" className="hover:text-[#E06A55] transition-colors">Velas & Stickers Holográficos</a></li>
              <li><a href="#gift-builder" className="hover:text-[#E06A55] transition-colors">Arma tu Regalo en 3 Pasos</a></li>
            </ul>
          </div>

          {/* Col 4: Confianza y Garantía */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Garantía Gifti
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#E06A55]" />
                <span>Envíos DHL & FedEx</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#38FFD0]" />
                <span>Pagos seguros encriptados</span>
              </li>
              <li className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-[#E06A55]" />
                <span>Garantía de satisfacción 100%</span>
              </li>
              <li className="text-[11px] text-slate-400 pt-2">
                Horario de atención: Lun a Sáb 9:00 - 19:00 hrs (CDMX)
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Club de Descuentos
            </h4>
            <p className="text-xs text-slate-300 leading-snug">
              Suscríbete y recibe 10% de descuento en tu primer regalo y recordatorios de fechas especiales.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E06A55]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-[#E06A55] text-white rounded-lg hover:bg-[#c95844] transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#38FFD0] font-semibold">
                  ✓ ¡Listo! Te enviamos tu cupón de bienvenida.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Payment Methods Matrix */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <span className="font-semibold text-slate-400 text-[11px] mr-1">Métodos de pago en México:</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md text-[10px] font-bold">Visa</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md text-[10px] font-bold">Mastercard</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md text-[10px] font-bold">American Express</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md text-[10px] font-bold text-red-300">OXXO Pay</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md text-[10px] font-bold text-blue-300">Mercado Pago MSI</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md text-[10px] font-bold text-emerald-300">Kueski Pay</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>Diseñado con</span>
            <Heart className="w-3 h-3 text-[#E06A55] fill-current" />
            <span>para amantes de los detalles y las mascotas en México.</span>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-4 border-t border-white/5 text-center text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Gifti Club México. Todos los derechos reservados. &ldquo;Regalos que hablan&rdquo; es una marca registrada.</p>
        </div>
      </div>
    </footer>
  );
};
