import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'aura_luxe_cart_v1';
const WISHLIST_STORAGE_KEY = 'aura_luxe_wishlist_v1';
const PRODUCTS_STORAGE_KEY = 'aura_luxe_products_v1';
const SELLER_STORAGE_KEY = 'aura_luxe_seller_v1';
const CUSTOMER_STORAGE_KEY = 'aura_luxe_customer_v1';
const SELLERS_STORAGE_KEY = 'aura_luxe_sellers_v1';
const ADMIN_STORAGE_KEY = 'aura_luxe_admin_v1';

const DEFAULT_SELLERS = [
  {
    id: 'MCH-88219',
    companyName: 'Nordic Audio Labs',
    ownerName: 'Lukas Lindqvist',
    email: 'merchant@nordicaudio.com',
    phone: '+1 (555) 349-2018',
    category: 'Audio & Sound',
    status: 'approved',
    rating: 4.92,
    joinedDate: 'Jan 2026',
    grossSales: 48250.0,
    commissionRate: 10,
    payoutStatus: 'Paid',
    productsCount: 4,
    verifiedBadge: true,
  },
  {
    id: 'MCH-55104',
    companyName: 'AeroTech Studio',
    ownerName: 'Elena Rostova',
    email: 'elena@aerotech-gear.io',
    phone: '+1 (555) 782-9901',
    category: 'Electronics & Wearables',
    status: 'pending', // Pending approval!
    rating: 4.85,
    joinedDate: 'Sept 2026',
    grossSales: 31200.0,
    commissionRate: 10,
    payoutStatus: 'Pending',
    productsCount: 3,
    verifiedBadge: false,
  },
  {
    id: 'MCH-33912',
    companyName: 'Luxe Apparel Co',
    ownerName: 'Marcus Dupont',
    email: 'marcus@luxeapparel.fr',
    phone: '+1 (555) 129-4509',
    category: 'Fashion & Outerwear',
    status: 'approved',
    rating: 4.96,
    joinedDate: 'Mar 2026',
    grossSales: 28900.0,
    commissionRate: 10,
    payoutStatus: 'Paid',
    productsCount: 3,
    verifiedBadge: true,
  },
  {
    id: 'MCH-77421',
    companyName: 'Zenith Timepieces',
    ownerName: 'Kaito Tanaka',
    email: 'kaito@zenithhorology.jp',
    phone: '+1 (555) 901-3344',
    category: 'Watches & Precision Gear',
    status: 'pending', // Pending approval!
    rating: 4.78,
    joinedDate: 'Sept 2026',
    grossSales: 16400.0,
    commissionRate: 10,
    payoutStatus: 'Pending',
    productsCount: 2,
    verifiedBadge: false,
  },
  {
    id: 'MCH-11029',
    companyName: 'ErgoDesign Workspace',
    ownerName: 'Sara Meyer',
    email: 'sara@ergodesign.de',
    phone: '+1 (555) 443-8120',
    category: 'Workspace & Ergonomics',
    status: 'approved',
    rating: 4.88,
    joinedDate: 'May 2026',
    grossSales: 21800.0,
    commissionRate: 10,
    payoutStatus: 'Paid',
    productsCount: 2,
    verifiedBadge: true,
  },
];

const initialState = {
  items: JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]'),
  appliedCoupon: null,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, selectedColor, selectedSize, quantity = 1 } = action.payload;
      const variantKey = `${product.id}_${selectedColor || 'default'}_${selectedSize || 'default'}`;

      const existingIndex = state.items.findIndex((item) => item.variantKey === variantKey);

      let updatedItems;
      if (existingIndex > -1) {
        updatedItems = state.items.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedItems = [
          ...state.items,
          {
            id: product.id,
            variantKey,
            name: product.name,
            price: product.price,
            image: product.images[0],
            selectedColor: selectedColor || (product.colors ? product.colors[0]?.name : null),
            selectedSize: selectedSize || (product.sizes ? product.sizes[0] : null),
            quantity,
            sku: product.sku,
            maxStock: product.stockQuantity,
          },
        ];
      }
      return { ...state, items: updatedItems };
    }

    case 'UPDATE_QUANTITY': {
      const { variantKey, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.variantKey !== variantKey),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.variantKey === variantKey ? { ...item, quantity } : item
        ),
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.variantKey !== action.payload.variantKey),
      };

    case 'CLEAR_CART':
      return { ...state, items: [], appliedCoupon: null };

    case 'APPLY_COUPON':
      return { ...state, appliedCoupon: action.payload };

    case 'REMOVE_COUPON':
      return { ...state, appliedCoupon: null };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]');
  });
  const [toastMessage, setToastMessage] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [activeTrackingCode, setActiveTrackingCode] = useState('AL-92418');

  // Page Routing State ('store' | 'seller' | 'customer' | 'admin')
  const [activePage, setActivePage] = useState('store');

  const navigateToPage = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Multi-Vendor Marketplace Sellers State (for Admin Approval & Tracking)
  const [sellers, setSellers] = useState(() => {
    try {
      const saved = localStorage.getItem(SELLERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_SELLERS;
    } catch {
      return DEFAULT_SELLERS;
    }
  });

  useEffect(() => {
    localStorage.setItem(SELLERS_STORAGE_KEY, JSON.stringify(sellers));
  }, [sellers]);

  // Admin Actions
  const approveSeller = (sellerId) => {
    setSellers((prev) =>
      prev.map((s) => (s.id === sellerId ? { ...s, status: 'approved' } : s))
    );
    const target = sellers.find((s) => s.id === sellerId);
    triggerToast(`Approved "${target?.companyName || 'Seller'}" for marketplace sales!`);
  };

  const rejectSeller = (sellerId) => {
    setSellers((prev) =>
      prev.map((s) => (s.id === sellerId ? { ...s, status: 'rejected' } : s))
    );
    triggerToast('Seller account rejected or suspended.');
  };

  const toggleSellerBadge = (sellerId) => {
    setSellers((prev) =>
      prev.map((s) =>
        s.id === sellerId ? { ...s, verifiedBadge: !s.verifiedBadge } : s
      )
    );
    triggerToast('Verified merchant badge updated.');
  };

  const disburseSellerPayout = (sellerId) => {
    setSellers((prev) =>
      prev.map((s) => (s.id === sellerId ? { ...s, payoutStatus: 'Paid' } : s))
    );
    const target = sellers.find((s) => s.id === sellerId);
    triggerToast(`Payout authorized and transferred to ${target?.companyName || 'merchant'}!`);
  };

  // Manage Admin Authentication
  const [adminProfile, setAdminProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isAdminLoggedIn = !!adminProfile;

  const loginAdmin = (username, password) => {
    const profile = {
      username: username || 'admin@auraluxe.com',
      role: 'Root Master Administrator',
      name: 'Admin Concierge',
      lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      securityLevel: 'Tier 5 (Full Authority)',
      accessId: 'ROOT-ADM-001',
    };
    setAdminProfile(profile);
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(profile));
    triggerToast('Root Master Access granted. Welcome, Administrator!');
  };

  const logoutAdmin = () => {
    setAdminProfile(null);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    triggerToast('Logged out of Master Admin Console.');
  };

  // Manage Products (live editable by seller!)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  useEffect(() => {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  // Manage Seller Authentication & Profile
  const [sellerProfile, setSellerProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(SELLER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isSellerLoggedIn = !!sellerProfile;

  const loginSeller = (email, password, companyName = 'Nordic Audio Labs') => {
    const profile = {
      companyName: companyName || 'Nordic Audio Labs',
      email: email || 'merchant@nordicaudio.com',
      category: 'Audio & Sound Specialization',
      phone: '+1 (555) 349-2018',
      joinedDate: 'September 2026',
      totalRevenue: 18450.0,
      ordersCount: 128,
      rating: 4.92,
      storeId: 'MCH-88219',
    };
    setSellerProfile(profile);
    localStorage.setItem(SELLER_STORAGE_KEY, JSON.stringify(profile));
    triggerToast(`Welcome back, ${profile.companyName}!`);
  };

  const registerSeller = ({ companyName, category, email, phone }) => {
    const profile = {
      companyName,
      email,
      category: category || 'Electronics & Tech',
      phone: phone || '+1 (555) 000-0000',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      totalRevenue: 0.0,
      ordersCount: 0,
      rating: 5.0,
      storeId: `MCH-${Math.floor(10000 + Math.random() * 90000)}`,
    };
    setSellerProfile(profile);
    localStorage.setItem(SELLER_STORAGE_KEY, JSON.stringify(profile));

    // Register into marketplace directory for Admin Approval
    const newAdminSeller = {
      id: profile.storeId,
      companyName: profile.companyName,
      ownerName: 'Merchant Owner',
      email: profile.email,
      phone: profile.phone,
      category: profile.category,
      status: 'pending', // Starts as pending for admin approval!
      rating: 5.0,
      joinedDate: profile.joinedDate,
      grossSales: 0.0,
      commissionRate: 10,
      payoutStatus: 'Pending',
      productsCount: 0,
      verifiedBadge: false,
    };
    setSellers((prev) => [newAdminSeller, ...prev.filter((s) => s.companyName !== companyName)]);

    triggerToast(`Seller account created for "${companyName}"! (Pending Admin Approval)`);
  };

  const logoutSeller = () => {
    setSellerProfile(null);
    localStorage.removeItem(SELLER_STORAGE_KEY);
    triggerToast('Logged out of Seller Center.');
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p))
    );
    triggerToast(`Saved changes to "${updatedProduct.name}"`);
  };

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: Date.now(),
      slug: (newProduct.name || 'product').toLowerCase().replace(/\s+/g, '-'),
      sku: newProduct.sku || `AUR-${Math.floor(100 + Math.random() * 900)}`,
      rating: 5.0,
      reviewsCount: 0,
      isFeatured: false,
      isBestSeller: false,
      images:
        newProduct.images && newProduct.images.length > 0
          ? newProduct.images
          : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'],
      tags: newProduct.tags || ['New Arrival'],
      shortDescription: newProduct.shortDescription || newProduct.description || '',
    };
    setProducts((prev) => [productWithId, ...prev]);
    triggerToast(`Published "${productWithId.name}" live!`);
    return productWithId;
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    triggerToast('Product deleted from inventory.');
  };

  // Manage Customer Authentication & Profile
  const [customerProfile, setCustomerProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isCustomerLoggedIn = !!customerProfile;

  const loginCustomer = (email, password, name = 'Alex Vance') => {
    const profile = {
      name: name || 'Alex Vance',
      email: email || 'alex.vance@aurasure.com',
      phone: '+1 (555) 234-8901',
      membershipTier: 'VIP Platinum',
      auraPoints: 1420,
      storeCredit: 45.0,
      joinedYear: '2024',
      address: {
        street: '428 Skyline Boulevard, Penthouse 12B',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'United States',
      },
    };
    setCustomerProfile(profile);
    localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(profile));
    triggerToast(`Welcome back, ${profile.name}!`);
  };

  const registerCustomer = ({ name, email, phone, password }) => {
    const profile = {
      name: name || 'Valued Client',
      email,
      phone: phone || '+1 (555) 000-0000',
      membershipTier: 'VIP Platinum',
      auraPoints: 250, // Welcome bonus points!
      storeCredit: 15.0, // Welcome gift voucher!
      joinedYear: '2026',
      address: {
        street: '742 Evergreen Terrace',
        city: 'Springfield',
        state: 'OR',
        zip: '97477',
        country: 'United States',
      },
    };
    setCustomerProfile(profile);
    localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(profile));
    triggerToast(`Account created for ${profile.name}! 250 Bonus Points added.`);
  };

  const updateCustomerProfile = (updatedData) => {
    setCustomerProfile((prev) => {
      const updated = { ...prev, ...updatedData };
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    triggerToast('Profile updated successfully!');
  };

  const logoutCustomer = () => {
    setCustomerProfile(null);
    localStorage.removeItem(CUSTOMER_STORAGE_KEY);
    triggerToast('Logged out of Customer Account.');
  };

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  // Trigger temporary notification
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (product, selectedColor, selectedSize, quantity = 1) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, selectedColor, selectedSize, quantity },
    });
    triggerToast(`Added "${product.name}" to cart`);
  };

  const updateQuantity = (variantKey, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { variantKey, quantity } });
  };

  const removeFromCart = (variantKey) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { variantKey } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const applyCouponCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SAVE15') {
      dispatch({ type: 'APPLY_COUPON', payload: { code: 'SAVE15', percent: 15 } });
      triggerToast('Coupon applied: 15% discount!');
      return { success: true, message: '15% discount applied successfully!' };
    }
    if (clean === 'AURA10') {
      dispatch({ type: 'APPLY_COUPON', payload: { code: 'AURA10', fixed: 10 } });
      triggerToast('Coupon applied: $10 off!');
      return { success: true, message: '$10 discount applied successfully!' };
    }
    return { success: false, message: 'Invalid coupon code. Try SAVE15' };
  };

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
    triggerToast('Coupon removed.');
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      triggerToast(`Removed from Wishlist`);
    } else {
      setWishlist((prev) => [...prev, product]);
      triggerToast(`Saved to Wishlist`);
    }
  };

  // Computations
  const subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

  let discountAmount = 0;
  if (state.appliedCoupon) {
    if (state.appliedCoupon.percent) {
      discountAmount = (subtotal * state.appliedCoupon.percent) / 100;
    } else if (state.appliedCoupon.fixed) {
      discountAmount = Math.min(subtotal, state.appliedCoupon.fixed);
    }
  }

  const shippingCost = subtotal > 150 || subtotal === 0 ? 0.0 : 15.0;
  const taxCost = (subtotal - discountAmount) * 0.08;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost + taxCost);

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        subtotal,
        discountAmount,
        shippingCost,
        taxCost,
        grandTotal,
        totalItemCount,
        appliedCoupon: state.appliedCoupon,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCouponCode,
        removeCoupon,
        wishlist,
        toggleWishlist,
        toastMessage,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProductForModal,
        setSelectedProductForModal,
        isWishlistOpen,
        setIsWishlistOpen,
        isSellerModalOpen,
        setIsSellerModalOpen,
        isCustomerModalOpen,
        setIsCustomerModalOpen,
        isAdminModalOpen,
        setIsAdminModalOpen,
        activePage,
        setActivePage: navigateToPage,
        adminProfile,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        activeTrackingCode,
        setActiveTrackingCode,
        products,
        sellers,
        approveSeller,
        rejectSeller,
        toggleSellerBadge,
        disburseSellerPayout,
        sellerProfile,
        isSellerLoggedIn,
        loginSeller,
        registerSeller,
        logoutSeller,
        updateProduct,
        addProduct,
        deleteProduct,
        customerProfile,
        isCustomerLoggedIn,
        loginCustomer,
        registerCustomer,
        updateCustomerProfile,
        logoutCustomer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
