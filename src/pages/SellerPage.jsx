import React, { useState } from 'react';
import {
  Store,
  ArrowLeft,
  Package,
  TrendingUp,
  DollarSign,
  PlusCircle,
  Edit3,
  Trash2,
  Lock,
  Mail,
  Building,
  Phone,
  LogOut,
  Save,
  Image,
  Search,
  Check,
  Award,
  Sparkles,
  ShieldCheck,
  Truck,
  Users,
  Clock,
  ArrowRight,
  ExternalLink,
  LayoutGrid,
  List,
  Eye,
  BarChart3,
  BadgePercent,
  CheckCircle2,
  Layers,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function SellerPage() {
  const {
    setActivePage,
    products,
    updateProduct,
    addProduct,
    deleteProduct,
    sellerProfile,
    isSellerLoggedIn,
    loginSeller,
    registerSeller,
    logoutSeller,
  } = useCart();

  // Auth Tab: 'login' | 'register'
  const [authTab, setAuthTab] = useState('login');

  // Logged-in Seller Tab: 'inventory' | 'add_product' | 'analytics'
  const [sellerTab, setSellerTab] = useState('inventory');

  // Inventory View Mode: 'grid' | 'table'
  const [viewMode, setViewMode] = useState('grid');

  // Login Form
  const [loginForm, setLoginForm] = useState({
    email: 'merchant@nordicaudio.com',
    password: 'password123',
    companyName: 'Nordic Audio Labs',
  });

  // Registration Form
  const [regForm, setRegForm] = useState({
    companyName: '',
    category: 'Audio & Sound',
    email: '',
    password: '',
    phone: '',
  });

  // Inventory Search & Filter
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryCategory, setInventoryCategory] = useState('all');

  // Product Editing State
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // New Product Form
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    category: 'audio',
    categoryName: 'Audio & Sound',
    price: '',
    compareAtPrice: '',
    stockQuantity: '',
    sku: '',
    shortDescription: '',
    image: '',
  });
  const [publishSuccessMsg, setPublishSuccessMsg] = useState(false);

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.email) return;
    loginSeller(loginForm.email, loginForm.password, loginForm.companyName || 'Nordic Audio Labs');
    setSellerTab('inventory');
  };

  // Handle Register Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regForm.companyName || !regForm.email) return;
    registerSeller({
      companyName: regForm.companyName,
      category: regForm.category,
      email: regForm.email,
      phone: regForm.phone,
    });
    setSellerTab('inventory');
  };

  // Open Edit Form
  const handleStartEdit = (product) => {
    setEditingProduct(product);
    setEditForm({
      id: product.id,
      name: product.name,
      category: product.category,
      categoryName: product.categoryName || product.category,
      price: product.price,
      compareAtPrice: product.compareAtPrice || '',
      stockQuantity: product.stockQuantity,
      sku: product.sku || '',
      shortDescription: product.shortDescription || '',
      image: product.images ? product.images[0] : (product.image || ''),
    });
  };

  // Save Edit
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editForm.name || !editForm.price) return;
    const updated = {
      ...editingProduct,
      name: editForm.name,
      category: editForm.category,
      price: parseFloat(editForm.price) || editingProduct.price,
      compareAtPrice: editForm.compareAtPrice ? parseFloat(editForm.compareAtPrice) : null,
      stockQuantity: parseInt(editForm.stockQuantity, 10) || 0,
      sku: editForm.sku,
      shortDescription: editForm.shortDescription,
      images: editForm.image ? [editForm.image, ...(editingProduct.images?.slice(1) || [])] : editingProduct.images,
    };
    updateProduct(updated);
    setSaveSuccessMsg(true);
    setTimeout(() => {
      setSaveSuccessMsg(false);
      setEditingProduct(null);
      setEditForm(null);
    }, 1200);
  };

  // Handle Create Product
  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProductForm.name || !newProductForm.price) return;
    addProduct({
      name: newProductForm.name,
      category: newProductForm.category,
      categoryName: newProductForm.categoryName,
      price: parseFloat(newProductForm.price) || 99,
      compareAtPrice: newProductForm.compareAtPrice ? parseFloat(newProductForm.compareAtPrice) : null,
      stockQuantity: parseInt(newProductForm.stockQuantity, 10) || 15,
      sku: newProductForm.sku || `AUR-${Math.floor(100 + Math.random() * 900)}`,
      shortDescription: newProductForm.shortDescription || 'Crafted with premium engineering for discerning luxury clientele.',
      images: newProductForm.image
        ? [newProductForm.image]
        : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'],
    });

    setPublishSuccessMsg(true);
    setTimeout(() => {
      setPublishSuccessMsg(false);
      setNewProductForm({
        name: '',
        category: 'audio',
        categoryName: 'Audio & Sound',
        price: '',
        compareAtPrice: '',
        stockQuantity: '',
        sku: '',
        shortDescription: '',
        image: '',
      });
      setSellerTab('inventory');
    }, 1400);
  };

  // Filter products in inventory
  const filteredInventory = (products || []).filter((p) => {
    if (inventoryCategory !== 'all' && p.category !== inventoryCategory) return false;
    if (inventorySearch.trim()) {
      const q = inventorySearch.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSku = p.sku?.toLowerCase().includes(q);
      if (!matchName && !matchSku) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Ambient Luxury Merchant Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[600px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px]" />
      </div>

      {/* Top Merchant Atelier Navbar */}
      <header className="sticky top-0 z-40 bg-[#0a0f1d]/90 backdrop-blur-2xl border-b border-amber-500/20 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              onClick={() => setActivePage('store')}
              className="group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 text-xs font-semibold transition-all cursor-pointer active:scale-95 shadow-sm shrink-0"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 shrink-0" />
              <span className="hidden xs:inline sm:inline">Back to Store</span>
              <span className="xs:hidden sm:hidden">Store</span>
            </button>

            <div className="h-5 sm:h-6 w-px bg-white/10 hidden sm:block shrink-0" />

            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/30 shrink-0">
                <Store className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-semibold tracking-tight text-white truncate block">AURA ATELIER</span>
                  <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-[9px] font-semibold text-amber-300 uppercase tracking-widest shrink-0">
                    Studio Suite
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-semibold hidden sm:flex items-center gap-1.5 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
                  Merchant Portal Node
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isSellerLoggedIn ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-right hidden sm:block">
                  <span className="text-xs font-semibold text-white block tracking-wide truncate max-w-[140px]">{sellerProfile?.companyName}</span>
                  <div className="flex items-center justify-end gap-1.5 text-[10px] font-bold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Verified</span>
                  </div>
                </div>
                <button
                  onClick={logoutSeller}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 text-slate-300 hover:text-rose-300 text-xs font-bold transition cursor-pointer"
                  title="Log Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Log Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] sm:text-xs font-semibold text-amber-300 bg-amber-500/15 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-amber-500/30 flex items-center gap-1 animate-pulse">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                  <span>0% Commission</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ────────────────────────────────────────────────────────
            SECTION 1: NOT LOGGED IN -> LUXURY MERCHANT ONBOARDING & SIGN IN
           ──────────────────────────────────────────────────────── */}
        {!isSellerLoggedIn ? (
          <div className="space-y-12 animate-fade-in">
            {/* Hero Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-widest shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Premier Luxury Artisan & Merchant Network</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none">
                Distribute Your Craft to{' '}
                <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 bg-clip-text text-transparent">
                  World-Class Collectors
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                Join 850+ vetted boutique ateliers and global designers. Instant catalog onboarding, automated GPS telemetry, and 0% promotional commissions.
              </p>

              {/* Live Metric Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-bold text-slate-300">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified Escrow Settlements</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>140,000+ VIP Shoppers</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <span>$18.4M+ Annual Merchant Payouts</span>
                </div>
              </div>
            </div>

            {/* Auth Card */}
            <div className="max-w-xl mx-auto bg-[#0d1322]/90 backdrop-blur-2xl rounded-3xl border border-amber-500/30 shadow-2xl shadow-amber-500/10 overflow-hidden relative">
              {/* Shimmer Border Light */}
              <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-300" />

              {/* Tab Selector */}
              <div className="grid grid-cols-2 p-2 bg-black/40 border-b border-white/10 gap-2">
                <button
                  onClick={() => setAuthTab('login')}
                  className={`py-3.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    authTab === 'login'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>Merchant Sign In</span>
                </button>
                <button
                  onClick={() => setAuthTab('register')}
                  className={`py-3.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    authTab === 'register'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Open Atelier (Register)</span>
                </button>
              </div>

              {/* Form Area */}
              <div className="p-6 sm:p-8 space-y-4">
                {authTab === 'login' ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Brand / Atelier Name</label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={loginForm.companyName}
                          onChange={(e) => setLoginForm({ ...loginForm, companyName: e.target.value })}
                          placeholder="e.g. Nordic Audio Labs"
                          className="w-full pl-10 pr-3.5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 font-semibold transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Registered Merchant Email *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          placeholder="merchant@nordicaudio.com"
                          className="w-full pl-10 pr-3.5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 font-semibold transition"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-300">Account Password *</label>
                        <span className="text-[11px] text-amber-400 font-bold hover:underline cursor-pointer">
                          Reset key?
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
                          className="w-full pl-10 pr-3.5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 font-semibold transition"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-semibold text-sm rounded-2xl shadow-xl shadow-amber-500/25 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2 group mt-2"
                    >
                      <span>Enter Merchant Atelier Portal</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    {/* Quick Demo Login */}
                    <div className="pt-4 border-t border-white/10 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          loginSeller('merchant@nordicaudio.com', 'password123', 'Nordic Audio Labs');
                          setSellerTab('inventory');
                        }}
                        className="w-full py-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 border border-amber-400/30 text-amber-300 hover:text-amber-200 rounded-2xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                        <span>⚡ 1-Click Instant Demo Login as "Nordic Audio Labs"</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Brand / Company Name *</label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={regForm.companyName}
                          onChange={(e) => setRegForm({ ...regForm, companyName: e.target.value })}
                          placeholder="e.g. Zurich Horology Co"
                          className="w-full pl-10 pr-3.5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Category *</label>
                      <select
                        value={regForm.category}
                        onChange={(e) => setRegForm({ ...regForm, category: e.target.value })}
                        className="w-full px-3.5 py-3 bg-[#0a0f1d] border border-white/10 rounded-2xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      >
                        <option value="Audio & Sound">Audio & Acoustics</option>
                        <option value="Electronics & Tech">Electronics & Wearables</option>
                        <option value="Fashion & Outerwear">Fashion & Outerwear</option>
                        <option value="Footwear & Sneakers">Footwear & Sneakers</option>
                        <option value="Workspace & Ergonomics">Workspace & Ergonomics</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Official Business Email *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={regForm.email}
                          onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                          placeholder="contact@brand.com"
                          className="w-full pl-10 pr-3.5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Mobile Phone (Direct Dispatch) *</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={regForm.phone}
                          onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                          placeholder="+1 (555) 349-2018"
                          className="w-full pl-10 pr-3.5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
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
                          className="w-full pl-10 pr-3.5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-semibold text-sm rounded-2xl shadow-xl shadow-amber-500/25 transition-all cursor-pointer active:scale-95 mt-2"
                    >
                      Submit Registration for Fast-Track Approval →
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Merchant Perks / Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto pt-4">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-400/40 backdrop-blur-xl transition-all hover:-translate-y-1 group">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <BadgePercent className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-white">0% Introductory Cut</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Keep 100% of gross profits across your initial 90 days on the platform.</p>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-400/40 backdrop-blur-xl transition-all hover:-translate-y-1 group">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Truck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-white">Pre-Linked Courier</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Integrated GPS radar with live flight & van route telemetry for your customers.</p>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-400/40 backdrop-blur-xl transition-all hover:-translate-y-1 group">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-white">Direct Wire Payouts</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Bi-weekly escrow clearance straight into your company bank account.</p>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-400/40 backdrop-blur-xl transition-all hover:-translate-y-1 group">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-white">Elite Brand Seal</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Certified luxury merchant badge and top ranking on storefront search filters.</p>
              </div>
            </div>
          </div>
        ) : (
          /* ────────────────────────────────────────────────────────
              SECTION 2: LOGGED IN -> HIGH-END MERCHANT COMMAND ATELIER
             ──────────────────────────────────────────────────────── */
          <div className="space-y-8 animate-fade-in">
            {/* Atelier Luxury Header Card */}
            <div className="relative rounded-3xl bg-gradient-to-br from-[#0e1628] via-[#0b1120] to-[#121028] p-6 sm:p-8 border border-amber-500/30 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="w-18 h-18 rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-300 text-slate-950 flex items-center justify-center text-3xl font-bold shadow-xl shadow-amber-500/20 ring-4 ring-amber-400/20">
                    {sellerProfile?.companyName?.charAt(0) || 'M'}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {sellerProfile?.companyName}
                      </h2>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Verified Merchant</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/30 text-[11px] font-semibold font-mono">
                        {sellerProfile?.storeId || 'MCH-88219'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 mt-1.5 flex flex-wrap items-center gap-2">
                      <span className="text-slate-400">{sellerProfile?.email}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-amber-300 font-bold">{sellerProfile?.category}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-emerald-400 font-semibold">Tier 1 Global Merchant</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActivePage('store')}
                    className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:scale-102"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    <span>View Public Catalog</span>
                  </button>
                  <button
                    onClick={logoutSeller}
                    className="px-4 py-2.5 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Exit Studio</span>
                  </button>
                </div>
              </div>

              {/* KPI Glass Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/10">
                <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-md transition-all">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-bold">Total Gross Revenue</span>
                    <DollarSign className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-amber-300 block">
                    ${(sellerProfile?.totalRevenue ?? 18450.0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold mt-0.5 block">+18.4% month-over-month</span>
                </div>

                <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-md transition-all">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-bold">Completed Dispatches</span>
                    <Package className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-white block">
                    {sellerProfile?.ordersCount ?? 128} Orders
                  </span>
                  <span className="text-[10px] text-indigo-300 font-bold mt-0.5 block">100% on-time logistics</span>
                </div>

                <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-md transition-all">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-bold">Collector Satisfaction</span>
                    <Award className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-emerald-300 block">
                    ★ {sellerProfile?.rating ?? 4.92} <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
                  </span>
                  <span className="text-[10px] text-slate-300 font-bold mt-0.5 block">Based on 94 verified reviews</span>
                </div>

                <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-md transition-all">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-bold">Promotional Tier</span>
                    <BadgePercent className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-purple-300 block">
                    0% Commission
                  </span>
                  <span className="text-[10px] text-amber-300 font-bold mt-0.5 block">68 Days remaining in promo</span>
                </div>
              </div>

              {/* Studio Tab Capsule */}
              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => {
                    setSellerTab('inventory');
                    setEditingProduct(null);
                  }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    sellerTab === 'inventory' && !editingProduct
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>My Products & Live Studio ({products?.length || 0})</span>
                </button>

                <button
                  onClick={() => {
                    setSellerTab('add_product');
                    setEditingProduct(null);
                  }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    sellerTab === 'add_product'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ Publish New Luxury Item</span>
                </button>

                <button
                  onClick={() => {
                    setSellerTab('analytics');
                    setEditingProduct(null);
                  }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    sellerTab === 'analytics'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Sales Growth & Analytics</span>
                </button>
              </div>
            </div>

            {/* TAB 1: INVENTORY & STUDIO EDIT SUITE */}
            {sellerTab === 'inventory' && (
              <div className="space-y-6">
                {/* Control Bar: Search + Category + View Toggle */}
                <div className="bg-[#0e1628]/80 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-white/10 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={inventorySearch}
                      onChange={(e) => setInventorySearch(e.target.value)}
                      placeholder="Search inventory by title or SKU..."
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                    />
                  </div>

                  <div className="flex items-center justify-between sm:justify-start gap-3 w-full md:w-auto">
                    <select
                      value={inventoryCategory}
                      onChange={(e) => setInventoryCategory(e.target.value)}
                      className="flex-1 sm:flex-none px-4 py-3 bg-[#0a0f1d] border border-white/10 rounded-2xl text-xs font-semibold text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                    >
                      <option value="all">All Categories</option>
                      <option value="audio">Audio & Sound</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion & Apparel</option>
                      <option value="footwear">Footwear</option>
                      <option value="workspace">Workspace</option>
                    </select>

                    {/* View Switcher: Grid vs Table */}
                    <div className="flex items-center bg-white/5 p-1 rounded-2xl border border-white/10 shrink-0">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-xl transition cursor-pointer ${
                          viewMode === 'grid' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                        title="Grid View"
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('table')}
                        className={`p-2 rounded-xl transition cursor-pointer ${
                          viewMode === 'table' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                        title="Table View"
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Inline Product Studio Editor if active */}
                {editingProduct && editForm && (
                  <div className="bg-gradient-to-br from-[#12192e] to-[#1c1836] border-2 border-amber-400/60 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fade-in relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/10 mb-6 gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-semibold">
                          <Edit3 className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                            <span>Editing Studio:</span>
                            <span className="text-amber-300">{editingProduct.name}</span>
                          </h3>
                          <p className="text-xs text-slate-400">Update pricing, live catalog inventory, and imagery in real-time.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setEditingProduct(null);
                          setEditForm(null);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-bold transition self-start sm:self-auto cursor-pointer"
                      >
                        ✕ Dismiss Editor
                      </button>
                    </div>

                    {saveSuccessMsg ? (
                      <div className="py-12 text-center space-y-3">
                        <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/40">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h4 className="text-lg font-semibold text-white">Live Changes Saved Successfully!</h4>
                        <p className="text-xs text-slate-300">Catalog has been updated across all customer storefronts.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSaveEdit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-300 mb-1.5">Product Title</label>
                          <input
                            type="text"
                            required
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1.5">Live Price ($ USD)</label>
                          <input
                            type="number"
                            step="0.01"
                            required
                            value={editForm.price}
                            onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs sm:text-sm text-amber-300 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1.5">Warehouse Stock</label>
                          <input
                            type="number"
                            required
                            value={editForm.stockQuantity}
                            onChange={(e) => setEditForm({ ...editForm, stockQuantity: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs sm:text-sm text-white font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-300 mb-1.5">High-Res Image URL</label>
                          <input
                            type="url"
                            value={editForm.image}
                            onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                          />
                        </div>

                        <div className="sm:col-span-2 flex items-end gap-3 pt-2">
                          <button
                            type="submit"
                            className="flex-1 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save & Publish Live to Catalog</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(null);
                              setEditForm(null);
                            }}
                            className="px-5 py-3 bg-white/10 hover:bg-white/15 text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                {/* VIEW MODE 1: MODERN LUXURY CARDS GRID */}
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredInventory.map((item) => {
                      const imageSrc = item.images ? item.images[0] : item.image;
                      return (
                        <div
                          key={item.id}
                          className="group relative rounded-3xl bg-[#0e1628]/90 border border-white/10 hover:border-amber-400/40 p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
                        >
                          {/* Image Box */}
                          <div className="relative rounded-2xl overflow-hidden aspect-square bg-black/40 mb-3.5">
                            <img
                              src={imageSrc}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                            />
                            {/* Stock Badge */}
                            <div className="absolute top-2.5 left-2.5">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md shadow-xs ${
                                  item.stockQuantity > 5
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                                    : item.stockQuantity > 0
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                                    : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                                }`}
                              >
                                {item.stockQuantity > 0 ? `${item.stockQuantity} In Stock` : 'Sold Out'}
                              </span>
                            </div>

                            {/* SKU Tag */}
                            <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-white/10">
                              {item.sku}
                            </div>
                          </div>

                          {/* Info */}
                          <div className="space-y-1.5 flex-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400/80 block">
                              {item.categoryName || item.category}
                            </span>
                            <h4 className="text-sm font-semibold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                              {item.name}
                            </h4>
                            <div className="flex items-baseline justify-between pt-1">
                              <span className="text-lg font-semibold text-white">
                                ${item.price.toFixed(2)}
                              </span>
                              {item.compareAtPrice && (
                                <span className="text-xs text-slate-500 line-through">
                                  ${item.compareAtPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 pt-3 mt-3 border-t border-white/10">
                            <button
                              onClick={() => handleStartEdit(item)}
                              className="flex-1 py-2 rounded-xl bg-amber-400/15 hover:bg-amber-400 border border-amber-400/30 text-amber-300 hover:text-slate-950 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit Studio</span>
                            </button>
                            <button
                              onClick={() => deleteProduct(item.id)}
                              className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-white/10 transition cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* VIEW MODE 2: SLEEK CYBER-LUXURY TABLE */
                  <div className="bg-[#0e1628]/90 rounded-3xl border border-white/10 shadow-xl overflow-hidden">
                    <div className="overflow-x-auto no-scrollbar">
                      <table className="w-full min-w-[640px] text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-white/5 border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                            <th className="py-4 px-5">Luxury Product</th>
                            <th className="py-4 px-5">Category</th>
                            <th className="py-4 px-5">Live Price</th>
                            <th className="py-4 px-5">Stock Reserve</th>
                            <th className="py-4 px-5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredInventory.map((item) => (
                            <tr key={item.id} className="hover:bg-white/5 transition-colors">
                              <td className="py-4 px-5">
                                <div className="flex items-center gap-3.5">
                                  <img
                                    src={item.images ? item.images[0] : item.image}
                                    alt={item.name}
                                    className="w-12 h-12 rounded-2xl object-cover border border-white/10 flex-shrink-0"
                                  />
                                  <div>
                                    <span className="font-semibold text-white block text-sm">{item.name}</span>
                                    <span className="text-[10px] text-amber-400/70 font-mono">SKU: {item.sku}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-5 font-semibold text-slate-300 capitalize">
                                {item.categoryName || item.category}
                              </td>
                              <td className="py-4 px-5 font-semibold text-white text-sm">
                                ${item.price.toFixed(2)}
                              </td>
                              <td className="py-4 px-5">
                                <span
                                  className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase ${
                                    item.stockQuantity > 5
                                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                                      : item.stockQuantity > 0
                                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                                      : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                                  }`}
                                >
                                  {item.stockQuantity > 0 ? `${item.stockQuantity} In Stock` : 'Out of Stock'}
                                </span>
                              </td>
                              <td className="py-4 px-5 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => handleStartEdit(item)}
                                    className="px-3.5 py-1.5 bg-amber-400/15 hover:bg-amber-400 text-amber-300 hover:text-slate-950 rounded-xl font-semibold text-xs transition cursor-pointer flex items-center gap-1.5"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    onClick={() => deleteProduct(item.id)}
                                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition cursor-pointer"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: ADD NEW PRODUCT (DUAL STUDIO WITH LIVE PREVIEW) */}
            {sellerTab === 'add_product' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Form Column */}
                <div className="lg:col-span-7 bg-[#0e1628]/90 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
                  <div className="pb-4 border-b border-white/10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Studio Publishing Engine</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Publish New Product to Catalog</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      New items appear instantly across the main storefront with live cart capability.
                    </p>
                  </div>

                  {publishSuccessMsg ? (
                    <div className="py-12 text-center space-y-3">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/40 animate-bounce">
                        <CheckCircle2 className="w-9 h-9" />
                      </div>
                      <h4 className="text-xl font-bold text-white">Published to Storefront!</h4>
                      <p className="text-xs text-slate-300">Redirecting to your inventory studio...</p>
                    </div>
                  ) : (
                    <form onSubmit={handleCreateProduct} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">Product Title *</label>
                        <input
                          type="text"
                          required
                          value={newProductForm.name}
                          onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                          placeholder="e.g. Master Wireless ANC Headphones"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1.5">Category *</label>
                          <select
                            value={newProductForm.category}
                            onChange={(e) =>
                              setNewProductForm({
                                ...newProductForm,
                                category: e.target.value,
                                categoryName: e.target.options[e.target.selectedIndex].text,
                              })
                            }
                            className="w-full px-4 py-3 bg-[#0a0f1d] border border-white/10 rounded-2xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                          >
                            <option value="audio">Audio & Sound</option>
                            <option value="electronics">Electronics</option>
                            <option value="fashion">Fashion & Apparel</option>
                            <option value="footwear">Footwear</option>
                            <option value="workspace">Workspace & Living</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1.5">Price ($ USD) *</label>
                          <input
                            type="number"
                            step="0.01"
                            required
                            value={newProductForm.price}
                            onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                            placeholder="299.00"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-amber-300 font-semibold placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1.5">Initial Stock Quantity *</label>
                          <input
                            type="number"
                            required
                            value={newProductForm.stockQuantity}
                            onChange={(e) => setNewProductForm({ ...newProductForm, stockQuantity: e.target.value })}
                            placeholder="25"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1.5">SKU Code</label>
                          <input
                            type="text"
                            value={newProductForm.sku}
                            onChange={(e) => setNewProductForm({ ...newProductForm, sku: e.target.value })}
                            placeholder="AUR-992"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">Image URL</label>
                        <input
                          type="url"
                          value={newProductForm.image}
                          onChange={(e) => setNewProductForm({ ...newProductForm, image: e.target.value })}
                          placeholder="https://images.unsplash.com/photo-..."
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">Short Story / Description</label>
                        <textarea
                          rows={3}
                          value={newProductForm.shortDescription}
                          onChange={(e) => setNewProductForm({ ...newProductForm, shortDescription: e.target.value })}
                          placeholder="Handcrafted with acoustic precision and Scandinavian minimalism..."
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-semibold text-sm rounded-2xl shadow-xl shadow-amber-500/25 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Publish Live to Aura Luxe Catalog →</span>
                      </button>
                    </form>
                  )}
                </div>

                {/* Live Preview Column */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-amber-400" />
                      <span>Live Client Preview Mockup</span>
                    </span>
                    <span className="text-emerald-400">Real-Time Sync</span>
                  </div>

                  <div className="rounded-3xl bg-[#0e1628] border border-amber-500/30 p-5 shadow-2xl relative overflow-hidden">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-black/40 mb-4 relative">
                      <img
                        src={
                          newProductForm.image ||
                          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
                        }
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-semibold uppercase backdrop-blur-md">
                        {newProductForm.stockQuantity || 15} Available
                      </span>
                    </div>

                    <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-400">
                      {newProductForm.categoryName || 'Audio & Sound'}
                    </span>
                    <h4 className="text-lg font-semibold text-white mt-1">
                      {newProductForm.name || 'Your Luxury Item Name'}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {newProductForm.shortDescription || 'Short description preview of the product craftsmanship.'}
                    </p>
                    <div className="flex items-baseline justify-between pt-4 mt-4 border-t border-white/10">
                      <div>
                        <span className="text-xs text-slate-400 block font-bold">Client Price</span>
                        <span className="text-2xl font-bold text-amber-300">
                          ${parseFloat(newProductForm.price || 299).toFixed(2)}
                        </span>
                      </div>
                      <div className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-semibold text-xs">
                        Add to Bag
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SALES & ANALYTICS */}
            {sellerTab === 'analytics' && (
              <div className="space-y-6">
                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="p-6 rounded-3xl bg-[#0e1628]/90 border border-white/10 shadow-xl backdrop-blur-xl">
                    <span className="text-xs font-bold text-slate-400 block mb-1">Storefront Traffic</span>
                    <span className="text-3xl font-bold text-white">4,280 Visits</span>
                    <span className="text-xs text-emerald-400 font-semibold block mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> +24.8% vs last week
                    </span>
                  </div>

                  <div className="p-6 rounded-3xl bg-[#0e1628]/90 border border-white/10 shadow-xl backdrop-blur-xl">
                    <span className="text-xs font-bold text-slate-400 block mb-1">Conversion Velocity</span>
                    <span className="text-3xl font-bold text-indigo-400">8.42%</span>
                    <span className="text-xs text-slate-400 font-bold block mt-1">2.6x luxury industry benchmark</span>
                  </div>

                  <div className="p-6 rounded-3xl bg-[#0e1628]/90 border border-white/10 shadow-xl backdrop-blur-xl">
                    <span className="text-xs font-bold text-slate-400 block mb-1">Next Wire Disbursement</span>
                    <span className="text-3xl font-bold text-emerald-400">$4,250.00</span>
                    <span className="text-xs text-amber-300 font-bold block mt-1">Clearing via Escrow in 3 days</span>
                  </div>
                </div>

                {/* Performance Chart Simulation */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1628]/90 border border-white/10 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-semibold text-white">Quarterly Revenue Trajectory</h4>
                      <p className="text-xs text-slate-400">Daily sales performance & volume velocity</p>
                    </div>
                    <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                      Live Telemetry
                    </span>
                  </div>

                  {/* SVG Chart */}
                  <div className="h-48 w-full pt-4">
                    <svg viewBox="0 0 500 120" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="amberCurveGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,100 C80,85 120,40 180,60 C240,80 300,20 380,35 C440,50 480,10 500,15 L500,120 L0,120 Z"
                        fill="url(#amberCurveGrad)"
                      />
                      <path
                        d="M0,100 C80,85 120,40 180,60 C240,80 300,20 380,35 C440,50 480,10 500,15"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <circle cx="180" cy="60" r="4.5" fill="#f59e0b" className="animate-ping" />
                      <circle cx="180" cy="60" r="4.5" fill="#fff" />
                      <circle cx="380" cy="35" r="4.5" fill="#f59e0b" className="animate-ping" />
                      <circle cx="380" cy="35" r="4.5" fill="#fff" />
                      <circle cx="500" cy="15" r="5" fill="#10b981" />
                    </svg>
                  </div>

                  <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-white/5">
                    <span>Week 1</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span>Week 4 (Peak: +$6.2k)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
