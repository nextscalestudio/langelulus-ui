// --- Scent & Product ---

export interface ScentNote {
  top: string[];
  middle: string[];
  base: string[];
}

export interface ScentProfile {
  family: string;
  notes: ScentNote;
  style: string;
  occasion: string[];
  emotionalDescription: string;
  targetAudience: string;
  feeling: string;
}

export interface ProductSpecs {
  volume: string;
  concentration: string;   // EDP | EDT | EDC | Parfum
  origin: string;
  longevity: string;
  sillage: string;
  gender: 'Male' | 'Female' | 'Unisex';
}

export interface UsageGuide {
  sprayPositions: string[];
  longevityTips: string[];
  storageTips: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  shortDescription: string;
  description: string;
  price: number;              // VND
  images: string[];
  availableVolumes: string[]; // ["30ml", "50ml", "100ml"]
  inStock: boolean;
  category: string;
  collection?: string;
  tags: string[];
  specs: ProductSpecs;
  scentProfile: ScentProfile;
  usageGuide: UsageGuide;
  rating: number;             // 0–5
  reviewCount: number;
  isFeatured: boolean;
  relatedProductIds: string[];
}

// --- Cart ---

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVolume: string;
}

// --- Orders ---

export interface RecipientInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  note?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  recipient: RecipientInfo;
  paymentMethod: 'cod' | 'bank_transfer';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
  createdAt: string;
}

// --- Reviews ---

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar?: string;
  rating: number;   // 1–5
  comment: string;
  images?: string[];
  createdAt: string;
}

// --- Blog ---

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
}

// --- Coupons ---

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  expiresAt?: string;
}
