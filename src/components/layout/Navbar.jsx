import React, { useState, useRef, useEffect } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  Sparkles,
  X,
  ShieldCheck,
  Truck,
  Store,
  User,
  Zap,
  ChevronDown,
  Compass,
  LayoutGrid,
  Shield,
  ChevronRight,
  Award,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Navbar({ searchQuery, setSearchQuery }) {
  const {
    totalItemCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSellerModalOpen,
    setIsCustomerModalOpen,
    setIsOrderTrackerOpen,
    isAdminModalOpen,
    setIsAdminModalOpen,
    activePage,
    setActivePage,
    sellers,
    subtotal,
    isSellerLoggedIn,
    sellerProfile,
    isCustomerLoggedIn,
    customerProfile,
  } = useCart();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCornerMenuOpen, setIsCornerMenuOpen] = useState(false);
  const cornerMenuRef = useRef(null);

  // Close corner menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (cornerMenuRef.current && !cornerMenuRef.current.contains(event.target)) {
        setIsCornerMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pendingApprovalsCount = (sellers || []).filter((s) => s.status === 'pending').length;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/95 border-b border-slate-200/80 shadow-2xs transition-all duration-200">
      {/* Editorial Announcement Bar */}
      <div className="relative bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-slate-300 text-xs py-2 px-4 font-medium tracking-wide overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-15 pointer-events-none animate-shimmer" />
        <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-indigo-300 font-semibold">
              <Truck className="w-3.5 h-3.5" />
              <span>Complimentary Worldwide Delivery over $150</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-white/10 px-3 py-0.5 rounded-full text-[11px] border border-white/10">
            <Zap className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse" />
            <span className="text-white font-bold">Limited Drop: Use code</span>
            <span className="text-amber-300 font-mono font-extrabold tracking-wider">SAVE15</span>
            <span className="text-slate-300">for 15% OFF</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-slate-400 text-[11px]">
            {/* Quick Admin Master Access Link */}
            <button
              onClick={() => setActivePage('admin')}
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/30 transition cursor-pointer font-bold"
              title="Open Marketplace Master Admin Panel"
            >
              <Shield className="w-3 h-3 text-amber-400" />
              <span>Admin Panel</span>
              {pendingApprovalsCount > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>

            <span className="w-1 h-1 rounded-full bg-slate-700" />

            <button
              onClick={() => setIsOrderTrackerOpen(true)}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition cursor-pointer font-bold"
            >
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              <span>Track Order</span>
            </button>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <div className="flex items-center gap-1.5 text-slate-300 hover:text-white transition cursor-pointer">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>30-Day Concierge</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 sm:gap-6">
        {/* Brand Monogram & Name */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none group flex-shrink-0"
          onClick={() => setActivePage('store')}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-900 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 group-hover:shadow-indigo-500/40 transition-all duration-300">
            <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                AURA
              </span>
              <span className="text-[10px] font-extrabold text-indigo-600 ml-1.5 tracking-widest uppercase bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                LUXE
              </span>
            </div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider hidden sm:block">
              Curated Marketplace
            </span>
          </div>
        </div>

        {/* Dynamic Search Bar */}
        <div className="flex-1 max-w-lg relative hidden sm:block">
          <div
            className={`relative flex items-center bg-slate-100/90 border rounded-full transition-all duration-300 ${
              isSearchFocused
                ? 'bg-white border-indigo-600 ring-4 ring-indigo-500/10 shadow-md'
                : 'border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <Search
              className={`w-4 h-4 ml-4 transition-colors ${
                isSearchFocused ? 'text-indigo-600' : 'text-slate-400'
              }`}
            />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search headphones, smartwatches, cashmere..."
              className="w-full pl-3 pr-10 py-2.5 bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer transition"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="absolute right-3.5 text-[10px] font-bold text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded border border-slate-300/40">
                /
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* ────────────────────────────────────────────────────────
              CONSOLIDATED CORNER BAR: SELLER + CUSTOMER + ADMIN PANEL
             ──────────────────────────────────────────────────────── */}
          <div className="relative" ref={cornerMenuRef}>
            <button
              onClick={() => setIsCornerMenuOpen(!isCornerMenuOpen)}
              className={`group flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs active:scale-95 border ${
                isCornerMenuOpen
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-slate-300'
              }`}
              title="Portals & Accounts Bar (Seller • Customer • Admin)"
              aria-expanded={isCornerMenuOpen}
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-700 to-slate-900 text-white flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <LayoutGrid className="w-3.5 h-3.5 text-white" />
              </div>

              <div className="text-left hidden lg:block leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className={`block text-[11px] font-semibold tracking-tight ${isCornerMenuOpen ? 'text-white' : 'text-slate-900'}`}>
                    Portals & Hub
                  </span>
                  {pendingApprovalsCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" title={`${pendingApprovalsCount} Pending Approvals`} />
                  )}
                </div>
                <span className="block text-[9px] font-extrabold text-indigo-600 uppercase tracking-wider">
                  Seller • VIP • Admin
                </span>
              </div>

              <span className="lg:hidden text-xs font-bold text-slate-800">
                Portals
              </span>

              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isCornerMenuOpen ? 'rotate-180 text-white' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              />
            </button>

            {/* Luxury Floating Dropdown Popover */}
            {isCornerMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-84 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 p-2.5 z-50 animate-fade-in-scale">
                <div className="px-3 py-2 border-b border-slate-100 mb-2 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-900 block">Marketplace Portals & Hub</span>
                    <span className="text-[10px] text-slate-400 font-semibold">Select your account or control portal</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-extrabold">
                    3 Portals
                  </span>
                </div>

                <div className="space-y-2">
                  {/* OPTION 1: SELLER CENTER */}
                  <div
                    onClick={() => {
                      setIsCornerMenuOpen(false);
                      setActivePage('seller');
                    }}
                    className="group/item p-3 rounded-xl hover:bg-amber-50/80 border border-slate-100 hover:border-amber-200 transition-all cursor-pointer flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                        <Store className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-slate-900 group-hover/item:text-amber-950">
                            {isSellerLoggedIn ? (sellerProfile?.companyName || 'Seller Store') : 'Seller Center'}
                          </span>
                          {isSellerLoggedIn && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Active" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 group-hover/item:text-amber-800 block mt-0.5">
                          {isSellerLoggedIn ? 'Merchant Portal • Edit Products Live' : '0% Fee Offer • Sell Products & Inventory'}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover/item:text-amber-600 group-hover/item:translate-x-0.5 transition-all" />
                  </div>

                  {/* OPTION 2: CUSTOMER ACCOUNT */}
                  <div
                    onClick={() => {
                      setIsCornerMenuOpen(false);
                      setActivePage('customer');
                    }}
                    className="group/item p-3 rounded-xl hover:bg-indigo-50/80 border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-slate-900 group-hover/item:text-indigo-950">
                            {isCustomerLoggedIn ? (customerProfile?.name || 'Customer Account') : 'My Account'}
                          </span>
                          {isCustomerLoggedIn && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="VIP Active" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 group-hover/item:text-indigo-800 block mt-0.5">
                          {isCustomerLoggedIn
                            ? (customerProfile?.membershipTier || 'VIP Member') + ' • Orders Radar & Addresses'
                            : 'Sign In / Register • VIP Rewards & Live Radar'}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover/item:text-indigo-600 group-hover/item:translate-x-0.5 transition-all" />
                  </div>

                  {/* OPTION 3: MASTER ADMIN PANEL */}
                  <div
                    onClick={() => {
                      setIsCornerMenuOpen(false);
                      setActivePage('admin');
                    }}
                    className="group/item p-3 rounded-xl hover:bg-slate-900 text-slate-900 hover:text-white border border-slate-200 hover:border-slate-800 transition-all cursor-pointer flex items-center justify-between gap-3 bg-slate-50 shadow-2xs hover:shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                        <Shield className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold group-hover/item:text-white">
                            Admin Panel
                          </span>
                          {pendingApprovalsCount > 0 ? (
                            <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-semibold text-[9px] group-hover/item:bg-amber-400">
                              {pendingApprovalsCount} Pending
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 group-hover/item:text-emerald-300 font-semibold text-[9px]">
                              Master
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 group-hover/item:text-slate-300 block mt-0.5">
                          Seller Approvals, Catalog & Seller Earnings
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover/item:text-amber-400 group-hover/item:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ORDER TRACKER */}
          <button
            onClick={() => setIsOrderTrackerOpen(true)}
            className="group flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-slate-700 hover:text-indigo-800 bg-slate-50 hover:bg-indigo-50/80 border border-slate-200 hover:border-indigo-300 transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
            title="Track Your Order"
          >
            <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Compass className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <div className="text-left hidden xl:block leading-tight">
              <span className="block text-[11px] font-bold text-slate-800 group-hover:text-indigo-900">
                Order Tracker
              </span>
              <span className="block text-[9px] font-extrabold text-emerald-600 uppercase tracking-wider">
                Live GPS
              </span>
            </div>
            <span className="xl:hidden text-xs font-bold text-slate-800">Track</span>
          </button>

          {/* WISHLIST */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all cursor-pointer border border-transparent hover:border-slate-200"
            title="Saved Wishlist"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* SHOPPING BAG */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="group flex items-center gap-2 px-3.5 sm:px-4 py-2.5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 hover:from-indigo-600 hover:to-indigo-800 text-white rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 shadow-md shadow-slate-900/10 hover:shadow-indigo-500/25 cursor-pointer active:scale-95"
            aria-label="Shopping Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-amber-400 text-slate-950 text-[10px] font-semibold rounded-full flex items-center justify-center shadow-xs">
                  {totalItemCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Bag</span>
            {subtotal > 0 && (
              <span className="hidden md:inline text-xs font-extrabold text-amber-300 ml-0.5">
                ${subtotal.toFixed(0)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
