import React, { useState } from 'react';
import {
  X,
  Store,
  TrendingUp,
  Package,
  DollarSign,
  ShieldCheck,
  Star,
  PlusCircle,
  Truck,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Sparkles,
  Award,
  BarChart3,
  Users,
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
  AlertCircle,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function SellerModal() {
  const {
    isSellerModalOpen,
    setIsSellerModalOpen,
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

  // Authentication Tab State: 'login' | 'register'
  const [authTab, setAuthTab] = useState('login');

  // Logged in Seller Tab State: 'inventory' | 'add_product' | 'analytics'
  const [sellerTab, setSellerTab] = useState('inventory');

  // Login Form State
  const [loginForm, setLoginForm] = useState({
    email: 'merchant@nordicaudio.com',
    password: 'password123',
    companyName: 'Nordic Audio Labs',
  });

  // Registration Form State
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
  const [editingProduct, setEditingProduct] = useState(null); // Product object currently being edited
  const [editForm, setEditForm] = useState(null);

  // New Product Form State
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

  if (!isSellerModalOpen) return null;

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.email) return;
    loginSeller(loginForm.email, loginForm.password, loginForm.companyName || 'Nordic Audio Labs');
    setSellerTab('inventory');
  };

  // Handle Registration Submit
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

  // Open Edit Product Modal
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
      image: product.images ? product.images[0] : '',
    });
  };

  // Save Edited Product
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
    setEditingProduct(null);
    setEditForm(null);
  };

  // Handle New Product Creation
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
      shortDescription: newProductForm.shortDescription || 'Crafted with premium engineering for discerning clients.',
      images: newProductForm.image
        ? [newProductForm.image]
        : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'],
    });

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
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={() => setIsSellerModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-fade-in-scale my-auto">
        {/* ────────────────────────────────────────────────────────
            SECTION 1: IF NOT LOGGED IN -> SELLER AUTHENTICATION
            ──────────────────────────────────────────────────────── */}
        {!isSellerLoggedIn ? (
          <div>
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <Store className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Seller Center & Merchant Portal</h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-extrabold uppercase tracking-wider">
                        Official Portal
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Log in with your ID & Password or create an account for your company to manage and edit products.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsSellerModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
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
                  <span>Merchant Log In</span>
                </button>
                <button
                  onClick={() => setAuthTab('register')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    authTab === 'register'
                      ? 'bg-white text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Register Company Account (0% Fee)</span>
                </button>
              </div>
            </div>

            {/* Auth Body */}
            <div className="p-6 sm:p-8 bg-slate-50/50 max-h-[70vh] overflow-y-auto">
              {/* TAB 1: LOGIN */}
              {authTab === 'login' && (
                <div className="max-w-md mx-auto space-y-5">
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-semibold text-slate-900">Sign In to Your Company Portal</h3>
                    <p className="text-xs text-slate-500">Access your store dashboard, inventory controls, and live products.</p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Company / Store Name</label>
                      <div className="relative">
                        <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={loginForm.companyName}
                          onChange={(e) => setLoginForm({ ...loginForm, companyName: e.target.value })}
                          placeholder="e.g. Nordic Audio Labs"
                          className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-2xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Merchant Email / ID *</label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          placeholder="merchant@nordicaudio.com"
                          className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-2xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
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
                      Login to Merchant Portal →
                    </button>

                    {/* Quick Demo Login */}
                    <div className="pt-2 border-t border-slate-100 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          loginSeller('merchant@nordicaudio.com', 'password123', 'Nordic Audio Labs');
                          setSellerTab('inventory');
                        }}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer"
                      >
                        ⚡ One-Click Demo Login as "Nordic Audio Labs"
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: REGISTER */}
              {authTab === 'register' && (
                <div className="max-w-xl mx-auto space-y-5">
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-semibold text-slate-900">Create a Seller Account for Your Company</h3>
                    <p className="text-xs text-slate-500">Register your brand and get direct access to add & edit your products.</p>
                  </div>

                  <form onSubmit={handleRegisterSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Company / Brand Name *</label>
                        <div className="relative">
                          <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={regForm.companyName}
                            onChange={(e) => setRegForm({ ...regForm, companyName: e.target.value })}
                            placeholder="e.g. Apex Acoustic Technologies"
                            className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-2xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Primary Category *</label>
                        <select
                          value={regForm.category}
                          onChange={(e) => setRegForm({ ...regForm, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        >
                          <option>Audio & Sound</option>
                          <option>Electronics & Gadgets</option>
                          <option>Fashion & Apparel</option>
                          <option>Footwear</option>
                          <option>Workspace & Living</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Business Phone / WhatsApp *</label>
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            value={regForm.phone}
                            onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                            placeholder="+1 (555) 349-2018"
                            className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-2xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Business Email *</label>
                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            value={regForm.email}
                            onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                            placeholder="merchant@company.com"
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
                      className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-semibold text-xs sm:text-sm rounded-xl shadow-md transition cursor-pointer active:scale-95 mt-2"
                    >
                      Create Seller Account & Enter Portal →
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ────────────────────────────────────────────────────────
              SECTION 2: LOGGED IN -> DEDICATED SELLER PORTAL
             ──────────────────────────────────────────────────────── */
          <div>
            {/* Seller Company Header */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center text-xl font-bold shadow-lg shadow-amber-500/20">
                    {sellerProfile?.companyName?.charAt(0) || 'M'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                        {sellerProfile?.companyName || 'Merchant Portal'}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-extrabold uppercase tracking-wider">
                        Active Merchant
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {sellerProfile?.email} • {sellerProfile?.category || 'Specialized Seller'} • Store ID: {sellerProfile?.storeId || 'MCH-88219'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={logoutSeller}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    title="Log out of seller account"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>

                  <button
                    onClick={() => setIsSellerModalOpen(false)}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Portal Tabs */}
              <div className="flex items-center gap-2 mt-6 pt-3 border-t border-white/10 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => {
                    setSellerTab('inventory');
                    setEditingProduct(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                    sellerTab === 'inventory' && !editingProduct
                      ? 'bg-white text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>My Products & Edit Suite ({products?.length || 0})</span>
                </button>

                <button
                  onClick={() => {
                    setSellerTab('add_product');
                    setEditingProduct(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                    sellerTab === 'add_product'
                      ? 'bg-white text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>+ Add New Product</span>
                </button>

                <button
                  onClick={() => {
                    setSellerTab('analytics');
                    setEditingProduct(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                    sellerTab === 'analytics'
                      ? 'bg-white text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Sales & Orders</span>
                </button>
              </div>
            </div>

            {/* Seller Portal Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto bg-slate-50/50 space-y-6">
              {/* ═════════════════════════════════════════════════════════
                  MODAL SUB-VIEW: IN-LINE PRODUCT EDITOR (WHEN EDITING)
                 ═════════════════════════════════════════════════════════ */}
              {editingProduct && editForm ? (
                <div className="bg-white p-6 rounded-2xl border-2 border-indigo-500 shadow-md space-y-5 animate-fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Edit3 className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">
                          Edit Product: <span className="text-indigo-600">{editingProduct.name}</span>
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          SKU: {editingProduct.sku} • Changes update live across the entire marketplace.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  </div>

                  <form onSubmit={handleSaveEdit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Product Title *</label>
                        <input
                          type="text"
                          required
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                        <select
                          value={editForm.category}
                          onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        >
                          <option value="audio">Audio & Sound</option>
                          <option value="electronics">Electronics</option>
                          <option value="fashion">Fashion & Apparel</option>
                          <option value="footwear">Footwear</option>
                          <option value="workspace">Workspace & Living</option>
                        </select>
                      </div>

                      {/* Price */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Price ($ USD) *</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={editForm.price}
                          onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>

                      {/* Compare At Price */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Original / Compare-At Price ($ USD)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={editForm.compareAtPrice}
                          onChange={(e) => setEditForm({ ...editForm, compareAtPrice: e.target.value })}
                          placeholder="e.g. 349.00"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>

                      {/* Stock Quantity */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Available Stock (Units) *</label>
                        <input
                          type="number"
                          required
                          value={editForm.stockQuantity}
                          onChange={(e) => setEditForm({ ...editForm, stockQuantity: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>

                      {/* Image URL */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Product Photo URL</label>
                        <input
                          type="url"
                          value={editForm.image}
                          onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>

                      {/* Description */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Short Description</label>
                        <textarea
                          rows={2}
                          value={editForm.shortDescription}
                          onChange={(e) => setEditForm({ ...editForm, shortDescription: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>
                    </div>

                    <div className="pt-3 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Live Changes to Marketplace</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : null}

              {/* ═════════════════════════════════════════════════════════
                  TAB 1: PRODUCT INVENTORY & EDITING SUITE
                 ═════════════════════════════════════════════════════════ */}
              {sellerTab === 'inventory' && !editingProduct && (
                <div className="space-y-4">
                  {/* Controls Row */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="relative w-full sm:w-72">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={inventorySearch}
                        onChange={(e) => setInventorySearch(e.target.value)}
                        placeholder="Search products by title or SKU..."
                        className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-2xs"
                      />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <select
                        value={inventoryCategory}
                        onChange={(e) => setInventoryCategory(e.target.value)}
                        className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold"
                      >
                        <option value="all">All Categories</option>
                        <option value="audio">Audio</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="footwear">Footwear</option>
                        <option value="workspace">Workspace</option>
                      </select>

                      <button
                        onClick={() => setSellerTab('add_product')}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>+ Add Product</span>
                      </button>
                    </div>
                  </div>

                  {/* Products Table/Cards */}
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                    <div className="divide-y divide-slate-100">
                      {filteredInventory.length === 0 ? (
                        <div className="text-center py-12">
                          <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                          <p className="text-xs text-slate-500 font-bold">No products found matching your search</p>
                        </div>
                      ) : (
                        filteredInventory.map((item) => (
                          <div
                            key={item.id}
                            className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition"
                          >
                            {/* Product Info */}
                            <div className="flex items-center gap-3.5 min-w-0">
                              <img
                                src={item.images ? item.images[0] : ''}
                                alt={item.name}
                                className="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-200 flex-shrink-0"
                              />
                              <div className="min-w-0">
                                <h4 className="text-xs font-semibold text-slate-900 truncate">{item.name}</h4>
                                <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                                  <span>SKU: <strong className="font-mono text-slate-700">{item.sku}</strong></span>
                                  <span>•</span>
                                  <span className="capitalize">{item.category}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs font-semibold text-slate-900">${item.price.toFixed(2)}</span>
                                  {item.compareAtPrice && (
                                    <span className="text-[10px] text-slate-400 line-through">
                                      ${item.compareAtPrice.toFixed(2)}
                                    </span>
                                  )}
                                  <span
                                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                      item.stockQuantity < 10
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-emerald-100 text-emerald-800'
                                    }`}
                                  >
                                    {item.stockQuantity} in stock
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons: EDIT & DELETE */}
                            <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                              <button
                                onClick={() => handleStartEdit(item)}
                                className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200/80 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                                title="Edit Product Details"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Edit Product</span>
                              </button>

                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete "${item.name}" from the store?`)) {
                                    deleteProduct(item.id);
                                  }
                                }}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                                title="Delete Product"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ═════════════════════════════════════════════════════════
                  TAB 2: ADD NEW PRODUCT
                 ═════════════════════════════════════════════════════════ */}
              {sellerTab === 'add_product' && !editingProduct && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">List a New Product on the Marketplace</h3>
                    <p className="text-xs text-slate-500">
                      Product will appear live immediately under your store profile: <strong>{sellerProfile?.companyName}</strong>.
                    </p>
                  </div>

                  <form onSubmit={handleCreateProduct} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Product Title *</label>
                        <input
                          type="text"
                          required
                          value={newProductForm.name}
                          onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                          placeholder="e.g. Apex High-Fidelity Studio ANC Monitors"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                        <select
                          value={newProductForm.category}
                          onChange={(e) =>
                            setNewProductForm({
                              ...newProductForm,
                              category: e.target.value,
                              categoryName: e.target.options[e.target.selectedIndex].text,
                            })
                          }
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        >
                          <option value="audio">Audio & Sound</option>
                          <option value="electronics">Electronics</option>
                          <option value="fashion">Fashion & Apparel</option>
                          <option value="footwear">Footwear</option>
                          <option value="workspace">Workspace & Living</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Selling Price ($ USD) *</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={newProductForm.price}
                          onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                          placeholder="249.00"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Compare At / Strikethrough Price ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={newProductForm.compareAtPrice}
                          onChange={(e) => setNewProductForm({ ...newProductForm, compareAtPrice: e.target.value })}
                          placeholder="299.00"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Initial Stock (Units) *</label>
                        <input
                          type="number"
                          required
                          value={newProductForm.stockQuantity}
                          onChange={(e) => setNewProductForm({ ...newProductForm, stockQuantity: e.target.value })}
                          placeholder="25"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                        <input
                          type="url"
                          value={newProductForm.image}
                          onChange={(e) => setNewProductForm({ ...newProductForm, image: e.target.value })}
                          placeholder="https://images.unsplash.com/photo-..."
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Short Description</label>
                        <textarea
                          rows={2}
                          value={newProductForm.shortDescription}
                          onChange={(e) => setNewProductForm({ ...newProductForm, shortDescription: e.target.value })}
                          placeholder="Engineered for pristine sound fidelity and comfort."
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-extrabold text-xs sm:text-sm rounded-xl transition shadow-md cursor-pointer active:scale-95"
                    >
                      Publish Product Live to Marketplace
                    </button>
                  </form>
                </div>
              )}

              {/* ═════════════════════════════════════════════════════════
                  TAB 3: SALES & ANALYTICS
                 ═════════════════════════════════════════════════════════ */}
              {sellerTab === 'analytics' && !editingProduct && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                      <span className="text-xs text-slate-400 font-semibold block">Total Revenue</span>
                      <span className="text-2xl font-bold text-slate-900 mt-1 block">
                        ${sellerProfile?.totalRevenue?.toFixed(2) || '18,450.00'}
                      </span>
                      <span className="text-[11px] text-emerald-600 font-bold block mt-1">+14.2% this month</span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                      <span className="text-xs text-slate-400 font-semibold block">Orders Count</span>
                      <span className="text-2xl font-bold text-slate-900 mt-1 block">
                        {sellerProfile?.ordersCount || 128} Orders
                      </span>
                      <span className="text-[11px] text-indigo-600 font-bold block mt-1">99.2% Fulfillment</span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                      <span className="text-xs text-slate-400 font-semibold block">Store Rating</span>
                      <span className="text-2xl font-bold text-slate-900 mt-1 block">
                        {sellerProfile?.rating || 4.92} / 5.0
                      </span>
                      <span className="text-[11px] text-amber-600 font-bold block mt-1">Top Rated Merchant</span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                      <span className="text-xs text-slate-400 font-semibold block">Live Catalog</span>
                      <span className="text-2xl font-bold text-slate-900 mt-1 block">
                        {products?.length || 0} Items
                      </span>
                      <span className="text-[11px] text-purple-600 font-bold block mt-1">100% Active</span>
                    </div>
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
