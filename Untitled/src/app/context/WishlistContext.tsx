import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type WishlistItem = {
  id: number;
  name: string;
  price: number;
  image?: string;
  inStock?: boolean;
};

type WishlistContextType = {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  toggleWishlist: (item: WishlistItem) => void;
  isWishlisted: (id: number) => boolean;
};

const STORAGE_KEY = "wishlist";

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const getWishlist = (): WishlistItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as WishlistItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveWishlist = (items: WishlistItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => getWishlist());

  useEffect(() => {
    saveWishlist(wishlistItems);
  }, [wishlistItems]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prev) => {
      if (prev.find((p) => p.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleWishlist = (item: WishlistItem) => {
    setWishlistItems((prev) => (prev.find((p) => p.id === item.id) ? prev.filter((p) => p.id !== item.id) : [...prev, item]));
  };

  const isWishlisted = (id: number) => wishlistItems.some((i) => i.id === id);

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
};

export default WishlistContext;
