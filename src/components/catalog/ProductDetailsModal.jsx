import React, { useState } from 'react';
import { X, Star, ShieldCheck, Truck, RotateCcw, Heart, Check, ShoppingBag, Zap, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ProductDetailsModal() {
  const {
    selectedProductForModal: product,
    setSelectedProductForModal,
    addToCart,
    wishlist,
    toggleWishlist,
    setIsCartOpen,
    setIsCheckoutOpen,
  } = useCart();

  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0]?.name : null);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setSelectedProductForModal(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md transition-opacity"
        onClick={() => setSelectedProductForModal(null)}
      />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-4xl bg-white border border-zinc-200/80 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto">
        {/* Floating Close Button - Placed in dedicated clear area */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition flex items-center justify-center cursor-pointer shadow-xs"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[88vh] overflow-y-auto">
          {/* Left Column: Visual Gallery */}
          <div className="p-6 sm:p-8 bg-zinc-50/80 border-b md:border-b-0 md:border-r border-zinc-200/80 flex flex-col justify-between">
            <div>
              {/* Main Image Viewport */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-zinc-200/60 shadow-xs mb-4 flex items-center justify-center">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                {discountPercent > 0 && (
                  <div className="absolute top-3 left-3 bg-zinc-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    Save {discountPercent}%
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 justify-center sm:justify-start overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer bg-white ${
                        activeImageIndex === idx
                          ? 'border-zinc-900 ring-2 ring-zinc-900/10'
                          : 'border-zinc-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Trust Highlights */}
            <div className="mt-8 pt-5 border-t border-zinc-200/80 grid grid-cols-3 gap-2 text-center text-[11px] text-zinc-500 font-medium">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-zinc-800" />
                <span>Express Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-zinc-800" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-zinc-800" />
                <span>2-Year Warranty</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Selection */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white pr-8 sm:pr-10">
            <div className="space-y-5">
              {/* Category & Wishlist Row with space away from close button */}
              <div className="flex items-center justify-between pr-10">
                <span className="text-[11px] uppercase font-bold tracking-widest text-zinc-400">
                  {product.categoryName} • {product.sku}
                </span>

                <button
                  onClick={() => toggleWishlist(product)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-rose-600 transition cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-zinc-400'}`}
                  />
                  <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
                </button>
              </div>

              {/* Title */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight leading-tight">
                  {product.name}
                </h2>

                {/* Rating Strip */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-zinc-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-zinc-800">{product.rating}</span>
                  <span className="text-xs text-zinc-400 font-normal">
                    ({product.reviewsCount} verified reviews)
                  </span>
                </div>
              </div>

              {/* Price & Stock Status */}
              <div className="flex items-center gap-3 py-2 border-y border-zinc-100">
                <span className="text-3xl font-bold text-zinc-900 tracking-tight">
                  ${product.price.toFixed(2)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-zinc-400 line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                )}
                <span className="ml-auto text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full">
                  {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity})` : 'Out of Stock'}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500 font-medium">Color:</span>
                    <span className="text-zinc-900 font-bold">{selectedColor}</span>
                  </div>
                  <div className="flex gap-2.5">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full transition-transform cursor-pointer border border-zinc-300 ${
                          selectedColor === color.name
                            ? 'ring-2 ring-zinc-900 ring-offset-2 ring-offset-white scale-110'
                            : 'opacity-80 hover:opacity-100 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500 font-medium">Variant:</span>
                    <span className="text-zinc-900 font-bold">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                          selectedSize === size
                            ? 'bg-zinc-900 text-white shadow-xs'
                            : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Actions */}
              <div className="pt-3 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Stepper */}
                  <div className="flex items-center bg-zinc-100 border border-zinc-200 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-white flex items-center justify-center font-bold text-sm cursor-pointer transition shadow-2xs"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-zinc-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity((prev) => Math.min(product.stockQuantity, prev + 1))}
                      className="w-8 h-8 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-white flex items-center justify-center font-bold text-sm cursor-pointer transition shadow-2xs"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary Add to Bag Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stockQuantity === 0}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-900 hover:bg-black text-white active:scale-[0.99]'
                    } disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Elegant Secondary Instant Checkout (No loud colors!) */}
                <button
                  onClick={handleBuyNow}
                  disabled={product.stockQuantity === 0}
                  className="w-full py-3 px-4 bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200 text-zinc-900 font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <Zap className="w-3.5 h-3.5 text-zinc-700" />
                  <span>Instant 1-Click Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                </button>
              </div>
            </div>

            {/* Specifications Section with generous bottom breathing room */}
            <div className="pt-6 pb-6 border-t border-zinc-100">
              <div className="flex border-b border-zinc-200 mb-3 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 mr-4 transition cursor-pointer ${
                    activeTab === 'specs'
                      ? 'text-zinc-900 border-b-2 border-zinc-900'
                      : 'text-zinc-400 hover:text-zinc-700'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2 transition cursor-pointer ${
                    activeTab === 'shipping'
                      ? 'text-zinc-900 border-b-2 border-zinc-900'
                      : 'text-zinc-400 hover:text-zinc-700'
                  }`}
                >
                  Shipping & Returns
                </button>
              </div>

              {activeTab === 'specs' && product.specs && (
                <dl className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="bg-zinc-50 border border-zinc-200/70 p-2.5 rounded-xl">
                      <dt className="text-[11px] text-zinc-400 font-medium">{key}</dt>
                      <dd className="text-zinc-800 font-bold mt-0.5">{val}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {activeTab === 'shipping' && (
                <div className="text-xs text-zinc-600 space-y-1.5 bg-zinc-50 border border-zinc-200/70 p-3.5 rounded-xl leading-relaxed">
                  <p>• <strong>Global Express:</strong> Delivered in 2-4 business days with carbon-neutral logistics.</p>
                  <p>• <strong>Returns:</strong> 30-day trial with complimentary prepaid return labels.</p>
                  <p>• <strong>Warranty:</strong> 2-year international warranty backed by factory service centers.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
