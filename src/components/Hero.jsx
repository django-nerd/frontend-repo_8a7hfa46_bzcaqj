import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] pt-20 overflow-hidden bg-gradient-to-b from-[#f6f7fb] to-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/myxXfbNiwnbTpGFp/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-[80vh]">
        <div className="max-w-2xl">
          <h1 className="heading text-5xl sm:text-6xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#141e30] to-[#355577]">
            The Fragrance of Creativity
          </h1>
          <p className="mt-6 text-slate-600 text-lg content">
            Discover artisanal perfumes crafted with rare, luminous accords. Elegantly bottled, designed to be remembered.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#collections" className="px-6 py-3 rounded-full text-white bg-gradient-to-r from-[#141e30] to-[#355577] shadow-lg shadow-slate-600/20">Shop Collection</a>
            <a href="#bestsellers" className="px-6 py-3 rounded-full text-[#141e30] border border-[#355577]/30">Bestsellers</a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 via-white/10 to-white" />
    </section>
  )
}
