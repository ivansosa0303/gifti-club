import React from 'react';
import { Star, CheckCircle, Heart, Instagram } from 'lucide-react';

export const SocialProof: React.FC = () => {
  const reviews = [
    {
      name: 'Valeria R.',
      city: 'Ciudad de México',
      pet: 'Husky "Koda"',
      rating: 5,
      date: 'Ayer',
      text: 'Pedí el llavero de madera con el grabado de mi perrito Koda y superó por completo mis expectativas. El detalle de las flores de cempasúchil y el empaque azul con el listón coral es de altísima calidad. Llegó en 24 horas.',
      product: 'Llavero Día de los Muertos Luna'
    },
    {
      name: 'Carlos M.',
      city: 'Guadalajara, JAL',
      pet: 'Michi "Oliver"',
      rating: 5,
      date: 'Hace 3 días',
      text: 'El vaso Stanley con diseño de Husky brujito y la vela Three Brother Cats fueron el regalo perfecto de aniversario para mi novia. Los olores de la vela llenan toda la sala. 100% recomendados.',
      product: 'Termo 40oz Spooky Witch Husky'
    },
    {
      name: 'Sofía L.',
      city: 'Monterrey, NL',
      pet: 'Perrito "Rocky"',
      rating: 5,
      date: 'Hace 5 días',
      text: 'La placa de acero no se ha rayado nada y el grabado es súper legible. Me dio mucha tranquilidad pagar con OXXO Pay y recibir las notificaciones de rastreo directo en mi celular.',
      product: 'Placa de Acero Huesito Halloween'
    },
  ];

  return (
    <section className="py-16 bg-[#F8F9FA] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="flex items-center justify-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D]">
            Lo que dicen quienes ya regalaron amor
          </h2>
          <p className="text-xs text-slate-500">
            Más de 10,000 regalos entregados con sonrisas y lágrimas de emoción en toda la República Mexicana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{r.date}</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-[#0B1B3D]">{r.name}</p>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-[10px] text-slate-400">{r.city} • Para {r.pet}</p>
                </div>
                <span className="text-[10px] font-bold text-[#E06A55] bg-orange-50 px-2 py-1 rounded-md">
                  Compra Verificada
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram community banner */}
        <div className="mt-12 bg-white rounded-3xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0B1B3D]">
                Comparte tu unboxing con el hashtag #GiftiClubMx
              </h4>
              <p className="text-xs text-slate-500">
                Etiquétanos en Instagram o TikTok para aparecer en nuestra galería y ganar cupones sorpresa.
              </p>
            </div>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-[#0B1B3D] hover:bg-slate-800 text-white text-xs font-bold rounded-full transition-all shrink-0"
          >
            Seguir @GiftiClub.mx
          </a>
        </div>
      </div>
    </section>
  );
};
