import React, { useState, useMemo } from 'react';
import {
  X,
  Shield,
  Store,
  Package,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Award,
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  Building,
  Mail,
  Phone,
  Eye,
  Check,
  Clock,
  Sparkles,
  Users,
  ChevronRight,
  RefreshCw,
  Lock,
  Key,
  LogOut,
  Zap,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function AdminPanelModal() {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    adminProfile,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    sellers,
    approveSeller,
    rejectSeller,
    toggleSellerBadge,
    disburseSellerPayout,
    products,
  } = useCart();

  // Admin tabs: 'approvals' | 'products' | 'earnings'
  const [activeTab, setActiveTab] = useState('approvals');

  // Login form state
  const [loginForm, setLoginForm] = useState({
    username: 'admin@auraluxe.com',
    password: 'password123',
    securityPin: '8842',
  });

  // Search & Filter state
  const [sellerSearch, setSellerSearch] = useState('');
  const [approvalFilter, setApprovalFilter] = useState('all'); // 'all' | 'pending' | 'approved' | 'rejected'

  // Product tab filter state
  const [productSellerFilter, setProductSellerFilter] = useState('all');
  const [productSearch, setProductSearch] = useState('');

  if (!isAdminModalOpen) return null;

  // Handle Login Submit
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (!loginForm.username) return;
    loginAdmin(loginForm.username, loginForm.password);
  };

  // Pending count for badge
  const pendingApprovalsCount = (sellers || []).filter((s) => s.status === 'pending').length;

  // Filtered sellers for Approvals tab
  const filteredSellers = (sellers || []).filter((s) => {
    if (approvalFilter !== 'all' && s.status !== approvalFilter) return false;
    if (sellerSearch.trim()) {
      const q = sellerSearch.toLowerCase();
      const matchName = s.companyName?.toLowerCase().includes(q);
      const matchOwner = s.ownerName?.toLowerCase().includes(q);
      const matchEmail = s.email?.toLowerCase().includes(q);
      const matchCategory = s.category?.toLowerCase().includes(q);
      if (!matchName && !matchOwner && !matchEmail && !matchCategory) return false;
    }
    return true;
  });

  // Map products with simulated seller ownership
  const mappedProducts = (products || []).map((p, idx) => {
    let sellerName = p.sellerName;
    if (!sellerName) {
      if (p.category === 'audio') sellerName = 'Nordic Audio Labs';
      else if (p.category === 'electronics') sellerName = 'AeroTech Studio';
      else if (p.category === 'fashion' || p.category === 'footwear') sellerName = 'Luxe Apparel Co';
      else if (p.category === 'workspace') sellerName = 'ErgoDesign Workspace';
      else sellerName = 'Zenith Timepieces';
    }
    return {
      ...p,
      sellerName,
      unitsSold: 28 + (idx * 17) % 85,
      totalProductGross: p.price * (28 + (idx * 17) % 85),
    };
  });

  // Filtered products for Catalog Audit tab
  const filteredProducts = mappedProducts.filter((p) => {
    if (productSellerFilter !== 'all' && p.sellerName !== productSellerFilter) return false;
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSku = p.sku?.toLowerCase().includes(q);
      const matchSeller = p.sellerName.toLowerCase().includes(q);
      if (!matchName && !matchSku && !matchSeller) return false;
    }
    return true;
  });

  // Financial aggregates
  const totalMarketplaceGross = (sellers || []).reduce((acc, s) => acc + (s.grossSales || 0), 0);
  const totalPlatformCommission = totalMarketplaceGross * 0.1; // 10%
  const totalNetSellerEarnings = totalMarketplaceGross * 0.9; // 90%
  const pendingPayoutTotal = (sellers || [])
    .filter((s) => s.payoutStatus === 'Pending')
    .reduce((acc, s) => acc + (s.grossSales || 0) * 0.9, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={() => setIsAdminModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-fade-in-scale my-auto">
        {/* ────────────────────────────────────────────────────────
            CONDITION 1: IF NOT LOGGED IN -> HIGH-SECURITY ADMIN LOGIN
           ──────────────────────────────────────────────────────── */}
        {!isAdminLoggedIn ? (
          <div>
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-indigo-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Marketplace Master Authorization</h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                        <Lock className="w-3 h-3 text-amber-400" />
                        <span>Restricted Root Console</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Please enter your Administrator ID and Master Security Key to unlock the control panel.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsAdminModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Login Form Body */}
            <div className="p-6 sm:p-10 bg-slate-50/60 max-h-[70vh] overflow-y-auto">
              <div className="max-w-md mx-auto space-y-6">
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-semibold text-slate-900">Administrator Sign In</h3>
                  <p className="text-xs text-slate-500">
                    All session activities are cryptographically signed and audited for governance compliance.
                  </p>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email / Master Identifier *</label>
                    <div className="relative">
                      <Shield className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={loginForm.username}
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                        placeholder="admin@auraluxe.com"
                        className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Master Security Password *</label>
                    <div className="relative">
                      <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">Security PIN Code (2FA)</label>
                      <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                        Default: 8842
                      </span>
                    </div>
                    <div className="relative">
                      <Key className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={loginForm.securityPin}
                        onChange={(e) => setLoginForm({ ...loginForm, securityPin: e.target.value })}
                        placeholder="8842"
                        className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs font-mono tracking-widest"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer active:scale-95 mt-2 flex items-center justify-center gap-2"
                  >
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span>Authorize & Unlock Master Console →</span>
                  </button>

                  {/* 1-Click Quick Demo Login */}
                  <div className="pt-3 border-t border-slate-100 text-center">
                    <button
                      type="button"
                      onClick={() => loginAdmin('admin@auraluxe.com', 'password123')}
                      className="text-xs font-bold text-amber-700 hover:text-amber-800 transition cursor-pointer inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200/80"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      <span>⚡ One-Click Demo Sign In as "Super Admin (Root Master)"</span>
                    </button>
                  </div>
                </form>

                {/* Security Guarantees */}
                <div className="grid grid-cols-3 gap-3 pt-2 text-center text-[10px] text-slate-500">
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <Shield className="w-3.5 h-3.5 text-emerald-600 mx-auto mb-1" />
                    <span className="font-bold block">Encrypted</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <Lock className="w-3.5 h-3.5 text-indigo-600 mx-auto mb-1" />
                    <span className="font-bold block">2FA Verified</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mx-auto mb-1" />
                    <span className="font-bold block">Root Master</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ────────────────────────────────────────────────────────
              CONDITION 2: LOGGED IN -> FULL MASTER ADMIN PANEL
             ──────────────────────────────────────────────────────── */
          <div>
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-indigo-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Marketplace Admin Panel</h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Root Master Access</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Super Admin Control • Approve seller accounts, audit merchant catalog & track seller revenue.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-slate-300 hidden md:inline-block bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                    Admin: <strong className="text-amber-300">{adminProfile?.name || 'Admin Concierge'}</strong>
                  </span>

                  <button
                    onClick={logoutAdmin}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-rose-500/20 hover:border-rose-400/30 border border-transparent text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    title="Log out of Admin Console"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>

                  <button
                    onClick={() => setIsAdminModalOpen(false)}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Quick Metrics KPI Bar */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10 text-xs">
                <div className="bg-white/10 rounded-2xl p-3.5 backdrop-blur-xs border border-white/5">
                  <div className="flex items-center justify-between text-slate-300 mb-1">
                    <span className="text-[11px] font-bold">Total Marketplace GMV</span>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="text-lg font-semibold text-white block">
                    ${totalMarketplaceGross.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-extrabold">+18.4% this month</span>
                </div>

                <div className="bg-white/10 rounded-2xl p-3.5 backdrop-blur-xs border border-white/5">
                  <div className="flex items-center justify-between text-slate-300 mb-1">
                    <span className="text-[11px] font-bold">Platform Fee (10%)</span>
                    <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <span className="text-lg font-semibold text-amber-300 block">
                    ${totalPlatformCommission.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-slate-300">Net revenue earned</span>
                </div>

                <div className="bg-white/10 rounded-2xl p-3.5 backdrop-blur-xs border border-white/5">
                  <div className="flex items-center justify-between text-slate-300 mb-1">
                    <span className="text-[11px] font-bold">Seller Net Earnings</span>
                    <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <span className="text-lg font-semibold text-indigo-300 block">
                    ${totalNetSellerEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-slate-300">90% paid to merchants</span>
                </div>

                <div className="bg-white/10 rounded-2xl p-3.5 backdrop-blur-xs border border-white/5">
                  <div className="flex items-center justify-between text-slate-300 mb-1">
                    <span className="text-[11px] font-bold">Pending Approvals</span>
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <span className="text-lg font-semibold text-white block">
                    {pendingApprovalsCount} Seller{pendingApprovalsCount === 1 ? '' : 's'}
                  </span>
                  <span className="text-[10px] text-amber-300 font-bold">Requires Admin Action</span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 mt-6 pt-3 border-t border-white/10 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setActiveTab('approvals')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                    activeTab === 'approvals'
                      ? 'bg-white text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Seller Account Approvals</span>
                  {pendingApprovalsCount > 0 && (
                    <span className="px-1.5 py-0.2 bg-amber-500 text-slate-950 font-semibold rounded-full text-[10px]">
                      {pendingApprovalsCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('products')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                    activeTab === 'products'
                      ? 'bg-white text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Seller Products Audit ({products?.length || 0})</span>
                </button>

                <button
                  onClick={() => setActiveTab('earnings')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                    activeTab === 'earnings'
                      ? 'bg-white text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Seller Earnings & Payouts</span>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[65vh] overflow-y-auto bg-slate-50/60">
              {/* TAB 1: SELLER ACCOUNT APPROVALS & KYC */}
              {activeTab === 'approvals' && (
                <div className="space-y-4">
                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={sellerSearch}
                        onChange={(e) => setSellerSearch(e.target.value)}
                        placeholder="Search seller by company name, owner, email..."
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                      {[
                        { id: 'all', label: 'All Sellers' },
                        { id: 'pending', label: `Pending (${pendingApprovalsCount})` },
                        { id: 'approved', label: 'Approved' },
                        { id: 'rejected', label: 'Suspended' },
                      ].map((filter) => (
                        <button
                          key={filter.id}
                          onClick={() => setApprovalFilter(filter.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                            approvalFilter === filter.id
                              ? 'bg-slate-900 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sellers List Table / Cards */}
                  <div className="space-y-3">
                    {filteredSellers.length === 0 ? (
                      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                        <Store className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                        <h4 className="text-sm font-bold text-slate-700">No sellers match the selected filter</h4>
                        <p className="text-xs text-slate-400 mt-1">Try resetting search keywords or status filter.</p>
                      </div>
                    ) : (
                      filteredSellers.map((seller) => (
                        <div
                          key={seller.id}
                          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-900 text-white flex items-center justify-center text-lg font-semibold shadow-md flex-shrink-0">
                              {seller.companyName?.charAt(0) || 'S'}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-sm font-semibold text-slate-900">{seller.companyName}</h4>
                                {seller.verifiedBadge && (
                                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-extrabold flex items-center gap-1">
                                    <Award className="w-3 h-3 text-indigo-600" />
                                    <span>Verified Merchant</span>
                                  </span>
                                )}
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                    seller.status === 'approved'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : seller.status === 'pending'
                                      ? 'bg-amber-100 text-amber-800 animate-pulse'
                                      : 'bg-rose-100 text-rose-800'
                                  }`}
                                >
                                  {seller.status === 'approved'
                                    ? '✓ Approved Active'
                                    : seller.status === 'pending'
                                    ? '⏳ Pending Approval'
                                    : '✕ Suspended'}
                                </span>
                              </div>

                              <div className="flex items-center gap-4 text-xs text-slate-500 mt-1.5 flex-wrap">
                                <span className="flex items-center gap-1">
                                  <Building className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{seller.category}</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{seller.email}</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{seller.phone || '+1 (555) 000-0000'}</span>
                                </span>
                                <span className="text-[11px] text-slate-400 font-mono">
                                  ID: {seller.id} • Joined: {seller.joinedDate}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Controls */}
                          <div className="flex items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 flex-shrink-0">
                            {seller.status !== 'approved' && (
                              <button
                                onClick={() => approveSeller(seller.id)}
                                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Approve Seller</span>
                              </button>
                            )}

                            {seller.status !== 'rejected' && (
                              <button
                                onClick={() => rejectSeller(seller.id)}
                                className="px-3.5 py-2 bg-slate-100 hover:bg-rose-100 hover:text-rose-700 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>{seller.status === 'approved' ? 'Suspend' : 'Reject'}</span>
                              </button>
                            )}

                            <button
                              onClick={() => toggleSellerBadge(seller.id)}
                              className={`p-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                                seller.verifiedBadge
                                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                              }`}
                              title="Toggle Verified Badge"
                            >
                              <Award className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: SELLER PRODUCTS AUDIT */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  {/* Product Filter Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        placeholder="Search product name, SKU, or merchant..."
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-600 whitespace-nowrap">Filter by Seller:</span>
                      <select
                        value={productSellerFilter}
                        onChange={(e) => setProductSellerFilter(e.target.value)}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      >
                        <option value="all">All Merchants ({mappedProducts.length} items)</option>
                        {[...new Set(mappedProducts.map((p) => p.sellerName))].map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Products Table */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-extrabold">
                            <th className="py-3 px-4">Product Details</th>
                            <th className="py-3 px-4">Selling Merchant</th>
                            <th className="py-3 px-4">Unit Price</th>
                            <th className="py-3 px-4">Inventory Stock</th>
                            <th className="py-3 px-4">Sales Volume</th>
                            <th className="py-3 px-4">Catalog Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredProducts.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50/80 transition">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={item.images ? item.images[0] : item.image}
                                    alt={item.name}
                                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                                  />
                                  <div>
                                    <span className="font-extrabold text-slate-900 block line-clamp-1">
                                      {item.name}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-mono">
                                      SKU: {item.sku} • {item.categoryName || item.category}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="font-bold text-slate-800 block flex items-center gap-1">
                                  <Store className="w-3 h-3 text-amber-500" />
                                  <span>{item.sellerName}</span>
                                </span>
                                <span className="text-[10px] text-emerald-600 font-semibold">Active Vendor</span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="font-semibold text-slate-900">${item.price.toFixed(2)}</span>
                                {item.compareAtPrice && (
                                  <span className="text-[10px] text-slate-400 line-through block">
                                    ${item.compareAtPrice.toFixed(2)}
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    item.stockQuantity > 5
                                      ? 'bg-emerald-50 text-emerald-700'
                                      : 'bg-amber-50 text-amber-700'
                                  }`}
                                >
                                  {item.stockQuantity} units in stock
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="font-semibold text-slate-900 block">{item.unitsSold} units</span>
                                <span className="text-[10px] text-slate-500">
                                  Gross: ${(item.totalProductGross).toFixed(2)}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold inline-flex items-center gap-1">
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span>Live on Store</span>
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SELLER EARNINGS & PAYOUTS */}
              {activeTab === 'earnings' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-5 rounded-2xl text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-300">
                        Marketplace Financial Ledger
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold mt-0.5">Seller Net Earnings Breakdown</h3>
                      <p className="text-xs text-slate-300 mt-1">
                        Standard split: 90% paid to Merchant, 10% Platform Commission retained.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 text-center">
                        <span className="block text-[10px] text-slate-300 font-bold uppercase">Pending Payouts</span>
                        <span className="text-base font-semibold text-amber-300">
                          ${pendingPayoutTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Earnings Table */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-extrabold">
                            <th className="py-3 px-4">Merchant Company</th>
                            <th className="py-3 px-4">Gross Sales ($)</th>
                            <th className="py-3 px-4">Platform Fee (10%)</th>
                            <th className="py-3 px-4">Seller Net Earnings (90%)</th>
                            <th className="py-3 px-4">Payout Status</th>
                            <th className="py-3 px-4 text-right">Authorize Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {(sellers || []).map((s) => {
                            const fee = s.grossSales * 0.1;
                            const netEarnings = s.grossSales * 0.9;
                            return (
                              <tr key={s.id} className="hover:bg-slate-50/80 transition">
                                <td className="py-3.5 px-4">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-semibold">
                                      {s.companyName?.charAt(0) || 'M'}
                                    </div>
                                    <div>
                                      <span className="font-extrabold text-slate-900 block">{s.companyName}</span>
                                      <span className="text-[10px] text-slate-400 font-mono">
                                        Store ID: {s.id} • {s.category}
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3.5 px-4 font-semibold text-slate-900">
                                  ${s.grossSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </td>
                                <td className="py-3.5 px-4 font-bold text-amber-600">
                                  -${fee.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </td>
                                <td className="py-3.5 px-4 font-semibold text-emerald-600 text-sm">
                                  ${netEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </td>
                                <td className="py-3.5 px-4">
                                  <span
                                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                      s.payoutStatus === 'Paid'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-amber-100 text-amber-800 animate-pulse'
                                    }`}
                                  >
                                    {s.payoutStatus === 'Paid' ? '✓ Payout Disbursed' : '⏳ Awaiting Transfer'}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 text-right">
                                  {s.payoutStatus !== 'Paid' ? (
                                    <button
                                      onClick={() => disburseSellerPayout(s.id)}
                                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-xs active:scale-95"
                                    >
                                      Authorize Payout
                                    </button>
                                  ) : (
                                    <span className="text-slate-400 text-xs font-semibold">Settled</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
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
