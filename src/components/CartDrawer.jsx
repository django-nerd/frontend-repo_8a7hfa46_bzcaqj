export default function CartDrawer({ open, items, onClose, onCheckout }) {
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)
  return (
    <div className={`fixed inset-0 z-30 ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between border-b">
          <h3 className="heading text-xl font-semibold">Your Cart</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">Close</button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto h-[calc(100%-200px)]">
          {items.length === 0 && <p className="text-slate-600">Your cart is empty.</p>}
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-center">
              <img src={item.images?.[0]} alt={item.title} className="w-16 h-16 rounded object-cover" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <p className="heading font-medium">{item.title}</p>
                    <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 border-t">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-600">Subtotal</span>
            <span className="heading font-semibold">₹{total.toFixed(2)}</span>
          </div>
          <button onClick={onCheckout} className="w-full rounded-full px-4 py-3 bg-gradient-to-r from-[#141e30] to-[#355577] text-white">
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
