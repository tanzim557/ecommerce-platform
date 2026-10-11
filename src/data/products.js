export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles' },
  { id: 'electronics', name: 'Electronics', icon: 'Laptop' },
  { id: 'audio', name: 'Audio & Sound', icon: 'Headphones' },
  { id: 'fashion', name: 'Fashion & Apparel', icon: 'Shirt' },
  { id: 'footwear', name: 'Footwear', icon: 'Footprints' },
  { id: 'workspace', name: 'Workspace & Living', icon: 'Lamp' },
];

export const PRODUCTS = [
  {
    id: 1,
    name: 'Aura Studio Wireless ANC Headphones',
    slug: 'aura-studio-wireless-anc-headphones',
    sku: 'AUR-HD-001',
    category: 'audio',
    categoryName: 'Audio & Sound',
    price: 289.00,
    compareAtPrice: 349.00,
    rating: 4.9,
    reviewsCount: 312,
    stockQuantity: 18,
    isFeatured: true,
    isBestSeller: true,
    tags: ['ANC', 'Bluetooth 5.3', '40hr Battery', 'Hi-Res Audio'],
    shortDescription: 'Flagship hybrid active noise cancelling headphones with custom 40mm beryllium drivers.',
    description: 'Immerse yourself in acoustic perfection with the Aura Studio Wireless Headphones. Featuring custom-tuned 40mm beryllium drivers, spatial audio tracking, and an ergonomic memory foam headband engineered for all-day listening bliss. Dual beam-forming microphones ensure crystal-clear voice fidelity.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#1e293b' },
      { name: 'Silver Lunar', hex: '#94a3b8' },
      { name: 'Champagne Gold', hex: '#d97706' }
    ],
    sizes: ['Standard'],
    specs: {
      'Battery Life': 'Up to 40 Hours (ANC On)',
      'Charging': 'USB-C Quick Charge (15m = 5hrs)',
      'Connectivity': 'Bluetooth 5.3 + 3.5mm Aux',
      'Weight': '250g'
    }
  },
  {
    id: 2,
    name: 'CyberWatch Ultra 49mm Titanium',
    slug: 'cyberwatch-ultra-49mm-titanium',
    sku: 'CW-ULTRA-49',
    category: 'electronics',
    categoryName: 'Electronics',
    price: 649.00,
    compareAtPrice: 799.00,
    rating: 4.8,
    reviewsCount: 184,
    stockQuantity: 7,
    isFeatured: true,
    isBestSeller: true,
    tags: ['Titanium', 'Sapphire Glass', 'Dual GPS', '100m Water-Resistant'],
    shortDescription: 'Aerospace-grade titanium smart fitness companion with precision dual-frequency GPS.',
    description: 'Engineered for extreme athletes, outdoor adventurers, and tech connoisseurs. The CyberWatch Ultra features an aerospace-grade titanium chassis, 2,000 nit always-on Retina display, and tactical depth gauges certified for scuba diving up to 40 meters.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Natural Titanium', hex: '#64748b' },
      { name: 'Midnight Black', hex: '#0f172a' }
    ],
    sizes: ['45mm', '49mm'],
    specs: {
      'Case Material': 'Aerospace Grade 5 Titanium',
      'Battery Life': 'Up to 72 Hours in Low-Power Mode',
      'Water Resistance': '100m (EN13319 Diver Certified)',
      'Sensors': 'ECG, SpO2, Temperature, Barometer'
    }
  },
  {
    id: 3,
    name: 'Nova Minimalist Mechanical Keyboard',
    slug: 'nova-minimalist-mechanical-keyboard',
    sku: 'NOVA-KB-75',
    category: 'workspace',
    categoryName: 'Workspace & Living',
    price: 169.00,
    compareAtPrice: 199.00,
    rating: 4.9,
    reviewsCount: 96,
    stockQuantity: 24,
    isFeatured: false,
    isBestSeller: true,
    tags: ['Hot-Swap', 'Gasket Mount', 'RGB', 'Wireless Tri-Mode'],
    shortDescription: '75% layout CNC anodized aluminum mechanical keyboard with factory-lubed linear switches.',
    description: 'Transform your typing experience into pure satisfaction. The Nova 75% mechanical keyboard integrates acoustic silicone dampening pads, hot-swappable sockets, south-facing per-key RGB backlighting, and seamless Bluetooth/2.4G/USB-C tri-mode connectivity.',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Space Gray', hex: '#334155' },
      { name: 'Polar White', hex: '#f1f5f9' },
      { name: 'Forest Sage', hex: '#166534' }
    ],
    sizes: ['Gateron Yellow (Linear)', 'Gateron Brown (Tactile)'],
    specs: {
      'Layout': '75% Compact (82 Keys)',
      'Plate': 'Polycarbonate Gasket Mounted',
      'Battery': '4,000 mAh Rechargeable Li-ion',
      'Keycaps': 'Double-shot PBT Cherry Profile'
    }
  },
  {
    id: 4,
    name: 'Urban Luxe Merino Wool Overcoat',
    slug: 'urban-luxe-merino-wool-overcoat',
    sku: 'UL-WOOL-OCT',
    category: 'fashion',
    categoryName: 'Fashion & Apparel',
    price: 340.00,
    compareAtPrice: 420.00,
    rating: 4.7,
    reviewsCount: 78,
    stockQuantity: 12,
    isFeatured: true,
    isBestSeller: false,
    tags: ['100% Merino', 'Tailored Fit', 'Thermal Lining', 'Water Repellent'],
    shortDescription: 'Handcrafted premium double-faced merino wool coat designed for sharp urban elegance.',
    description: 'Combining timeless Italian tailoring with modern thermal lining, this tailored double-breasted overcoat delivers uncompromised warmth and refined luxury through the harshest cold fronts.',
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Camel Tan', hex: '#b45309' },
      { name: 'Charcoal Slate', hex: '#1e293b' },
      { name: 'Navy Blue', hex: '#1e3a8a' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    specs: {
      'Material': '100% Australian Merino Wool (480 GSM)',
      'Lining': 'Cupro Bemberg Breathable Jacquard',
      'Closure': 'Genuine Horn Buttons',
      'Care': 'Specialist Dry Clean Only'
    }
  },
  {
    id: 5,
    name: 'Stride Pro Carbon Fiber Running Shoes',
    slug: 'stride-pro-carbon-running-shoes',
    sku: 'STR-RUN-PRO',
    category: 'footwear',
    categoryName: 'Footwear',
    price: 195.00,
    compareAtPrice: 240.00,
    rating: 4.9,
    reviewsCount: 220,
    stockQuantity: 15,
    isFeatured: true,
    isBestSeller: true,
    tags: ['Carbon Plate', 'Superfoam Midsole', 'Breathable Mesh', 'Ultra Lightweight'],
    shortDescription: 'Marathon racing shoe powered by a full-length curved carbon plate and nitrogen-infused foam.',
    description: 'Shatter your personal records with the Stride Pro. Featuring an aggressive rocker profile and responsive nitrogen-infused peba foam, each stride propels you forward with 85% energy return.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Solar Crimson', hex: '#dc2626' },
      { name: 'Volt Lime', hex: '#84cc16' },
      { name: 'Phantom Black', hex: '#020617' }
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    specs: {
      'Weight': '185g (US 9)',
      'Stack Height': '39mm Heel / 31mm Forefoot (8mm Drop)',
      'Plate': 'Full-length 3K Carbon Fiber Spoon Plate',
      'Outsole': 'Liquid Rubber Traction Lugging'
    }
  },
  {
    id: 6,
    name: 'Lumina Arc Sculptural Desk Lamp',
    slug: 'lumina-arc-sculptural-desk-lamp',
    sku: 'LUM-ARC-01',
    category: 'workspace',
    categoryName: 'Workspace & Living',
    price: 125.00,
    compareAtPrice: 150.00,
    rating: 4.6,
    reviewsCount: 64,
    stockQuantity: 20,
    isFeatured: false,
    isBestSeller: false,
    tags: ['CRI 98+', 'Wireless Charging Base', 'Touch Dimmer', 'Circadian Light'],
    shortDescription: 'Minimalist aluminum arch with museum-grade CRI 98+ lighting and 15W MagSafe charging base.',
    description: 'The Lumina Arc blends Scandinavian geometric beauty with health-focused illumination. Its continuous color temperature slider (2700K - 6500K) syncs with natural circadian rhythms to elevate your focus and relieve eye strain.',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Brushed Brass', hex: '#ca8a04' },
      { name: 'Matte Charcoal', hex: '#334155' }
    ],
    sizes: ['Standard'],
    specs: {
      'CRI Rating': '98+ (True Color Rendering)',
      'Brightness': '1,200 Lumens (Stepless Dimming)',
      'Base': 'Integrated 15W Qi2 Fast Wireless Charger',
      'Materials': 'Solid Sandblasted Aircraft Aluminum'
    }
  },
  {
    id: 7,
    name: 'Vanguard Carry-On Leather Duffle',
    slug: 'vanguard-carry-on-leather-duffle',
    sku: 'VAN-DUF-LTH',
    category: 'fashion',
    categoryName: 'Fashion & Apparel',
    price: 275.00,
    compareAtPrice: 320.00,
    rating: 4.8,
    reviewsCount: 110,
    stockQuantity: 9,
    isFeatured: false,
    isBestSeller: true,
    tags: ['Full Grain Leather', 'TSA Compliant', 'Shoe Compartment', 'Waterproof Base'],
    shortDescription: 'Full-grain Tuscan vegetable-tanned leather duffle built for weekend getaways and executive travel.',
    description: 'Artisanal Italian craftsmanship meets modern travel utility. Equipped with a separate ventilated shoe garage, padded 16-inch laptop pocket, and heavy-duty YKK Excella Japanese zippers.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Vintage Cognac', hex: '#9a3412' },
      { name: 'Espresso Brown', hex: '#451a03' }
    ],
    sizes: ['45 Liters'],
    specs: {
      'Dimensions': '52cm x 28cm x 26cm (TSA Cabin Approved)',
      'Hardware': 'Antiqued Solid Brass Buckles & Studs',
      'Laptop Sleeve': 'Padded Compartment for up to 16" MacBook Pro'
    }
  },
  {
    id: 8,
    name: 'SonicPulse Hi-Fi Bluetooth Speaker',
    slug: 'sonicpulse-hi-fi-bluetooth-speaker',
    sku: 'SP-SPK-360',
    category: 'audio',
    categoryName: 'Audio & Sound',
    price: 149.00,
    compareAtPrice: 180.00,
    rating: 4.7,
    reviewsCount: 145,
    stockQuantity: 30,
    isFeatured: true,
    isBestSeller: false,
    tags: ['360 Spatial Sound', 'IP67 Waterproof', '24hr Playtime', 'Stereo Pair'],
    shortDescription: 'Rugged portable waterproof acoustic powerhouse delivering punchy 360-degree room-filling audio.',
    description: 'Crafted with dual passive bass radiators and neodymium tweeters encased in ballistic nylon. Take the concert anywhere: from poolside gatherings to living room dinner parties.',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Storm Gray', hex: '#475569' },
      { name: 'Alpine Teal', hex: '#0f766e' },
      { name: 'Sunset Amber', hex: '#ea580c' }
    ],
    sizes: ['Compact'],
    specs: {
      'Power Output': '60W Peak Audio',
      'Protection': 'IP67 Dustproof & Submersible Waterproof',
      'Battery': '6,600 mAh (Acts as a phone power bank)'
    }
  }
];
