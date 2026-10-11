import React, { useState, useMemo } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import HeroBanner from './components/home/HeroBanner';
import CategoryNav from './components/catalog/CategoryNav';
import FilterBar from './components/catalog/FilterBar';
import ProductGrid from './components/catalog/ProductGrid';
import ProductDetailsModal from './components/catalog/ProductDetailsModal';
import CartDrawer from './components/cart/CartDrawer';
import CheckoutModal from './components/checkout/CheckoutModal';
import WishlistModal from './components/catalog/WishlistModal';
import SellerModal from './components/account/SellerModal';
import CustomerAccountModal from './components/account/CustomerAccountModal';
import OrderTrackerModal from './components/tracking/OrderTrackerModal';
import AdminPanelModal from './components/admin/AdminPanelModal';
import SellerPage from './pages/SellerPage';
import CustomerAccountPage from './pages/CustomerAccountPage';
import AdminPage from './pages/AdminPage';
import TrustBanner from './components/layout/TrustBanner';
import Footer from './components/layout/Footer';
import { PRODUCTS, CATEGORIES } from './data/products';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import './App.css';

function MainStore() {
  const { toastMessage, products } = useCart();

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(800);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    const list = products && products.length > 0 ? products : PRODUCTS;
    return list.filter((product) => {
      // Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      // In stock filter
      if (inStockOnly && product.stockQuantity === 0) {
        return false;
      }

      // Max price filter
      if (product.price > maxPrice) {
        return false;
      }

      // Keyword search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSku = product.sku.toLowerCase().includes(query);
        const matchesCat = product.categoryName.toLowerCase().includes(query);
        const matchesTag = product.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesSku && !matchesCat && !matchesTag) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id - a.id;
      // Default: featured / bestsellers
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [searchQuery, activeCategory, sortBy, inStockOnly, maxPrice]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setSortBy('featured');
    setInStockOnly(false);
    setMaxPrice(800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-scale flex items-center gap-2.5 bg-white/95 text-slate-900 text-xs font-bold px-4 py-3 rounded-2xl border border-slate-200 shadow-xl shadow-slate-300/50 backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation Header */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-1">
        {/* High-Impact Hero Banner */}
        <HeroBanner
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Product Catalog Section */}
        <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200/80 rounded-lg text-indigo-700 text-[11px] font-bold uppercase tracking-widest mb-2 shadow-2xs">
                <span>Curated Collection</span>
                {activeCategory !== 'all' && (
                  <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-[10px] lowercase font-semibold tracking-normal">
                    {CATEGORIES.find((c) => c.id === activeCategory)?.name || activeCategory}
                  </span>
                )}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {activeCategory === 'all'
                  ? 'Explore Essential Artifacts'
                  : `${CATEGORIES.find((c) => c.id === activeCategory)?.name || activeCategory}`}
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {activeCategory !== 'all' && (
                <button
                  onClick={() => setActiveCategory('all')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition cursor-pointer self-start sm:self-auto shadow-2xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  Show All Products
                </button>
              )}
              <p className="text-xs text-slate-500 max-w-sm font-normal">
                Each piece is rigorously engineered with premium materials, backed by our 30-day trial and worldwide concierge warranty.
              </p>
            </div>
          </div>

          {/* Interactive Category Navigation Pills */}
          <CategoryNav
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* Faceted Filter & Sort Controls */}
          <FilterBar
            sortBy={sortBy}
            setSortBy={setSortBy}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            totalResults={filteredProducts.length}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />

          {/* Dynamic Responsive Product Grid */}
          <ProductGrid
            products={filteredProducts}
            onResetFilters={handleResetFilters}
          />
        </section>

        {/* Trust & Guarantees Strip */}
        <TrustBanner />
      </main>

      {/* Complete Footer */}
      <Footer />

      {/* Modals & Slide-Out Drawers */}
      <ProductDetailsModal />
      <CartDrawer />
      <CheckoutModal />
      <WishlistModal />
      <SellerModal />
      <CustomerAccountModal />
      <OrderTrackerModal />
      <AdminPanelModal />
    </div>
  );
}

function AppContent() {
  const { activePage } = useCart();

  if (activePage === 'seller') {
    return <SellerPage />;
  }

  if (activePage === 'customer') {
    return <CustomerAccountPage />;
  }

  if (activePage === 'admin') {
    return <AdminPage />;
  }

  return <MainStore />;
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
