// API Configuration

export const API_CONFIG = {
  // Base URL for API - can be overridden by environment variable
  baseURL: (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3000/api',
  
  // Request timeout in milliseconds
  timeout: 30000,
  
  // Retry configuration
  retry: {
    maxRetries: 3,
    retryDelay: 1000,
    retryableStatuses: [408, 429, 500, 502, 503, 504],
  },
  
  // Authentication
  auth: {
    tokenKey: 'tarot_auth_token',
    refreshTokenKey: 'tarot_refresh_token',
    tokenPrefix: 'Bearer',
  },
  
  // API endpoints
  endpoints: {
    // Auth
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh',
    
    // User
    profile: '/user/profile',
    updateProfile: '/user/profile',
    achievements: '/user/achievements',
    
    // Fortune
    dailyFortune: '/fortune/daily',
    
    // Payment
    coinPackages: '/payment/packages',
    initiatePayment: '/payment/initiate',
    verifyPayment: '/payment/verify',
    coinBalance: '/payment/balance',
    
    // Transactions
    transactions: '/transactions',
    transactionDetail: '/transactions/:id',
    
    // Divination
    tarotReading: '/divination/tarot',
    dreamInterpretation: '/divination/dream',
    readingHistory: '/divination/history',
    
    // Community
    posts: '/community/posts',
    postDetail: '/community/posts/:id',
    createPost: '/community/posts',
    likePost: '/community/posts/:id/like',
    commentPost: '/community/posts/:id/comment',
    reportPost: '/community/posts/:id/report',
    
    // Experts
    experts: '/experts',
    expertDetail: '/experts/:id',
    initiateConsultation: '/experts/:id/consult',
    
    // Notifications
    notifications: '/notifications',
    notificationSettings: '/notifications/settings',
  },
};

// Helper to replace path parameters
export function buildEndpoint(endpoint: string, params: Record<string, string>): string {
  let url = endpoint;
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, value);
  });
  return url;
}
