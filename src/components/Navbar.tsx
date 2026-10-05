import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Bell,
  User as UserIcon,
  Menu,
  X,
  Sparkles,
  LogOut,
  Package,
  ShieldCheck
} from 'lucide-react';
import { GiftiLogo } from './GiftiLogo';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenNotifications: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  onSelectCategory: (cat: string) => void;
  selectedCategory: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenGiftBuilder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNotifications,
  onOpenWishlist,
  onOpenAccount,
  onSelectCategory,
  selectedCategory,
  searchQuery,
  setSearchQuery,
  onOpenGiftBuilder
}) => {
  const { totalCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { unreadCount } = useNotification();
  const { currentUser, userProfile, signOut, signInWithGoogle } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navCategories = [
    { id: 'todos', label: 'Todos los Regalos' },
    { id: 'llaveros', label: 'Llaveros & Placas' },
    { id: 'termos', label: 'Vasos Stanley & Tazas' },
    { id: 'ropa', label: 'Hoodies & Playeras' },
    { id: 'cuadros', label: 'Cuadros & Ofrendas' },
    { id: 'gaming', label: 'Gamer Setups' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-[#0B1B3D] focus:outline-none"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <div onClick={() => onSelectCategory('todos')}>
            <GiftiLogo variant="dark" size="md" />
          </div>

          {/* Search bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar por mascota, nombre, llavero, termo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs md:text-sm bg-[#F8F9FA] border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E06A55] focus:border-transparent transition-all placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Quick Gift Builder CTA button */}
          <button
            onClick={onOpenGiftBuilder}
            className="hidden xl:flex items-center gap-2 bg-gradient-to-r from-[#0B1B3D] to-[#1E293B] hover:from-[#152a57] hover:to-[#27354a] text-white text-xs font-semibold py-2 px-4 rounded-full border border-slate-700 shadow-xs hover:shadow-md transition-all group"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#38FFD0] group-hover:rotate-12 transition-transform" />
            <span>Arma tu Regalo</span>
            <span className="bg-[#E06A55] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1">
              3 Pasos
            </span>
          </button>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search toggle on mobile */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-[#0B1B3D]"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2.5 text-slate-700 hover:text-[#0B1B3D] hover:bg-slate-100 rounded-full transition-colors"
              title="Notificaciones push personalizadas"
              aria-label="Notificaciones"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#E06A55] text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-pulse ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-slate-700 hover:text-[#0B1B3D] hover:bg-slate-100 rounded-full transition-colors"
              title="Favoritos"
              aria-label="Favoritos"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#0B1B3D] text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* User Account / Auth */}
            <button
              onClick={onOpenAccount}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 text-slate-700 hover:text-[#0B1B3D] hover:bg-slate-100 rounded-full transition-colors"
              title="Mi Cuenta"
              aria-label="Mi Cuenta"
            >
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={userProfile?.displayName || 'Usuario'}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-[#E06A55]/40"
                />
              ) : currentUser ? (
                <div className="w-7 h-7 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center text-xs font-bold ring-2 ring-[#E06A55]/30">
                  {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'G'}
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold">
                  <UserIcon className="w-4 h-4" />
                </div>
              )}
              <span className="hidden sm:inline-block text-xs font-medium max-w-[90px] truncate">
                {currentUser?.displayName?.split(' ')[0] || 'Ingresar'}
              </span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 bg-[#E06A55] hover:bg-[#c95844] text-white py-2 px-3.5 rounded-full font-semibold shadow-xs hover:shadow-md transition-all group"
              aria-label="Abrir Carrito"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold">{totalCount}</span>
            </button>
          </div>
        </div>

        {/* Mobile search bar dropdown */}
        {searchOpen && (
          <div className="md:hidden py-3 border-t border-slate-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar regalos, nombres, razas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-[#F8F9FA] border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E06A55]"
                autoFocus
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Desktop Category navigation row */}
        <nav className="hidden lg:flex items-center justify-between py-2.5 border-t border-slate-100 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-1 sm:gap-2">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#0B1B3D] text-white font-semibold shadow-xs'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-[#0B1B3D] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E06A55]" />
              Garantía de Satisfacción 100%
            </span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
              ⚡ Envío Express 24-48h
            </span>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 shadow-lg">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Categorías Gifti
          </p>
          <div className="grid grid-cols-2 gap-2">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-xs font-medium ${
                  selectedCategory === cat.id
                    ? 'bg-[#0B1B3D] text-white'
                    : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onOpenGiftBuilder();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#0B1B3D] text-white text-xs font-bold py-2.5 rounded-xl shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#38FFD0]" />
              Arma tu Regalo Personalizado
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
