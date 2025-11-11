import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'
import AdminPOS from './components/AdminPOS'
import { Routes, Route, useLocation } from 'react-router-dom'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const demoProducts = [
  {
    title: 'Iridescent No. 1',
    description: 'Pear blossom, pink pepper and crystalline musk in an ethereal balance.',
    price: 6490,
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop']
  },
  {
    title: 'Azure Veil',
    description: 'Marine mist, orris, and white amber drift into a luminous trail.',
    price: 7290,
    images: ['https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?q=80&w=1200&auto=format&fit=crop']
  },
  {
    title: 'Nocturne Glass',
    description: 'Black tea, violet leaf and smoked woods — urbane and magnetic.',
    price: 6890,
    images: ['https://images.unsplash.com/photo-1549289524-06cf8837aceb?q=80&w=1200&auto=format&fit=crop']
  }
]

function Storefront() {
  const [products, setProducts] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/products`)
        if (res.ok) {
          const data = await res.json()
          setProducts(data.length ? data : demoProducts)
        } else {
          setProducts(demoProducts)
        }
      } catch {
        setProducts(demoProducts)
      }
    }
    load()
  }, [])

  const addToCart = (p) => {
    setCart((c) => {
      const existing = c.find(i => i.title === p.title)
      if (existing) return c.map(i => i.title===p.title ? { ...i, quantity: i.quantity + 1 } : i)
      return [...c, { ...p, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const checkout = async () => {
    if (cart.length === 0) return
    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)
    const order = {
      customer_name: 'Guest',
      customer_email: 'guest@example.com',
      customer_phone: '9999999999',
      shipping_address: '—',
      items: cart.map(i => ({ product_id: '', title: i.title, size_ml: 100, price: i.price, quantity: i.quantity })),
      subtotal,
      shipping_fee: 0,
      total_amount: subtotal,
      currency: 'INR',
      status: 'pending'
    }
    try {
      const res = await fetch(`${baseUrl}/api/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order }) })
      const data = await res.json()
      alert(data.razorpay === 'not_configured' ? 'Order created (demo). Configure Razorpay keys to enable payments.' : 'Order created. Proceeding to payment...')
    } catch (e) {
      alert('Checkout failed')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onCartClick={() => setCartOpen(true)} />
      <Hero />

      <section id="collections" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between">
          <h2 className="heading text-2xl sm:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#141e30] to-[#355577]">New Collection</h2>
          <a href="#" className="text-slate-600 hover:text-slate-800">View all</a>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, idx) => (
            <ProductCard key={idx} product={p} onAdd={addToCart} />
          ))}
        </div>
      </section>

      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onCheckout={checkout} />

      <footer className="border-t py-10 text-center text-slate-500">© Parfait Maison · All rights reserved.</footer>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <Routes location={location}>
      <Route path="/" element={<Storefront />} />
      <Route path="/admin" element={<AdminPOS />} />
    </Routes>
  )
}
