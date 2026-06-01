import { useState } from "react";
import { Link } from "react-router";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { useCart } from "../context/CartContext";
import { formatINR, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "../utils/currency";

export function Cart() {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ShoppingBag className="w-24 h-24 text-white/30 mx-auto mb-6" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl mb-4 text-white font-bold"
          >
            Your cart is empty
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-white/60 mb-8"
          >
            Looks like you haven't added anything to your cart yet.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 backdrop-blur-md bg-white/20 border border-white/30 text-white rounded-2xl hover:bg-white/30 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-500" />
              <span className="relative">Start Shopping</span>
              <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-md bg-white/5 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl mb-2 text-white font-bold">Shopping Cart</h1>
          <p className="text-white/60">{cartItems.length} items in your cart</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-white/5 border-b border-white/10 text-sm text-white/60">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="divide-y divide-white/10">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                    className="p-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-6 flex gap-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link
                            to={`/products/${item.id}`}
                            className="w-24 h-24 bg-white/5 border border-white/10 rounded-xl overflow-hidden shrink-0 block"
                          >
                            <ImageWithFallback
                              src={item.image || ""}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </Link>
                        </motion.div>
                        <div className="flex-1">
                          <Link
                            to={`/products/${item.id}`}
                            className="font-medium text-white hover:text-white/80 transition-colors"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-white/60 mt-1">
                            {item.inStock ? (
                              <span className="text-green-400 flex items-center gap-1">
                                <Check className="w-4 h-4" /> In Stock
                              </span>
                            ) : (
                              <span className="text-red-400">Out of Stock</span>
                            )}
                          </p>
                          <motion.button
                            whileHover={{ color: "rgb(248, 113, 113)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 mt-2 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </motion.button>
                        </div>
                      </div>

                      <div className="md:col-span-2 md:text-center">
                        <span className="md:hidden text-sm text-white/60 mr-2">Price:</span>
                        <span className="text-lg text-white font-semibold">{formatINR(item.price)}</span>
                      </div>

                      <div className="md:col-span-2 flex md:justify-center">
                        <div className="flex items-center backdrop-blur-md bg-white/5 border border-white/10 rounded-xl">
                          <motion.button
                            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 transition-colors text-white"
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          <motion.span
                            key={item.quantity}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            className="px-4 text-lg text-white font-semibold"
                          >
                            {item.quantity}
                          </motion.span>
                          <motion.button
                            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 transition-colors text-white"
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="md:col-span-2 md:text-right">
                        <span className="md:hidden text-sm text-white/60 mr-2">Total:</span>
                        <span className="text-lg text-white font-bold">
                          {formatINR(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 flex justify-between items-center flex-wrap gap-4"
            >
              <Link
                to="/products"
                className="text-white/80 hover:text-white flex items-center gap-2 group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </Link>

              <motion.button
                whileHover={{ scale: 1.05, color: "rgb(248, 113, 113)" }}
                whileTap={{ scale: 0.95 }}
                onClick={clearCart}
                className="text-red-400 hover:text-red-300 flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                Clear Cart
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl mb-6 text-white font-bold">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-between text-white/70"
                >
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">{formatINR(subtotal)}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-between text-white/70"
                >
                  <span>Shipping</span>
                  <span className="text-white font-semibold">
                    {shipping === 0 ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-green-400 flex items-center gap-1"
                      >
                        <Check className="w-4 h-4" /> FREE
                      </motion.span>
                    ) : (
                      formatINR(shipping)
                    )}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-between text-white/70"
                >
                  <span>Tax (8%)</span>
                  <span className="text-white font-semibold">{formatINR(tax)}</span>
                </motion.div>

                <div className="border-t border-white/10 pt-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-between text-xl"
                  >
                    <span className="text-white font-bold">Total</span>
                    <span className="text-white font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{formatINR(total)}</span>
                  </motion.div>
                </div>
              </div>

              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6 p-4 backdrop-blur-md bg-blue-500/20 border border-blue-400/30 rounded-xl"
                >
                  <p className="text-sm text-blue-200 font-semibold">
                    Add {formatINR(FREE_SHIPPING_THRESHOLD - subtotal)} more to get FREE shipping!
                  </p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-2 bg-blue-900/30 rounded-full h-2 overflow-hidden"
                  >
                    <motion.div
                      className="bg-blue-400 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(subtotal / FREE_SHIPPING_THRESHOLD) * 100}%` }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    />
                  </motion.div>
                </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/checkout"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 backdrop-blur-md bg-white/20 border border-white/30 text-white rounded-2xl hover:bg-white/30 transition-all mb-4 group relative overflow-hidden font-semibold"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <div className="space-y-3">
                {[
                  "Secure checkout",
                  "Free returns within 30 days",
                  "2-year warranty included",
                ].map((text, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="flex items-center gap-2 text-sm text-white/60"
                  >
                    <Check className="w-5 h-5 text-green-400" />
                    {text}
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="mb-4 text-white font-bold">Have a promo code?</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-4 py-2 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 backdrop-blur-md bg-white/20 border border-white/30 text-white rounded-xl transition-all font-semibold"
                >
                  Apply
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
