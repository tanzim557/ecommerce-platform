import React, { useState } from 'react';
import {
  User,
  ArrowLeft,
  Package,
  MapPin,
  Ticket,
  Shield,
  Clock,
  Truck,
  CheckCircle2,
  Copy,
  ChevronRight,
  ExternalLink,
  Gift,
  Sparkles,
  CreditCard,
  LogOut,
  Lock,
  Mail,
  Phone,
  Edit3,
  Save,
  Compass,
  Heart,
  ShoppingBag,
  RotateCcw,
  Check,
  Award,
  Zap,
  Navigation,
  Key,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CustomerAccountPage() {
  const {
    setActivePage,
    applyCouponCode,
    setIsOrderTrackerOpen,
    setActiveTrackingCode,
    customerProfile,
    isCustomerLoggedIn,
    loginCustomer,
    registerCustomer,
    updateCustomerProfile,
    logoutCustomer,
    wishlist,
    toggleWishlist,
    addToCart,
  } = useCart();

  // Auth Tab: 'login' | 'register'
  const [authTab, setAuthTab] = useState('login');

  // Customer Portal Tab: 'orders' | 'profile' | 'vouchers' | 'wishlist' | 'security'
  const [activeTab, setActiveTab] = useState('orders');

  // Login Form
  const [loginForm, setLoginForm] = useState({
    email: 'alex.vance@aurasure.com',
    password: 'password123',
    name: 'Alex Vance',
  });

  // Register Form
  const [regForm, setRegForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  // Profile Edit State
  const [profileForm, setProfileForm] = useState({
    name: customerProfile?.name || 'Alex Vance',
    phone: customerProfile?.phone || '+1 (555) 234-8901',
    street: customerProfile?.address?.street || '428 Skyline Boulevard, Penthouse 12B',
    city: customerProfile?.address?.city || 'New York',
    state: customerProfile?.address?.state || 'NY',
    zip: customerProfile?.address?.zip || '10001',
    deliveryInstructions: 'Ring bell #12B or leave with 24/7 concierge lobby.',
  });

  const [copiedCode, setCopiedCode] = useState(null);
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.email) return;
    loginCustomer(loginForm.email, loginForm.password, loginForm.name || 'Alex Vance');
    setActiveTab('orders');
  };

  // Handle Registration Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regForm.name || !regForm.email) return;
    registerCustomer({
      name: regForm.name,
      email: regForm.email,
      phone: regForm.phone,
      password: regForm.password,
    });
    setActiveTab('orders');
  };

  // Handle Profile Save
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateCustomerProfile({
      name: profileForm.name,
      phone: profileForm.phone,
      address: {
        street: profileForm.street,
        city: profileForm.city,
        state: profileForm.state,
        zip: profileForm.zip,
        country: 'United States',
      },
      deliveryInstructions: profileForm.deliveryInstructions,
    });
    setIsSavedFeedback(true);
    setTimeout(() => setIsSavedFeedback(false), 3000);
  };

  // Open Radar
  const handleOpenTracker = (code) => {
    if (setActiveTrackingCode) setActiveTrackingCode(code);
    setIsOrderTrackerOpen(true);
  };

  // Apply Coupon
  const handleCopyCoupon = (code) => {
    applyCouponCode(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Handle Password Update Demo
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwordForm.newPass) return;
    setPasswordChangeSuccess(true);
    setPasswordForm({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setPasswordChangeSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#060814] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Ambient VIP Royal Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[450px] bg-indigo-600/12 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-10 w-[450px] h-[400px] bg-amber-500/8 rounded-full blur-[140px]" />
      </div>

      {/* Top VIP Concierge Header */}
      <header className="sticky top-0 z-40 bg-[#090d1f]/90 backdrop-blur-2xl border-b border-indigo-500/20 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              onClick={() => setActivePage('store')}
              className="group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-300 text-xs font-semibold transition-all cursor-pointer active:scale-95 shadow-sm shrink-0"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 shrink-0" />
              <span className="hidden xs:inline sm:inline">Back to Store</span>
              <span className="xs:hidden sm:hidden">Store</span>
            </button>

            <div className="h-5 sm:h-6 w-px bg-white/10 hidden sm:block shrink-0" />

            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-400/30 shrink-0">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-semibold tracking-tight text-white truncate block">VIP CLIENT</span>
                  <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-indigo-400/15 border border-indigo-400/30 text-[9px] font-semibold text-indigo-300 uppercase tracking-widest shrink-0">
                    Platinum Concierge
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-semibold hidden sm:flex items-center gap-1.5 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
                  White-Glove Node
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isCustomerLoggedIn ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-right hidden sm:block">
                  <span className="text-xs font-semibold text-white block tracking-wide truncate max-w-[140px]">{customerProfile?.name}</span>
                  <div className="flex items-center justify-end gap-1.5 text-[10px] font-bold text-amber-400">
                    <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{customerProfile?.membershipTier || 'VIP Platinum'}</span>
                  </div>
                </div>
                <button
                  onClick={logoutCustomer}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 text-slate-300 hover:text-rose-300 text-xs font-bold transition cursor-pointer"
                  title="Log Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Log Out</span>
                </button>
              </div>
            ) : (
              <span className="text-[11px] sm:text-xs font-semibold text-indigo-300 bg-indigo-500/15 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-indigo-500/30 flex items-center gap-1 animate-pulse">
                <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400" />
                <span>VIP Lounge</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ────────────────────────────────────────────────────────
            SECTION 1: NOT LOGGED IN -> VIP LOUNGE AUTH CARD
           ──────────────────────────────────────────────────────── */}
        {!isCustomerLoggedIn ? (
          <div className="space-y-12 animate-fade-in">
            {/* Hero Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-semibold uppercase tracking-widest shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Private Member Lounge & GPS Telemetry</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none">
                Exclusive Concierge for{' '}
                <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Discerning Clients
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                Live radar GPS tracking for all purchases, instant rewards wallet, priority air dispatch, and direct personal styling concierge.
              </p>
            </div>

            {/* Auth Card */}
            <div className="max-w-xl mx-auto bg-[#0d1226]/90 backdrop-blur-2xl rounded-3xl border border-indigo-500/30 shadow-2xl shadow-indigo-500/10 overflow-hidden relative">
              <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

              {/* Tab Selector */}
              <div className="grid grid-cols-2 p-2 bg-black/40 border-b border-white/10 gap-2">
                <button
                  onClick={() => setAuthTab('login')}
                  className={`py-3.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    authTab === 'login'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>VIP Client Sign In</span>
                </button>
                <button
                  onClick={() => setAuthTab('register')}
                  className={`py-3.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    authTab === 'register'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Join VIP (+250 Pts)</span>
                </button>
              </div>

              {/* Form Area */}
              <div className="p-6 sm:p-8 space-y-4">
                {authTab === 'login' ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Client Full Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={loginForm.name}
                          onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
                          placeholder="Alex Vance"
                          className="w-full pl-10 pr-3.5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-semibold transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address / VIP ID *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          placeholder="alex.vance@aurasure.com"
                          className="w-full pl-10 pr-3.5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-semibold transition"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-300">Password *</label>
                        <span className="text-[11px] text-indigo-400 font-bold hover:underline cursor-pointer">
                          Forgot key?
                        </span>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          required
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-3.5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-semibold transition"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm rounded-2xl shadow-xl shadow-indigo-500/25 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2 mt-2"
                    >
                      <span>Unlock VIP Concierge Hub</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Quick Demo Login */}
                    <div className="pt-4 border-t border-white/10 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          loginCustomer('alex.vance@aurasure.com', 'password123', 'Alex Vance');
                          setActiveTab('orders');
                        }}
                        className="w-full py-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20 border border-indigo-400/30 text-indigo-300 hover:text-white rounded-2xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-amber-400 animate-pulse fill-amber-400" />
                        <span>⚡ 1-Click Demo Login as "Alex Vance (VIP Platinum)"</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Full Name *</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={regForm.name}
                          onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                          placeholder="e.g. Alex Vance"
                          className="w-full pl-10 pr-3.5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={regForm.email}
                          onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                          placeholder="client@luxury.com"
                          className="w-full pl-10 pr-3.5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Mobile Phone (Delivery SMS) *</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={regForm.phone}
                          onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                          placeholder="+1 (555) 234-8901"
                          className="w-full pl-10 pr-3.5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Create Secure Password *</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          required
                          value={regForm.password}
                          onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-3.5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm rounded-2xl shadow-xl shadow-indigo-500/25 transition-all cursor-pointer active:scale-95 mt-2"
                    >
                      Create VIP Account & Claim +250 Pts →
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* VIP Privileges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto pt-4">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-400/40 backdrop-blur-xl transition-all hover:-translate-y-1 group">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Truck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-white">Priority Air Courier</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Dedicated air freight lanes with next-morning arrival for all VIP orders.</p>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-400/40 backdrop-blur-xl transition-all hover:-translate-y-1 group">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 fill-amber-400" />
                </div>
                <h4 className="text-sm font-semibold text-white">Aura Points Wallet</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Earn 5% cashback points on all orders, instantly redeemable as store credits.</p>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-400/40 backdrop-blur-xl transition-all hover:-translate-y-1 group">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-white">Live GPS Telemetry</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Watch your package travel live on satellite radar with flight and courier vehicle telemetry.</p>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-400/40 backdrop-blur-xl transition-all hover:-translate-y-1 group">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-white">Penthouse White-Glove</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Direct-to-suite concierge handoff and 30-day effortless doorstep return service.</p>
              </div>
            </div>
          </div>
        ) : (
          /* ────────────────────────────────────────────────────────
              SECTION 2: LOGGED IN -> HOLOGRAPHIC VIP PLATINUM LOUNGE
             ──────────────────────────────────────────────────────── */
          <div className="space-y-8 animate-fade-in">
            {/* VIP Holographic Membership Card & Header */}
            <div className="relative rounded-3xl bg-gradient-to-br from-[#0c1228] via-[#090d1f] to-[#160d2b] p-6 sm:p-8 border border-indigo-500/30 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-5">
                  {/* Holographic Platinum VIP Badge */}
                  <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-slate-200 via-indigo-200 to-purple-300 text-slate-950 flex flex-col items-center justify-center shadow-xl shadow-indigo-500/20 ring-4 ring-indigo-400/30 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
                    <span className="text-2xl font-bold tracking-tighter">
                      {customerProfile?.name
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase() || 'AV'}
                    </span>
                    <span className="text-[8px] font-semibold tracking-widest uppercase bg-slate-950 text-white px-2 py-0.5 rounded-full mt-1">
                      VIP
                    </span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {customerProfile?.name}
                      </h2>
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{customerProfile?.membershipTier || 'VIP Platinum Member'}</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10 text-[11px] font-mono">
                        CUS-94218
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 mt-1.5 flex flex-wrap items-center gap-2">
                      <span className="text-slate-400">{customerProfile?.email}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-emerald-400 font-bold">Tier 1 Elite Connoisseur</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400">Client since {customerProfile?.joinedYear || '2024'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActivePage('store')}
                    className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:scale-102"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Return to Storefront</span>
                  </button>
                  <button
                    onClick={logoutCustomer}
                    className="px-4 py-2.5 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Exit Concierge</span>
                  </button>
                </div>
              </div>

              {/* VIP Metric Glass Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/10">
                <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-md transition-all">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-bold">Aura Loyalty Points</span>
                    <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-amber-300 block">
                    {customerProfile?.auraPoints || 1420} Pts
                  </span>
                  <span className="text-[10px] text-amber-400/80 font-bold mt-0.5 block">580 Pts to Diamond Tier</span>
                </div>

                <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-md transition-all">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-bold">Store Credit Available</span>
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-emerald-300 block">
                    ${(customerProfile?.storeCredit ?? 45.0).toFixed(2)} USD
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold mt-0.5 block">Auto-deducted in checkout</span>
                </div>

                <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-md transition-all">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-bold">Active Deliveries</span>
                    <Package className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-white block">
                    1 Live In-Transit
                  </span>
                  <span className="text-[10px] text-indigo-300 font-bold mt-0.5 block">Arriving Tomorrow by 2 PM</span>
                </div>

                <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-md transition-all">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-bold">Courier Privilege</span>
                    <Truck className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-purple-300 block">
                    Priority Air
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold mt-0.5 block">Direct GPS Courier Radar</span>
                </div>
              </div>

              {/* Navigation Tabs Capsule */}
              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10 overflow-x-auto no-scrollbar">
                {[
                  { id: 'orders', label: 'My Orders & Live Radar (2)', icon: Package },
                  { id: 'profile', label: 'Profile & Penthouse Addresses', icon: Edit3 },
                  { id: 'vouchers', label: 'Vouchers & Wallet (2)', icon: Ticket },
                  { id: 'wishlist', label: `My Saved Wishlist (${wishlist.length})`, icon: Heart },
                  { id: 'security', label: 'Security & 2FA', icon: Shield },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TAB 1: ORDERS & LIVE SATELLITE RADAR */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                {/* Active In-Transit Telemetry Order Card */}
                <div className="relative rounded-3xl bg-[#0c1228]/90 border border-indigo-400/40 p-6 sm:p-8 shadow-2xl backdrop-blur-xl overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-white">Order #AL-92418</span>
                        <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold uppercase flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          <span>In Flight • Priority Air Express</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Placed on Sept 22, 2026 • Destination: 428 Skyline Blvd, New York, NY
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-2xl font-bold text-white">$289.00 USD</span>
                      <span className="block text-xs font-semibold text-emerald-400 mt-0.5">
                        ETA: Tomorrow by 2:00 PM EST
                      </span>
                    </div>
                  </div>

                  {/* Animated Route Progress Bar */}
                  <div className="py-5 sm:py-6">
                    <div className="flex items-center justify-between mb-3 text-[10px] sm:text-xs font-semibold">
                      <span className="text-emerald-400 flex items-center gap-1 sm:gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        <span>Confirmed</span>
                      </span>
                      <span className="text-emerald-400 flex items-center gap-1 sm:gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        <span>Packed<span className="hidden sm:inline"> & Verified</span></span>
                      </span>
                      <span className="text-indigo-300 flex items-center gap-1 sm:gap-1.5 animate-pulse">
                        <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 shrink-0" />
                        <span>Transit</span>
                      </span>
                      <span className="text-slate-500">Delivered</span>
                    </div>

                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                      <div className="h-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 rounded-full w-3/4 transition-all duration-500 animate-flow-laser" />
                    </div>
                  </div>

                  {/* Live Radar Call-To-Action Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-white/10 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <Navigation className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Flight Telemetry ID</span>
                        <strong className="text-white font-mono text-xs">#DXB-88319-EXP</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenTracker('AL-92418')}
                      className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-500/25 active:scale-95"
                    >
                      <Compass className="w-4 h-4 animate-spin shrink-0" style={{ animationDuration: '8s' }} />
                      <span>Launch GPS Telemetry Radar 📡</span>
                    </button>
                  </div>
                </div>

                {/* Delivered Order Card */}
                <div className="rounded-3xl bg-[#0c1228]/90 border border-white/10 p-6 shadow-xl backdrop-blur-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-base font-semibold text-white">Order #AL-88310</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-semibold uppercase flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Delivered Successfully</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Delivered on Sept 14, 2026 • Signed by {customerProfile?.name || 'Alex Vance'} (Penthouse Concierge)
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-lg font-semibold text-white">$649.00 USD</span>
                      <span className="block text-xs text-slate-400">CyberWatch Ultra 49mm Titanium</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PROFILE & CONCIERGE ADDRESSES */}
            {activeTab === 'profile' && (
              <div className="bg-[#0c1228]/90 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl max-w-3xl mx-auto space-y-6">
                <div className="pb-4 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">VIP Profile & Concierge Address</h3>
                    <p className="text-xs text-slate-400 mt-1">Autofilled on all 1-tap priority checkouts.</p>
                  </div>
                  <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/15 border border-indigo-400/30 px-3 py-1 rounded-full">
                    Live Synchronized
                  </span>
                </div>

                {isSavedFeedback && (
                  <div className="p-4 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl flex items-center gap-2 text-xs text-emerald-300 font-semibold animate-fade-in">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Profile details and penthouse address saved successfully!</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Mobile Phone (Direct Courier)</label>
                      <input
                        type="tel"
                        required
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 font-semibold"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Street Address / Suite</label>
                      <input
                        type="text"
                        required
                        value={profileForm.street}
                        onChange={(e) => setProfileForm({ ...profileForm, street: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">City</label>
                      <input
                        type="text"
                        required
                        value={profileForm.city}
                        onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">State</label>
                        <input
                          type="text"
                          required
                          value={profileForm.state}
                          onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">Postal Code</label>
                        <input
                          type="text"
                          required
                          value={profileForm.zip}
                          onChange={(e) => setProfileForm({ ...profileForm, zip: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 font-semibold"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Special Delivery Instructions</label>
                      <textarea
                        rows={2}
                        value={profileForm.deliveryInstructions}
                        onChange={(e) => setProfileForm({ ...profileForm, deliveryInstructions: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none font-semibold"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm rounded-2xl transition-all shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer mt-4 active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save VIP Profile & Address Changes</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: VOUCHERS & STORE WALLET */}
            {activeTab === 'vouchers' && (
              <div className="space-y-6 max-w-3xl mx-auto">
                {/* Virtual VIP Card Mockup */}
                <div className="relative rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 p-6 sm:p-8 text-white shadow-2xl border border-indigo-400/40 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-indigo-200">
                        Aura Luxe Private Reserve Card
                      </span>
                      <h3 className="text-3xl sm:text-4xl font-bold mt-2">
                        ${(customerProfile?.storeCredit ?? 45.0).toFixed(2)}{' '}
                        <span className="text-sm font-normal text-indigo-200">USD</span>
                      </h3>
                    </div>
                    <div className="w-12 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-mono font-bold text-xs">
                      CHIP
                    </div>
                  </div>

                  <div className="flex justify-between items-end pt-4 border-t border-white/15 text-xs">
                    <div>
                      <span className="text-[10px] text-indigo-300 uppercase block font-bold">Client Name</span>
                      <span className="font-mono font-semibold text-sm">{customerProfile?.name || 'Alex Vance'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-indigo-300 uppercase block font-bold">Card Number</span>
                      <span className="font-mono text-sm">•••• •••• •••• 9421</span>
                    </div>
                  </div>
                </div>

                {/* Perforated Luxury Vouchers */}
                <div className="space-y-3">
                  {[
                    {
                      code: 'SAVE15',
                      title: '15% Off Any Luxury Item',
                      desc: 'Valid across Audio, Electronics, and Outerwear collections.',
                      expiry: 'Expires in 12 days',
                    },
                    {
                      code: 'AURA10',
                      title: '$10 Instant Discount',
                      desc: 'Flat discount automatically deducted on orders above $100.',
                      expiry: 'Permanent VIP Client Perk',
                    },
                  ].map((v) => (
                    <div
                      key={v.code}
                      className="p-5 rounded-3xl bg-[#0c1228]/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl backdrop-blur-xl"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <span className="px-3 py-1 rounded-xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 font-mono font-semibold text-xs">
                            {v.code}
                          </span>
                          <span className="font-semibold text-sm text-white">{v.title}</span>
                        </div>
                        <p className="text-xs text-slate-400">{v.desc}</p>
                        <span className="text-[11px] text-emerald-400 font-bold block">{v.expiry}</span>
                      </div>

                      <button
                        onClick={() => handleCopyCoupon(v.code)}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition cursor-pointer flex-shrink-0 shadow-md"
                      >
                        {copiedCode === v.code ? '✓ Applied to Bag!' : 'Apply Coupon'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                {wishlist.length === 0 ? (
                  <div className="text-center py-16 bg-[#0c1228]/90 rounded-3xl border border-white/10 space-y-3">
                    <Heart className="w-14 h-14 text-slate-600 mx-auto" />
                    <h4 className="text-base font-semibold text-white">Your VIP wishlist is empty</h4>
                    <p className="text-xs text-slate-400">Save items from the store to access quick private styling.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="p-5 rounded-3xl bg-[#0c1228]/90 border border-white/10 flex items-center justify-between gap-4 shadow-xl backdrop-blur-xl"
                      >
                        <div className="flex items-center gap-3.5">
                          <img
                            src={item.images ? item.images[0] : item.image}
                            alt={item.name}
                            className="w-14 h-14 rounded-2xl object-cover border border-white/10 flex-shrink-0"
                          />
                          <div>
                            <h5 className="text-xs font-semibold text-white line-clamp-1">{item.name}</h5>
                            <span className="text-xs font-semibold text-indigo-400">${item.price.toFixed(2)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => addToCart(item, item.colors?.[0]?.name, item.sizes?.[0])}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                        >
                          + Bag
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: SECURITY */}
            {activeTab === 'security' && (
              <div className="bg-[#0c1228]/90 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-5 max-w-3xl mx-auto">
                <h3 className="text-xl font-bold text-white">Account Security & Biometric 2FA</h3>
                <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/10">
                  <div>
                    <span className="font-semibold text-white block text-sm">Two-Factor Authentication (2FA)</span>
                    <span className="text-slate-400 text-xs">
                      Protected via SMS to {customerProfile?.phone || '+1 (555) 234-8901'}
                    </span>
                  </div>
                  <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-xs border border-emerald-400/30">
                    ✓ Armed & Protected
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
