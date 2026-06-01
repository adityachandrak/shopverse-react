import { useState } from "react";
import { Link } from "react-router";
import { CreditCard, Truck, MapPin, Lock } from "lucide-react";
import { ImageWithFallback } from "../components/ImageWithFallback";

export function Checkout() {
  const [step, setStep] = useState<"shipping" | "payment" | "review">("shipping");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "bank">("card");

  const cartItems = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 199.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1515940175183-6798529cb860?w=100",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 349.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1519335553051-96f1218cd5fa?w=100",
    },
    {
      id: 5,
      name: "Leather Bag",
      price: 149.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1589363358751-ab05797e5629?w=100",
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen">
      <div className="backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl mb-2 text-white">Checkout</h1>
          <div className="flex items-center gap-4 mt-6">
            <div className={`flex items-center gap-2 ${step === "shipping" ? "text-white" : "text-white/40"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "shipping" ? "backdrop-blur-md bg-white/20 border border-white/30 text-white" : "backdrop-blur-md bg-white/5 border border-white/10"}`}>
                1
              </div>
              <span className="text-sm">Shipping</span>
            </div>
            <div className="flex-1 h-0.5 bg-white/10" />
            <div className={`flex items-center gap-2 ${step === "payment" ? "text-white" : "text-white/40"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "payment" ? "backdrop-blur-md bg-white/20 border border-white/30 text-white" : "backdrop-blur-md bg-white/5 border border-white/10"}`}>
                2
              </div>
              <span className="text-sm">Payment</span>
            </div>
            <div className="flex-1 h-0.5 bg-white/10" />
            <div className={`flex items-center gap-2 ${step === "review" ? "text-white" : "text-white/40"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "review" ? "backdrop-blur-md bg-white/20 border border-white/30 text-white" : "backdrop-blur-md bg-white/5 border border-white/10"}`}>
                3
              </div>
              <span className="text-sm">Review</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === "shipping" && (
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 backdrop-blur-md bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl text-white">Shipping Information</h2>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm mb-2 text-white/70">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-white/70">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-white/70">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-white/70">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-white/70">Street Address</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm mb-2 text-white/70">City</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-white/70">State</label>
                      <select className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30">
                        <option className="bg-slate-800">Select State</option>
                        <option className="bg-slate-800">New York</option>
                        <option className="bg-slate-800">California</option>
                        <option className="bg-slate-800">Texas</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-white/70">ZIP Code</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="10001"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="save-address" className="w-4 h-4" />
                    <label htmlFor="save-address" className="text-sm text-white/70">
                      Save this address for future orders
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep("payment")}
                    className="w-full px-6 py-4 backdrop-blur-md bg-white/20 border border-white/30 text-white rounded-2xl hover:bg-white/30 transition-all"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {step === "payment" && (
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 backdrop-blur-md bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl text-white">Payment Method</h2>
                </div>

                <div className="space-y-4 mb-8">
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`w-full p-4 border-2 rounded-xl transition-all flex items-center gap-4 ${
                      paymentMethod === "card" ? "border-white/30 bg-white/10" : "border-white/10 bg-white/5"
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-white/70" />
                    <div className="flex-1 text-left">
                      <div className="font-medium text-white">Credit / Debit Card</div>
                      <div className="text-sm text-white/60">Visa, Mastercard, Amex</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === "card" ? "border-white/60" : "border-white/20"}`}>
                      {paymentMethod === "card" && <div className="w-full h-full rounded-full bg-white scale-50" />}
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("paypal")}
                    className={`w-full p-4 border-2 rounded-xl transition-all flex items-center gap-4 ${
                      paymentMethod === "paypal" ? "border-white/30 bg-white/10" : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">
                      PP
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-white">PayPal</div>
                      <div className="text-sm text-white/60">Fast and secure</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === "paypal" ? "border-white/60" : "border-white/20"}`}>
                      {paymentMethod === "paypal" && <div className="w-full h-full rounded-full bg-white scale-50" />}
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("bank")}
                    className={`w-full p-4 border-2 rounded-xl transition-all flex items-center gap-4 ${
                      paymentMethod === "bank" ? "border-white/30 bg-white/10" : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center text-white text-xs">
                      B
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-white">Bank Transfer</div>
                      <div className="text-sm text-white/60">Direct bank payment</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === "bank" ? "border-white/60" : "border-white/20"}`}>
                      {paymentMethod === "bank" && <div className="w-full h-full rounded-full bg-white scale-50" />}
                    </div>
                  </button>
                </div>

                {paymentMethod === "card" && (
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm mb-2 text-white/70">Card Number</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2 text-white/70">Cardholder Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm mb-2 text-white/70">Expiry Date</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2 text-white/70">CVV</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                          placeholder="123"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="save-card" className="w-4 h-4" />
                      <label htmlFor="save-card" className="text-sm text-white/70">
                        Save card for future purchases
                      </label>
                    </div>
                  </form>
                )}

                <div className="flex gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="flex-1 px-6 py-4 backdrop-blur-md bg-white/5 border-2 border-white/20 text-white rounded-2xl hover:bg-white/10 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("review")}
                    className="flex-1 px-6 py-4 backdrop-blur-md bg-white/20 border border-white/30 text-white rounded-2xl hover:bg-white/30 transition-all"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === "review" && (
              <div className="space-y-6">
                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 backdrop-blur-md bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl text-white">Shipping Address</h2>
                  </div>
                  <div className="text-white/70">
                    <p>John Doe</p>
                    <p>123 Main Street</p>
                    <p>New York, NY 10001</p>
                    <p>john.doe@example.com</p>
                    <p>+1 (555) 000-0000</p>
                  </div>
                  <button
                    onClick={() => setStep("shipping")}
                    className="mt-4 text-white hover:text-white/80 text-sm"
                  >
                    Edit
                  </button>
                </div>

                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 backdrop-blur-md bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl text-white">Payment Method</h2>
                  </div>
                  <div className="text-white/70">
                    <p className="font-medium">
                      {paymentMethod === "card" && "Credit / Debit Card"}
                      {paymentMethod === "paypal" && "PayPal"}
                      {paymentMethod === "bank" && "Bank Transfer"}
                    </p>
                    {paymentMethod === "card" && <p className="text-sm">•••• •••• •••• 3456</p>}
                  </div>
                  <button
                    onClick={() => setStep("payment")}
                    className="mt-4 text-white hover:text-white/80 text-sm"
                  >
                    Edit
                  </button>
                </div>

                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h2 className="text-xl mb-6 text-white">Order Items</h2>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-white">{item.name}</div>
                          <div className="text-sm text-white/60">Qty: {item.quantity}</div>
                        </div>
                        <div className="font-medium text-white">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep("payment")}
                    className="flex-1 px-6 py-4 backdrop-blur-md bg-white/5 border-2 border-white/20 text-white rounded-2xl hover:bg-white/10 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="flex-1 px-6 py-4 backdrop-blur-md bg-white/20 border border-white/30 text-white rounded-2xl hover:bg-white/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Lock className="w-5 h-5" />
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl mb-6 text-white">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-white/70">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-white/70">
                  <span>Shipping</span>
                  <span className="text-green-400">FREE</span>
                </div>

                <div className="flex justify-between text-white/70">
                  <span>Tax</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between text-xl">
                    <span className="text-white">Total</span>
                    <span className="text-white">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-green-400" />
                  Secure SSL encrypted checkout
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-green-400" />
                  Free shipping on all orders
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  30-day money-back guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
