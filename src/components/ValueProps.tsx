import React from 'react';
import { Truck, Palette, Gift, ShieldCheck } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const props = [
    {
      icon: <Truck className="w-6 h-6 text-[#E06A55]" />,
      title: 'Envío Rápido a Todo México',
      description: 'Cobertura nacional con DHL, FedEx y Estafeta. Rastreo en tiempo real.',
    },
    {
      icon: <Palette className="w-6 h-6 text-[#0B1B3D]" />,
      title: 'Personalización Artesanal',
      description: 'Grabado láser indeleble con el nombre de tu mascota o persona favorita.',
    },
    {
      icon: <Gift className="w-6 h-6 text-[#E06A55]" />,
      title: 'Empaque de Regalo Prémium',
      description: 'Cajas de lujo azul marino, listón coral, sello de cera y tarjeta con dedicatoria.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#0B1B3D]" />,
      title: 'Garantía de Satisfacción',
      description: 'Cuidado obsesivo al detalle. Si algo no es perfecto, lo resolvemos de inmediato.',
    },
  ];

  return (
    <section className="bg-white py-10 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {props.map((p, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 rounded-2xl bg-[#F8F9FA] hover:bg-slate-100 transition-colors border border-slate-200/50"
            >
              <div className="p-3 bg-white rounded-xl shadow-xs shrink-0">
                {p.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0B1B3D] mb-1">
                  {p.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
