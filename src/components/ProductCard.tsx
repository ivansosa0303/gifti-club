import React, { useState } from 'react';
import { Heart, Star, Sparkles, Plus, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onCustomize: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onCustomize,
  onQuickView
}) => {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleDirectAdd = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.isCustomizable) {
      onCustomize(product);
    } else {
      await addItem({
        productId: product.id,
        title: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        selectedVariant: product.variants ? product.variants[0] : undefined
      });
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1800);
    }
  };

  const currentDisplayImage = isHovered && product.hoverImage ? product.hoverImage : product.image;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#E06A55]/40 transition-all duration-300 flex flex-col justify-between relative"
    >
      {/* Top Media Container */}
      <div
        className="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={currentDisplayImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#0B1B3D]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs z-10">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            wishlisted
              ? 'bg-[#E06A55] text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-slate-700 hover:text-[#E06A55]'
          }`}
          aria-label="Guardar en favoritos"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Floating Button on Hover (Shopify Dawn Pattern) */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 bg-white/95 hover:bg-white text-[#0B1B3D] text-xs font-bold py-2.5 px-3 rounded-xl shadow-lg border border-slate-200 backdrop-blur-xs flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-[#E06A55]" />
            <span>Vista Rápida</span>
          </button>
        </div>

        {/* Customizable ribbon indicator when not hovering */}
        {product.isCustomizable && (
          <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/60 flex items-center justify-between text-[11px] font-medium text-slate-700 shadow-sm group-hover:opacity-0 transition-opacity">
            <span className="flex items-center gap-1 text-[#E06A55] font-semibold">
              <Sparkles className="w-3 h-3" />
              Personaliza tu grabado
            </span>
            <span className="text-[10px] text-slate-400">Gratis</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="uppercase tracking-wider font-semibold text-slate-500">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="text-sm font-bold text-[#0B1B3D] group-hover:text-[#E06A55] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1">
            {product.tagline}
          </p>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-[#0B1B3D]">
                ${product.price}
              </span>
              <span className="text-[11px] font-medium text-slate-400">MXN</span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            {product.price >= 1200 ? (
              <span className="text-[10px] font-semibold text-emerald-600">
                ✓ Envío Gratis
              </span>
            ) : (
              <span className="text-[10px] text-slate-400">
                Envío a todo México
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick View micro-icon */}
            <button
              onClick={() => onQuickView(product)}
              className="p-2 rounded-xl text-slate-400 hover:text-[#0B1B3D] hover:bg-slate-100 transition-colors"
              title="Vista rápida"
              aria-label="Vista Rápida"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Main Action Button */}
            <button
              onClick={handleDirectAdd}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : product.isCustomizable
                  ? 'bg-[#0B1B3D] hover:bg-[#183063] text-white hover:shadow-md'
                  : 'bg-[#E06A55] hover:bg-[#c95844] text-white hover:shadow-md'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>¡Listo!</span>
                </>
              ) : product.isCustomizable ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#38FFD0]" />
                  <span>Grabar</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
