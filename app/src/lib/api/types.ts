// API Request and Response Types

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

// User related types
export interface LoginRequest {
  email?: string;
  phone?: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email?: string;
  phone?: string;
  password: string;
  zodiacSign: string;
  referralCode?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: UserProfile;
}

export interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  email?: string;
  phone?: string;
  zodiacSign: string;
  birthDate?: string;
  level: number;
  experience: number;
  experienceRequired: number;
  coinBalance: number;
  isVIP: boolean;
  vipTier?: 'monthly' | 'quarterly' | 'annual';
  vipExpiry?: string;
  createdAt: string;
  lastLoginAt: string;
}

// Fortune related types
export interface DailyFortuneRequest {
  zodiacSign: string;
  date: string;
}

export interface DailyFortune {
  date: string;
  zodiacSign: string;
  overallScore: number;
  stats: {
    health: number;
    love: number;
    career: number;
    wealth: number;
  };
  description: string;
  luckyColor?: string;
  luckyNumber?: number;
}

// Payment related types
export interface CoinPackage {
  id: string;
  coins: number;
  price: number;
  bonus?: number;
  isPopular?: boolean;
}

export interface PaymentRequest {
  packageId: string;
  paymentMethod: 'wechat' | 'alipay';
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  paymentUrl?: string;
  error?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'purchase' | 'payment' | 'refund' | 'reward';
  amount: number;
  price?: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod?: 'wechat' | 'alipay';
  serviceType?: string;
  serviceId?: string;
  description: string;
  createdAt: string;
  completedAt?: string;
}

// Post related types
export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorLevel: string;
  title: string;
  content: string;
  images: string[];
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  isHot: boolean;
  isPinned: boolean;
  status: 'active' | 'hidden' | 'deleted';
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  images?: string[];
  tags?: string[];
}

// Expert related types
export interface Expert {
  id: string;
  name: string;
  avatar: string;
  responseTime: string;
  lastActive: string;
  description: string;
  price: number;
  isOnline: boolean;
  gender: 'male' | 'female';
  rating?: number;
  specializations?: string[];
}

// Reading related types
export interface TarotReading {
  id: string;
  userId: string;
  question: string;
  cards: TarotCard[];
  interpretation: string;
  timestamp: string;
  cost: number;
}

export interface TarotCard {
  id: string;
  name: string;
  imageUrl: string;
  position: number;
  isReversed: boolean;
  meaning: string;
}

export interface DreamInterpretation {
  id: string;
  userId: string;
  dreamText: string;
  interpretation: string;
  symbols: string[];
  cost: number;
  isExpert: boolean;
  expertId?: string;
  timestamp: string;
}

// Achievement related types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  requirement?: number;
}
