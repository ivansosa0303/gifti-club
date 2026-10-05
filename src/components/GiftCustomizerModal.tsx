import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, Gift, Heart, ShieldCheck, Truck, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { GIFT_WRAPPING_OPTIONS } from '../data/products';

interface GiftCustomizerModalProps {
  product: Product | null;
  onClose: () => void;
}

export const GiftCustomizerModal: React.FC<GiftCustomizerModalProps> = ({
  product,
  onClose
}) => {
  const { addItem } = useCart();
  const { sendPushNotification } = useNotification();

  const [customText, setCustomText] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [addGiftWrap, setAddGiftWrap] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [fontFamily, setFontFamily] = useState<'font-caveat' | 'font-inter' | 'font-serif'>('font-caveat');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setCustomText(product.defaultCustomText || 'LUNA');
      setSelectedVariant(product.variants ? product.variants[0] : '');
      setAddGiftWrap(false);
      setGiftNote('');
      setRecipientName('');
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const unitPrice = product.price;
  const wrapPrice = addGiftWrap ? GIFT_WRAPPING_OPTIONS.price : 0;
  const totalItemPrice = (unitPrice + wrapPrice) * quantity;

  const handleAddToCart = async () => {
    setIsSubmitting(true);
    await addItem({
      productId: product.id,
      title: product.name,
      price: unitPrice + wrapPrice,
      quantity,
      image: product.image,
      customText: product.isCustomizable ? customText : undefined,
      selectedVariant: selectedVariant || undefined,
      giftWrap: addGiftWrap,
      giftNote: addGiftWrap ? giftNote : undefined,
      recipientName: addGiftWrap ? recipientName : undefined,
    });

    await sendPushNotification(
      '🎁 ¡Regalo agregado a tu bolsa!',
      `${product.name} ${customText ? `con grabado "${customText}"` : ''} listo para sorprender.`,
      '#cart',
      'order'
    );

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col lg:flex-row max-h-[92vh]">
        {/* Left Column: Interactive Live Preview Canvas */}
        <div className="lg:w-1/2 bg-gradient-to-b from-slate-100 to-slate-200 p-6 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-slate-200">
          {/* Header pill */}
          <div className="flex items-center justify-between z-10">
            <span className="bg-[#0B1B3D] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.categoryLabel}
            </span>
            <span className="text-xs font-semibold text-slate-500 bg-white/80 px-2.5 py-1 rounded-full backdrop-blur-xs">
              Vista previa interactiva
            </span>
          </div>

          {/* Interactive Mockup Container */}
          <div className="relative my-4 aspect-square max-h-[360px] mx-auto w-full rounded-2xl overflow-hidden shadow-lg bg-white flex items-center justify-center group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {/* Live Engraving Overlay */}
            {product.isCustomizable && customText && (
              <div className="absolute inset-x-6 bottom-8 bg-black/75 backdrop-blur-md rounded-xl p-3 text-center border border-white/20 shadow-xl transition-all">
                <p className="text-[10px] text-[#38FFD0] uppercase tracking-widest font-bold mb-0.5">
                  Grabado Láser en Vivo
                </p>
                <div
                  className={`text-lg sm:text-xl font-bold text-amber-200 tracking-wider truncate drop-shadow-md ${
                    fontFamily === 'font-caveat'
                      ? "font-['Caveat',cursive] text-2xl"
                      : fontFamily === 'font-serif'
                      ? "font-['Playfair_Display',serif]"
                      : "font-['Inter',sans-serif]"
                  }`}
                >
                  {customText.toUpperCase()}
                </div>
                {selectedVariant && (
                  <p className="text-[10px] text-slate-300 mt-0.5">
                    Material: {selectedVariant}
                  </p>
                )}
              </div>
            )}

            {/* Gift Wrap Preview Badge */}
            {addGiftWrap && (
              <div className="absolute top-4 left-4 bg-[#E06A55] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 animate-bounce">
                <Gift className="w-3.5 h-3.5" />
                <span>+ Envoltorio de Lujo Incluido</span>
              </div>
            )}
          </div>

          {/* Features check row */}
          <div className="bg-white/80 backdrop-blur-xs rounded-xl p-3 text-xs text-slate-600 border border-slate-200/60 space-y-1">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Personalización sin costo adicional</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Garantía de nitidez y durabilidad permanente</span>
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:w-1/2 p-6 overflow-y-auto max-h-[85vh] flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Modal Close Button */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-[#0B1B3D]">
                  {product.name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {product.tagline}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-2 bg-[#F8F9FA] p-3 rounded-2xl border border-slate-200/80">
              <span className="text-2xl font-black text-[#0B1B3D]">
                ${unitPrice}
              </span>
              <span className="text-xs font-semibold text-slate-500">MXN</span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
              <span className="ml-auto text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                En stock
              </span>
            </div>

            {/* Customization Input Field */}
            {product.isCustomizable && (
              <div className="space-y-3 bg-[#0B1B3D]/5 p-4 rounded-2xl border border-[#0B1B3D]/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#0B1B3D] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E06A55]" />
                    <span>Texto / Nombre a Grabar:</span>
                  </label>
                  <span className="text-[11px] text-slate-500">
                    {customText.length}/35 caracteres
                  </span>
                </div>

                <input
                  type="text"
                  maxLength={35}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Ej. LUNA, MAX, FAMILIA SÁNCHEZ..."
                  className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E06A55] font-semibold text-[#0B1B3D] shadow-xs"
                />

                {/* Typography selector */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                    Estilo de Tipografía Grabada:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFontFamily('font-caveat')}
                      className={`py-2 px-2 rounded-xl text-xs border text-center transition-all ${
                        fontFamily === 'font-caveat'
                          ? 'border-[#E06A55] bg-white text-[#E06A55] font-bold shadow-xs'
                          : 'border-slate-200 bg-white/60 text-slate-600'
                      }`}
                    >
                      <span className="font-['Caveat',cursive] text-base block">Cursiva</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontFamily('font-inter')}
                      className={`py-2 px-2 rounded-xl text-xs border text-center transition-all ${
                        fontFamily === 'font-inter'
                          ? 'border-[#E06A55] bg-white text-[#E06A55] font-bold shadow-xs'
                          : 'border-slate-200 bg-white/60 text-slate-600'
                      }`}
                    >
                      <span className="font-['Inter',sans-serif] font-bold block">Moderno</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontFamily('font-serif')}
                      className={`py-2 px-2 rounded-xl text-xs border text-center transition-all ${
                        fontFamily === 'font-serif'
                          ? 'border-[#E06A55] bg-white text-[#E06A55] font-bold shadow-xs'
                          : 'border-slate-200 bg-white/60 text-slate-600'
                      }`}
                    >
                      <span className="font-['Playfair_Display',serif] italic block">Clásico</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Variant Picker (Materials / Sizes) */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-[#0B1B3D] mb-2">
                  Selecciona Opción / Material:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border text-left flex items-center justify-between transition-all ${
                        selectedVariant === variant
                          ? 'border-[#0B1B3D] bg-[#0B1B3D] text-white shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{variant}</span>
                      {selectedVariant === variant && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Gift Wrapping & Note Section (Blueprint Specification) */}
            <div className="border border-[#E06A55]/30 bg-orange-50/40 rounded-2xl p-4 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addGiftWrap}
                  onChange={(e) => setAddGiftWrap(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#E06A55] rounded-sm focus:ring-[#E06A55]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0B1B3D]">
                      Añadir Envoltorio de Regalo Prémium
                    </span>
                    <span className="text-xs font-extrabold text-[#E06A55]">
                      +${GIFT_WRAPPING_OPTIONS.price} MXN
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {GIFT_WRAPPING_OPTIONS.description}
                  </p>
                </div>
              </label>

              {addGiftWrap && (
                <div className="pt-2 border-t border-orange-200/60 space-y-2 animate-fadeIn">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Nombre de la persona que recibe:
                    </label>
                    <input
                      type="text"
                      maxLength={100}
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Ej. Mariana González"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#E06A55]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-bold text-slate-700">
                        Mensaje para la tarjeta (máx 250 caracteres):
                      </label>
                      <span className="text-[10px] text-slate-400">
                        {giftNote.length}/250
                      </span>
                    </div>
                    <textarea
                      rows={2}
                      maxLength={250}
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Escribe aquí tu dedicatoria especial..."
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#E06A55]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-slate-700">Cantidad:</span>
              <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-[#0B1B3D]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart Footer */}
          <div className="pt-4 border-t border-slate-200">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleAddToCart}
              className="w-full flex items-center justify-between bg-[#E06A55] hover:bg-[#c95844] text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-[#E06A55]/25 hover:shadow-xl hover:scale-[1.01] transition-all"
            >
              <span className="flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Agregar al Carrito</span>
              </span>
              <span className="text-base font-extrabold">
                ${totalItemPrice} MXN
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
