import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-slate-100/80 border-t border-slate-200 text-slate-600 text-xs">
      {/* Newsletter Section */}
      <div className="border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-md shadow-slate-200/50 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-lg space-y-2 text-center lg:text-left">
              <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-600">
                Join the Private Circle
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Receive 15% off your inaugural order
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-normal">
                Gain advance access to seasonal capsule releases, VIP archive sales, and private design previews.
              </p>
            </div>

            <div className="w-full lg:max-w-md">
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl justify-center font-bold">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>Welcome to Aura Luxe. Check your inbox for your 15% voucher.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your personal email..."
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-2xs"
                    required
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition flex items-center gap-2 shadow-md shadow-indigo-600/25 whitespace-nowrap cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Sitemap Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-2xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-slate-900 tracking-wider">AURA LUXE</span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-normal">
              Curating elevated acoustic instruments, titanium horology, fine merino outerwear, and architectural workspaces for the discerning modern lifestyle.
            </p>
            <div className="text-[11px] text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-medium">Certified Carbon-Neutral Global Logistics</span>
            </div>
          </div>

          {/* Catalog Columns */}
          <div>
            <h4 className="text-slate-900 font-bold mb-3 text-xs tracking-wider uppercase">Collections</h4>
            <ul className="space-y-2">
              <li><a href="#catalog-section" className="hover:text-indigo-600 transition">Audio & Sound</a></li>
              <li><a href="#catalog-section" className="hover:text-indigo-600 transition">Titanium Horology</a></li>
              <li><a href="#catalog-section" className="hover:text-indigo-600 transition">Tailored Outerwear</a></li>
              <li><a href="#catalog-section" className="hover:text-indigo-600 transition">Performance Footwear</a></li>
              <li><a href="#catalog-section" className="hover:text-indigo-600 transition">Minimal Workspace</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-3 text-xs tracking-wider uppercase">Client Support</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-indigo-600 cursor-pointer transition">Order Telemetry</span></li>
              <li><span className="hover:text-indigo-600 cursor-pointer transition">Returns & Exchanges</span></li>
              <li><span className="hover:text-indigo-600 cursor-pointer transition">Complimentary Shipping</span></li>
              <li><span className="hover:text-indigo-600 cursor-pointer transition">Warranty Registration</span></li>
              <li><span className="hover:text-indigo-600 cursor-pointer transition">Size & Fit Guide</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-3 text-xs tracking-wider uppercase">Company</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-indigo-600 cursor-pointer transition">Artisanal Story</span></li>
              <li><span className="hover:text-indigo-600 cursor-pointer transition">Sustainability Ledger</span></li>
              <li><span className="hover:text-indigo-600 cursor-pointer transition">Press & Media</span></li>
              <li><span className="hover:text-indigo-600 cursor-pointer transition">Privacy & Legal</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Aura Luxe International Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-mono shadow-2xs">VISA</span>
            <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-mono shadow-2xs">MASTERCARD</span>
            <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-mono shadow-2xs">AMEX</span>
            <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-mono shadow-2xs">APPLE PAY</span>
            <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-mono shadow-2xs">STRIPE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
