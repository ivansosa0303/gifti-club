import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  Check,
  Truck,
  ShieldCheck,
  Heart,
  ShoppingBag,
  Sparkles,
  Gift,
  ChevronDown,
  ChevronUp,
  Clock,
  Eye,
  MapPin,
  Send,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Zap,
  Info
} from 'lucide-react';
import { Product, ProductReview } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';
import { GIFT_WRAPPING_OPTIONS } from '../data/products';
import { INITIAL_REVIEWS, DEFAULT_PRODUCT_REVIEWS } from '../data/reviews';
import confetti from 'canvas-confetti';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenFullCustomizer?: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onOpenFullCustomizer
}) => {
  const { addItem, subtotal } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { sendPushNotification } = useNotification();

  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [customText, setCustomText] = useState<string>('');
  const [includeGiftWrap, setIncludeGiftWrap] = useState<boolean>(false);
  const [recipientName, setRecipientName] = useState<string>('');
  const [giftNote, setGiftNote] = useState<string>('');
  const [fontChoice, setFontChoice] = useState<'font-caveat' | 'font-inter' | 'font-serif'>('font-caveat');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [wishlistToast, setWishlistToast] = useState<string | null>(null);

  // Active Tab: 'details' | 'shipping' | 'reviews'
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'reviews'>('details');

  // Shipping Calculator state
  const [postalCode, setPostalCode] = useState<string>('06600');
  const [calculatedCity, setCalculatedCity] = useState<string>('Ciudad de México (Cuauhtémoc)');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  // Dynamic Reviews state
  const [reviewsList, setReviewsList] = useState<ProductReview[]>([]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewPet, setNewReviewPet] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSubmittedSuccess, setReviewSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedVariant(product.variants && product.variants.length > 0 ? product.variants[0] : '');
      setCustomText(product.defaultCustomText || 'LUNA');
      setQuantity(1);
      setIncludeGiftWrap(false);
      setRecipientName('');
      setGiftNote('');
      setAddedSuccess(false);
      setWishlistToast(null);
      setActiveTab('details');

      // Load initial reviews for this product
      const existing = INITIAL_REVIEWS[product.id] || DEFAULT_PRODUCT_REVIEWS;
      setReviewsList(existing);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const wishlisted = isWishlisted(product.id);
  const unitPrice = product.price;
  const wrapPrice = includeGiftWrap ? GIFT_WRAPPING_OPTIONS.price : 0;
  const totalPrice = (unitPrice + wrapPrice) * quantity;
  const images = product.gallery && product.gallery.length > 0
    ? [product.image, ...(product.hoverImage ? [product.hoverImage] : []), ...product.gallery.slice(1)]
    : [product.image, ...(product.hoverImage ? [product.hoverImage] : [])];
  const uniqueImages = Array.from(new Set(images));

  // Handle Wishlist click without closing Quick View
  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleWishlist(product);
    const willBeWishlisted = !wishlisted;
    setWishlistToast(willBeWishlisted ? '✓ ¡Guardado en tus Favoritos en la nube!' : 'Eliminado de tus Favoritos');
    setTimeout(() => {
      setWishlistToast(null);
    }, 2400);

    if (willBeWishlisted) {
      await sendPushNotification(
        '❤️ ¡Guardado en tus Favoritos!',
        `${product.name} fue guardado en tu lista de deseos de Gifti Club.`,
        '#wishlist',
        'promo'
      );
    }
  };

  const handleAddToCart = async () => {
    await addItem({
      productId: product.id,
      title: product.name,
      price: unitPrice + wrapPrice,
      quantity,
      image: activeImage || product.image,
      customText: product.isCustomizable ? customText : undefined,
      selectedVariant: selectedVariant || undefined,
      giftWrap: includeGiftWrap,
      giftNote: includeGiftWrap ? giftNote : undefined,
      recipientName: includeGiftWrap ? recipientName : undefined,
    });

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (e) {
      // ignore
    }

    await sendPushNotification(
      '🛍️ ¡Producto Agregado a la Bolsa!',
      `${product.name} (${quantity} pza${quantity > 1 ? 's' : ''}) agregado con éxito a tu carrito.`,
      '#cart',
      'order'
    );

    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2500);
  };

  // Submit new customer review dynamically
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      author: newReviewAuthor.trim(),
      petName: newReviewPet.trim() || undefined,
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      date: 'Ahora mismo',
      verified: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewPet('');
    setNewReviewRating(5);
    setNewReviewComment('');
    setShowReviewForm(false);
    setReviewSubmittedSuccess(true);
    setTimeout(() => setReviewSubmittedSuccess(false), 3000);

    sendPushNotification(
      '🌟 ¡Gracias por tu reseña!',
      `Tu opinión sobre "${product.name}" ha sido publicada para la comunidad Gifti Club.`,
      '#reviews',
      'promo'
    );
  };

  // Shipping calculation helpers
  const handleZipChange = (cp: string, city: string) => {
    setPostalCode(cp);
    setCalculatedCity(city);
  };

  // Dynamic delivery dates based on current local date
  const now = new Date();
  const formatDeliveryDate = (daysAhead: number) => {
    const d = new Date(now);
    d.setDate(d.getDate() + daysAhead);
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${dayNames[d.getDay()]} ${d.getDate()} de ${monthNames[d.getMonth()]}`;
  };

  const standardDeliveryStart = formatDeliveryDate(2);
  const standardDeliveryEnd = formatDeliveryDate(4);
  const expressDelivery = formatDeliveryDate(1);

  const qualifiesForFreeShipping = unitPrice >= 1200;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Click outside backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-transparent"
        aria-hidden="true"
      />

      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200/90 relative z-10 flex flex-col lg:flex-row max-h-[92vh]">
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-slate-500 hover:text-[#0B1B3D] rounded-full shadow-md backdrop-blur-xs transition-colors"
          aria-label="Cerrar Vista Rápida"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery & Visuals */}
        <div className="lg:w-1/2 bg-[#F8F9FA] p-5 sm:p-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
          <div>
            {/* Top metadata tags */}
            <div className="flex items-center justify-between mb-3">
              <span className="bg-[#0B1B3D] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {product.categoryLabel}
              </span>
              <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-[#E06A55]" />
                Shopify Quick View
              </span>
            </div>

            {/* Main Featured Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-md border border-slate-200/80 mb-3 group">
              <img
                src={activeImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#E06A55] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {product.badge}
                </span>
              )}

              {/* Wishlist Heart Button in Image */}
              <button
                onClick={handleToggleWishlist}
                className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
                  wishlisted
                    ? 'bg-[#E06A55] text-white scale-110'
                    : 'bg-white/90 hover:bg-white text-slate-700 hover:text-[#E06A55]'
                }`}
                title={wishlisted ? 'Quitar de favoritos' : 'Guardar en favoritos'}
                aria-label="Favorito"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
              </button>

              {/* Live Laser Engraving preview if custom text entered */}
              {product.isCustomizable && customText && (
                <div className="absolute inset-x-4 bottom-4 bg-black/80 backdrop-blur-md rounded-xl p-2.5 text-center border border-white/20">
                  <p className="text-[9px] text-[#38FFD0] uppercase font-bold tracking-widest">
                    Previsualización de Grabado Láser
                  </p>
                  <p
                    className={`text-base sm:text-lg font-bold text-amber-200 tracking-wider truncate drop-shadow-md ${
                      fontChoice === 'font-caveat'
                        ? "font-['Caveat',cursive] text-2xl"
                        : fontChoice === 'font-serif'
                        ? "font-['Playfair_Display',serif]"
                        : "font-['Inter',sans-serif]"
                    }`}
                  >
                    {customText.toUpperCase()}
                  </p>
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {uniqueImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {uniqueImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === img
                        ? 'border-[#E06A55] ring-2 ring-[#E06A55]/30'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Micro trust indicators */}
          <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <Check className="w-3.5 h-3.5" />
              100% Hecho en México
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Producción: 24h
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Details, Tabs, Shipping & Reviews */}
        <div className="lg:w-1/2 p-5 sm:p-7 overflow-y-auto max-h-[85vh] flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Vendor & Title Header */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-semibold text-[#E06A55] uppercase tracking-wider text-[10px]">
                  {product.vendor || 'Gifti Club Oficial'}
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  SKU: {product.sku || 'GFT-PROD-001'}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#0B1B3D] leading-tight">
                {product.name}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {product.tagline}
              </p>
            </div>

            {/* Ratings & Inventory Badge */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => setActiveTab('reviews')}
                className="flex items-center gap-1.5 text-xs hover:text-[#E06A55] transition-colors"
              >
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-current' : ''
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-[#0B1B3D]">{product.rating.toFixed(1)}</span>
                <span className="text-slate-400 text-[11px] underline">
                  ({reviewsList.length} reseñas dinámicas)
                </span>
              </button>

              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                ⚡ {product.inventory ? `${product.inventory} piezas disponibles` : 'En inventario'}
              </span>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-2 bg-[#F8F9FA] p-3.5 rounded-2xl border border-slate-200/80">
              <span className="text-2xl font-black text-[#0B1B3D]">
                ${unitPrice}
              </span>
              <span className="text-xs font-bold text-slate-500">MXN</span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice} MXN
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-[#E06A55] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md ml-auto">
                  Ahorras ${product.originalPrice - unitPrice} MXN
                </span>
              )}
            </div>

            {/* Navigation Tabs inside QuickView */}
            <div className="flex border-b border-slate-200 text-xs font-bold">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 px-3 border-b-2 transition-all ${
                  activeTab === 'details'
                    ? 'border-[#0B1B3D] text-[#0B1B3D]'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Detalles & Compra
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-2 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
                  activeTab === 'shipping'
                    ? 'border-[#0B1B3D] text-[#0B1B3D]'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <Truck className="w-3.5 h-3.5 text-[#E06A55]" />
                <span>Envío Estimado</span>
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
                  activeTab === 'reviews'
                    ? 'border-[#0B1B3D] text-[#0B1B3D]'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                <span>Reseñas ({reviewsList.length})</span>
              </button>
            </div>

            {/* TAB 1: DETAILS & BUY FORM */}
            {activeTab === 'details' && (
              <div className="space-y-3.5 animate-fadeIn">
                {/* Variant Selector */}
                {product.variants && product.variants.length > 0 && (
                  <div>
                    <label className="block text-xs font-bold text-[#0B1B3D] mb-1.5">
                      Selecciona Opción / Talla / Material:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                            selectedVariant === v
                              ? 'border-[#0B1B3D] bg-[#0B1B3D] text-white shadow-xs'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Laser Engraving / Customization Input */}
                {product.isCustomizable && (
                  <div className="bg-orange-50/40 border border-[#E06A55]/30 rounded-2xl p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-[#0B1B3D]">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#E06A55]" />
                        <span>Personalización / Grabado Láser:</span>
                      </span>
                      <span className="text-[10px] text-slate-500 font-normal">
                        {customText.length}/30 caracteres
                      </span>
                    </div>

                    <input
                      type="text"
                      maxLength={30}
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="Escribe el nombre o texto a grabar..."
                      className="w-full px-3 py-2 text-xs font-bold bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#E06A55] text-[#0B1B3D]"
                    />

                    {/* Font selection */}
                    <div className="flex gap-2 pt-0.5">
                      <button
                        type="button"
                        onClick={() => setFontChoice('font-caveat')}
                        className={`flex-1 py-1 px-2 rounded-lg text-[11px] border text-center transition-all ${
                          fontChoice === 'font-caveat'
                            ? 'border-[#E06A55] bg-white text-[#E06A55] font-bold shadow-xs'
                            : 'border-slate-200 bg-white/70 text-slate-600'
                        }`}
                      >
                        <span className="font-['Caveat',cursive] text-sm">Caligrafía</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFontChoice('font-inter')}
                        className={`flex-1 py-1 px-2 rounded-lg text-[11px] border text-center transition-all ${
                          fontChoice === 'font-inter'
                            ? 'border-[#E06A55] bg-white text-[#E06A55] font-bold shadow-xs'
                            : 'border-slate-200 bg-white/70 text-slate-600'
                        }`}
                      >
                        <span className="font-['Inter',sans-serif] font-bold">Sans Bold</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFontChoice('font-serif')}
                        className={`flex-1 py-1 px-2 rounded-lg text-[11px] border text-center transition-all ${
                          fontChoice === 'font-serif'
                            ? 'border-[#E06A55] bg-white text-[#E06A55] font-bold shadow-xs'
                            : 'border-slate-200 bg-white/70 text-slate-600'
                        }`}
                      >
                        <span className="font-['Playfair_Display',serif] italic">Serif Deluxe</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Gift Wrap Add-on */}
                <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50 space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-[#E06A55]" />
                      <span className="text-xs font-bold text-[#0B1B3D]">
                        Empaque de Regalo con Listón y Tarjeta
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#E06A55]">+${GIFT_WRAPPING_OPTIONS.price} MXN</span>
                      <input
                        type="checkbox"
                        checked={includeGiftWrap}
                        onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                        className="w-4 h-4 text-[#E06A55] rounded-sm focus:ring-[#E06A55]"
                      />
                    </div>
                  </label>

                  {includeGiftWrap && (
                    <div className="pt-2 border-t border-slate-200 space-y-2 animate-fadeIn">
                      <input
                        type="text"
                        placeholder="Nombre de quien recibe"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full text-xs p-2 bg-white rounded-lg border border-slate-300"
                      />
                      <textarea
                        rows={2}
                        maxLength={250}
                        placeholder="Mensaje para la tarjeta (máx 250 caracteres)..."
                        value={giftNote}
                        onChange={(e) => setGiftNote(e.target.value)}
                        className="w-full text-xs p-2 bg-white rounded-lg border border-slate-300"
                      />
                    </div>
                  )}
                </div>

                {/* Quantity and Primary Action Row */}
                <div className="pt-1 flex items-center gap-2.5">
                  <div className="flex items-center border border-slate-300 rounded-2xl bg-white overflow-hidden shrink-0">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2.5 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="px-3.5 py-2.5 text-xs font-black text-[#0B1B3D]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2.5 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Big Shopify Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#E06A55] hover:bg-[#c95844] text-white font-extrabold py-3 px-4 rounded-2xl shadow-lg shadow-[#E06A55]/25 hover:shadow-xl hover:scale-[1.01] transition-all text-xs flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4" />
                      <span>{addedSuccess ? '¡Agregado a la Bolsa!' : 'Agregar a la Bolsa'}</span>
                    </span>
                    <span className="text-sm font-black">
                      ${totalPrice} MXN
                    </span>
                  </button>
                </div>

                {/* NEW: Dedicated 'Guardar en Favoritos' Button (WishlistContext) */}
                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  className={`w-full py-2.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all border shadow-xs ${
                    wishlisted
                      ? 'bg-rose-50 text-[#E06A55] border-[#E06A55] ring-2 ring-[#E06A55]/20'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-[#E06A55] hover:text-[#E06A55] hover:bg-rose-50/30'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#E06A55] text-[#E06A55]' : 'text-slate-400'}`} />
                  <span>
                    {wishlisted ? 'Guardado en Favoritos (Sincronizado)' : 'Guardar en Favoritos'}
                  </span>
                </button>

                {wishlistToast && (
                  <div className="p-2 bg-rose-50 border border-rose-200 text-[#E06A55] rounded-xl text-xs flex items-center justify-center gap-2 font-bold animate-fadeIn">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{wishlistToast}</span>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: ESTIMATED DELIVERY (Envío Estimado) */}
            {activeTab === 'shipping' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0B1B3D] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#E06A55]" />
                      <span>Calculador de Envío para México</span>
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-full">
                      Cobertura Nacional
                    </span>
                  </div>

                  {/* Postal code input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={5}
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="Código Postal (5 dígitos)"
                      className="w-36 px-3 py-2 text-xs font-bold bg-white border border-slate-300 rounded-xl focus:ring-1 focus:ring-[#E06A55]"
                    />
                    <div className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-700 truncate font-medium">
                      {calculatedCity}
                    </div>
                  </div>

                  {/* Quick Cities chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      { cp: '06600', city: 'CDMX (Cuauhtémoc)' },
                      { cp: '44100', city: 'Guadalajara, JAL' },
                      { cp: '64000', city: 'Monterrey, NL' },
                      { cp: '72000', city: 'Puebla, PUE' },
                      { cp: '97000', city: 'Mérida, YUC' }
                    ].map((c) => (
                      <button
                        key={c.cp}
                        type="button"
                        onClick={() => handleZipChange(c.cp, c.city)}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border font-semibold transition-colors ${
                          postalCode === c.cp
                            ? 'bg-[#0B1B3D] text-white border-[#0B1B3D]'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {c.city.split(' ')[0]} ({c.cp})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delivery Estimates Results Card */}
                <div className="space-y-2.5">
                  {/* Standard Delivery */}
                  <div className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-start justify-between gap-3 shadow-xs">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 text-blue-800 rounded-xl mt-0.5">
                        <Truck className="w-4 h-4 text-[#0B1B3D]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-[#0B1B3D]">
                            Envío Estándar (FedEx / Estafeta)
                          </h4>
                          {qualifiesForFreeShipping && (
                            <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded">
                              ¡GRATIS!
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-emerald-700 mt-0.5 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Llega entre {standardDeliveryStart} y {standardDeliveryEnd}</span>
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Incluye rastreo en vivo y seguro contra extravío.
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-black text-[#0B1B3D] shrink-0">
                      {qualifiesForFreeShipping ? '$0 MXN' : '$130 MXN'}
                    </span>
                  </div>

                  {/* Express 24h Delivery */}
                  <div className="p-3.5 rounded-2xl border border-orange-200 bg-orange-50/30 flex items-start justify-between gap-3 shadow-xs">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#E06A55]/10 text-[#E06A55] rounded-xl mt-0.5">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-[#0B1B3D]">
                            Envío Express 24h (DHL Prioritario)
                          </h4>
                          <span className="text-[10px] font-bold text-[#E06A55] bg-white px-1.5 py-0.2 rounded border border-orange-200">
                            Más Rápido
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#E06A55] mt-0.5 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Llega el {expressDelivery}</span>
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Grabado y despacho prioritario en el primer turno de taller.
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-black text-[#E06A55] shrink-0">
                      +$49 MXN
                    </span>
                  </div>
                </div>

                {/* Dispatch Countdown Alert */}
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-xs flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <p className="text-[11px] leading-snug">
                    <strong>¡Atención!</strong> Ordena en las próximas <strong>3 hrs 24 min</strong> para que tu regalo entre en el lote de grabado y despacho de hoy.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: DYNAMIC REVIEWS (Reseñas Dinámicas) */}
            {activeTab === 'reviews' && (
              <div className="space-y-4 animate-fadeIn">
                {/* Rating Overview */}
                <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-black text-[#0B1B3D]">
                        {product.rating.toFixed(1)}
                      </span>
                      <span className="text-xs text-slate-400">/ 5.0</span>
                    </div>
                    <div className="flex text-amber-500 my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Basado en {reviewsList.length} experiencias reales
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="bg-[#0B1B3D] hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-1.5"
                  >
                    <Star className="w-3.5 h-3.5 text-[#38FFD0]" />
                    <span>{showReviewForm ? 'Cancelar' : 'Escribir Reseña'}</span>
                  </button>
                </div>

                {reviewSubmittedSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-bold animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>¡Tu reseña ha sido publicada dinámicamente con éxito!</span>
                  </div>
                )}

                {/* Interactive Write Review Form */}
                {showReviewForm && (
                  <form onSubmit={handleSubmitReview} className="bg-orange-50/40 p-4 rounded-2xl border border-orange-200 space-y-3 animate-fadeIn text-xs">
                    <h4 className="font-bold text-[#0B1B3D] text-xs flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#E06A55]" />
                      <span>Comparte tu experiencia con este regalo</span>
                    </h4>

                    {/* Star selector */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Tu Calificación:
                      </label>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReviewRating(star)}
                            className="p-1 text-amber-500 hover:scale-125 transition-transform"
                          >
                            <Star
                              className={`w-5 h-5 ${star <= newReviewRating ? 'fill-current' : 'text-slate-300'}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Tu Nombre:
                        </label>
                        <input
                          type="text"
                          required
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder="Ej. Sofía Hernández"
                          className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Nombre de tu mascota (Opcional):
                        </label>
                        <input
                          type="text"
                          value={newReviewPet}
                          onChange={(e) => setNewReviewPet(e.target.value)}
                          placeholder="Ej. Koda / Luna"
                          className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Tu Opinión:
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="Cuéntanos sobre el grabado, el empaque o la reacción de quien lo recibió..."
                        className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#E06A55] hover:bg-[#c95844] text-white font-bold py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Publicar Reseña en Vivo</span>
                    </button>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {reviewsList.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[#0B1B3D]">{rev.author}</span>
                          {rev.verified && (
                            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                              <Check className="w-2.5 h-2.5" />
                              Verificada
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-3 h-3 ${idx < rev.rating ? 'fill-current' : 'text-slate-200'}`}
                          />
                        ))}
                        {rev.petName && (
                          <span className="text-[10px] text-slate-500 ml-2">
                            • Para {rev.petName}
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-600 leading-snug">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
