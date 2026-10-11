import React from 'react';
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Globe2,
  Clock,
  Award,
  Zap,
  Radio,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function TrustBanner() {
  const { setIsOrderTrackerOpen, setIsCustomerModalOpen } = useCart();

  const perks = [
    {
      id: 'delivery',
      title: 'Global Express Courier',
      badge: 'Priority Air Transit',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
      icon: Truck,
      gradient: 'from-indigo-500 to-blue-600',
      shadowColor: 'shadow-indigo-500/20',
      desc: 'Complimentary expedited worldwide shipping on orders over $150. Equipped with real-time GPS telemetry radar.',
      highlight: 'Delivered in 2-3 business days',
      actionText: 'Launch Live GPS Radar',
      action: () => setIsOrderTrackerOpen(true),
      tagIcon: Radio,
    },
    {
      id: 'returns',
      title: '30-Day Effortless Returns',
      badge: 'Zero-Risk Guarantee',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      icon: RotateCcw,
      gradient: 'from-emerald-500 to-teal-600',
      shadowColor: 'shadow-emerald-500/20',
      desc: 'Pre-printed prepaid return labels enclosed in every luxury box. Doorstep concierge pickup with instant automated refunds.',
      highlight: 'Instant refund upon postal scan',
      actionText: 'View Concierge Policy',
      action: () => setIsCustomerModalOpen(true),
      tagIcon: CheckCircle2,
    },
    {
      id: 'authenticity',
      title: 'Certified Atelier Authenticity',
      badge: '100% Genuine Token',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200/80',
      icon: ShieldCheck,
      gradient: 'from-amber-500 to-orange-600',
      shadowColor: 'shadow-amber-500/20',
      desc: 'Sourced directly from verified designer maisons and manufacturer ateliers. Every product carries a holographic serial token.',
      highlight: 'Holographic NFC serial verified',
      actionText: 'Verify Product Origin',
      action: () => setIsCustomerModalOpen(true),
      tagIcon: Award,
    },
    {
      id: 'concierge',
      title: '24/7 White-Glove Concierge',
      badge: '< 2 Min Response',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200/80',
      icon: Headphones,
      gradient: 'from-purple-500 to-indigo-600',
      shadowColor: 'shadow-purple-500/20',
      desc: 'Dedicated horology, acoustics, and styling specialists ready round the clock to advise and fulfill your lifestyle requirements.',
      highlight: '1-on-1 Dedicated Lifestyle Team',
      actionText: 'Connect with Concierge',
      action: () => setIsCustomerModalOpen(true),
      tagIcon: Zap,
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-50/60 via-white to-slate-100/70 border-y border-slate-200/80">
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold tracking-wide uppercase shadow-2xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>The Aura Luxe Distinction</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            Engineered for Perfection, Backed by Absolute Trust
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Every acquisition on Aura Luxe is guarded by our signature white-glove warranty, zero-risk assurance, and real-time courier telemetry.
          </p>
        </div>

        {/* 4 Elevated Luxury Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk) => {
            const Icon = perk.icon;
            const TagIcon = perk.tagIcon;
            return (
              <div
                key={perk.id}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:border-indigo-400/80 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
              >
                <div>
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${perk.gradient} text-white flex items-center justify-center shadow-lg ${perk.shadowColor} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase border flex items-center gap-1.5 ${perk.badgeColor}`}
                    >
                      <TagIcon className="w-3 h-3" />
                      <span>{perk.badge}</span>
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-semibold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {perk.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500 leading-relaxed font-normal">
                    {perk.desc}
                  </p>
                </div>

                {/* Card Footer: Highlight & Interactive Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span className="truncate">{perk.highlight}</span>
                  </div>

                  <button
                    onClick={perk.action}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 group-hover:text-indigo-700 hover:underline cursor-pointer pt-1"
                  >
                    <span>{perk.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Security & Trust Strip */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="flex items-center justify-center gap-2.5 text-slate-700 text-xs font-bold">
            <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>256-Bit SSL Bank Encryption</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 text-slate-700 text-xs font-bold">
            <Globe2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span>100% Carbon-Neutral Shipping</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 text-slate-700 text-xs font-bold">
            <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>Authorized Maison Partner</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 text-slate-700 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <span>4.98/5 Rating (24k+ Clients)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
