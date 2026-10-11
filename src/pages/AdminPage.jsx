import React, { useState } from 'react';
import {
  Shield,
  ArrowLeft,
  Store,
  Package,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Award,
  Search,
  Filter,
  TrendingUp,
  CreditCard,
  Building,
  Mail,
  Phone,
  Check,
  Clock,
  Sparkles,
  Lock,
  Key,
  LogOut,
  Zap,
  ExternalLink,
  Activity,
  Terminal,
  Cpu,
  BadgeCheck,
  Send,
  Layers,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function AdminPage() {
  const {
    setActivePage,
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
  const [approvalFilter, setApprovalFilter] = useState('all');

  // Product tab filter state
  const [productSellerFilter, setProductSellerFilter] = useState('all');
  const [productSearch, setProductSearch] = useState('');

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
      unitsSold: 28 + ((idx * 17) % 85),
      totalProductGross: p.price * (28 + ((idx * 17) % 85)),
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
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Matrix / Cyber Grid Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-cyber-grid opacity-25" />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/3 w-[650px] h-[400px] bg-emerald-500/8 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 right-10 w-[550px] h-[500px] bg-cyan-500/8 rounded-full blur-[170px]" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[400px] bg-amber-500/6 rounded-full blur-[140px]" />
      </div>

      {/* Top Master Governance Navbar */}
      <header className="sticky top-0 z-40 bg-[#070b16]/95 backdrop-blur-2xl border-b border-white/10 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              onClick={() => setActivePage('store')}
              className="group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 text-xs font-semibold transition-all cursor-pointer active:scale-95 shadow-sm shrink-0"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 shrink-0" />
              <span className="hidden xs:inline sm:inline">Back to Store</span>
              <span className="xs:hidden sm:hidden">Store</span>
            </button>

            <div className="h-5 sm:h-6 w-px bg-white/10 hidden sm:block shrink-0" />

            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400/30 shrink-0">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-semibold tracking-tight text-white truncate block">MASTER GOVERNANCE</span>
                  <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-[9px] font-semibold text-emerald-300 uppercase tracking-widest shrink-0">
                    Root Console
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-semibold hidden sm:flex items-center gap-1.5 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
                  Escrow & Vendor Cluster
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-right hidden sm:block">
                  <span className="text-xs font-semibold text-white block tracking-wide truncate max-w-[140px]">{adminProfile?.name || 'Chief Administrator'}</span>
                  <div className="flex items-center justify-end gap-1.5 text-[10px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>ROOT MASTER</span>
                  </div>
                </div>
                <button
                  onClick={logoutAdmin}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 text-slate-300 hover:text-rose-300 text-xs font-bold transition cursor-pointer"
                  title="Lock Console"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Lock</span>
                </button>
              </div>
            ) : (
              <span className="text-[11px] sm:text-xs font-semibold text-emerald-300 bg-emerald-500/15 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                <span>Security</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ────────────────────────────────────────────────────────
            SECTION 1: NOT LOGGED IN -> ROOT SECURITY AUTHORIZATION
           ──────────────────────────────────────────────────────── */}
        {!isAdminLoggedIn ? (
          <div className="space-y-12 animate-fade-in">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest shadow-inner">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero-Trust Cryptographic Authority</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-none">
                Master Governance Command Center
              </h1>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-medium">
                Authorization required for multi-vendor escrow clearance, merchant verification KYC, and catalog oversight.
              </p>
            </div>

            {/* Auth Form Card */}
            <div className="max-w-md mx-auto bg-[#0a0f1d]/90 backdrop-blur-2xl rounded-3xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/10 p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

              <div className="text-center space-y-2 pb-2">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-inner">
                  <Shield className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-white">Cryptographic Clearance</h3>
                <p className="text-xs text-slate-400 font-mono">ENCRYPTION: AES-256 GCM • ACTIVE</p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Master Administrator ID *</label>
                  <div className="relative">
                    <Shield className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={loginForm.username}
                      onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                      placeholder="admin@auraluxe.com"
                      className="w-full pl-10 pr-3.5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Master Security Password *</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-3.5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-300">Biometric Security PIN</label>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                      Default: 8842
                    </span>
                  </div>
                  <div className="relative">
                    <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={loginForm.securityPin}
                      onChange={(e) => setLoginForm({ ...loginForm, securityPin: e.target.value })}
                      placeholder="8842"
                      className="w-full pl-10 pr-3.5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono tracking-widest"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-semibold text-sm rounded-2xl shadow-xl shadow-emerald-500/25 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2 mt-2"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Authorize Master Console Access →</span>
                </button>

                {/* Quick Demo Login */}
                <div className="pt-4 border-t border-white/10 text-center">
                  <button
                    type="button"
                    onClick={() => loginAdmin('admin@auraluxe.com', 'password123')}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 hover:from-emerald-500/20 hover:to-cyan-500/20 border border-emerald-400/30 text-emerald-300 hover:text-white rounded-2xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400 animate-pulse" />
                    <span>⚡ 1-Click Demo Login as "Super Admin"</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* ────────────────────────────────────────────────────────
              SECTION 2: LOGGED IN -> APEX GOVERNANCE COMMAND CENTER
             ──────────────────────────────────────────────────────── */
          <div className="space-y-8 animate-fade-in">
            {/* Top Command KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-[#0b1020]/90 border border-emerald-500/25 hover:border-emerald-400/40 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-xl transition-all relative overflow-hidden group">
                <div className="flex items-center justify-between text-slate-400 mb-1.5">
                  <span className="text-xs font-medium text-slate-300">Total Marketplace GMV</span>
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className="text-2xl sm:text-3xl font-bold text-white block tracking-tight font-sans">
                  ${totalMarketplaceGross.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-xs text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" /> +18.4% month-over-month
                </span>
              </div>

              <div className="bg-[#0b1020]/90 border border-amber-500/25 hover:border-amber-400/40 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-xl transition-all relative overflow-hidden group">
                <div className="flex items-center justify-between text-slate-400 mb-1.5">
                  <span className="text-xs font-medium text-slate-300">Platform Cut (10%)</span>
                  <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className="text-2xl sm:text-3xl font-bold text-amber-300 block tracking-tight font-sans">
                  ${totalPlatformCommission.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-xs text-slate-400 font-normal mt-1 block">Retained marketplace revenue</span>
              </div>

              <div className="bg-[#0b1020]/90 border border-indigo-500/25 hover:border-indigo-400/40 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-xl transition-all relative overflow-hidden group">
                <div className="flex items-center justify-between text-slate-400 mb-1.5">
                  <span className="text-xs font-medium text-slate-300">Seller Net Earnings (90%)</span>
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
                    <CreditCard className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className="text-2xl sm:text-3xl font-bold text-indigo-300 block tracking-tight font-sans">
                  ${totalNetSellerEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-xs text-slate-400 font-normal mt-1 block">Payable to active merchant accounts</span>
              </div>

              <div className="bg-[#0b1020]/90 border border-purple-500/25 hover:border-purple-400/40 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-xl transition-all relative overflow-hidden group">
                <div className="flex items-center justify-between text-slate-400 mb-1.5">
                  <span className="text-xs font-medium text-slate-300">KYC Approvals Queue</span>
                  <div className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className="text-2xl sm:text-3xl font-bold text-white block tracking-tight font-sans">
                  {pendingApprovalsCount} Seller{pendingApprovalsCount === 1 ? '' : 's'}
                </span>
                <span className="text-xs text-amber-400 font-semibold mt-1 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
                  Requires immediate action
                </span>
              </div>
            </div>

            {/* Navigation Tabs Capsule */}
            <div className="flex items-center gap-2 bg-[#0b1020]/90 p-2 rounded-2xl border border-white/10 shadow-xl overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('approvals')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'approvals'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Seller Account Approvals & KYC</span>
                {pendingApprovalsCount > 0 && (
                  <span className="px-2 py-0.5 bg-amber-400 text-slate-950 font-bold rounded-full text-[10px]">
                    {pendingApprovalsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'products'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Seller Products Audit ({products?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('earnings')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'earnings'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Seller Earnings & Payout Ledger</span>
              </button>
            </div>

            {/* TAB 1: SELLER APPROVALS & KYC RADAR */}
            {activeTab === 'approvals' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0b1020]/90 p-4 sm:p-5 rounded-3xl border border-white/10 shadow-lg">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={sellerSearch}
                      onChange={(e) => setSellerSearch(e.target.value)}
                      placeholder="Search sellers by brand name, email, or category..."
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {[
                      { id: 'all', label: 'All Merchants' },
                      { id: 'pending', label: `Pending Queue (${pendingApprovalsCount})` },
                      { id: 'approved', label: 'Active & Approved' },
                      { id: 'rejected', label: 'Suspended' },
                    ].map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setApprovalFilter(filter.id)}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                          approvalFilter === filter.id
                            ? 'bg-emerald-400 text-slate-950 font-semibold shadow-md'
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sellers Grid / Cards */}
                <div className="space-y-4">
                  {filteredSellers.map((seller) => (
                    <div
                      key={seller.id}
                      className="bg-[#0b1020]/90 p-6 rounded-3xl border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-xl backdrop-blur-xl flex flex-col lg:flex-row lg:items-center justify-between gap-5 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-500 to-cyan-500 text-slate-950 flex items-center justify-center text-xl font-bold shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400/20 flex-shrink-0">
                          {seller.companyName?.charAt(0) || 'S'}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <h4 className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                              {seller.companyName}
                            </h4>
                            {seller.verifiedBadge && (
                              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-[10px] font-semibold uppercase flex items-center gap-1">
                                <Award className="w-3 h-3 text-indigo-400" />
                                <span>Verified Merchant</span>
                              </span>
                            )}
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                                seller.status === 'approved'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : seller.status === 'pending'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              }`}
                            >
                              {seller.status === 'approved'
                                ? '✓ Approved Active'
                                : seller.status === 'pending'
                                ? '⏳ Pending Review'
                                : '✕ Suspended'}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap pt-1">
                            <span className="flex items-center gap-1.5 text-slate-300">
                              <Building className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{seller.category}</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-slate-500" />
                              <span>{seller.email}</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-slate-500" />
                              <span>{seller.phone || '+1 (555) 000-0000'}</span>
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">
                              ID: {seller.id} • Joined: {seller.joinedDate}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Controls */}
                      <div className="flex items-center gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10 flex-shrink-0 w-full lg:w-auto">
                        {seller.status !== 'approved' && (
                          <button
                            onClick={() => approveSeller(seller.id)}
                            className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 rounded-2xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95"
                          >
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>Approve</span>
                          </button>
                        )}

                        {seller.status !== 'rejected' && (
                          <button
                            onClick={() => rejectSeller(seller.id)}
                            className="flex-1 sm:flex-none px-3.5 sm:px-4 py-2.5 bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 text-slate-300 hover:text-rose-300 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                          >
                            <XCircle className="w-4 h-4 shrink-0" />
                            <span>{seller.status === 'approved' ? 'Suspend' : 'Reject'}</span>
                          </button>
                        )}

                        <button
                          onClick={() => toggleSellerBadge(seller.id)}
                          className={`p-2.5 rounded-2xl border text-xs font-bold transition cursor-pointer shrink-0 ${
                            seller.verifiedBadge
                              ? 'bg-indigo-500/20 border-indigo-400/40 text-indigo-300'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                          }`}
                          title="Toggle Verified Seal"
                        >
                          <Award className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: PRODUCTS AUDIT */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0b1020]/90 p-4 sm:p-5 rounded-3xl border border-white/10 shadow-lg">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Search product title, SKU, or merchant..."
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">Filter Merchant:</span>
                    <select
                      value={productSellerFilter}
                      onChange={(e) => setProductSellerFilter(e.target.value)}
                      className="px-4 py-3 bg-[#070b16] border border-white/10 rounded-2xl text-xs font-semibold text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
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

                <div className="bg-[#0b1020]/90 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full min-w-[650px] text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                          <th className="py-3.5 px-5">Product Details</th>
                          <th className="py-3.5 px-5">Selling Merchant</th>
                          <th className="py-3.5 px-5">Unit Price</th>
                          <th className="py-3.5 px-5">Stock Reserve</th>
                          <th className="py-3.5 px-5">Sales Velocity</th>
                          <th className="py-3.5 px-5">Catalog Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredProducts.map((item) => (
                          <tr key={item.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-3.5 px-5">
                              <div className="flex items-center gap-3.5">
                                <img
                                  src={item.images ? item.images[0] : item.image}
                                  alt={item.name}
                                  className="w-12 h-12 rounded-2xl object-cover border border-white/10 flex-shrink-0"
                                />
                                <div>
                                  <span className="font-semibold text-white block text-sm tracking-normal leading-snug">{item.name}</span>
                                  <span className="text-[11px] text-slate-400 font-mono">SKU: {item.sku}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-5">
                              <span className="font-medium text-slate-200 block text-xs">{item.sellerName}</span>
                              <span className="text-[10px] text-emerald-400 font-medium">Active Vendor</span>
                            </td>
                            <td className="py-3.5 px-5 font-semibold text-white text-sm font-mono">
                              ${item.price.toFixed(2)}
                            </td>
                            <td className="py-3.5 px-5">
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                {item.stockQuantity} in stock
                              </span>
                            </td>
                            <td className="py-3.5 px-5">
                              <span className="font-medium text-slate-200 block text-xs">{item.unitsSold} units</span>
                              <span className="text-[11px] text-slate-400 font-mono">
                                Gross: ${(item.totalProductGross).toFixed(2)}
                              </span>
                            </td>
                            <td className="py-3.5 px-5">
                              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[11px] font-medium inline-flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
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

            {/* TAB 3: EARNINGS & ESCROW PAYOUT LEDGER */}
            {activeTab === 'earnings' && (
              <div className="space-y-6">
                <div className="bg-[#0b1020]/90 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full min-w-[650px] text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                          <th className="py-3.5 px-5">Merchant Company</th>
                          <th className="py-3.5 px-5">Gross Sales ($)</th>
                          <th className="py-3.5 px-5">Platform Cut (10%)</th>
                          <th className="py-3.5 px-5">Seller Net Earnings (90%)</th>
                          <th className="py-3.5 px-5">Payout Status</th>
                          <th className="py-3.5 px-5 text-right">Authorize Wire</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {(sellers || []).map((s) => {
                          const fee = s.grossSales * 0.1;
                          const netEarnings = s.grossSales * 0.9;
                          return (
                            <tr key={s.id} className="hover:bg-white/5 transition-colors">
                              <td className="py-3.5 px-5">
                                <span className="font-semibold text-white block text-sm tracking-normal">{s.companyName}</span>
                                <span className="text-[11px] text-slate-400 font-mono">Store ID: {s.id}</span>
                              </td>
                              <td className="py-3.5 px-5 font-semibold text-white text-sm font-mono">
                                ${s.grossSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                              </td>
                              <td className="py-3.5 px-5 font-semibold text-amber-400 text-sm font-mono">
                                -${fee.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                              </td>
                              <td className="py-3.5 px-5 font-bold text-emerald-400 text-sm font-mono">
                                ${netEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                              </td>
                              <td className="py-3.5 px-5">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium tracking-normal ${
                                    s.payoutStatus === 'Paid'
                                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                      : 'bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse'
                                  }`}
                                >
                                  {s.payoutStatus === 'Paid' ? '✓ Disbursed via Wire' : '⏳ Awaiting Transfer'}
                                </span>
                              </td>
                              <td className="py-3.5 px-5 text-right">
                                {s.payoutStatus !== 'Paid' ? (
                                  <button
                                    onClick={() => disburseSellerPayout(s.id)}
                                    className="px-3.5 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-semibold rounded-xl text-xs transition cursor-pointer active:scale-95 shadow-md flex items-center gap-1.5 ml-auto"
                                  >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>Authorize Wire</span>
                                  </button>
                                ) : (
                                  <span className="text-emerald-400 text-xs font-mono font-medium">
                                    [Settled #TX-889]
                                  </span>
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
        )}
      </main>
    </div>
  );
}
