import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { ShoppingCart, Heart, User, Search, Menu } from "lucide-react";
import { useState } from "react";
import { CartProvider, useCart } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";

export function Layout() {
  return (
    <CartProvider>
      <WishlistProvider>
        <LayoutContent />
      </WishlistProvider>
    </CartProvider>
  );
}

function LayoutContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalCount } = useCart();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Shop" },
    { path: "/wishlist", label: "Wishlist" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-2xl font-bold text-white">
                ADITYA
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm transition-colors ${
                      location.pathname === link.path
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {!searchOpen ? (
                <button onClick={() => setSearchOpen(true)} className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-colors">
                  <Search className="w-4 h-4 text-white/70" />
                  <span className="text-sm text-white/70">Search</span>
                </button>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const q = searchQuery.trim();
                    if (q.length) navigate(`/products?search=${encodeURIComponent(q)}`);
                    else navigate(`/products`);
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="hidden md:flex items-center gap-2"
                >
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="px-3 py-2 rounded-xl bg-white/5 text-white text-sm focus:outline-none border border-white/10"
                  />
                  <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="px-3 py-2 rounded-xl bg-white/5 text-white/70">
                    Cancel
                  </button>
                </form>
              )}

              <Link to="/wishlist" className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <Heart className="w-5 h-5 text-white/90" />
              </Link>

              <Link to="/cart" className="p-2 hover:bg-white/10 rounded-xl transition-colors relative">
                <ShoppingCart className="w-5 h-5 text-white/90" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalCount}
                </span>
              </Link>

              <Link to="/login" className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <User className="w-5 h-5 text-white/90" />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <Menu className="w-5 h-5 text-white/90" />
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2 rounded-xl transition-colors ${
                      location.pathname === link.path
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="backdrop-blur-md bg-white/5 border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">ADITYA</h3>
              <p className="text-white/60 text-sm">
                Your one-stop destination for quality products at amazing prices.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Shop</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
                <li><Link to="/products?category=electronics" className="hover:text-white transition-colors">Electronics</Link></li>
                <li><Link to="/products?category=fashion" className="hover:text-white transition-colors">Fashion</Link></li>
                <li><Link to="/products?category=home" className="hover:text-white transition-colors">Home & Living</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Customer Service</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Connect</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/60">
            <p>&copy; 2026 ADITYA E-COMMERCE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
