import React, { useState } from 'react';
import {
  X,
  User,
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
  FileText,
  Star,
  Check,
  AlertCircle,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CustomerAccountModal() {
  const {
    isCustomerModalOpen,
    setIsCustomerModalOpen,
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

  // Login Form State
  const [loginForm, setLoginForm] = useState({
    email: 'alex.vance@aurasure.com',
    password: 'password123',
    name: 'Alex Vance',
  });

  // Register Form State
  const [regForm, setRegForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    street: '',
    city: '',
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

  if (!isCustomerModalOpen) return null;

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
    setIsCustomerModalOpen(false);
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
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
        onClick={() => setIsCustomerModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-fade-in-scale my-auto">
        {/* ────────────────────────────────────────────────────────
            SECTION 1: IF NOT LOGGED IN -> CUSTOMER AUTHENTICATION
            ──────────────────────────────────────────────────────── */}
        {!isCustomerLoggedIn ? (
          <div>
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Customer Account Portal</h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] font-extrabold uppercase tracking-wider">
                        VIP Member Access
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Sign in or create your customer account to view live orders, track deliveries in real time, and earn VIP rewards.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCustomerModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Auth Tabs */}
              <div className="flex items-center gap-2 mt-6 pt-2 border-t border-white/10">
                <button
                  onClick={() => setAuthTab('login')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    authTab === 'login'
                      ? 'bg-white text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Customer Sign In</span>
                </button>
                <button
                  onClick={() => setAuthTab('register')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    authTab === 'register'
                      ? 'bg-white text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Create VIP Account (+250 Pts & $15 Credit)</span>
                </button>
              </div>
            </div>

            {/* Auth Body */}
            <div className="p-6 sm:p-8 bg-slate-50/60 max-h-[70vh] overflow-y-auto">
              {/* TAB 1: LOGIN */}
              {authTab === 'login' && (
                <div className="max-w-md mx-auto space-y-5">
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-semibold text-slate-900">Sign In to Your Customer Portal</h3>
                    <p className="text-xs text-slate-500">
                      Access your saved orders, live GPS tracking radar, and exclusive member discounts.
                    </p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={loginForm.name}
                          onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
                          placeholder="Alex Vance"
                          className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-2xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email / Customer ID *</label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          placeholder="alex.vance@aurasure.com"
                          className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-2xs"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-700">Password *</label>
                        <span className="text-[10px] text-indigo-600 font-bold hover:underline cursor-pointer">Forgot?</span>
                      </div>
                      <div className="relative">
                        <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          required
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          placeholder="••••••••"
                          className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-2xs"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition cursor-pointer active:scale-95"
                    >
                      Sign In to Account →
                    </button>

                    {/* Quick Demo Login */}
                    <div className="pt-2 border-t border-slate-100 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          loginCustomer('alex.vance@aurasure.com', 'password123', 'Alex Vance');
                          setActiveTab('orders');
                        }}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>⚡ One-Click Demo Sign In as "Alex Vance (VIP Platinum)"</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: REGISTER */}
              {authTab === 'register' && (
                <div className="max-w-xl mx-auto space-y-5">
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-semibold text-slate-900">Create Your VIP Customer Account</h3>
                    <p className="text-xs text-slate-500">
                      Join Aura Luxe and instantly receive <strong className="text-amber-600">250 Bonus Points</strong> and a <strong className="text-emerald-600">$15 Welcome Voucher</strong>.
                    </p>
                  </div>

                  <form onSubmit={handleRegisterSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={regForm.name}
                            onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                            placeholder="e.g. Alex Morgan"
                            className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-2xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            value={regForm.email}
                            onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                            placeholder="alex@example.com"
                            className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-2xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone (Courier SMS) *</label>
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            value={regForm.phone}
                            onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                            placeholder="+1 (555) 234-5678"
                            className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-2xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Create Password *</label>
                        <div className="relative">
                          <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="password"
                            required
                            value={regForm.password}
                            onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                            placeholder="••••••••"
                            className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-2xs"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition cursor-pointer active:scale-95 mt-2"
                    >
                      Create Account & Claim VIP Bonus →
                    </button>
                  </form>
                </div>
              )}

              {/* VIP Benefits Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-200">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-slate-900">Complimentary VIP</span>
                    <span className="block text-[10px] text-slate-500">Free Priority Courier</span>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-slate-900">+250 Points</span>
                    <span className="block text-[10px] text-slate-500">Instant Welcome Gift</span>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-slate-900">Live GPS Radar</span>
                    <span className="block text-[10px] text-slate-500">Real-Time Telemetry</span>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-slate-900">Concierge Return</span>
                    <span className="block text-[10px] text-slate-500">30-Day Hassle Free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ────────────────────────────────────────────────────────
              SECTION 2: LOGGED IN -> DEDICATED CUSTOMER PORTAL
             ──────────────────────────────────────────────────────── */
          <div>
            {/* Customer Profile Header */}
            <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white p-6 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 text-white flex items-center justify-center text-lg font-semibold shadow-lg shadow-indigo-500/30 border-2 border-white/20">
                      {customerProfile?.name
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase() || 'AV'}
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full" title="Active VIP Online" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{customerProfile?.name || 'Alex Vance'}</h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>{customerProfile?.membershipTier || 'VIP Platinum'}</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {customerProfile?.email} • Member ID: <strong className="text-white font-mono">CUS-94218</strong> • Active Client
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={logoutCustomer}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    title="Log out of account"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>

                  <button
                    onClick={() => setIsCustomerModalOpen(false)}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Quick Stat KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-white/10 text-xs">
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-slate-300 block text-[11px] font-medium">Aura Rewards</span>
                  <span className="text-base font-semibold text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{customerProfile?.auraPoints || 1420} Pts</span>
                  </span>
                </div>
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-slate-300 block text-[11px] font-medium">Store Credit</span>
                  <span className="text-base font-semibold text-emerald-300">
                    ${(customerProfile?.storeCredit ?? 45.0).toFixed(2)} USD
                  </span>
                </div>
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-slate-300 block text-[11px] font-medium">Total Orders</span>
                  <span className="text-base font-semibold text-white">8 Orders (1 Active)</span>
                </div>
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-slate-300 block text-[11px] font-medium">VIP Courier Perk</span>
                  <span className="text-base font-semibold text-indigo-300">Priority Air Delivery</span>
                </div>
              </div>

              {/* Portal Navigation Tabs */}
              <div className="flex items-center gap-2 mt-6 pt-3 border-t border-white/10 overflow-x-auto no-scrollbar">
                {[
                  { id: 'orders', label: 'My Orders & Live Radar (2)', icon: Package },
                  { id: 'profile', label: 'Edit Profile & Addresses', icon: Edit3 },
                  { id: 'vouchers', label: 'Vouchers & Wallet (2)', icon: Ticket },
                  { id: 'wishlist', label: `My Wishlist (${wishlist.length})`, icon: Heart },
                  { id: 'security', label: 'Security & 2FA', icon: Shield },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-white text-slate-950 shadow-md'
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[65vh] overflow-y-auto bg-slate-50/60">
              {/* TAB 1: MY ORDERS & RADAR */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {/* Active Order Card with Live Tracking */}
                  <div className="bg-white p-5 rounded-2xl border border-indigo-200/90 shadow-2xs relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-900">Order #AL-92418</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-extrabold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />
                            <span>In Transit • Priority Air</span>
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">Placed on Sept 22, 2026 • Destination: New York, USA</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-slate-900">$289.00</span>
                        <span className="block text-[11px] text-emerald-600 font-bold">Estimated Delivery: Tomorrow by 2 PM</span>
                      </div>
                    </div>

                    {/* Progress Bar Timeline */}
                    <div className="py-4">
                      <div className="flex items-center justify-between mb-2 text-[11px] font-bold">
                        <span className="text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                        </span>
                        <span className="text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Packed & Verified
                        </span>
                        <span className="text-indigo-600 flex items-center gap-1 animate-pulse">
                          <Truck className="w-3.5 h-3.5" /> In Transit
                        </span>
                        <span className="text-slate-400">Delivered</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                        <div className="h-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-indigo-600 rounded-full w-3/4 transition-all duration-500 animate-flow-laser" />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                      <span className="text-slate-500">
                        Live Tracking Code: <strong className="text-slate-900 font-mono font-bold">#DXB-88319-EXP</strong>
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenTracker('AL-92418')}
                          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
                        >
                          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                          <span>Open Live Courier Radar 📡</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Past Order Card */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-900">Order #AL-88310</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Delivered Successfully</span>
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">Delivered on Sept 14, 2026 • Signed by {customerProfile?.name || 'Alex Vance'}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-slate-900">$649.00</span>
                        <span className="block text-[11px] text-slate-500">1 Item: CyberWatch Ultra 49mm</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 text-xs">
                      <span className="text-slate-500">Carrier: FedEx Signature Direct</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleOpenTracker('AL-88310')}
                          className="text-indigo-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          View Delivery Proof <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: EDIT PROFILE & ADDRESSES */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                          <User className="w-4 h-4 text-indigo-600" />
                          <span>Customer Profile & Default Shipping Address</span>
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Update your contact and shipping information. Changes sync live across checkout.
                        </p>
                      </div>
                      <span className="text-[11px] text-indigo-600 font-bold bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                        Live Editable
                      </span>
                    </div>

                    {isSavedFeedback && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-bold animate-fade-in">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Profile details and shipping address saved successfully!</span>
                      </div>
                    )}

                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            required
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone (Courier SMS)</label>
                          <input
                            type="tel"
                            required
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">Street Address</label>
                          <input
                            type="text"
                            required
                            value={profileForm.street}
                            onChange={(e) => setProfileForm({ ...profileForm, street: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                          <input
                            type="text"
                            required
                            value={profileForm.city}
                            onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                            <input
                              type="text"
                              required
                              value={profileForm.state}
                              onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
                              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Postal Code</label>
                            <input
                              type="text"
                              required
                              value={profileForm.zip}
                              onChange={(e) => setProfileForm({ ...profileForm, zip: e.target.value })}
                              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">Special Delivery Instructions</label>
                          <input
                            type="text"
                            value={profileForm.deliveryInstructions}
                            onChange={(e) => setProfileForm({ ...profileForm, deliveryInstructions: e.target.value })}
                            placeholder="e.g. Leave with concierge or ring bell #12"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-extrabold text-xs sm:text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2 active:scale-95"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Profile & Address Details</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 3: VOUCHERS & WALLET */}
              {activeTab === 'vouchers' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-5 rounded-2xl text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-100">Store Credit Balance</span>
                      <h3 className="text-2xl sm:text-3xl font-bold mt-0.5">
                        ${(customerProfile?.storeCredit ?? 45.0).toFixed(2)} USD
                      </h3>
                      <p className="text-xs text-indigo-100 mt-1">
                        Automatically available to deduct during checkout.
                      </p>
                    </div>
                    <div className="bg-white/15 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 text-center">
                      <span className="block text-[11px] font-bold text-white">Rewards Value</span>
                      <span className="text-lg font-semibold text-amber-300">
                        ${((customerProfile?.auraPoints || 1420) * 0.01).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        code: 'SAVE15',
                        title: '15% Off Any Purchase',
                        desc: 'Valid across Audio, Electronics, and Outerwear.',
                        expiry: 'Expires in 12 days',
                      },
                      {
                        code: 'AURA10',
                        title: '$10 Instant Discount',
                        desc: 'Flat savings on orders above $100.',
                        expiry: 'Permanent VIP Perk',
                      },
                    ].map((v) => (
                      <div
                        key={v.code}
                        className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between gap-4 shadow-2xs hover:border-indigo-300 transition"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono font-semibold text-xs">
                              {v.code}
                            </span>
                            <span className="font-extrabold text-xs text-slate-900">{v.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-500">{v.desc}</p>
                          <span className="text-[10px] text-emerald-600 font-bold block">{v.expiry}</span>
                        </div>
                        <button
                          onClick={() => handleCopyCoupon(v.code)}
                          className="px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl transition cursor-pointer flex-shrink-0 active:scale-95"
                        >
                          {copiedCode === v.code ? '✓ Applied!' : 'Apply to Bag'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: MY WISHLIST */}
              {activeTab === 'wishlist' && (
                <div className="space-y-4">
                  {wishlist.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                      <Heart className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                      <h4 className="text-sm font-bold text-slate-700">No saved items in your wishlist yet</h4>
                      <p className="text-xs text-slate-400 mt-1">Browse our luxury catalog and click the heart icon to save products here.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {wishlist.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.images ? item.images[0] : item.image}
                              alt={item.name}
                              className="w-14 h-14 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                            />
                            <div>
                              <h5 className="text-xs font-semibold text-slate-900 line-clamp-1">{item.name}</h5>
                              <span className="text-xs font-semibold text-indigo-600">${item.price.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                addToCart(item, item.colors?.[0]?.name, item.sizes?.[0]);
                              }}
                              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
                            >
                              + Move to Bag
                            </button>
                            <button
                              onClick={() => toggleWishlist(item)}
                              className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                              title="Remove"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: SECURITY & 2FA */}
              {activeTab === 'security' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Account Security & Credentials</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Manage your password, login sessions, and two-factor authentication.</p>
                  </div>

                  {passwordChangeSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-bold animate-fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Password successfully updated!</span>
                    </div>
                  )}

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                      <div>
                        <span className="font-bold text-slate-900 block">Two-Factor Authentication (2FA)</span>
                        <span className="text-slate-400 text-[11px]">Protected via SMS to {customerProfile?.phone || '+1 (555) 234-8901'}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[11px] flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Enabled</span>
                      </span>
                    </div>

                    <form onSubmit={handlePasswordSubmit} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
                      <span className="font-bold text-slate-900 block text-xs">Change Password</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Current Password</label>
                          <input
                            type="password"
                            required
                            value={passwordForm.current}
                            onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                            placeholder="••••••••"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">New Password</label>
                          <input
                            type="password"
                            required
                            value={passwordForm.newPass}
                            onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                            placeholder="••••••••"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                      >
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
