import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomize: (product: any) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  onCustomize
}) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#E06A55] fill-current" />
              <h2 className="text-base font-extrabold text-[#0B1B3D]">
                Mis Regalos Favoritos
              </h2>
              <span className="bg-[#0B1B3D]/10 text-[#0B1B3D] text-xs font-bold px-2 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-[#E06A55]">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-[#0B1B3D]">
                  No tienes favoritos guardados
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Toca el icono de corazón en cualquier producto para guardarlo en tu lista sincronizada en la nube.
                </p>
              </div>
            ) : (
              wishlist.map((item) => {
                const prod = PRODUCTS.find((p) => p.id === item.productId);
                return (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 bg-[#F8F9FA] rounded-2xl border border-slate-200/80 items-center justify-between"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover bg-white shrink-0"
                    />

                    <div className="flex-1 min-w-0 pr-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-bold text-[#0B1B3D] truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs font-black text-[#E06A55]">
                        ${item.price} MXN
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        onClick={() => {
                          if (prod) {
                            if (prod.isCustomizable) {
                              onClose();
                              onCustomize(prod);
                            } else {
                              addItem({
                                productId: prod.id,
                                title: prod.name,
                                price: prod.price,
                                quantity: 1,
                                image: prod.image
                              });
                            }
                          }
                        }}
                        className="p-2 bg-[#0B1B3D] text-white hover:bg-slate-800 rounded-xl text-xs font-bold transition-all shadow-xs"
                        title="Agregar a la bolsa"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => prod && toggleWishlist(prod)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        title="Quitar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="p-4 border-t border-slate-200 bg-[#F8F9FA]">
            <button
              onClick={onClose}
              className="w-full bg-white border border-slate-300 text-slate-700 text-xs font-bold py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Continuar viendo regalos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
