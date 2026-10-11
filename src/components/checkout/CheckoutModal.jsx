import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  CreditCard,
  ShieldCheck,
  Lock,
  Truck,
  ChevronRight,
  Download,
  Package,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Zap,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discountAmount,
    shippingCost,
    taxCost,
    grandTotal,
    clearCart,
  } = useCart();

  const [step, setStep] = useState(1); // 1 = Shipping, 2 = Payment & Review, 3 = Confirmation
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);
  const [shippingMethod, setShippingMethod] = useState('standard'); // 'standard' | 'express'

  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zipCode: '97477',
    country: 'United States',
    paymentMethod: 'card',
    cardNumber: '4242 •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '888',
    cardName: 'Alex Morgan',
  });

  const [formErrors, setFormErrors] = useState({});

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (formErrors[e.target.name]) {
      setFormErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validateShipping = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email required';
    if (!formData.address.trim()) errors.address = 'Street address required';
    if (!formData.city.trim()) errors.city = 'City required';
    if (!formData.zipCode.trim()) errors.zipCode = 'Postal code required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (validateShipping()) {
        setStep(2);
      }
    }
  };

  const currentGrandTotal = shippingMethod === 'express' ? grandTotal + 15 : grandTotal;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrderNumber = `AL-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderSummary({
        orderNumber: generatedOrderNumber,
        items: [...cart],
        grandTotal: currentGrandTotal,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        shippingAddress: formData,
        shippingMethod,
      });

      setIsProcessing(false);
      clearCart();
      setStep(3);
    }, 1500);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-2xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto animate-fade-in-scale">
        {/* Luxury Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-semibold tracking-tight">Express Secure Checkout</h2>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-extrabold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    256-Bit SSL
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">Fast, encrypted, and guaranteed purchase protection</p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stepper Bar */}
          {step < 3 && (
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between max-w-md mx-auto">
              {/* Step 1 Pill */}
              <div
                onClick={() => setStep(1)}
                className={`flex items-center gap-2.5 cursor-pointer transition ${
                  step === 1 ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-semibold transition-all ${
                    step === 1
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/40 ring-2 ring-white/30'
                      : 'bg-emerald-500 text-white'
                  }`}
                >
                  {step > 1 ? <Check className="w-4 h-4" /> : '1'}
                </div>
                <div>
                  <span className="block text-xs font-extrabold tracking-tight">Shipping</span>
                  <span className="block text-[10px] text-slate-300">Address & Courier</span>
                </div>
              </div>

              {/* Connecting Divider */}
              <div className="flex-1 mx-4 h-0.5 bg-white/20 relative overflow-hidden">
                <div
                  className={`h-full bg-indigo-400 transition-all duration-300 ${
                    step >= 2 ? 'w-full' : 'w-0'
                  }`}
                />
              </div>

              {/* Step 2 Pill */}
              <div
                className={`flex items-center gap-2.5 transition ${
                  step === 2 ? 'opacity-100' : 'opacity-60'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-semibold transition-all ${
                    step === 2
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/40 ring-2 ring-white/30'
                      : 'bg-white/20 text-slate-300'
                  }`}
                >
                  2
                </div>
                <div>
                  <span className="block text-xs font-extrabold tracking-tight">Payment</span>
                  <span className="block text-[10px] text-slate-300">Method & Review</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[72vh] overflow-y-auto bg-slate-50/40">
          {/* ══════════════════════════════════════════════
              STEP 1: SHIPPING ADDRESS & DELIVERY METHOD
              ══════════════════════════════════════════════ */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              {/* Order Quick Strip */}
              {cart.length > 0 && (
                <div className="p-3.5 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-0.5">
                    {cart.map((item) => (
                      <div key={item.variantKey} className="relative flex-shrink-0" title={item.name}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-xl object-cover bg-slate-100 border border-slate-200"
                        />
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                          {item.quantity}
                        </span>
                      </div>
                    ))}
                    <div className="text-left pl-1">
                      <span className="text-xs font-bold text-slate-900 block leading-tight">
                        {cart.length} {cart.length === 1 ? 'item' : 'items'} in order
                      </span>
                      <span className="text-[10px] text-slate-400">Total: ${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 whitespace-nowrap">
                    Free Worldwide Shipping
                  </span>
                </div>
              )}

              {/* Form Section Header */}
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  <span>Delivery Address</span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Enter the exact address where you'd like your parcel delivered.</p>
              </div>

              {/* Form Grid */}
              <div className="space-y-3.5">
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">First Name *</label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition shadow-2xs"
                      />
                    </div>
                    {formErrors.firstName && <p className="text-[10px] text-rose-600 mt-1 font-semibold">{formErrors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Last Name *</label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition shadow-2xs"
                      />
                    </div>
                    {formErrors.lastName && <p className="text-[10px] text-rose-600 mt-1 font-semibold">{formErrors.lastName}</p>}
                  </div>
                </div>

                {/* Contact Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Email Address (for order tracking) *</label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex.morgan@example.com"
                        className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition shadow-2xs"
                      />
                    </div>
                    {formErrors.email && <p className="text-[10px] text-rose-600 mt-1 font-semibold">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number (courier updates) *</label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 234-5678"
                        className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition shadow-2xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Street Address & Apartment *</label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition shadow-2xs"
                    />
                  </div>
                  {formErrors.address && <p className="text-[10px] text-rose-600 mt-1 font-semibold">{formErrors.address}</p>}
                </div>

                {/* City, State, Zip */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Springfield"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition shadow-2xs"
                    />
                    {formErrors.city && <p className="text-[10px] text-rose-600 mt-1 font-semibold">{formErrors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">State / Province</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="OR"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Postal Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="97477"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition shadow-2xs"
                    />
                    {formErrors.zipCode && <p className="text-[10px] text-rose-600 mt-1 font-semibold">{formErrors.zipCode}</p>}
                  </div>
                </div>
              </div>

              {/* Delivery Speed Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-2">Select Shipping Speed</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setShippingMethod('standard')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between ${
                      shippingMethod === 'standard'
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-2xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Standard Express</span>
                        <span className="text-[10px] text-slate-500">2 - 4 business days</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600">FREE</span>
                  </div>

                  <div
                    onClick={() => setShippingMethod('express')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between ${
                      shippingMethod === 'express'
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-2xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Priority Next-Day</span>
                        <span className="text-[10px] text-slate-500">Guaranteed 24h Courier</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900">+$15.00</span>
                  </div>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200/90">
                <div className="text-left w-full sm:w-auto">
                  <span className="text-xs text-slate-400 block font-normal leading-tight">Order Total</span>
                  <span className="text-lg font-semibold text-slate-900">${currentGrandTotal.toFixed(2)}</span>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-slate-900 hover:from-indigo-500 hover:to-indigo-800 text-white text-xs sm:text-sm font-extrabold rounded-2xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ══════════════════════════════════════════════
              STEP 2: PAYMENT METHOD & ORDER REVIEW
              ══════════════════════════════════════════════ */}
          {step === 2 && (
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Top Row: Title & Edit Shipping link */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                    <CreditCard className="w-4 h-4 text-indigo-600" />
                    <span>Choose Payment Method</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Encrypted with 256-bit bank-grade protocol</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-bold underline cursor-pointer"
                >
                  Edit Shipping
                </button>
              </div>

              {/* 3 Payment Options */}
              <div className="grid grid-cols-3 gap-3">
                {/* Credit Card */}
                <div
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'card' }))}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition text-center ${
                    formData.paymentMethod === 'card'
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-md ring-2 ring-indigo-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl mx-auto mb-1.5 flex items-center justify-center ${
                    formData.paymentMethod === 'card' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-bold block ${formData.paymentMethod === 'card' ? 'text-indigo-900 font-extrabold' : 'text-slate-700'}`}>
                    Credit Card
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Visa / MC / Amex</span>
                </div>

                {/* PayPal */}
                <div
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'paypal' }))}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition text-center ${
                    formData.paymentMethod === 'paypal'
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-md ring-2 ring-indigo-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl mx-auto mb-1.5 flex items-center justify-center ${
                    formData.paymentMethod === 'paypal' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-blue-600'
                  }`}>
                    <span className="font-semibold text-xs">P</span>
                  </div>
                  <span className={`text-xs font-bold block ${formData.paymentMethod === 'paypal' ? 'text-indigo-900 font-extrabold' : 'text-slate-700'}`}>
                    PayPal
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Instant Checkout</span>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'cod' }))}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition text-center ${
                    formData.paymentMethod === 'cod'
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-md ring-2 ring-indigo-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl mx-auto mb-1.5 flex items-center justify-center ${
                    formData.paymentMethod === 'cod' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-bold block ${formData.paymentMethod === 'cod' ? 'text-indigo-900 font-extrabold' : 'text-slate-700'}`}>
                    Cash on Delivery
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Pay at Doorstep</span>
                </div>
              </div>

              {/* Card Inputs Form */}
              {formData.paymentMethod === 'card' && (
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3.5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                    <span className="font-bold text-slate-800">Cardholder Credentials</span>
                    <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[10px]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>256-Bit SSL Encrypted</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono tracking-wider focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Expiration Date</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Security CVC</label>
                      <input
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        placeholder="888"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary Snapshot Box */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200/90 text-xs space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Order Review</span>
                  <span className="text-[11px] text-indigo-600 font-bold">{cart.length} items</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Ship To:</span>
                  <span className="text-slate-900 font-bold text-right truncate max-w-[260px]">
                    {formData.address}, {formData.city}, {formData.state}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Courier:</span>
                  <span className="text-slate-900 font-semibold">
                    {shippingMethod === 'express' ? 'Priority Next-Day (+$15.00)' : 'Standard Express (FREE)'}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="text-slate-900 font-bold">${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-2.5 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-900">Total Due:</span>
                  <span className="text-lg font-semibold text-slate-900 tracking-tight">
                    ${currentGrandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-2xl transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-slate-900 hover:from-indigo-500 hover:to-indigo-800 text-white text-xs sm:text-sm font-extrabold rounded-2xl shadow-lg shadow-indigo-600/25 transition flex items-center justify-center gap-2 disabled:bg-slate-400 cursor-pointer active:scale-95"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Securing Transaction...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-indigo-200" />
                      <span>Pay ${currentGrandTotal.toFixed(2)}</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ══════════════════════════════════════════════
              STEP 3: ORDER CONFIRMED (SUCCESS RECEIPT)
              ══════════════════════════════════════════════ */}
          {step === 3 && orderSummary && (
            <div className="text-center py-6 space-y-6 animate-fade-in">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-2">
                  Order Successfully Placed
                </span>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Thank You for Your Order!
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
                  A confirmation receipt and courier tracking details were sent to{' '}
                  <strong className="text-slate-900">{orderSummary.shippingAddress.email}</strong>.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-5 bg-white rounded-2xl border border-slate-200 text-left text-xs space-y-4 max-w-lg mx-auto shadow-sm">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Order Number</span>
                    <span className="text-sm font-semibold text-slate-900 font-mono">{orderSummary.orderNumber}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Placed On</span>
                    <span className="text-slate-900 font-bold">{orderSummary.date}</span>
                  </div>
                </div>

                <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
                  {orderSummary.items.map((it) => (
                    <div key={it.variantKey} className="flex justify-between items-center">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={it.image}
                          alt={it.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                        />
                        <div>
                          <p className="text-slate-900 font-bold line-clamp-1 leading-snug">{it.name}</p>
                          <p className="text-[10px] text-slate-400">Qty: {it.quantity}</p>
                        </div>
                      </div>
                      <span className="text-slate-900 font-extrabold">${(it.price * it.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-center font-bold">
                  <span className="text-slate-600">Total Charged:</span>
                  <span className="text-lg text-slate-900 font-semibold">${orderSummary.grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 px-4 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => alert(`Receipt for ${orderSummary.orderNumber} downloaded.`)}
                  className="py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Invoice</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
