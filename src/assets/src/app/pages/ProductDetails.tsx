import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Star, Heart, ShoppingCart, Truck, Shield, RefreshCw, Minus, Plus, Check } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/ImageWithFallback";

const productCatalog = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviews: 234,
    inStock: true,
    category: "electronics",
    description:
      "Experience clear wireless audio with comfortable over-ear cushions, long battery life, and reliable everyday connectivity.",
    features: ["Active noise reduction", "30-hour battery life", "Bluetooth connectivity", "Built-in microphone", "Foldable travel design", "Soft over-ear cushions"],
    images: [
      "https://images.unsplash.com/photo-1515940175183-6798529cb860?w=600",
      "https://images.unsplash.com/photo-1577048724846-cd9ff1dcacef?w=600",
      "https://images.unsplash.com/photo-1618166080964-cdb5843979b0?w=600",
      "https://images.unsplash.com/photo-1519335553051-96f1218cd5fa?w=600",
    ],
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 349.99,
    originalPrice: 449.99,
    rating: 4.9,
    reviews: 567,
    inStock: true,
    category: "electronics",
    description:
      "Track fitness, notifications, heart rate, and daily goals from a sleek smartwatch built for work and workouts.",
    features: ["Heart-rate tracking", "Fitness modes", "Notification alerts", "Water resistant", "Long battery life", "Touch display"],
    images: [
      "https://images.unsplash.com/photo-1519335553051-96f1218cd5fa?w=600",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    ],
  },
  {
    id: 3,
    name: "Premium Laptop",
    price: 1299.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 189,
    inStock: true,
    category: "electronics",
    description:
      "A powerful laptop for productivity, creative work, and entertainment with a sharp display and fast performance.",
    features: ["High-resolution display", "Fast processor", "Slim metal body", "Backlit keyboard", "All-day battery", "Fast storage"],
    images: [
      "https://images.unsplash.com/photo-1636115305669-9096bffe87fd?w=600",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
    ],
  },
  {
    id: 4,
    name: "Portable Speaker",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.6,
    reviews: 423,
    inStock: false,
    category: "electronics",
    description:
      "Compact wireless speaker with room-filling sound, simple controls, and a travel-friendly build.",
    features: ["Bluetooth audio", "Compact design", "Rechargeable battery", "Rich bass", "Easy pairing", "Durable shell"],
    images: [
      "https://images.unsplash.com/photo-1618166080964-cdb5843979b0?w=600",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600",
    ],
  },
  {
    id: 5,
    name: "Leather Bag",
    price: 149.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 312,
    inStock: true,
    category: "fashion",
    description:
      "A polished everyday leather bag with generous storage, durable stitching, and a timeless look.",
    features: ["Premium leather finish", "Spacious interior", "Secure zipper", "Adjustable strap", "Daily-use pockets", "Durable stitching"],
    images: [
      "https://images.unsplash.com/photo-1589363358751-ab05797e5629?w=600",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    ],
  },
  {
    id: 6,
    name: "Modern Chair",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.9,
    reviews: 156,
    inStock: true,
    category: "home",
    description:
      "A comfortable accent chair with clean lines, supportive seating, and a modern living-room profile.",
    features: ["Ergonomic seat", "Modern silhouette", "Sturdy frame", "Soft upholstery", "Easy placement", "Premium finish"],
    images: [
      "https://images.unsplash.com/photo-1616497633466-6c3f7a0cfa93?w=600",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600",
    ],
  },
  {
    id: 7,
    name: "Luxury Watch",
    price: 599.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 98,
    inStock: true,
    category: "fashion",
    description:
      "A refined statement watch with premium materials, precise movement, and dress-ready styling.",
    features: ["Premium case", "Precise movement", "Adjustable strap", "Scratch-resistant face", "Elegant dial", "Gift-ready design"],
    images: [
      "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?w=600",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600",
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=600",
    ],
  },
  {
    id: 8,
    name: "Designer Sunglasses",
    price: 179.99,
    originalPrice: 249.99,
    rating: 4.5,
    reviews: 267,
    inStock: true,
    category: "fashion",
    description:
      "Stylish sunglasses with a flattering frame, comfortable fit, and dependable UV protection.",
    features: ["UV protection", "Lightweight frame", "Comfortable nose pads", "Scratch-resistant lenses", "Modern shape", "Protective case"],
    images: [
      "https://images.unsplash.com/photo-1537832816519-689ad163238b?w=600",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600",
    ],
  },
  {
    id: 9,
    name: "Circuit Board Kit",
    price: 79.99,
    originalPrice: null,
    rating: 4.4,
    reviews: 145,
    inStock: true,
    category: "electronics",
    description:
      "A practical electronics kit for prototyping, learning, and building small hardware projects.",
    features: ["Starter components", "Prototype-friendly", "Reusable modules", "Compact parts", "Learning focused", "Project ready"],
    images: [
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=600",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600",
      "https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=600",
    ],
  },
  {
    id: 10,
    name: "Gold Necklace",
    price: 249.99,
    originalPrice: 349.99,
    rating: 4.9,
    reviews: 203,
    inStock: true,
    category: "fashion",
    description:
      "An elegant gold-tone necklace designed to elevate daily outfits and special occasion looks.",
    features: ["Polished finish", "Elegant chain", "Secure clasp", "Lightweight feel", "Occasion ready", "Giftable packaging"],
    images: [
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600",
    ],
  },
  {
    id: 11,
    name: "Modern Sofa",
    price: 899.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 87,
    inStock: true,
    category: "home",
    description:
      "A roomy modern sofa with comfortable cushions and a clean design made for relaxed living spaces.",
    features: ["Deep cushions", "Modern frame", "Soft upholstery", "Durable support", "Lounge friendly", "Neutral styling"],
    images: [
      "https://images.unsplash.com/photo-1631510083755-11ecb5172d81?w=600",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
      "https://images.unsplash.com/photo-1493663284031-b7e3aaa4cab7?w=600",
      "https://images.unsplash.com/photo-1512212621149-107ffe572d2f?w=600",
    ],
  },
  {
    id: 12,
    name: "Dining Table Set",
    price: 1199.99,
    originalPrice: 1499.99,
    rating: 4.8,
    reviews: 124,
    inStock: true,
    category: "home",
    description:
      "A complete dining set with a warm finish, sturdy construction, and enough presence for family meals.",
    features: ["Complete table set", "Sturdy construction", "Warm wood tone", "Comfortable seating", "Easy styling", "Family sized"],
    images: [
      "https://images.unsplash.com/photo-1602872029708-84d970d3382b?w=600",
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600",
      "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=600",
      "https://images.unsplash.com/photo-1549497538-303791108f95?w=600",
    ],
  },
];

const getSpecifications = (product: (typeof productCatalog)[number]) => ({
  Brand: `ADITYA ${product.category === "home" ? "Home" : product.category === "fashion" ? "Style" : "Tech"}`,
  Model: `AD-${String(product.id).padStart(3, "0")}`,
  Category: product.category === "home" ? "Home & Living" : product.category[0].toUpperCase() + product.category.slice(1),
  Availability: product.inStock ? "In Stock" : "Out of Stock",
  Rating: `${product.rating} / 5`,
  Warranty: "2 years",
});

export function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const productId = Number(id);
  const baseProduct = productCatalog.find((item) => item.id === productId) ?? productCatalog[0];
  const product = {
    ...baseProduct,
    specifications: getSpecifications(baseProduct),
  };

  useEffect(() => {
    setSelectedImage(0);
  }, [productId]);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Absolutely love these headphones! The sound quality is amazing and the noise cancellation works perfectly. Great value for money.",
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      date: "1 month ago",
      comment:
        "Very comfortable to wear for long periods. Battery life is excellent. Only minor issue is the carrying case could be a bit more compact.",
    },
    {
      id: 3,
      name: "Emily Davis",
      rating: 5,
      date: "1 month ago",
      comment:
        "Best headphones I've ever owned. The audio quality is exceptional and they're so comfortable I forget I'm wearing them.",
    },
  ];

  const relatedProducts = [
    {
      id: 2,
      name: "Smart Watch",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1519335553051-96f1218cd5fa?w=300",
      rating: 4.9,
    },
    {
      id: 4,
      name: "Portable Speaker",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1618166080964-cdb5843979b0?w=300",
      rating: 4.6,
    },
    {
      id: 3,
      name: "Premium Laptop",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1636115305669-9096bffe87fd?w=300",
      rating: 4.7,
    },
    {
      id: 9,
      name: "Circuit Board Kit",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=300",
      rating: 4.4,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <nav className="text-sm text-white/60">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-white transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 mb-12"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div
              className="aspect-square bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-4"
              whileHover={{ borderColor: "rgba(255,255,255,0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white/5 rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-white/50" : "border-white/10"
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl mb-4 text-white font-bold"
            >
              {product.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.div key={star} whileHover={{ scale: 1.2 }}>
                    <Star
                      className={`w-5 h-5 ${
                        star <= Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-white/30"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
              <span className="text-sm text-white/80">{product.rating}</span>
              <span className="text-sm text-white/50">({product.reviews} reviews)</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-baseline gap-4 mb-6"
            >
              <span className="text-4xl text-white font-bold">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-white/50 line-through">
                    ${product.originalPrice}
                  </span>
                  <motion.span
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="px-3 py-1 backdrop-blur-md bg-red-500/30 border border-red-400/50 text-red-200 text-sm rounded-full font-bold"
                  >
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </motion.span>
                </>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-white/70 mb-6"
            >
              {product.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="grid grid-cols-3 gap-4 mb-6"
            >
              {[
                { icon: Truck, label: "Free Shipping", value: "2-3 days" },
                { icon: Shield, label: "Warranty", value: "2 years" },
                { icon: RefreshCw, label: "Returns", value: "30 days" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.05, duration: 0.5 }}
                  className="flex items-center gap-2 p-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                  whileHover={{ y: -5 }}
                >
                  <item.icon className="w-5 h-5 text-white/80" />
                  <div>
                    <div className="text-xs text-white/50">{item.label}</div>
                    <div className="text-sm text-white font-semibold">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mb-6"
            >
              <label className="block text-sm mb-2 text-white/80 font-semibold">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center backdrop-blur-md bg-white/5 border border-white/10 rounded-xl">
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 transition-colors text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <motion.span
                    key={quantity}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="px-6 text-lg text-white font-semibold"
                  >
                    {quantity}
                  </motion.span>
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 transition-colors text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>

                {product.inStock ? (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-green-400 flex items-center gap-1 font-semibold"
                  >
                    <Check className="w-4 h-4" /> In Stock
                  </motion.span>
                ) : (
                  <span className="text-sm text-red-400">Out of Stock</span>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex gap-4 mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-8 py-4 backdrop-blur-md bg-white/20 border border-white/30 text-white rounded-xl transition-all flex items-center justify-center gap-2 font-semibold"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl transition-colors"
              >
                <Heart className="w-5 h-5 text-white/90" />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="border-t border-white/10 pt-6"
            >
              <h3 className="mb-3 text-white font-bold">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.05, duration: 0.3 }}
                    className="flex items-start gap-2 text-sm text-white/70"
                  >
                    <span className="text-white/80 mt-1 font-bold">✓</span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <h2 className="text-2xl mb-6 text-white font-bold">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="flex justify-between py-3 border-b border-white/10"
                >
                  <span className="text-white/60">{key}</span>
                  <span className="font-medium text-white">{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <h2 className="text-2xl mb-6 text-white font-bold">Delivery Info</h2>
            <div className="space-y-4">
              {[
                { icon: Truck, title: "Standard Delivery", desc: "Free shipping on orders over $50. Delivery in 2-3 business days." },
                { icon: RefreshCw, title: "Easy Returns", desc: "30-day return policy. No questions asked." },
                { icon: Shield, title: "Warranty", desc: "2-year manufacturer warranty included." },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="w-5 h-5 text-white/80" />
                    <span className="font-medium text-white">{item.title}</span>
                  </div>
                  <p className="text-sm text-white/60">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl mb-6 text-white font-bold">Customer Reviews</h2>

          <div className="mb-8">
            <div className="flex items-center gap-8">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl mb-2 text-white font-bold">{product.rating}</div>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-white/30"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-white/60">{product.reviews} reviews</div>
              </motion.div>

              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((stars, index) => (
                  <motion.div
                    key={stars}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center gap-1 text-white/80">
                      {stars}
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <motion.div
                      className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden"
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="bg-yellow-400 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 5}%` }}
                        transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                        viewport={{ once: true }}
                      />
                    </motion.div>
                    <div className="text-sm text-white/60 w-12">
                      {stars === 5 ? "70%" : stars === 4 ? "20%" : "5%"}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="border-b border-white/10 pb-6 last:border-0"
              >
                <div className="flex items-center gap-4 mb-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center"
                  >
                    <span className="text-white font-bold">{review.name[0]}</span>
                  </motion.div>
                  <div>
                    <div className="font-medium text-white">{review.name}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-white/30"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-white/50">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-white/70">{review.comment}</p>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 w-full px-6 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl transition-colors text-white font-semibold"
          >
            Load More Reviews
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8"
        >
          <h2 className="text-2xl mb-6 text-white font-bold">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/products/${relatedProduct.id}`}
                  className="group"
                >
                  <motion.div
                    className="aspect-square bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-3 hover:border-white/20 transition-colors"
                    whileHover={{ y: -5 }}
                  >
                    <ImageWithFallback
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                  <h3 className="mb-2 text-white group-hover:text-white/80 transition-colors line-clamp-2 font-semibold">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-white/80">{relatedProduct.rating}</span>
                  </div>
                  <div className="text-lg mt-1 text-white font-bold">${relatedProduct.price}</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
