import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Clock, ChevronLeft, ChevronRight, ShieldCheck, Truck, RotateCcw, Headphones, Laptop, Shirt, Footprints, Lamp, Sparkles, Zap, Tag, ArrowUpRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

const SLIDES = [
  {
    id: 1,
    tag: '🎧 Biggest Audio Sale',
    title: 'Pro Sound, Zero Compromise.',
    subtitle: 'Up to 20% off premium wireless & ANC headphones. Limited stock — shop now.',
    cta: 'Shop Audio Deals',
    bg: 'from-zinc-900 via-zinc-800 to-zinc-700',
    accent: 'bg-amber-400 text-zinc-900',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80',
    badge: 'SAVE UP TO 20%',
    category: 'audio',
  },
  {
    id: 2,
    tag: '⌚ New Arrivals',
    title: 'Titanium Precision. Engineered for Adventure.',
    subtitle: 'Dual-frequency GPS, 100m water resistance, and a 72-hour battery. Meet the CyberWatch Ultra.',
    cta: 'View Smartwatches',
    bg: 'from-slate-900 via-blue-950 to-slate-900',
    accent: 'bg-blue-400 text-white',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop&q=80',
    badge: 'NEW IN',
    category: 'electronics',
  },
  {
    id: 3,
    tag: '👟 Footwear Drop',
    title: 'Run Faster. Recover Smarter.',
    subtitle: 'Carbon plate energy return meets nitrogen-infused foam cushioning. Race-ready speed awaits.',
    cta: 'Shop Footwear',
    bg: 'from-rose-900 via-rose-800 to-orange-900',
    accent: 'bg-orange-400 text-zinc-900',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop&q=80',
    badge: 'BESTSELLER',
    category: 'footwear',
  },
];

const CATEGORIES = [
  { id: 'electronics', label: 'Electronics', icon: Laptop, color: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100', iconColor: 'text-blue-600' },
  { id: 'audio', label: 'Audio & Sound', icon: Headphones, color: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-100', iconColor: 'text-purple-600' },
  { id: 'fashion', label: 'Fashion', icon: Shirt, color: 'bg-pink-50 text-pink-700 hover:bg-pink-100 border-pink-100', iconColor: 'text-pink-600' },
  { id: 'footwear', label: 'Footwear', icon: Footprints, color: 'bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-100', iconColor: 'text-orange-600' },
  { id: 'workspace', label: 'Workspace', icon: Lamp, color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-100', iconColor: 'text-emerald-600' },
  { id: 'all', label: 'All Items', icon: Sparkles, color: 'bg-zinc-50 text-zinc-700 hover:bg-zinc-100 border-zinc-200', iconColor: 'text-zinc-600' },
];

// Featured deals (top 4)
const DEALS = PRODUCTS.slice(0, 4);

// Countdown timer hook
function useCountdown(hours = 5, minutes = 42, seconds = 18) {
  const [time, setTime] = useState({ h: hours, m: minutes, s: seconds });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(time.h)}:${pad(time.m)}:${pad(time.s)}`;
}

export default function HeroBanner({ activeCategory = 'all', setActiveCategory }) {
  const { setSelectedProductForModal, addToCart } = useCart();
  const [slide, setSlide] = useState(0);
  const countdown = useCountdown(5, 42, 18);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const handleCategorySelect = (categoryId) => {
    if (setActiveCategory) {
      setActiveCategory(categoryId);
    }
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const current = SLIDES[slide];

  return (
    <div className="w-full bg-zinc-50">
      {/* ── HERO BANNER SLIDER ── */}
      <div className={`relative w-full bg-gradient-to-r ${current.bg} overflow-hidden`} style={{ minHeight: 400 }}>
        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[400px] gap-8 py-10 lg:py-0">
            {/* LEFT: Text Content */}
            <div className="text-white space-y-5 lg:py-12 text-center lg:text-left">
              {/* Tag pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-white text-xs font-semibold tracking-wide border border-white/20 backdrop-blur-sm">
                <span>{current.tag}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                {current.title}
              </h1>

              {/* Subtitle */}
              <p className="text-white/75 text-sm sm:text-base max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {current.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => handleCategorySelect(current.category)}
                  className={`px-6 py-3 ${current.accent} rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition hover:opacity-90 active:scale-95 cursor-pointer`}
                >
                  {current.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleCategorySelect('all')}
                  className="px-5 py-3 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-sm font-semibold rounded-xl transition cursor-pointer backdrop-blur-sm"
                >
                  Browse All
                </button>
              </div>

              {/* Trust Row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-white/60 pt-2">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-white/80" /> Secure payments</span>
                <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-white/80" /> Free delivery over $150</span>
                <span className="flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5 text-white/80" /> 30-day returns</span>
              </div>
            </div>

            {/* RIGHT: Hero Product Image */}
            <div className="relative flex items-end justify-center lg:justify-end lg:pr-6">
              {/* Main hero image */}
              <div className="relative">
                <img
                  key={current.id}
                  src={current.image}
                  alt="Featured Product"
                  className="w-64 sm:w-80 lg:w-96 object-cover rounded-2xl shadow-2xl"
                  style={{ maxHeight: 350, objectPosition: 'center' }}
                />
                {/* Floating discount badge */}
                <div className={`absolute -top-4 -left-4 px-3.5 py-2 rounded-2xl ${current.accent} font-extrabold text-xs uppercase tracking-widest shadow-xl`}>
                  {current.badge}
                </div>
                {/* Floating rating pill */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-2 bg-white rounded-full shadow-xl text-xs font-bold text-zinc-900 whitespace-nowrap border border-zinc-100">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>4.9 / 5 · 12,000+ reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Navigation Dots & Arrows */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`rounded-full transition-all cursor-pointer ${i === slide ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>

        <button
          onClick={() => setSlide((slide - 1 + SLIDES.length) % SLIDES.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center border border-white/20 cursor-pointer transition backdrop-blur-sm z-20"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setSlide((slide + 1) % SLIDES.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center border border-white/20 cursor-pointer transition backdrop-blur-sm z-20"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── CATEGORY TILES ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl border cursor-pointer transition-all duration-200 text-center ${
                  isActive
                    ? 'ring-2 ring-indigo-600 ring-offset-2 bg-indigo-50 border-indigo-300 shadow-md scale-[1.03]'
                    : `${cat.color} hover:scale-[1.02] shadow-2xs`
                }`}
              >
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center shadow-2xs transition group-hover:scale-110 ${
                  isActive ? 'ring-2 ring-indigo-500/40' : ''
                }`}>
                  <Icon className={`w-5 h-5 ${cat.iconColor}`} />
                </div>
                <div className="flex flex-col items-center">
                  <span className={`text-[11px] sm:text-xs leading-tight ${isActive ? 'font-semibold text-indigo-900' : 'font-bold'}`}>
                    {cat.label}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1 animate-pulse" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── DUAL PROMO STRIP ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Promo 1 */}
          <div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 flex justify-between items-center cursor-pointer hover:scale-[1.01] transition shadow-md shadow-indigo-300/30"
            onClick={() => handleCategorySelect('fashion')}
          >
            <div className="text-white z-10">
              <div className="text-[11px] font-bold uppercase tracking-widest mb-1 text-indigo-200">Fashion & Apparel</div>
              <div className="text-xl font-extrabold leading-tight">Winter Merino<br />Coats from $340</div>
              <button className="mt-3 text-xs font-bold text-white flex items-center gap-1 hover:gap-2 transition-all">
                Shop Now <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80"
              alt="Fashion"
              className="w-24 h-24 rounded-xl object-cover opacity-90 flex-shrink-0 shadow-lg"
            />
          </div>

          {/* Promo 2 */}
          <div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 flex justify-between items-center cursor-pointer hover:scale-[1.01] transition shadow-md shadow-amber-300/30"
            onClick={() => handleCategorySelect('workspace')}
          >
            <div className="text-white z-10">
              <div className="text-[11px] font-bold uppercase tracking-widest mb-1 text-amber-100">Workspace & Living</div>
              <div className="text-xl font-extrabold leading-tight">Minimal Desks &<br />Lighting from $125</div>
              <button className="mt-3 text-xs font-bold text-white flex items-center gap-1 hover:gap-2 transition-all">
                Shop Now <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&auto=format&fit=crop&q=80"
              alt="Workspace"
              className="w-24 h-24 rounded-xl object-cover opacity-90 flex-shrink-0 shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* ── FLASH DEALS STRIP ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden">
          {/* Flash Deals Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-100 bg-zinc-50/70">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 text-rose-600">
                <Zap className="w-4 h-4 fill-rose-600" />
                <span className="text-sm font-extrabold uppercase tracking-wide">Flash Deals</span>
              </div>
              <div className="flex items-center gap-1.5 bg-rose-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                <Clock className="w-3 h-3" />
                <span>Ends in {countdown}</span>
              </div>
            </div>
            <button
              onClick={() => handleCategorySelect('all')}
              className="text-xs font-bold text-zinc-700 hover:text-zinc-900 flex items-center gap-1 transition cursor-pointer"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Deal Product Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-zinc-100">
            {DEALS.map((product) => {
              const discount = product.compareAtPrice
                ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
                : 0;

              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProductForModal(product)}
                  className="flex flex-col items-center p-4 hover:bg-zinc-50/80 cursor-pointer transition group border-b sm:border-b-0 border-zinc-100"
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-zinc-100 mb-3 flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {discount > 0 && (
                      <span className="absolute top-1 left-1 bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                        -{discount}%
                      </span>
                    )}
                  </div>

                  <div className="text-center w-full space-y-1">
                    <p className="text-xs font-bold text-zinc-900 line-clamp-2 leading-snug group-hover:text-zinc-700 transition">
                      {product.name}
                    </p>
                    <div className="flex items-baseline justify-center gap-1.5">
                      <span className="text-sm font-semibold text-zinc-900">${product.price.toFixed(2)}</span>
                      {product.compareAtPrice && (
                        <span className="text-[11px] text-zinc-400 line-through">${product.compareAtPrice.toFixed(2)}</span>
                      )}
                    </div>
                    {/* Stock progress bar */}
                    <div className="w-full mt-1.5">
                      <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                        <span className="font-semibold text-rose-600">Selling fast!</span>
                        <span>{product.stockQuantity} left</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-rose-500 rounded-full"
                          style={{ width: `${Math.min(100, 100 - (product.stockQuantity / 50) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
