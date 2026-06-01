import http from 'node:http'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const PORT = Number(process.env.PORT) || 5001
const DIST_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist')

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
}

const customers = new Map()
let nextCustomerId = 1
let nextOrderId = 1001

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  })
  res.end(JSON.stringify(payload))
}

const sendFile = async (res, filePath) => {
  const contents = await readFile(filePath)
  const contentType = contentTypes[path.extname(filePath)] || 'application/octet-stream'

  res.writeHead(200, { 'Content-Type': contentType })
  res.end(contents)
}

const readJsonBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = ''

    req.on('data', chunk => {
      body += chunk
    })

    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        reject(new Error('Invalid JSON body'))
      }
    })
  })
}

const normalizeCartItem = (item) => ({
  productId: item.productId ?? item.id,
  productName: item.productName ?? item.name,
  price: Number(item.price),
  quantity: Number(item.quantity),
})

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 204, {})
  }

  try {
    if (req.method === 'GET' && req.url === '/api') {
      return sendJson(res, 200, { message: 'ADITYA API is running' })
    }

    if (req.method === 'POST' && req.url === '/api/signup') {
      const body = await readJsonBody(req)

      if (!body.fullName || !body.email || !body.password) {
        return sendJson(res, 400, { message: 'Full name, email, and password are required' })
      }

      if (customers.has(body.email)) {
        return sendJson(res, 409, { message: 'Customer already exists' })
      }

      const customer = {
        customerId: nextCustomerId++,
        fullName: body.fullName,
        email: body.email,
        phone: body.phone || '',
        address: body.address || '',
      }

      customers.set(body.email, { ...customer, password: body.password })

      return sendJson(res, 201, {
        message: 'Signup successful',
        customerId: customer.customerId,
        customer,
      })
    }

    if (req.method === 'POST' && req.url === '/api/signin') {
      const body = await readJsonBody(req)
      const record = customers.get(body.email)

      if (!record || record.password !== body.password) {
        return sendJson(res, 401, { message: 'Invalid email or password' })
      }

      const customer = { ...record }
      delete customer.password

      return sendJson(res, 200, {
        message: 'Signin successful',
        token: `local-token-${customer.customerId}`,
        customer,
      })
    }

    if (req.method === 'POST' && req.url === '/api/checkout') {
      const body = await readJsonBody(req)
      const cartItems = Array.isArray(body.cartItems)
        ? body.cartItems.map(normalizeCartItem)
        : []

      if (!body.customerId) {
        return sendJson(res, 400, { message: 'customerId is required' })
      }

      if (cartItems.length === 0) {
        return sendJson(res, 400, { message: 'Cart is empty' })
      }

      const invalidItem = cartItems.find(item =>
        !item.productId ||
        !item.productName ||
        !Number.isFinite(item.price) ||
        !Number.isFinite(item.quantity) ||
        item.quantity <= 0
      )

      if (invalidItem) {
        return sendJson(res, 400, { message: 'Cart contains an invalid item' })
      }

      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
      const orderId = nextOrderId++

      return sendJson(res, 201, {
        message: 'Order placed successfully',
        orderId,
        customerId: body.customerId,
        totalAmount,
        cartItems,
      })
    }

    if (['GET', 'HEAD'].includes(req.method) && !req.url.startsWith('/api')) {
      const pathname = new URL(req.url, `http://${req.headers.host}`).pathname
      const requestedPath = pathname === '/' ? '/index.html' : pathname
      const filePath = path.join(DIST_DIR, requestedPath)

      try {
        return await sendFile(res, filePath)
      } catch {
        return await sendFile(res, path.join(DIST_DIR, 'index.html'))
      }
    }

    return sendJson(res, 404, { message: 'Route not found' })
  } catch (error) {
    return sendJson(res, 400, { message: error.message })
  }
})

server.listen(PORT, () => {
  console.log(`ShopVerse server running at http://localhost:${PORT}`)
})
