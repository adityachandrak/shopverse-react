import { useState } from "react";
import { Link } from "react-router";
import { SlidersHorizontal, Star, Grid3x3, List, X, Check } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/ImageWithFallback";

export function ProductListing() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 199.99,
      originalPrice: 299.99,
      image: "https://images.unsplash.com/photo-1515940175183-6798529cb860?w=400",
      rating: 4.8,
      reviews: 234,
      category: "electronics",
      inStock: true,
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 349.99,
      originalPrice: 449.99,
      image: "https://images.unsplash.com/photo-1519335553051-96f1218cd5fa?w=400",
      rating: 4.9,
      reviews: 567,
      category: "electronics",
      inStock: true,
    },
    {
      id: 3,
      name: "Premium Laptop",
      price: 1299.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1636115305669-9096bffe87fd?w=400",
      rating: 4.7,
      reviews: 189,
      category: "electronics",
      inStock: true,
    },
    {
      id: 4,
      name: "Portable Speaker",
      price: 89.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1618166080964-cdb5843979b0?w=400",
      rating: 4.6,
      reviews: 423,
      category: "electronics",
      inStock: false,
    },
    {
      id: 5,
      name: "Leather Bag",
      price: 149.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1589363358751-ab05797e5629?w=400",
      rating: 4.8,
      reviews: 312,
      category: "fashion",
      inStock: true,
    },
    {
      id: 6,
      name: "Modern Chair",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1616497633466-6c3f7a0cfa93?w=400",
      rating: 4.9,
      reviews: 156,
      category: "home",
      inStock: true,
    },
    {
      id: 7,
      name: "Luxury Watch",
      price: 599.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?w=400",
      rating: 4.7,
      reviews: 98,
      category: "fashion",
      inStock: true,
    },
    {
      id: 8,
      name: "Designer Sunglasses",
      price: 179.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1537832816519-689ad163238b?w=400",
      rating: 4.5,
      reviews: 267,
      category: "fashion",
      inStock: true,
    },
    {
      id: 9,
      name: "Circuit Board Kit",
      price: 79.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=400",
      rating: 4.4,
      reviews: 145,
      category: "electronics",
      inStock: true,
    },
    {
      id: 10,
      name: "Gold Necklace",
      price: 249.99,
      originalPrice: 349.99,
      image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400",
      rating: 4.9,
      reviews: 203,
      category: "fashion",
      inStock: true,
    },
    {
      id: 11,
      name: "Modern Sofa",
      price: 899.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1631510083755-11ecb5172d81?w=400",
      rating: 4.7,
      reviews: 87,
      category: "home",
      inStock: true,
    },
    {
      id: 12,
      name: "Dining Table Set",
      price: 1199.99,
      originalPrice: 1499.99,
      image: "https://images.unsplash.com/photo-1602872029708-84d970d3382b?w=400",
      rating: 4.8,
      reviews: 124,
      category: "home",
      inStock: true,
    },
  ];

  const categories = [
    { id: "all", name: "All Products", count: 12 },
    { id: "electronics", name: "Electronics", count: 5 },
    { id: "fashion", name: "Fashion", count: 4 },
    { id: "home", name: "Home & Living", count: 3 },
  ];

  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "0-100", name: "Under $100" },
    { id: "100-300", name: "$100 - $300" },
    { id: "300-600", name: "$300 - $600" },
    { id: "600+", name: "$600+" },
  ];

  const sortOptions = [
    { id: "popular", name: "Most Popular" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "rating", name: "Highest Rated" },
    { id: "newest", name: "Newest" },
  ];

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false;
    }

    if (selectedPriceRange !== "all") {
      const price = product.price;
      if (selectedPriceRange === "0-100" && price >= 100) return false;
      if (selectedPriceRange === "100-300" && (price < 100 || price >= 300)) return false;
      if (selectedPriceRange === "300-600" && (price < 300 || price >= 600)) return false;
      if (selectedPriceRange === "600+" && price < 600) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-md bg-white/5 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl mb-2 text-white font-bold">Shop All Products</h1>
          <p className="text-white/60">Discover our complete collection</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className={`${showFilters ? "block" : "hidden"} lg:block w-64 shrink-0`}
          >
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-white">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-sm mb-3 text-white/80 font-bold">Category</h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-all ${
                        selectedCategory === category.id
                          ? "bg-white/20 text-white border border-white/30"
                          : "hover:bg-white/10 text-white/70 border border-white/0 hover:border-white/20"
                      }`}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{category.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/50">{category.count}</span>
                          {selectedCategory === category.id && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm mb-3 text-white/80 font-bold">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <motion.button
                      key={range.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index + categories.length) * 0.05, duration: 0.3 }}
                      onClick={() => setSelectedPriceRange(range.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-all ${
                        selectedPriceRange === range.id
                          ? "bg-white/20 text-white border border-white/30"
                          : "hover:bg-white/10 text-white/70 border border-white/0 hover:border-white/20"
                      }`}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{range.name}</span>
                        {selectedPriceRange === range.id && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedPriceRange("all");
                }}
                className="w-full px-4 py-2 text-sm text-white border border-white/30 rounded-xl hover:bg-white/10 transition-colors font-semibold"
              >
                Clear All Filters
              </motion.button>
            </div>
          </motion.aside>

          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 mb-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors text-white font-semibold"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </motion.button>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-white/60"
                  >
                    {filteredProducts.length} products
                  </motion.span>
                </div>

                <div className="flex items-center gap-4">
                  <motion.select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    whileHover={{ borderColor: "rgba(255,255,255,0.3)" }}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id} className="bg-slate-800">
                        {option.name}
                      </option>
                    ))}
                  </motion.select>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-xl transition-colors ${
                        viewMode === "grid"
                          ? "bg-white/20 text-white border border-white/30"
                          : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      <Grid3x3 className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-xl transition-colors ${
                        viewMode === "list"
                          ? "bg-white/20 text-white border border-white/30"
                          : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {viewMode === "grid" ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index % 6) * 0.05, duration: 0.5 }}
                    layout
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
                        {!product.inStock && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
                          >
                            <span className="px-4 py-2 bg-white/20 border border-white/30 text-white text-sm rounded-xl">
                              Out of Stock
                            </span>
                          </motion.div>
                        )}
                        {product.originalPrice && (
                          <motion.span
                            initial={{ scale: 0, rotate: -10 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2 }}
                            className="absolute top-3 left-3 px-3 py-1 bg-red-500/80 backdrop-blur-sm text-white text-xs rounded-full font-bold"
                          >
                            Sale
                          </motion.span>
                        )}
                      </div>

                      <div className="p-4">
                        <h3 className="mb-2 text-white group-hover:text-white/80 transition-colors line-clamp-2 font-semibold">
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
              </motion.div>
            ) : (
              <motion.div layout className="space-y-4">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index % 6) * 0.05, duration: 0.5 }}
                    layout
                  >
                    <Link
                      to={`/products/${product.id}`}
                      className="group backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all overflow-hidden flex"
                    >
                      <div className="relative w-48 h-48 shrink-0 overflow-hidden">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {!product.inStock && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
                          >
                            <span className="px-4 py-2 bg-white/20 border border-white/30 text-white text-sm rounded-xl">
                              Out of Stock
                            </span>
                          </motion.div>
                        )}
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl mb-2 text-white group-hover:text-white/80 transition-colors font-bold">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-white/80">{product.rating}</span>
                            </div>
                            <span className="text-sm text-white/50">({product.reviews} reviews)</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl text-white font-bold">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-white/50 line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 backdrop-blur-md bg-white/20 border border-white/30 text-white rounded-xl transition-colors font-semibold"
                          >
                            View Details
                          </motion.button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
