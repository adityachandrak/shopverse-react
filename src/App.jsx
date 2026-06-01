import { useState } from 'react'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Checkout from './pages/Checkout'

function App() {
  const [page, setPage] = useState('signup')
  const [customer, setCustomer] = useState(() => {
    const stored = localStorage.getItem('customer')
    return stored ? JSON.parse(stored) : null
  })

  const handleSigninSuccess = (customerData) => {
    setCustomer(customerData)
    setPage('checkout')
  }

  const handleLogout = () => {
    localStorage.removeItem('customer')
    localStorage.removeItem('token')
    localStorage.removeItem('cart')
    setCustomer(null)
    setPage('signup')
  }

  return (
    <div className="container">
      <div className="nav">
        <button
          className={page === 'signup' ? 'active' : ''}
          onClick={() => setPage('signup')}
        >
          Signup
        </button>
        <button
          className={page === 'signin' ? 'active' : ''}
          onClick={() => setPage('signin')}
        >
          Signin
        </button>
        {customer && (
          <>
            <button
              className={page === 'checkout' ? 'active' : ''}
              onClick={() => setPage('checkout')}
            >
              Checkout
            </button>
            <button onClick={handleLogout}>
              Logout ({customer.fullName})
            </button>
          </>
        )}
      </div>

      {page === 'signup' && <Signup />}
      {page === 'signin' && <Signin onSigninSuccess={handleSigninSuccess} />}
      {page === 'checkout' && customer && <Checkout customer={customer} />}
    </div>
  )
}

export default App
