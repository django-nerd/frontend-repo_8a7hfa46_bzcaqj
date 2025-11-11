export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-white/70 backdrop-blur rounded-2xl border border-white/50 shadow-sm hover:shadow-lg transition overflow-hidden">
      <div className="aspect-square bg-gradient-to-br from-slate-50 to-white/60 flex items-center justify-center">
        <img src={product.images?.[0] || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop'} alt={product.title} className="w-3/4 h-3/4 object-cover rounded-xl" />
      </div>
      <div className="p-4">
        <div className="flex items-baseline justify-between">
          <h3 className="heading text-lg font-semibold text-slate-800">{product.title}</h3>
          <span className="text-[#141e30] font-medium">₹{product.price.toFixed(2)}</span>
        </div>
        <p className="content text-slate-600 text-sm mt-1 line-clamp-2">{product.description}</p>
        <button onClick={() => onAdd(product)} className="mt-4 w-full rounded-full px-4 py-2 bg-gradient-to-r from-[#141e30] to-[#355577] text-white">Add to Cart</button>
      </div>
    </div>
  )
}
