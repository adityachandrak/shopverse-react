import { useState, useEffect } from 'react'

const API_URL = ''

export default function Checkout({ customer }) {
  const products = [
    { id: 1, name: 'Laptop', price: 55000 },
    { id: 2, name: 'Mobile', price: 25000 },
    { id: 3, name: 'Headphones', price: 2000 },
  ]
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart')
    return stored ? JSON.parse(stored) : []
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      ))
    }
  }

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setMessage('❌ Cart is empty')
      return
    }

    setLoading(true)
    setMessage('')
    setIsSuccess(false)

    try {
      const response = await fetch(`${API_URL}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customer.customerId,
          cartItems: cart.map(item => ({
            productId: item.id,
            productName: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setMessage(`✅ Order placed successfully! Order ID: ${data.orderId}`)
        setCart([])
        localStorage.removeItem('cart')
      } else {
        setMessage(`❌ ${data.message}`)
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Checkout</h1>

      <div style={{ marginBottom: '2rem' }}>
        <p>
          <strong>Customer:</strong> {customer.fullName} ({customer.email})
        </p>
      </div>

      {message && (
        <div className={`alert ${isSuccess ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <h3>Available Products</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {products.map(product => (
            <div
              key={product.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            >
              <div style={{ textAlign: 'left' }}>
                <strong>{product.name}</strong> - ₹{product.price}
              </div>
              <button
                onClick={() => addToCart(product)}
                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Cart Items ({cart.length})</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {cart.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                  }}
                >
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <strong>{item.name}</strong> - ₹{item.price} x {item.quantity} = ₹
                    {item.price * item.quantity}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{ padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      style={{
                        width: '50px',
                        padding: '0.5rem',
                        textAlign: 'center',
                      }}
                      min="1"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{ padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.9rem',
                        backgroundColor: '#dc3545',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px',
                textAlign: 'right',
              }}
            >
              <h3>Total Amount: ₹{getTotalAmount()}</h3>
              <button
                onClick={handleCheckout}
                disabled={loading || cart.length === 0}
                style={{
                  marginTop: '1rem',
                  width: '100%',
                  padding: '0.75rem',
                }}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
