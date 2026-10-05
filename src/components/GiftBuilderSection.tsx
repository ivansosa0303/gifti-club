import React, { useState } from 'react';
import { Sparkles, Gift, Check, ArrowRight, Palette, Heart, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, GIFT_WRAPPING_OPTIONS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import confetti from 'canvas-confetti';

export const GiftBuilderSection: React.FC = () => {
  const { addItem } = useCart();
  const { sendPushNotification } = useNotification();

  // Builder state
  const customizableItems = PRODUCTS.filter(p => p.isCustomizable);
  const [selectedProductId, setSelectedProductId] = useState(customizableItems[0].id);
  const [engravingText, setEngravingText] = useState('LUNA & KODA');
  const [fontChoice, setFontChoice] = useState<'font-caveat' | 'font-inter' | 'font-serif'>('font-caveat');
  const [includeGiftWrap, setIncludeGiftWrap] = useState(true);
  const [recipient, setRecipient] = useState('');
  const [personalNote, setPersonalNote] = useState('Gracias por llenar cada día de alegría y lealtad.');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const selectedProduct = customizableItems.find(p => p.id === selectedProductId) || customizableItems[0];
  const totalBuilderPrice = selectedProduct.price + (includeGiftWrap ? GIFT_WRAPPING_OPTIONS.price : 0);

  const handleBuildAndAdd = async () => {
    await addItem({
      productId: selectedProduct.id,
      title: selectedProduct.name,
      price: totalBuilderPrice,
      quantity: 1,
      image: selectedProduct.image,
      customText: engravingText,
      selectedVariant: selectedProduct.variants ? selectedProduct.variants[0] : undefined,
      giftWrap: includeGiftWrap,
      giftNote: includeGiftWrap ? personalNote : undefined,
      recipientName: includeGiftWrap ? recipient : undefined
    });

    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
    } catch (e) {
      // ignore
    }

    await sendPushNotification(
      '✨ ¡Regalo Personalizado Creado!',
      `Tu regalo "${selectedProduct.name}" con grabado "${engravingText}" se ha armado y añadido a tu bolsa.`,
      '#cart',
      'order'
    );

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  return (
    <section id="gift-builder" className="py-16 md:py-24 bg-white border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E06A55]/10 text-[#E06A55] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Módulo de Personalización Interactiva</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1B3D]">
            Arma tu Regalo en 3 Pasos
          </h2>
          <p className="text-sm text-slate-500">
            Crea una experiencia inolvidable. Selecciona la pieza, define el grabado láser artesanal y añade nuestro empaque de lujo con tarjeta personalizada.
          </p>
        </div>

        {/* Builder Container */}
        <div className="bg-[#F8F9FA] rounded-3xl border border-slate-200 p-6 md:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls: Steps 1, 2, 3 */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Base Product */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#0B1B3D] text-white text-xs font-black flex items-center justify-center">
                  1
                </span>
                <h3 className="text-sm font-bold text-[#0B1B3D]">
                  Elige la Pieza Base
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {customizableItems.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProductId(p.id)}
                    className={`p-2.5 rounded-2xl border text-left transition-all ${
                      selectedProductId === p.id
                        ? 'border-[#E06A55] bg-white ring-2 ring-[#E06A55]/30 shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-20 object-cover rounded-xl mb-2"
                    />
                    <p className="text-[11px] font-bold text-[#0B1B3D] truncate">
                      {p.name.split('"')[1] || p.name}
                    </p>
                    <p className="text-[10px] font-extrabold text-[#E06A55]">
                      ${p.price} MXN
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Engraving Customization */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#0B1B3D] text-white text-xs font-black flex items-center justify-center">
                  2
                </span>
                <h3 className="text-sm font-bold text-[#0B1B3D]">
                  Personaliza con Grabado Láser
                </h3>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Nombre o dedicatoria que se grabará:</span>
                    <span className="text-slate-400">{engravingText.length}/30</span>
                  </div>
                  <input
                    type="text"
                    maxLength={30}
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    placeholder="Ej. KODA, MI AMOR, LUNA..."
                    className="w-full px-4 py-2.5 text-sm font-bold text-[#0B1B3D] bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#E06A55]"
                  />
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-600 block mb-1.5">
                    Estilo de letra:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFontChoice('font-caveat')}
                      className={`p-2 rounded-xl text-xs border transition-all ${
                        fontChoice === 'font-caveat'
                          ? 'border-[#E06A55] bg-orange-50/50 text-[#E06A55] font-bold'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <span className="font-['Caveat',cursive] text-lg">Caligrafía</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontChoice('font-inter')}
                      className={`p-2 rounded-xl text-xs border transition-all ${
                        fontChoice === 'font-inter'
                          ? 'border-[#E06A55] bg-orange-50/50 text-[#E06A55] font-bold'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <span className="font-['Inter',sans-serif] font-bold">Sans Bold</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontChoice('font-serif')}
                      className={`p-2 rounded-xl text-xs border transition-all ${
                        fontChoice === 'font-serif'
                          ? 'border-[#E06A55] bg-orange-50/50 text-[#E06A55] font-bold'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <span className="font-['Playfair_Display',serif] italic">Serif Deluxe</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Luxury Gift Wrap */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#0B1B3D] text-white text-xs font-black flex items-center justify-center">
                  3
                </span>
                <h3 className="text-sm font-bold text-[#0B1B3D]">
                  Empaque de Regalo & Mensaje
                </h3>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <Gift className="w-5 h-5 text-[#E06A55]" />
                    <div>
                      <p className="text-xs font-bold text-[#0B1B3D]">
                        Caja Rígida Azul Noche, Listón Coral y Sello de Cera
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Presentación de boutique lista para entregar y emocionar.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#E06A55]">+${GIFT_WRAPPING_OPTIONS.price}</span>
                    <input
                      type="checkbox"
                      checked={includeGiftWrap}
                      onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                      className="w-4 h-4 text-[#E06A55] rounded-sm focus:ring-[#E06A55]"
                    />
                  </div>
                </label>

                {includeGiftWrap && (
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <input
                      type="text"
                      placeholder="Para: (Nombre de la persona)"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                    <textarea
                      rows={2}
                      maxLength={250}
                      placeholder="Dedicatoria para la tarjeta de regalo..."
                      value={personalNote}
                      onChange={(e) => setPersonalNote(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Live Mockup & Add to Cart button */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-bold text-[#0B1B3D] uppercase tracking-wider text-[10px]">
                  Vista Previa en Tiempo Real
                </span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold text-[10px]">
                  Listo para Fabricación
                </span>
              </div>

              {/* Dynamic Image & Text Overlay */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 shadow-md mb-4 group">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />

                {/* Simulated Laser Engraving */}
                <div className="absolute inset-x-4 bottom-6 bg-black/80 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20">
                  <p className="text-[10px] text-[#38FFD0] font-bold uppercase tracking-widest mb-1">
                    Grabado Personalizado
                  </p>
                  <p
                    className={`text-xl sm:text-2xl font-bold text-amber-200 tracking-wider truncate drop-shadow-md ${
                      fontChoice === 'font-caveat'
                        ? "font-['Caveat',cursive] text-3xl"
                        : fontChoice === 'font-serif'
                        ? "font-['Playfair_Display',serif]"
                        : "font-['Inter',sans-serif]"
                    }`}
                  >
                    {engravingText || 'TU NOMBRE AQUÍ'}
                  </p>
                  {includeGiftWrap && (
                    <p className="text-[10px] text-orange-200 mt-1 flex items-center justify-center gap-1">
                      <Gift className="w-3 h-3" />
                      Incluye Caja de Regalo Azul & Listón
                    </p>
                  )}
                </div>
              </div>

              {/* Price summary */}
              <div className="space-y-1 text-xs pt-1">
                <div className="flex justify-between text-slate-500">
                  <span>Pieza base:</span>
                  <span className="font-bold text-[#0B1B3D]">${selectedProduct.price} MXN</span>
                </div>
                {includeGiftWrap && (
                  <div className="flex justify-between text-slate-500">
                    <span>Envoltorio de lujo:</span>
                    <span className="font-bold text-[#E06A55]">+${GIFT_WRAPPING_OPTIONS.price} MXN</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-100 font-extrabold text-[#0B1B3D]">
                  <span>Total de esta creación:</span>
                  <span className="text-xl text-[#E06A55]">${totalBuilderPrice} MXN</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4">
              <button
                onClick={handleBuildAndAdd}
                className="w-full bg-[#E06A55] hover:bg-[#c95844] text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-lg shadow-[#E06A55]/25 hover:shadow-xl hover:scale-[1.01] transition-all text-xs flex items-center justify-center gap-2"
              >
                {addedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>¡Agregado a tu Bolsa con Éxito!</span>
                  </>
                ) : (
                  <>
                    <Gift className="w-4 h-4" />
                    <span>Agregar Regalo Personalizado a la Bolsa</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
