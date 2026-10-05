import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';
import { Product, WishlistItem } from '../types';

interface WishlistContextType {
  wishlist: WishlistItem[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (product: Product) => Promise<void>;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gifti_wishlist');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return [];
        }
      }
    }
    return [];
  });

  useEffect(() => {
    if (!currentUser) {
      localStorage.setItem('gifti_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    try {
      const wishRef = collection(db, 'users', currentUser.uid, 'wishlist');
      const unsubscribe = onSnapshot(wishRef, (snapshot) => {
        const cloudItems: WishlistItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          cloudItems.push({
            id: docSnap.id,
            productId: data.productId,
            title: data.title,
            price: Number(data.price),
            image: data.image,
            category: data.category
          });
        });
        setWishlist(cloudItems);
      }, (error) => {
        console.warn('Wishlist onSnapshot error:', error);
      });

      return () => unsubscribe();
    } catch (err) {
      console.warn('Could not bind wishlist snapshot:', err);
    }
  }, [currentUser]);

  const isWishlisted = (productId: string) => {
    return wishlist.some(item => item.productId === productId);
  };

  const toggleWishlist = async (product: Product) => {
    const exists = isWishlisted(product.id);
    if (exists) {
      setWishlist(prev => prev.filter(item => item.productId !== product.id));
      if (currentUser) {
        try {
          const itemRef = doc(db, 'users', currentUser.uid, 'wishlist', product.id);
          await deleteDoc(itemRef);
        } catch (e) {
          console.warn('Could not delete wishlist item from cloud:', e);
        }
      }
    } else {
      const newItem: WishlistItem = {
        id: product.id,
        productId: product.id,
        title: product.name,
        price: product.price,
        image: product.image,
        category: product.categoryLabel
      };
      setWishlist(prev => [newItem, ...prev]);

      if (currentUser) {
        try {
          const itemRef = doc(db, 'users', currentUser.uid, 'wishlist', product.id);
          await setDoc(itemRef, {
            ...newItem,
            userId: currentUser.uid,
            addedAt: new Date().toISOString()
          });
        } catch (e) {
          console.warn('Could not save wishlist item to cloud:', e);
        }
      }
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isWishlisted,
        toggleWishlist,
        count: wishlist.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
