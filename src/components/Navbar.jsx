import { ShoppingBag, Menu } from 'lucide-react'

export default function Navbar({ onCartClick }) {
  return (
    <header className="w-full fixed top-0 z-20 bg-white/60 backdrop-blur border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg bg-white/50 border border-white/30 sm:hidden" aria-label="Menu">
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
          <div className="">
            <div className="text-xl tracking-widest heading font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#141e30] to-[#355577]">
              PARFAIT
            </div>
            <div className="text-[11px] uppercase tracking-[0.35em] text-slate-600">Maison de Parfum</div>
          </div>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-slate-700">
          <a href="#collections" className="hover:text-slate-900">Collections</a>
          <a href="#bestsellers" className="hover:text-slate-900">Bestsellers</a>
          <a href="/admin" className="hover:text-slate-900">Team POS</a>
        </nav>
        <button onClick={onCartClick} className="relative p-2 rounded-lg bg-white/50 border border-white/30" aria-label="Cart">
          <ShoppingBag className="w-5 h-5 text-slate-700" />
        </button>
      </div>
    </header>
  )
}
