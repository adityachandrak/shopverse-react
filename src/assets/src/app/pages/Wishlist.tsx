import { useState } from "react";
import { Link } from "react-router";
import { Heart, ShoppingCart, X, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/ImageWithFallback";

export function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 199.99,
      originalPrice: 299.99,
      image: "https://images.unsplash.com/photo-1515940175183-6798529cb860?w=400",
      rating: 4.8,
      inStock: true,
    },
    {
      id: 5,
      name: "Leather Bag",
      price: 149.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1589363358751-ab05797e5629?w=400",
      rating: 4.8,
      inStock: true,
    },
    {
      id: 6,
      name: "Modern Chair",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1616497633466-6c3f7a0cfa93?w=400",
      rating: 4.9,
      inStock: true,
    },
    {
      id: 7,
      name: "Luxury Watch",
      price: 599.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?w=400",
      rating: 4.7,
      inStock: false,
    },
    {
      id: 8,
      name: "Designer Sunglasses",
      price: 179.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1537832816519-689ad163238b?w=400",
      rating: 4.5,
      inStock: true,
    },
    {
      id: 11,
      name: "Modern Sofa",
      price: 899.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1631510083755-11ecb5172d81?w=400",
      rating: 4.7,
      inStock: true,
    },
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-24 h-24 text-white/30 mx-auto mb-6" />
          <h2 className="text-3xl mb-4 text-white">Your wishlist is empty</h2>
          <p className="text-white/60 mb-8">
            Save your favorite items here so you can easily find them later.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 backdrop-blur-md bg-white/20 border border-white/30 text-white rounded-2xl hover:bg-white/30 transition-all"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-white fill-white" />
            <h1 className="text-3xl text-white">My Wishlist</h1>
          </div>
          <p className="text-white/60">{wishlistItems.length} items saved</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden group relative"
            >
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-3 right-3 z-10 w-8 h-8 backdrop-blur-md bg-white/20 border border-white/30 rounded-full flex items-center justify-center hover:bg-red-500/50 transition-all"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              <Link to={`/products/${item.id}`} className="block">
                <div className="relative aspect-square overflow-hidden backdrop-blur-md bg-white/5">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="px-4 py-2 backdrop-blur-md bg-white/20 border border-white/30 text-white text-sm rounded-xl">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  {item.originalPrice && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs rounded-full">
                      Sale
                    </span>
                  )}
                </div>
              </Link>

              <div className="p-4">
                <Link
                  to={`/products/${item.id}`}
                  className="block text-white hover:text-white/80 transition-colors mb-2"
                >
                  <h3>{item.name}</h3>
                </Link>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-white/70">{item.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl text-white">${item.price}</span>
                  {item.originalPrice && (
                    <>
                      <span className="text-sm text-white/50 line-through">
                        ${item.originalPrice}
                      </span>
                      <span className="text-xs text-red-400">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>

                <button
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
                    item.inStock
                      ? "backdrop-blur-md bg-white/20 border border-white/30 text-white hover:bg-white/30"
                      : "backdrop-blur-md bg-white/5 border border-white/10 text-white/50 cursor-not-allowed"
                  }`}
                  disabled={!item.inStock}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl mb-4 text-white">Looking for More?</h2>
          <p className="text-white/60 mb-6">
            Explore our full collection and discover amazing products
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 backdrop-blur-md bg-white/20 border border-white/30 text-white rounded-2xl hover:bg-white/30 transition-all"
          >
            Browse All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="mt-8 backdrop-blur-md bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl mb-2 text-white">Share Your Wishlist</h3>
              <p className="text-white/70">
                Let your friends and family know what you love
              </p>
            </div>
            <div className="flex gap-4">
              <button className="w-12 h-12 backdrop-blur-md bg-white/20 border border-white/30 rounded-xl hover:bg-white/30 transition-all flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="w-12 h-12 backdrop-blur-md bg-white/20 border border-white/30 rounded-xl hover:bg-white/30 transition-all flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button className="w-12 h-12 backdrop-blur-md bg-white/20 border border-white/30 rounded-xl hover:bg-white/30 transition-all flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>
              </button>
              <button className="px-6 py-3 backdrop-blur-md bg-white/90 text-slate-900 rounded-xl hover:bg-white transition-all">
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
