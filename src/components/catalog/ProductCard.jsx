import React, { useState } from 'react';
import { Star, Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist, setSelectedProductForModal } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, product.colors ? product.colors[0]?.name : null, product.sizes ? product.sizes[0] : null, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1500);
  };

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setSelectedProductForModal(product)}
      className="group relative bg-white border border-zinc-200 hover:border-zinc-400 rounded-2xl overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Visual Image Container */}
      <div className="relative aspect-square overflow-hidden bg-zinc-100">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {discountPercent > 0 && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-zinc-900 text-white rounded-full shadow-xs">
              Save {discountPercent}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/95 text-zinc-900 border border-zinc-200 rounded-full shadow-2xs">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-zinc-500 hover:text-rose-600 hover:scale-110 transition border border-zinc-200 shadow-2xs cursor-pointer"
          aria-label="Wishlist"
        >
          <Heart
            className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-zinc-600'}`}
          />
        </button>

        {/* Quick View Hover Pill */}
        <div
          className={`absolute inset-x-4 bottom-4 transition-all duration-200 flex justify-center ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProductForModal(product);
            }}
            className="w-full py-2.5 px-3 bg-white/95 backdrop-blur-md border border-zinc-200 text-zinc-900 hover:bg-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md transition"
          >
            <Eye className="w-3.5 h-3.5 text-zinc-700" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="uppercase font-bold tracking-wider text-zinc-400 text-[10px]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-zinc-800 font-bold">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-zinc-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="font-bold text-zinc-900 text-sm sm:text-base leading-snug group-hover:text-black transition line-clamp-2">
            {product.name}
          </h3>

          <p className="mt-1.5 text-xs text-zinc-500 line-clamp-2 leading-relaxed font-normal">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-semibold text-zinc-900">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-zinc-400 line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">
              {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity})` : 'Sold Out'}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={product.stockQuantity === 0}
            className={`p-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all duration-150 cursor-pointer ${
              addedAnim
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-zinc-900 hover:bg-black text-white shadow-xs active:scale-95'
            } disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed`}
            aria-label="Add to Bag"
          >
            {addedAnim ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
