import { useEffect, useState } from 'react'

export default function AdminPOS() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusUpdating, setStatusUpdating] = useState(null)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/orders`)
      const data = await res.json()
      setOrders(data)
    } catch (e) {}
    setLoading(false)
  }

  const updateStatus = async (id, status) => {
    setStatusUpdating(id)
    try {
      await fetch(`${baseUrl}/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      await fetchOrders()
    } catch (e) {}
    setStatusUpdating(null)
  }

  useEffect(() => { fetchOrders() }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white pt-20 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="heading text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#141e30] to-[#355577]">Team POS · Orders</h1>
        <p className="content text-slate-600 mt-2">Manage orders, payment state and shipping status.</p>

        <div className="mt-8 bg-white rounded-xl shadow border">
          <div className="grid grid-cols-6 gap-4 p-4 text-xs font-semibold text-slate-500">
            <div>ID</div>
            <div>Customer</div>
            <div>Total</div>
            <div>Status</div>
            <div>Razorpay</div>
            <div>Action</div>
          </div>
          {loading ? (
            <div className="p-6">Loading...</div>
          ) : (
            orders.map((o) => (
              <div key={o._id} className="grid grid-cols-6 gap-4 p-4 border-t items-center text-sm">
                <div className="truncate" title={o._id}>{o._id}</div>
                <div>
                  <div className="font-medium">{o.customer_name}</div>
                  <div className="text-xs text-slate-500">{o.customer_email}</div>
                </div>
                <div>₹{o.total_amount?.toFixed?.(2) || o.total_amount}</div>
                <div className="capitalize">{o.status}</div>
                <div className="text-xs">{o.razorpay_order_id || '—'}</div>
                <div className="flex gap-2">
                  {['pending','paid','processing','shipped','delivered','cancelled'].map(s => (
                    <button key={s} onClick={() => updateStatus(o._id, s)} disabled={statusUpdating===o._id}
                      className={`px-2 py-1 rounded border text-xs ${o.status===s ? 'bg-[#355577] text-white' : 'hover:bg-slate-50'}`}>{s}</button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
