import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Sparkles,
  Truck,
  Check,
  ShoppingBag,
  Gift,
  Lock,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

export default function CartDrawer() {
  const {
    cart,
    subtotal,
    discountAmount,
    shippingCost,
    taxCost,
    grandTotal,
    totalItemCount,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateQuantity,
    removeFromCart,
    applyCouponCode,
    removeCoupon,
    appliedCoupon,
    addToCart,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 150.0;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Recommendations: products from catalog not in current cart
  const cartProductIds = new Set(cart.map((item) => item.id));
  const suggestedProducts = PRODUCTS.filter((p) => !cartProductIds.has(p.id)).slice(0, 2);

  const handleApplyCoupon = (e) => {
    if (e) e.preventDefault();
    const codeToApply = couponInput.trim();
    if (!codeToApply) return;
    const res = applyCouponCode(codeToApply);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleQuickCoupon = (code) => {
    setCouponInput(code);
    const res = applyCouponCode(code);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col z-10 animate-slide-in-right">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200/80 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Your Bag</h2>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold">
                    {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Review your items before checkout</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition cursor-pointer border border-transparent hover:border-slate-200"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping & Rewards Bar */}
          <div className="bg-slate-50/90 px-6 py-3.5 border-b border-slate-200/80 text-xs">
            {remainingForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-600 font-medium">
                    Add <strong className="text-slate-900 font-bold">${remainingForFreeShipping.toFixed(2)}</strong> for{' '}
                    <span className="text-indigo-600 font-bold">Free Worldwide Delivery</span>
                  </span>
                  <span className="text-slate-400 font-bold text-[10px]">{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                  <span>You've unlocked FREE Worldwide Delivery!</span>
                </div>
                <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden p-0.5">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-full" />
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-slate-400" /> Fast Worldwide Dispatch
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-slate-400" /> 30-Day Easy Returns
              </span>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-white">
            {cart.length === 0 ? (
              <div className="text-center py-20 px-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 shadow-sm">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">Your bag is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                  Discover our flagship audio, titanium watches, and curated luxury essentials.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.variantKey}
                      className="group relative flex gap-3.5 p-3.5 bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-xs font-bold text-slate-900 line-clamp-1 leading-snug group-hover:text-indigo-600 transition">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.variantKey)}
                              className="text-slate-300 hover:text-rose-500 hover:bg-rose-50 p-1 rounded-lg transition cursor-pointer flex-shrink-0 -mr-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Variant Badges */}
                          <div className="flex flex-wrap items-center gap-1.5 mt-1">
                            {item.selectedColor && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/80 text-[10px] font-semibold text-slate-600">
                                {item.selectedColor}
                              </span>
                            )}
                            {item.selectedSize && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/80 text-[10px] font-semibold text-slate-600">
                                {item.selectedSize}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price & Quantity Stepper */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                          <div>
                            <span className="text-xs text-slate-400 mr-1.5 font-normal">
                              ${item.price.toFixed(2)}
                            </span>
                            <span className="text-xs font-extrabold text-slate-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>

                          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-0.5 shadow-2xs">
                            <button
                              onClick={() => updateQuantity(item.variantKey, item.quantity - 1)}
                              className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white transition text-xs cursor-pointer shadow-2xs"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-extrabold text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.variantKey, item.quantity + 1)}
                              className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white transition text-xs cursor-pointer shadow-2xs"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Frequently Added Accessories / Upsell Strip */}
                {suggestedProducts.length > 0 && (
                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        Pairs Well With
                      </span>
                      <span className="text-[10px] text-slate-400">Curated Add-ons</span>
                    </div>

                    <div className="space-y-2">
                      {suggestedProducts.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between p-2.5 bg-slate-50/80 border border-slate-200/70 rounded-xl hover:bg-slate-50 transition"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-10 h-10 rounded-lg object-cover bg-white border border-slate-200 flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="text-[11px] font-bold text-slate-900 truncate leading-snug">
                                {p.name}
                              </p>
                              <p className="text-[10px] font-extrabold text-indigo-700">
                                ${p.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => addToCart(p, null, null, 1)}
                            className="px-2.5 py-1 bg-white hover:bg-indigo-600 hover:text-white border border-slate-200 text-slate-700 text-[10px] font-bold rounded-lg transition shadow-2xs cursor-pointer flex-shrink-0"
                          >
                            + Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Free Gift Message Note */}
                <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl flex items-center gap-2.5 text-amber-900">
                  <Gift className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="text-[11px] font-medium leading-tight">
                    Complimentary luxury unboxing kit & signature gift box included.
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {cart.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-200/90 bg-slate-50/50 space-y-3">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <span className="text-emerald-900 font-extrabold">{appliedCoupon.code} Applied</span>
                      <span className="text-emerald-700 text-[11px] ml-1.5 font-medium">
                        (-${discountAmount.toFixed(2)})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-rose-600 hover:underline font-bold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Promo code (SAVE15)"
                        className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 shadow-2xs uppercase tracking-wide"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-2xs"
                    >
                      Apply
                    </button>
                  </form>
                  {couponError ? (
                    <p className="text-[11px] text-rose-600 font-semibold">{couponError}</p>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <span>Quick code:</span>
                      <button
                        type="button"
                        onClick={() => handleQuickCoupon('SAVE15')}
                        className="font-bold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
                      >
                        SAVE15
                      </button>
                      <span>(15% off)</span>
                    </div>
                  )}
                </div>
              )}

              {/* Order Cost Breakdown Box */}
              <div className="p-3.5 bg-white border border-slate-200/80 rounded-2xl space-y-2 text-xs shadow-2xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount (15% OFF)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Worldwide Shipping</span>
                  <span className="font-bold text-slate-900">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                        FREE
                      </span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-bold text-slate-900">${taxCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2.5 border-t border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">Grand Total</span>
                    <span className="text-[10px] text-slate-400 font-normal">Taxes & duties included</span>
                  </div>
                  <span className="text-lg font-semibold text-slate-900 tracking-tight">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* High-Converting Gradient Checkout CTA Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-slate-900 hover:from-indigo-500 hover:to-indigo-800 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-indigo-600/25 flex items-center justify-between transition-all duration-200 cursor-pointer active:scale-[0.99]"
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-indigo-200" />
                  <span>Proceed to Checkout</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  <span>${grandTotal.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </button>

              {/* Trust & Payment Badges */}
              <div className="pt-1 text-center space-y-1.5">
                <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                  <span>Visa</span>
                  <span>•</span>
                  <span>Mastercard</span>
                  <span>•</span>
                  <span>Apple Pay</span>
                  <span>•</span>
                  <span>PayPal</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-Bit SSL Encrypted • Guaranteed Safe Checkout</span>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
