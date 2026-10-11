import React, { useState } from 'react';
import {
  X,
  Search,
  Truck,
  Package,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Download,
  Copy,
  Phone,
  ShieldCheck,
  Compass,
  ArrowRight,
  Share2,
  Bell,
  Sparkles,
  Radio,
  Activity,
  Check,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

const DEMO_ORDERS = {
  'AL-92418': {
    orderNumber: 'AL-92418',
    trackingCode: 'DXB-88319-EXP',
    courier: 'DHL Express Worldwide Priority',
    status: 'In Transit',
    currentStage: 3, // 1 to 5
    estimatedDelivery: 'Tomorrow, Sept 24 • By 2:00 PM',
    timeRemaining: '18 hours 24 mins',
    origin: 'Aura Luxe Global Hub (Dubai International Logistics)',
    currentLocation: 'Frankfurt Air Cargo Terminal (Flight LH-8201)',
    destination: '742 Evergreen Terrace, Springfield, OR 97477',
    recipient: 'Alex Morgan (+1 555-234-5678)',
    deliveryNote: 'Gate code #4821. Signature required on handover.',
    items: [
      {
        name: 'Aura Studio Wireless ANC Headphones',
        variant: 'Matte Obsidian',
        price: 289.0,
        qty: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80',
      },
    ],
    timeline: [
      { time: 'Sept 22, 10:14 AM', location: 'Dubai, UAE', event: 'Order verified and payment authorized', done: true },
      { time: 'Sept 22, 02:45 PM', location: 'Dubai Logistics Hub', event: 'Precision quality inspected and packed in tamper-proof seal', done: true },
      { time: 'Sept 23, 08:30 AM', location: 'Dubai International (DXB)', event: 'Departed origin facility on Priority Cargo Flight', done: true },
      { time: 'Sept 23, 11:20 AM', location: 'Frankfurt Terminal (FRA)', event: 'Customs cleared & transfer to regional distribution jet', active: true },
      { time: 'Sept 24, 01:30 PM', location: 'Springfield Local Depot', event: 'Out for final doorstep delivery with local courier', pending: true },
      { time: 'Sept 24, 02:00 PM', location: 'Recipient Doorstep', event: 'Delivered and digital signature captured', pending: true },
    ],
  },
  'AL-88310': {
    orderNumber: 'AL-88310',
    trackingCode: 'SFO-44102-FEDEX',
    courier: 'FedEx International Next-Flight',
    status: 'Delivered',
    currentStage: 5,
    estimatedDelivery: 'Delivered on Sept 14 • 11:42 AM',
    timeRemaining: 'Completed',
    origin: 'Silicon Valley Innovation Hub, CA',
    currentLocation: 'Delivered to Front Door Concierge',
    destination: '428 Skyline Boulevard, Penthouse 12B, New York, NY',
    recipient: 'Alex Vance',
    deliveryNote: 'Signed by: Alex Vance',
    items: [
      {
        name: 'CyberWatch Ultra 49mm Titanium',
        variant: 'Natural Titanium • 45mm',
        price: 649.0,
        qty: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80',
      },
    ],
    timeline: [
      { time: 'Sept 12, 09:00 AM', location: 'San Francisco, CA', event: 'Order placed & verified', done: true },
      { time: 'Sept 13, 06:15 PM', location: 'New York JFK Hub', event: 'Arrived at regional sort hub', done: true },
      { time: 'Sept 14, 08:00 AM', location: 'Manhattan Depot', event: 'Loaded on courier van for morning delivery', done: true },
      { time: 'Sept 14, 11:42 AM', location: 'Customer Residence', event: 'Package delivered & signed by recipient', done: true },
    ],
  },
  'AL-77402': {
    orderNumber: 'AL-77402',
    trackingCode: 'HKG-90218-DHL',
    courier: 'DHL Express Secure Courier',
    status: 'Processing & Packaging',
    currentStage: 2,
    estimatedDelivery: 'Friday, Sept 26 • Estimated',
    timeRemaining: '3 days remaining',
    origin: 'Aura Studio Central Warehouse',
    currentLocation: 'Packaging & Quality Assurance Facility',
    destination: '800 Tech Plaza, San Francisco, CA',
    recipient: 'Alex Vance',
    deliveryNote: 'Fragile electronics handling',
    items: [
      {
        name: 'Nova 75% Mechanical Keyboard',
        variant: 'Polar White • Linear Yellow',
        price: 179.0,
        qty: 1,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80',
      },
    ],
    timeline: [
      { time: 'Sept 23, 09:30 AM', location: 'Hong Kong Hub', event: 'Order received & allocated to inventory batch', done: true },
      { time: 'Sept 23, 11:00 AM', location: 'Packaging Bay 4', event: 'Acoustic testing & custom box packaging in progress', active: true },
      { time: 'Sept 23, 04:00 PM', location: 'Courier Handover', event: 'Scheduled for evening flight manifest', pending: true },
    ],
  },
};

export default function OrderTrackerModal() {
  const {
    isOrderTrackerOpen,
    setIsOrderTrackerOpen,
    activeTrackingCode,
    setActiveTrackingCode,
  } = useCart();

  const [searchInput, setSearchInput] = useState('');
  const [selectedOrderKey, setSelectedOrderKey] = useState(activeTrackingCode || 'AL-92418');
  const [smsNotification, setSmsNotification] = useState(true);
  const [copiedNotification, setCopiedNotification] = useState(false);

  if (!isOrderTrackerOpen) return null;

  const currentOrder = DEMO_ORDERS[selectedOrderKey] || DEMO_ORDERS['AL-92418'];

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    if (!query) return;

    // Check if matches any demo key
    const match = Object.keys(DEMO_ORDERS).find(
      (k) => k.includes(query) || DEMO_ORDERS[k].trackingCode.includes(query)
    );

    if (match) {
      setSelectedOrderKey(match);
      setSearchInput('');
    } else {
      alert(`No active courier record found for "${query}". Try sample orders: AL-92418, AL-88310, AL-77402`);
    }
  };

  const handleCopyLink = () => {
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={() => setIsOrderTrackerOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 animate-fade-in-scale my-auto">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: '12s' }} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Live Order Radar & Tracking</h2>
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-extrabold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Courier Telemetry Active
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Real-time global carrier satellite feed, route trajectory, and doorstep arrival estimate.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOrderTrackerOpen(false)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Order Search & Demo Chips */}
          <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
            <form onSubmit={handleSearch} className="flex gap-2 max-w-lg">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Enter Order ID (AL-92418) or Courier Code (DXB-88319-EXP)..."
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white/10 border border-white/15 rounded-xl text-xs text-white placeholder-slate-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md flex-shrink-0"
              >
                <span>Track Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick Demo Switchers */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 text-[11px]">
              <span className="text-slate-400 font-semibold whitespace-nowrap">Sample Orders:</span>
              {Object.keys(DEMO_ORDERS).map((key) => {
                const ord = DEMO_ORDERS[key];
                const isSelected = selectedOrderKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedOrderKey(key)}
                    className={`px-3 py-1 rounded-lg font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-white text-slate-950 shadow-sm ring-2 ring-white/50'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    <span>#{key}</span>
                    <span className="text-[10px] opacity-80">({ord.status})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto bg-slate-50/50 space-y-6">
          {/* Top Status Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900 tracking-tight">
                    Order #{currentOrder.orderNumber}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                      currentOrder.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : currentOrder.status === 'In Transit'
                        ? 'bg-blue-100 text-blue-800 animate-pulse'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {currentOrder.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <span>Carrier: <strong className="text-slate-800">{currentOrder.courier}</strong></span>
                  <span>•</span>
                  <span>Tracking: <strong className="text-indigo-600 font-mono font-bold">{currentOrder.trackingCode}</strong></span>
                </div>
              </div>

              <div className="text-left sm:text-right bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl">
                <span className="text-[11px] text-slate-400 block font-semibold">Estimated Arrival</span>
                <span className="text-sm font-semibold text-slate-900 block leading-tight">
                  {currentOrder.estimatedDelivery}
                </span>
                <span className="text-[11px] text-emerald-600 font-extrabold">
                  {currentOrder.timeRemaining}
                </span>
              </div>
            </div>

            {/* Visual Route Journey Bar */}
            <div className="pt-5">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <div className="flex items-center gap-2 text-slate-700">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Origin: Dubai (DXB)</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-700 font-extrabold">
                  <Truck className="w-4 h-4 animate-bounce" />
                  <span>In Regional Transit</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  <span>Springfield, OR</span>
                </div>
              </div>

              {/* Progress Line */}
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-indigo-600 rounded-full transition-all duration-700"
                  style={{
                    width:
                      currentOrder.currentStage === 5
                        ? '100%'
                        : currentOrder.currentStage === 3
                        ? '65%'
                        : '25%',
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold mt-2">
                <span>Verified & Packed</span>
                <span>Air Freight Manifest</span>
                <span>Regional Sorting</span>
                <span>Out for Delivery</span>
                <span>Delivered</span>
              </div>
            </div>
          </div>

          {/* 2-Column Section: Timeline + Delivery & Items */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Columns: Live Checkpoint Timeline */}
            <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
              {/* Header Telemetry Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                    <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '24s' }} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      Courier Telemetry Feed
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium">Automated milestone checkpoints via GPS carrier satellite</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Live Signal Animation */}
                  <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80 shadow-2xs">
                    <div className="flex items-end gap-0.5 h-3 px-0.5">
                      <span className="w-0.5 bg-emerald-600 rounded-full signal-bar-1 h-3" />
                      <span className="w-0.5 bg-emerald-600 rounded-full signal-bar-2 h-3" />
                      <span className="w-0.5 bg-emerald-600 rounded-full signal-bar-3 h-3" />
                      <span className="w-0.5 bg-emerald-600 rounded-full signal-bar-4 h-3" />
                    </div>
                    <span className="text-[10px] font-mono text-emerald-800 font-semibold tracking-tight">GPS LIVE</span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 font-bold bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/60 hidden sm:inline-block">
                    50.03° N, 8.56° E
                  </span>
                </div>
              </div>

              {/* Animated Timeline List */}
              <div className="relative pl-8 sm:pl-9 space-y-4">
                {/* Background Cable Line */}
                <div className="absolute left-[13px] sm:left-[15px] top-4 bottom-4 w-1 bg-slate-100 rounded-full" />
                {/* Animated Flowing Laser Stream Line */}
                <div className="absolute left-[13px] sm:left-[15px] top-4 w-1 h-3/5 rounded-full animate-flow-laser shadow-sm" />

                {currentOrder.timeline.map((event, idx) => (
                  <div
                    key={idx}
                    className={`relative p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 ${
                      event.active
                        ? 'bg-gradient-to-r from-indigo-50/90 via-white to-indigo-50/30 border-indigo-300 shadow-md ring-1 ring-indigo-500/20 translate-x-1 sm:translate-x-1.5'
                        : event.done
                        ? 'bg-slate-50/40 hover:bg-slate-50 border-slate-200/70 hover:border-slate-300 hover:translate-x-1'
                        : 'bg-white/40 border-slate-100 opacity-60'
                    }`}
                  >
                    {/* Circle Dot / Beacon Icon */}
                    <div className="absolute -left-[32px] sm:-left-[35px] top-4 sm:top-4.5 flex items-center justify-center">
                      {event.done ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 border-2 border-white">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : event.active ? (
                        <div className="relative flex items-center justify-center">
                          {/* Pulsing Concentric Ripple Waves */}
                          <div className="absolute w-12 h-12 rounded-full bg-indigo-500/25 animate-ripple pointer-events-none" />
                          <div className="absolute w-8 h-8 rounded-full bg-indigo-500/30 animate-ping pointer-events-none" />
                          {/* Center Active Dot */}
                          <div className="relative w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/50 border-2 border-white animate-live-glow">
                            <Radio className="w-3 h-3 text-white animate-pulse" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-white border-2 border-slate-300 shadow-2xs" />
                      )}
                    </div>

                    {/* Content */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-xs font-semibold ${
                              event.active
                                ? 'text-indigo-950 font-semibold'
                                : event.done
                                ? 'text-slate-900 font-extrabold'
                                : 'text-slate-400 font-semibold'
                            }`}
                          >
                            {event.event}
                          </span>
                          {event.active && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[9px] font-extrabold uppercase tracking-wider shadow-xs animate-pulse">
                              <Sparkles className="w-2.5 h-2.5" />
                              Active Checkpoint
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono font-bold whitespace-nowrap">
                          {event.time}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500 flex-wrap">
                        <span className="font-semibold text-slate-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {event.location}
                        </span>
                        {event.active && (
                          <>
                            <span>•</span>
                            <span className="text-indigo-600 font-bold text-[10px] flex items-center gap-1 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/60">
                              <Activity className="w-3 h-3 text-indigo-600 animate-pulse" />
                              Live En Route Telemetry
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Package Details & Destination Card */}
            <div className="space-y-4">
              {/* Delivery Address Card */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-slate-800">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Destination</h4>
                </div>

                <div className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-900 font-bold block">{currentOrder.recipient}</strong>
                  <span>{currentOrder.destination}</span>
                  <div className="mt-2 p-2 bg-slate-50 rounded-xl text-[11px] text-slate-500 border border-slate-100">
                    <span className="font-bold text-slate-700">Courier Note:</span> {currentOrder.deliveryNote}
                  </div>
                </div>

                {/* SMS Updates Toggle */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Bell className="w-3.5 h-3.5 text-amber-500" />
                    <span>Live SMS Alerts</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSmsNotification(!smsNotification)}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                      smsNotification ? 'bg-indigo-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        smsNotification ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Package Contents */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-slate-800">
                  <Package className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Parcel Contents</h4>
                </div>

                <div className="space-y-2.5">
                  {currentOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-900 truncate">{item.name}</p>
                        <p className="text-[10px] text-slate-400">{item.variant} • Qty {item.qty}</p>
                        <p className="text-xs font-semibold text-indigo-600 mt-0.5">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support & Share Actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedNotification ? 'Link Copied!' : 'Share Tracking'}</span>
                </button>
                <button
                  onClick={() => alert(`Official Customs & Shipping Manifest for ${currentOrder.orderNumber} downloaded.`)}
                  className="py-2.5 px-3 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
