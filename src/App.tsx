import React, { useState, useMemo } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { NotificationProvider } from './context/NotificationContext';
import { FreeShippingBar } from './components/FreeShippingBar';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ValueProps } from './components/ValueProps';
import { ProductCard } from './components/ProductCard';
import { QuickViewModal } from './components/QuickViewModal';
import { GiftCustomizerModal } from './components/GiftCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { UserAccountModal } from './components/UserAccountModal';
import { WishlistModal } from './components/WishlistModal';
import { GiftBuilderSection } from './components/GiftBuilderSection';
import { SocialProof } from './components/SocialProof';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product } from './types';
import { Filter, SlidersHorizontal, Sparkles, MessageCircle, Eye, ShoppingBag } from 'lucide-react';

function GiftiApp() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== 'todos') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured default order
        break;
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const scrollToBuilder = () => {
    const el = document.getElementById('gift-builder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#0B1B3D]">
      {/* Dynamic Top Free Shipping Progress Bar */}
      <FreeShippingBar />

      {/* Main Sticky Navbar */}
      <Navbar
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToCatalog();
        }}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenGiftBuilder={scrollToBuilder}
      />

      {/* Main Hero Banner */}
      <HeroBanner
        onExplore={scrollToCatalog}
        onOpenGiftBuilder={scrollToBuilder}
      />

      {/* 4-Column Value Propositions */}
      <ValueProps />

      {/* Dynamic Product Catalog Section */}
      <main id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex-1 w-full space-y-8">
        {/* Category & Sorting Controls Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E06A55] animate-ping" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1B3D]">
                {selectedCategory === 'todos'
                  ? 'Colección Exclusiva de Regalos'
                  : PRODUCTS.find((p) => p.category === selectedCategory)?.categoryLabel || 'Regalos Curados'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Mostrando {filteredProducts.length} regalos con personalización artesanal y empaques de lujo
            </p>
          </div>

          {/* Category Pills & Sort dropdown */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'llaveros', label: 'Llaveros' },
                { id: 'termos', label: 'Vasos Stanley' },
                { id: 'ropa', label: 'Hoodies' },
                { id: 'cuadros', label: 'Ofrendas' },
                { id: 'gaming', label: 'Gamer' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all shrink-0 ${
                    selectedCategory === c.id
                      ? 'bg-[#0B1B3D] text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-200 rounded-full px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#E06A55]"
              >
                <option value="featured">Destacados</option>
                <option value="price-low">Menor Precio</option>
                <option value="price-high">Mayor Precio</option>
                <option value="rating">Mejor Calificados</option>
              </select>
            </div>
          </div>
        </div>

        {/* Shopify Dawn OS 2.0 Quick View Feature Notice */}
        <div className="bg-gradient-to-r from-[#0B1B3D]/5 via-orange-50/50 to-[#E06A55]/5 border border-slate-200/80 rounded-2xl p-3 px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#0B1B3D]">
            <span className="p-1 bg-[#0B1B3D] text-[#38FFD0] rounded-lg">
              <Eye className="w-3.5 h-3.5" />
            </span>
            <span className="font-semibold">
              Arquitectura Shopify Dawn OS 2.0:
            </span>
            <span className="text-slate-600 hidden md:inline">
              Pasa el cursor o pulsa <strong>&ldquo;Vista Rápida&rdquo;</strong> en cualquier producto para personalizar y agregar a la bolsa sin recargar ni salir del catálogo.
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#E06A55] bg-white px-2.5 py-1 rounded-full border border-orange-200 shadow-2xs shrink-0">
            ⚡ Quick Add & Sync en Vivo
          </span>
        </div>

        {/* Product Grid: 2x4 on mobile / 4x1 on desktop per blueprint */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <p className="text-sm font-bold text-[#0B1B3D]">No encontramos regalos que coincidan con tu búsqueda.</p>
            <p className="text-xs text-slate-500">Intenta buscando con otra palabra o revisa nuestras categorías completas.</p>
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
              }}
              className="bg-[#0B1B3D] text-white text-xs font-bold py-2 px-5 rounded-full hover:bg-slate-800 transition-all"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onCustomize={(p) => setCustomizingProduct(p)}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Gift Builder Step-by-Step Module */}
      <GiftBuilderSection />

      {/* Social Proof & Testimonials */}
      <SocialProof />

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-outs */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenFullCustomizer={(p) => {
          setQuickViewProduct(null);
          setCustomizingProduct(p);
        }}
      />

      <GiftCustomizerModal
        product={customizingProduct}
        onClose={() => setCustomizingProduct(null)}
      />

      <CartDrawer
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <NotificationCenterModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <UserAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onCustomize={(p) => setCustomizingProduct(p)}
      />

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/525512345678?text=Hola%20Gifti%20Club,%20quisiera%20ayuda%20para%20personalizar%20un%20regalo"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-30 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        title="¿Dudas con tu regalo? Escríbenos a WhatsApp"
        aria-label="WhatsApp Asistencia"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
          ¿Ayuda con tu regalo?
        </span>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CartProvider>
          <WishlistProvider>
            <GiftiApp />
          </WishlistProvider>
        </CartProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
