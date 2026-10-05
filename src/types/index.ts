export interface Product {
  id: string;
  sku?: string;
  vendor?: string;
  inventory?: number;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: 'llaveros' | 'termos' | 'ropa' | 'cuadros' | 'velas' | 'gaming';
  categoryLabel: string;
  rating: number;
  reviewsCount: number;
  image: string;
  hoverImage?: string;
  gallery?: string[];
  badge?: string;
  description: string;
  isCustomizable: boolean;
  customizationType?: 'name' | 'photo_name' | 'pet_name' | 'quote';
  defaultCustomText?: string;
  variants?: string[];
  features: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  customText?: string;
  selectedVariant?: string;
  giftWrap?: boolean;
  giftNote?: string;
  recipientName?: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  petName?: string;
  verified: boolean;
}

export interface WishlistItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  category: string;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: 'order' | 'shipping' | 'promo' | 'abandoned_cart' | 'welcome';
  date: string;
  read: boolean;
  actionUrl?: string;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: {
    street: string;
    colonia: string;
    city: string;
    state: string;
    postalCode: string;
  };
  items: CartItem[];
  subtotal: number;
  giftWrapTotal: number;
  shippingCost: number;
  total: number;
  paymentMethod: 'card' | 'oxxo' | 'mercadopago' | 'kueski';
  status: 'confirmado' | 'preparando' | 'enviado' | 'entregado';
  trackingNumber: string;
  oxxoBarcode?: string;
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phone?: string;
  pushEnabled?: boolean;
  savedAddress?: {
    street: string;
    colonia: string;
    city: string;
    state: string;
    postalCode: string;
  };
}
