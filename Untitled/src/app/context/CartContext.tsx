import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "../utils/currency";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  inStock?: boolean;
};

type CartContextType = {
  cartItems: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
};

const STORAGE_KEY = "cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

// Utility functions operating directly on localStorage (also provided for non-React pages)
export const getCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveCart = (cart: CartItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // ignore storage errors
  }
};

export const calculateCartTotal = (cart: CartItem[]) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);
  return { subtotal: +subtotal.toFixed(2), shipping, tax, total };
};

export const addToCart = (product: Omit<CartItem, "quantity">, qty = 1): CartItem[] => {
  const cart = getCart();
  const existing = cart.find((c) => c.id === product.id);
  let next: CartItem[];
  if (existing) {
    next = cart.map((c) => (c.id === product.id ? { ...c, quantity: c.quantity + qty } : c));
  } else {
    next = [...cart, { ...product, quantity: qty }];
  }
  saveCart(next);
  return next;
};

export const removeFromCart = (productId: number): CartItem[] => {
  const cart = getCart();
  const next = cart.filter((c) => c.id !== productId);
  saveCart(next);
  return next;
};

export const increaseQuantity = (productId: number): CartItem[] => {
  const cart = getCart();
  const next = cart.map((c) => (c.id === productId ? { ...c, quantity: c.quantity + 1 } : c));
  saveCart(next);
  return next;
};

export const decreaseQuantity = (productId: number): CartItem[] => {
  const cart = getCart();
  let next = cart.map((c) => (c.id === productId ? { ...c, quantity: c.quantity - 1 } : c));
  next = next.filter((c) => c.quantity > 0);
  saveCart(next);
  return next;
};

export const updateCartCount = () => getCart().reduce((s, i) => s + i.quantity, 0);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => getCart());

  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  const addItem = (item: Omit<CartItem, "quantity">, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + qty } : p));
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id: number, qty: number) => {
    setCartItems((prev) => {
      if (qty < 1) return prev.filter((p) => p.id !== id);
      return prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p));
    });
  };

  const clearCart = () => setCartItems([]);

  const totalCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, updateQuantity, clearCart, totalCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};

export default CartContext;
