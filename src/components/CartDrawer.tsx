import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Gift,
  Truck,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, GIFT_WRAPPING_OPTIONS } from '../data/products';

interface CartDrawerProps {
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const {
    isCartOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    subtotal,
    giftWrapTotal,
    shippingCost,
    total,
    freeShippingProgress,
    globalGiftWrap,
    setGlobalGiftWrap,
    globalGiftNote,
    setGlobalGiftNote,
    recipientName,
    setRecipientName,
    addItem
  } = useCart();

  const [noteOpen, setNoteOpen] = useState(false);

  // Suggest one quick complementary item that is not in cart
  const upsellProduct = PRODUCTS.find(
    (p) => !items.some((i) => i.productId === p.id) && p.price < 400
  );

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Top Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#0B1B3D]" />
                <h2 className="text-base font-extrabold text-[#0B1B3D]">
                  Tu Bolsa de Regalos
                </h2>
                <span className="bg-[#0B1B3D]/10 text-[#0B1B3D] text-xs font-bold px-2 py-0.5 rounded-full">
                  {items.length} {items.length === 1 ? 'artículo' : 'artículos'}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Cerrar bolsa"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dynamic Free Shipping Bar inside Cart */}
            <div className="bg-[#F8F9FA] p-3 rounded-2xl border border-slate-200/80">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                <span className="flex items-center gap-1.5 text-[#0B1B3D]">
                  <Truck className="w-4 h-4 text-[#E06A55]" />
                  {freeShippingProgress.isQualified ? (
                    <span className="text-emerald-700 font-bold">¡Envío Gratis Desbloqueado!</span>
                  ) : (
                    <span>Faltan ${(1200 - subtotal).toFixed(2)} MXN</span>
                  )}
                </span>
                <span className="text-[11px] text-slate-500">Meta: $1,200</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    freeShippingProgress.isQualified
                      ? 'bg-emerald-500'
                      : 'bg-[#E06A55]'
                  }`}
                  style={{ width: `${freeShippingProgress.percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-base font-bold text-[#0B1B3D]">Tu bolsa está vacía</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Explora nuestra colección de regalos personalizados para mascotas y personas especiales.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="bg-[#0B1B3D] text-white text-xs font-bold py-2.5 px-6 rounded-full hover:bg-slate-800 transition-all shadow-xs"
                >
                  Ver Catálogo
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 bg-[#F8F9FA] rounded-2xl border border-slate-200/70 relative group"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-xl bg-white border border-slate-200/50 shrink-0"
                      />

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-xs font-bold text-[#0B1B3D] truncate">
                              {item.title}
                            </h4>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-slate-400 hover:text-red-500 p-1"
                              title="Eliminar"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {item.customText && (
                            <p className="text-[11px] text-[#E06A55] font-semibold flex items-center gap-1 mt-0.5">
                              <Sparkles className="w-3 h-3" />
                              Grabado: &ldquo;{item.customText}&rdquo;
                            </p>
                          )}

                          {item.selectedVariant && (
                            <p className="text-[10px] text-slate-500">
                              Opción: {item.selectedVariant}
                            </p>
                          )}

                          {item.giftWrap && (
                            <span className="inline-block mt-1 bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                              🎁 Con Envoltorio de Lujo
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 py-0.5 text-xs font-bold text-[#0B1B3D]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-black text-[#0B1B3D]">
                            ${item.price * item.quantity} MXN
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Global Gift Wrap Add-on */}
                <div className="bg-orange-50/50 border border-orange-200/80 rounded-2xl p-3 space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-[#E06A55]" />
                      <span className="text-xs font-bold text-[#0B1B3D]">
                        Empaque de Regalo para todo el pedido
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#E06A55]">
                        +${GIFT_WRAPPING_OPTIONS.price} MXN
                      </span>
                      <input
                        type="checkbox"
                        checked={globalGiftWrap}
                        onChange={(e) => setGlobalGiftWrap(e.target.checked)}
                        className="w-4 h-4 text-[#E06A55] rounded-sm focus:ring-[#E06A55]"
                      />
                    </div>
                  </label>

                  {globalGiftWrap && (
                    <div className="pt-2 border-t border-orange-200/60 space-y-2">
                      <input
                        type="text"
                        placeholder="Nombre de quien recibe (Opcional)"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full text-xs p-2 bg-white rounded-lg border border-slate-300 focus:ring-1 focus:ring-[#E06A55]"
                      />
                      <textarea
                        rows={2}
                        placeholder="Mensaje personalizado para la tarjeta de regalo..."
                        value={globalGiftNote}
                        onChange={(e) => setGlobalGiftNote(e.target.value)}
                        maxLength={250}
                        className="w-full text-xs p-2 bg-white rounded-lg border border-slate-300 focus:ring-1 focus:ring-[#E06A55]"
                      />
                    </div>
                  )}
                </div>

                {/* Upsell Complementary Product */}
                {upsellProduct && (
                  <div className="border border-dashed border-slate-300 rounded-2xl p-3 bg-slate-50 flex items-center justify-between gap-3">
                    <img
                      src={upsellProduct.image}
                      alt={upsellProduct.name}
                      className="w-12 h-12 rounded-xl object-cover bg-white shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-[#E06A55] uppercase tracking-wider">
                        Sugerencia para tu regalo
                      </p>
                      <p className="text-xs font-bold text-[#0B1B3D] truncate">
                        {upsellProduct.name}
                      </p>
                      <p className="text-xs font-bold text-slate-700">
                        ${upsellProduct.price} MXN
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        addItem({
                          productId: upsellProduct.id,
                          title: upsellProduct.name,
                          price: upsellProduct.price,
                          quantity: 1,
                          image: upsellProduct.image
                        })
                      }
                      className="px-3 py-1.5 bg-[#0B1B3D] text-white text-[11px] font-bold rounded-lg hover:bg-slate-800 transition-colors shrink-0"
                    >
                      + Añadir
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Bottom Checkout Actions */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#0B1B3D]">${subtotal.toFixed(2)} MXN</span>
                </div>
                {globalGiftWrap && (
                  <div className="flex justify-between text-slate-500">
                    <span>Envoltorio Prémium</span>
                    <span className="font-semibold text-[#0B1B3D]">+${giftWrapTotal.toFixed(2)} MXN</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>Envío a México</span>
                  {shippingCost === 0 ? (
                    <span className="font-bold text-emerald-600">¡GRATIS!</span>
                  ) : (
                    <span className="font-semibold text-[#0B1B3D]">${shippingCost.toFixed(2)} MXN</span>
                  )}
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#0B1B3D] pt-2 border-t border-slate-100">
                  <span>Total estimado</span>
                  <span className="text-base text-[#E06A55]">${total.toFixed(2)} MXN</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  closeCart();
                  onCheckout();
                }}
                className="w-full bg-[#E06A55] hover:bg-[#c95844] text-white font-extrabold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#E06A55]/25 hover:shadow-xl hover:scale-[1.01] transition-all text-sm"
              >
                <span>Proceder al Pago Seguro</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pago 100% Encriptado con Tarjeta, OXXO Pay y MSI</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
