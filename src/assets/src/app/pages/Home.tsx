import { Link } from "react-router";
import { ArrowRight, Smartphone, Shirt, Home as HomeIcon, Star, TrendingUp, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/ImageWithFallback";

export function Home() {
  const categories = [
    {
      id: "electronics",
      name: "Electronics",
      icon: Smartphone,
      image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=400",
      count: "2,345 items",
    },
    {
      id: "fashion",
      name: "Fashion",
      icon: Shirt,
      image: "https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?w=400",
      count: "5,678 items",
    },
    {
      id: "home",
      name: "Home & Living",
      icon: HomeIcon,
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400",
      count: "1,234 items",
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 199.99,
      originalPrice: 299.99,
      image: "https://images.unsplash.com/photo-1515940175183-6798529cb860?w=400",
      rating: 4.8,
      reviews: 234,
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 349.99,
      originalPrice: 449.99,
      image: "https://images.unsplash.com/photo-1519335553051-96f1218cd5fa?w=400",
      rating: 4.9,
      reviews: 567,
      badge: "Hot Deal",
    },
    {
      id: 3,
      name: "Premium Laptop",
      price: 1299.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1636115305669-9096bffe87fd?w=400",
      rating: 4.7,
      reviews: 189,
      badge: null,
    },
    {
      id: 4,
      name: "Portable Speaker",
      price: 89.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1618166080964-cdb5843979b0?w=400",
      rating: 4.6,
      reviews: 423,
      badge: "Sale",
    },
    {
      id: 5,
      name: "Leather Bag",
      price: 149.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1589363358751-ab05797e5629?w=400",
      rating: 4.8,
      reviews: 312,
      badge: "New",
    },
    {
      id: 6,
      name: "Modern Chair",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1616497633466-6c3f7a0cfa93?w=400",
      rating: 4.9,
      reviews: 156,
      badge: "Trending",
    },
    {
      id: 7,
      name: "Luxury Watch",
      price: 599.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?w=400",
      rating: 4.7,
      reviews: 98,
      badge: null,
    },
    {
      id: 8,
      name: "Designer Sunglasses",
      price: 179.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1537832816519-689ad163238b?w=400",
      rating: 4.5,
      reviews: 267,
      badge: "Sale",
    },
  ];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-pink-600/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-full text-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span className="text-white">Summer Sale - Up to 50% Off</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-6xl mb-6 text-white font-bold"
            >
              Discover Amazing <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Products</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl mb-8 text-white/80"
            >
              Shop the latest trends in electronics, fashion, and home decor. Quality products at unbeatable prices.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/products"
                className="group relative px-8 py-4 text-white rounded-2xl font-semibold overflow-hidden backdrop-blur-xl bg-pink-500/20 border border-pink-200/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-16px_28px_rgba(236,72,153,0.35),0_18px_42px_rgba(236,72,153,0.26)] hover:bg-pink-400/25 hover:border-pink-100/60 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/35 via-pink-300/18 to-pink-700/35" />
                <div className="absolute inset-x-4 top-2 h-1/2 rounded-full bg-white/25 blur-xl opacity-80" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <div className="relative flex items-center gap-2">
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link
                to="/login?mode=signup"
                className="group relative px-8 py-4 text-white rounded-2xl font-semibold overflow-hidden backdrop-blur-xl bg-green-500/20 border border-green-200/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-16px_28px_rgba(34,197,94,0.35),0_18px_42px_rgba(34,197,94,0.24)] hover:bg-green-400/25 hover:border-green-100/60 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/35 via-green-300/18 to-green-700/35" />
                <div className="absolute inset-x-4 top-2 h-1/2 rounded-full bg-white/25 blur-xl opacity-80" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Sign Up</span>
              </Link>
              <Link
                to="/login"
                className="group relative px-8 py-4 text-white rounded-2xl font-semibold overflow-hidden backdrop-blur-xl bg-blue-500/20 border border-blue-200/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-16px_28px_rgba(59,130,246,0.35),0_18px_42px_rgba(59,130,246,0.23)] hover:bg-blue-400/25 hover:border-blue-100/60 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/35 via-blue-300/18 to-blue-700/35" />
                <div className="absolute inset-x-4 top-2 h-1/2 rounded-full bg-white/25 blur-xl opacity-80" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Sign In</span>
              </Link>
              <Link
                to="/products?deals=true"
                className="group relative px-8 py-4 text-white rounded-2xl font-semibold overflow-hidden backdrop-blur-xl bg-red-500/20 border border-red-200/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-16px_28px_rgba(239,68,68,0.35),0_18px_42px_rgba(239,68,68,0.22)] hover:bg-red-400/25 hover:border-red-100/60 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/35 via-red-300/18 to-red-700/35" />
                <div className="absolute inset-x-4 top-2 h-1/2 rounded-full bg-white/25 blur-xl opacity-80" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">View Deals</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl mb-8 text-white font-bold"
          >
            Shop by Category
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={`/products?category=${category.id}`}
                    className="group relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all h-64 flex flex-col justify-end"
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <ImageWithFallback
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-40"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    <motion.div
                      className="relative z-10 p-6"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-6 h-6 text-white group-hover:scale-125 transition-transform duration-300" />
                        <h3 className="text-2xl text-white font-bold">{category.name}</h3>
                      </div>
                      <p className="text-white/70 text-sm">{category.count}</p>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8 flex-wrap gap-4"
          >
            <div>
              <h2 className="text-3xl mb-2 text-white font-bold">Featured Products</h2>
              <p className="text-white/60">Handpicked items just for you</p>
            </div>
            <Link
              to="/products"
              className="text-white/80 hover:text-white flex items-center gap-2 group"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 4) * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/products/${product.id}`}
                  className="group backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all overflow-hidden block h-full"
                >
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <button className="w-full py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all font-semibold">
                        <Zap className="w-4 h-4 inline mr-2" />
                        Quick View
                      </button>
                    </motion.div>
                    {product.badge && (
                      <motion.span
                        initial={{ scale: 0, rotate: -10 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className={`absolute top-3 left-3 px-3 py-1 text-xs text-white backdrop-blur-md rounded-full font-bold ${
                          product.badge === "Best Seller" ? "bg-purple-500/80" :
                          product.badge === "Hot Deal" ? "bg-red-500/80" :
                          product.badge === "Sale" ? "bg-orange-500/80" :
                          product.badge === "New" ? "bg-green-500/80" :
                          "bg-blue-500/80"
                        }`}
                      >
                        {product.badge}
                      </motion.span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="mb-2 text-white group-hover:text-white/80 transition-colors line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-white/80">{product.rating}</span>
                      </div>
                      <span className="text-sm text-white/50">({product.reviews})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xl text-white font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-white/50 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="backdrop-blur-md bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-white/10 rounded-2xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-6 h-6 text-white animate-bounce" />
                  <span className="text-sm uppercase tracking-wide text-white/80 font-bold">Limited Time Offer</span>
                </div>
                <h2 className="text-4xl md:text-5xl mb-4 text-white font-bold">
                  Flash Sale
                </h2>
                <p className="text-xl mb-6 text-white/80">
                  Get up to 70% off on selected items. Don't miss out on these incredible deals!
                </p>
                <div className="flex gap-4 mb-6 flex-wrap">
                  {[
                    { value: "12", label: "Hours" },
                    { value: "34", label: "Minutes" },
                    { value: "56", label: "Seconds" },
                  ].map((time, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 text-center"
                    >
                      <div className="text-3xl text-white mb-1 font-bold">{time.value}</div>
                      <div className="text-sm text-white/70">{time.label}</div>
                    </motion.div>
                  ))}
                </div>
                <Link
                  to="/products?sale=true"
                  className="inline-block group relative px-8 py-4 text-white rounded-2xl font-semibold overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 group-hover:scale-110 transition-transform duration-300 rounded-2xl" />
                  <div className="relative">Shop Flash Sale</div>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  "https://images.unsplash.com/photo-1577048724846-cd9ff1dcacef?w=300",
                  "https://images.unsplash.com/photo-1620783770629-122b7f187703?w=300",
                  "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=300",
                  "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300",
                ].map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, rotate: -10 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="aspect-square rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <ImageWithFallback
                      src={img}
                      alt="Flash sale product"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                ),
                title: "Free Shipping",
                desc: "On orders over $50",
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Secure Payment",
                desc: "100% secure transactions",
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
                title: "Easy Returns",
                desc: "30-day return policy",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-6 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all text-center"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl mb-2 text-white font-bold">{feature.title}</h3>
                <p className="text-white/60">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
