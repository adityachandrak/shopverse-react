import { useState } from 'react'

const API_URL = ''

export default function Signin({ onSigninSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setIsSuccess(false)

    try {
      const response = await fetch(`${API_URL}/api/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setMessage(`✅ Welcome ${data.customer.fullName}!`)
        localStorage.setItem('token', data.token)
        localStorage.setItem('customer', JSON.stringify(data.customer))
        setFormData({
          email: '',
          password: '',
        })
        setTimeout(() => {
          onSigninSuccess(data.customer)
        }, 1000)
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
      <h1>Signin</h1>

      {message && (
        <div className={`alert ${isSuccess ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Signin'}
        </button>
      </form>

      <p>
        Don't have an account? <a href="#signup">Sign up here</a>
      </p>
    </div>
  )
}
