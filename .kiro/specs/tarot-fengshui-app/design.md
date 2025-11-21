# Design Document

## Overview

The Tarot and Feng Shui App is a React-based mobile web application built with TypeScript, Vite, and Tailwind CSS. The architecture follows a component-based design pattern with four main feature modules: Divination, Feng Shui, Community, and Profile. The application emphasizes a mystical user experience through dark theming, gradient effects, and smooth animations.

### Current Implementation Status

**Existing Features (UI Complete)**:
- ✅ Four-page navigation structure with bottom tab bar
- ✅ Divination page with zodiac selector, banner carousel, fortune display, and service cards
- ✅ Feng Shui page with eight-direction grid, direction details, and home recommendations
- ✅ Community page with posts feed, expert listings, and tab switching
- ✅ Profile page with user stats, achievements, and menu items
- ✅ Consistent mystical theme with purple/red gradients and animations
- ✅ ImageWithFallback component for graceful image loading

**Features to Implement**:
- ❌ Backend API integration and data persistence
- ❌ Payment system with virtual currency (coins)
- ❌ Detailed tarot card reading flow with card selection
- ❌ Dream interpretation service with text input
- ❌ Expert consultation chat system
- ❌ VIP membership and subscription management
- ❌ Transaction history and receipt generation
- ❌ User authentication and profile management
- ❌ Push notifications system
- ❌ Social sharing and referral system
- ❌ Content moderation and reporting
- ❌ Feng shui compass with device sensors
- ❌ Personalized fortune algorithm

The design will build upon the existing UI foundation and add the missing backend functionality, interactive features, and payment integration.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Divination│  │ FengShui │  │Community │  │ Profile  │   │
│  │   Page   │  │   Page   │  │   Page   │  │   Page   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│         │              │              │              │       │
│         └──────────────┴──────────────┴──────────────┘       │
│                            │                                  │
└────────────────────────────┼──────────────────────────────────┘
                             │
┌────────────────────────────┼──────────────────────────────────┐
│                     Business Logic Layer                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Fortune    │  │   Payment    │  │  Community   │       │
│  │   Service    │  │   Service    │  │   Service    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Divination  │  │   FengShui   │  │     User     │       │
│  │   Service    │  │   Service    │  │   Service    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└────────────────────────────┼──────────────────────────────────┘
                             │
┌────────────────────────────┼──────────────────────────────────┐
│                      Data Access Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │     API      │  │    Local     │  │   Device     │       │
│  │   Client     │  │   Storage    │  │   Sensors    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└────────────────────────────┼──────────────────────────────────┘
                             │
┌────────────────────────────┼──────────────────────────────────┐
│                      External Services                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Backend    │  │   Payment    │  │ Notification │       │
│  │     API      │  │  Providers   │  │   Service    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└───────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS with custom theme configuration
- **UI Components**: Radix UI primitives for accessible components
- **State Management**: React hooks (useState, useEffect, useContext)
- **Icons**: Lucide React
- **Image Handling**: Custom ImageWithFallback component with error handling
- **Animations**: CSS transitions and Tailwind animation utilities

## Components and Interfaces

### Core Components

#### 1. App Component
The root component managing navigation state and rendering the active page.

```typescript
interface AppProps {}

interface TabType = 'divination' | 'fengshui' | 'community' | 'profile';

interface Tab {
  id: TabType;
  icon: LucideIcon;
  label: string;
}
```

#### 2. DivinationPage Component
Displays zodiac selection, fortune stats, banner carousel, and divination service cards.

```typescript
interface DivinationPageProps {}

interface FortuneStats {
  label: string;
  value: number; // 0-100
  color: string; // Tailwind gradient classes
}

interface DivinationCard {
  title: string;
  desc: string;
  icon: string;
  bg: string | null;
  cost?: number; // coins required
  isPremium?: boolean;
}
```

#### 3. FengShuiPage Component
Provides eight-direction analysis and home layout recommendations.

```typescript
interface FengShuiPageProps {}

interface Direction {
  name: string; // 北, 东北, etc.
  element: string; // 水, 木, 火, 土, 金
  color: string;
  icon: LucideIcon;
  fortune: string;
}

interface FengShuiTip {
  title: string;
  desc: string;
  level: '优' | '良' | '中';
}
```

#### 4. CommunityPage Component
Manages community posts, expert listings, and social interactions.

```typescript
interface CommunityPageProps {}

interface Post {
  id: number;
  user: string;
  avatar: string;
  level: string;
  title: string;
  content: string;
  image: string | null;
  likes: number;
  comments: number;
  isHot: boolean;
  timestamp: Date;
}

interface Expert {
  id: number;
  name: string;
  avatar: string;
  responseTime: string;
  lastActive: string;
  description: string;
  price: string;
  isOnline: boolean;
  gender: 'male' | 'female';
  rating?: number;
}
```

#### 5. ProfilePage Component
Displays user information, statistics, achievements, and settings.

```typescript
interface ProfilePageProps {}

interface UserProfile {
  username: string;
  avatar: string;
  level: number;
  experience: number;
  experienceRequired: number;
  coinBalance: number;
  isVIP: boolean;
  vipExpiry?: Date;
}

interface UserStats {
  divinationCount: number;
  learningDays: number;
  achievementCount: number;
}

interface Achievement {
  id: string;
  name: string;
  desc: string;
  unlocked: boolean;
  icon: string;
}
```

### Service Layer Interfaces

#### Payment Service

```typescript
interface PaymentService {
  // Get available coin packages
  getCoinPackages(): CoinPackage[];
  
  // Initiate payment
  initiatePayment(packageId: string, paymentMethod: PaymentMethod): Promise<PaymentResult>;
  
  // Verify payment status
  verifyPayment(transactionId: string): Promise<PaymentStatus>;
  
  // Get user coin balance
  getCoinBalance(userId: string): Promise<number>;
  
  // Deduct coins for service
  deductCoins(userId: string, amount: number, serviceType: string): Promise<TransactionResult>;
}

interface CoinPackage {
  id: string;
  coins: number;
  price: number; // in yuan
  bonus?: number; // extra coins
  isPopular?: boolean;
}

type PaymentMethod = 'wechat' | 'alipay';

interface PaymentResult {
  success: boolean;
  transactionId: string;
  paymentUrl?: string;
  error?: string;
}

interface TransactionResult {
  success: boolean;
  newBalance: number;
  transactionId: string;
  error?: string;
}
```

#### Divination Service

```typescript
interface DivinationService {
  // Get daily fortune
  getDailyFortune(userId: string, zodiacSign: string, date: Date): Promise<DailyFortune>;
  
  // Perform tarot reading
  performTarotReading(userId: string, question: string, cardCount: number): Promise<TarotReading>;
  
  // Interpret dream
  interpretDream(userId: string, dreamText: string, useExpert: boolean): Promise<DreamInterpretation>;
  
  // Get reading history
  getReadingHistory(userId: string, limit: number): Promise<Reading[]>;
}

interface DailyFortune {
  date: Date;
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

interface TarotReading {
  id: string;
  question: string;
  cards: TarotCard[];
  interpretation: string;
  timestamp: Date;
  cost: number;
}

interface TarotCard {
  id: string;
  name: string;
  imageUrl: string;
  position: number;
  isReversed: boolean;
  meaning: string;
}
```

#### User Service

```typescript
interface UserService {
  // Get user profile
  getUserProfile(userId: string): Promise<UserProfile>;
  
  // Update user profile
  updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile>;
  
  // Add experience points
  addExperience(userId: string, amount: number): Promise<ExperienceResult>;
  
  // Unlock achievement
  unlockAchievement(userId: string, achievementId: string): Promise<Achievement>;
  
  // Get user achievements
  getUserAchievements(userId: string): Promise<Achievement[]>;
}

interface ExperienceResult {
  newExperience: number;
  newLevel: number;
  leveledUp: boolean;
  rewards?: Reward[];
}

interface Reward {
  type: 'coins' | 'achievement' | 'vip_trial';
  value: any;
}
```

## Data Models

### User Model

```typescript
interface User {
  id: string;
  username: string;
  avatar: string;
  email?: string;
  phone?: string;
  zodiacSign: string;
  birthDate?: Date;
  level: number;
  experience: number;
  coinBalance: number;
  isVIP: boolean;
  vipTier?: 'monthly' | 'quarterly' | 'annual';
  vipExpiry?: Date;
  createdAt: Date;
  lastLoginAt: Date;
  preferences: UserPreferences;
}

interface UserPreferences {
  notificationsEnabled: boolean;
  dailyFortuneTime: string; // HH:mm format
  language: 'zh-CN' | 'en-US';
  theme: 'dark' | 'light';
}
```

### Transaction Model

```typescript
interface Transaction {
  id: string;
  userId: string;
  type: 'purchase' | 'payment' | 'refund' | 'reward';
  amount: number; // coins
  price?: number; // yuan, for purchases
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod?: PaymentMethod;
  serviceType?: string;
  serviceId?: string;
  description: string;
  createdAt: Date;
  completedAt?: Date;
}
```

### Post Model

```typescript
interface Post {
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
  createdAt: Date;
  updatedAt: Date;
}
```

### Reading Model

```typescript
interface Reading {
  id: string;
  userId: string;
  type: 'tarot' | 'dream' | 'palmistry' | 'astrology';
  question?: string;
  input: any; // type-specific input data
  result: any; // type-specific result data
  cost: number;
  expertId?: string;
  rating?: number;
  createdAt: Date;
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Fortune stat values are bounded

*For any* daily fortune calculation, all fortune stats (health, love, career, wealth) should have values between 0 and 100 inclusive.
**Validates: Requirements 1.4, 22.4**

### Property 2: Overall fortune score is the average of stats

*For any* set of four fortune stats, the overall fortune score should equal the arithmetic mean of the four values.
**Validates: Requirements 1.5**

### Property 3: Zodiac selection updates state

*For any* zodiac sign in the list of twelve signs, selecting it should update the displayed zodiac sign to that value and close the dropdown menu.
**Validates: Requirements 1.3**

### Property 4: Banner carousel cycles through all banners

*For any* banner carousel with N banners, after N automatic rotations, the carousel should return to the first banner (index 0).
**Validates: Requirements 2.2**

### Property 5: Indicator dots match banner count and position

*For any* banner carousel with N banners at position P, there should be exactly N indicator dots with the Pth dot highlighted.
**Validates: Requirements 2.3**

### Property 6: Clicking indicator navigates to corresponding banner

*For any* indicator dot at index I, clicking it should immediately set the carousel position to index I.
**Validates: Requirements 2.4**

### Property 7: Service cards have required fields

*For any* divination service card, it should have a non-empty title, description, and icon property.
**Validates: Requirements 3.2**

### Property 8: Direction objects have complete data

*For any* feng shui direction, it should have a name, element, icon, and fortune type property.
**Validates: Requirements 4.2**

### Property 9: Selected direction displays details

*For any* direction selection, when a direction is selected, the detail card should be visible and contain the direction's element, fortune type, and recommendations.
**Validates: Requirements 4.3**

### Property 10: Recommendation objects have required fields

*For any* feng shui recommendation, it should have a title, description, and quality level ('优', '良', or '中').
**Validates: Requirements 5.2**

### Property 11: Post objects have complete structure

*For any* community post, it should have author information (name, avatar, level), title, content, like count, and comment count.
**Validates: Requirements 6.2**

### Property 12: Hot posts display trending indicator

*For any* post where isHot is true, the post display should include a trending indicator icon.
**Validates: Requirements 6.3**

### Property 13: Liking a post increments count

*For any* post with like count N, clicking the like button should result in a like count of N+1.
**Validates: Requirements 6.4**

### Property 14: Expert objects have complete profile data

*For any* expert profile, it should have name, avatar, online status, response time, description, and pricing information.
**Validates: Requirements 7.2**

### Property 15: Online experts show status indicator

*For any* expert where isOnline is true, the expert display should include a green status indicator.
**Validates: Requirements 7.3**

### Property 16: Expert search filters by name

*For any* search query string Q and expert list, the filtered results should only include experts whose names contain Q (case-insensitive).
**Validates: Requirements 7.4**

### Property 17: Experience percentage calculation

*For any* user with current experience E and required experience R, the progress percentage should equal (E / R) × 100.
**Validates: Requirements 8.4**

### Property 18: Level up resets experience

*For any* user who reaches the required experience threshold, the level should increment by 1 and experience should reset to 0.
**Validates: Requirements 8.5**

### Property 19: Unlocked achievements display fully

*For any* achievement where unlocked is true, it should be displayed with full color styling and show both name and description.
**Validates: Requirements 9.2**

### Property 20: Locked achievements display with reduced opacity

*For any* achievement where unlocked is false, it should be displayed with reduced opacity styling.
**Validates: Requirements 9.3**

### Property 21: Earning achievement updates display

*For any* achievement that transitions from unlocked=false to unlocked=true, the achievement display should update to show the unlocked state.
**Validates: Requirements 9.5**

### Property 22: Tab selection updates active state

*For any* navigation tab with ID T, clicking it should set the active tab state to T.
**Validates: Requirements 10.2**

### Property 23: Image load failure shows fallback

*For any* image component with a failed image URL, the component should display a fallback image instead of a broken image indicator.
**Validates: Requirements 11.2**

### Property 24: Successful payment increases coin balance

*For any* user with coin balance B purchasing a package with C coins, after successful payment, the new balance should equal B + C.
**Validates: Requirements 12.4**

### Property 25: Premium services display coin cost

*For any* premium divination service, the service card should display the cost property in coins.
**Validates: Requirements 13.1**

### Property 26: Insufficient balance blocks service access

*For any* service with cost C and user with balance B where B < C, attempting to access the service should be blocked and show a recharge prompt.
**Validates: Requirements 13.2, 13.3**

### Property 27: Service payment deducts coins

*For any* user with balance B completing a service with cost C, the new balance should equal B - C.
**Validates: Requirements 13.4**

### Property 28: Completed readings are saved to history

*For any* completed divination reading, the reading should appear in the user's reading history.
**Validates: Requirements 13.5**

### Property 29: Expert profiles display consultation price

*For any* expert profile, it should display the consultation price in coins.
**Validates: Requirements 14.1**

### Property 30: Consultation requires sufficient balance

*For any* consultation with cost C and user with balance B where B < C, the consultation should be blocked and show a confirmation dialog with balance warning.
**Validates: Requirements 14.2**

### Property 31: Consultation payment deducts coins

*For any* user with balance B confirming a consultation with cost C, the new balance should equal B - C.
**Validates: Requirements 14.3**

### Property 32: Consultation end shows cost summary

*For any* completed consultation, the summary should display the total coins spent.
**Validates: Requirements 14.5**

### Property 33: VIP members display badge

*For any* user where isVIP is true, their profile should display a VIP badge.
**Validates: Requirements 15.2**

### Property 34: VIP discount applies to services

*For any* VIP member with discount rate D accessing a service with base cost C, the effective cost should equal C × (1 - D).
**Validates: Requirements 15.3**

### Property 35: VIP status unlocks exclusive features

*For any* user where isVIP is true, exclusive features should be accessible that are not available to non-VIP users.
**Validates: Requirements 15.4**

### Property 36: Transaction history is chronologically ordered

*For any* transaction list, transactions should be ordered by creation date in descending order (newest first).
**Validates: Requirements 16.1**

### Property 37: Transaction objects have complete data

*For any* transaction, it should have date, time, type, amount, payment method (if applicable), and status.
**Validates: Requirements 16.2**

### Property 38: Transaction filtering matches criteria

*For any* filter criteria (date range, type, status) applied to a transaction list, all returned transactions should match the criteria.
**Validates: Requirements 16.5**

### Property 39: Card selection updates reading state

*For any* tarot card at index I, selecting it should mark the card as selected and increment the selected card count.
**Validates: Requirements 17.3**

### Property 40: Reading generation requires complete card selection

*For any* tarot reading requiring N cards, the interpretation should only be generated when exactly N cards have been selected.
**Validates: Requirements 17.4**

### Property 41: Reading interpretation includes all card meanings

*For any* completed tarot reading with N cards, the interpretation should include individual meanings for all N cards plus an overall summary.
**Validates: Requirements 17.5**

### Property 42: Dream text validates minimum length

*For any* dream description text with length L, if L < 20 characters, the submission should be rejected with a validation error.
**Validates: Requirements 18.1**

### Property 43: AI interpretation costs less than expert interpretation

*For any* dream interpretation, if it's AI-generated, the cost should be less than the cost of an expert interpretation.
**Validates: Requirements 18.3**

### Property 44: Dream interpretation highlights symbols

*For any* dream interpretation result, it should include a list of highlighted key symbols extracted from the dream text.
**Validates: Requirements 18.5**

### Property 45: Personalized recommendations include user data

*For any* feng shui recommendation generated for a user, the recommendation should incorporate the user's zodiac sign and birth date (if available).
**Validates: Requirements 19.5**

### Property 46: Reported content is hidden from reporter

*For any* post that a user reports, the post should no longer appear in that user's feed.
**Validates: Requirements 20.3**

### Property 47: Fortune calculation includes zodiac sign

*For any* daily fortune calculation, the zodiac sign should be used as an input parameter to the calculation algorithm.
**Validates: Requirements 22.1**

### Property 48: Birth date affects fortune when available

*For any* user with a birth date provided, the fortune calculation should produce different results than for a user without a birth date (all else being equal).
**Validates: Requirements 22.2**

### Property 49: Fortune calculation includes current date

*For any* daily fortune calculation, the current date should be used as an input parameter to the calculation algorithm.
**Validates: Requirements 22.3**

### Property 50: Fortune results are cached per day

*For any* user requesting fortune twice on the same day, the second request should return the cached result identical to the first request.
**Validates: Requirements 22.5**

### Property 51: Shared content includes referral code

*For any* shared reading or content, the generated share card should include the user's unique referral code.
**Validates: Requirements 23.2**

### Property 52: Referral registration credits both users

*For any* new user registration with a valid referral code, both the referrer and new user should receive bonus coins (e.g., 10 coins each).
**Validates: Requirements 23.3**

### Property 53: Referral statistics are accurate

*For any* user's referral statistics, the displayed successful referral count should equal the number of users who registered with their referral code.
**Validates: Requirements 23.4**

### Property 54: Shared content respects privacy

*For any* generated shareable content, it should not include the user's personal information (email, phone, birth date) unless explicitly consented.
**Validates: Requirements 23.5**

## Error Handling

### Client-Side Error Handling

1. **Network Errors**
   - Implement retry logic with exponential backoff for failed API requests
   - Display user-friendly error messages for network failures
   - Cache data locally to provide offline functionality where possible

2. **Payment Errors**
   - Handle payment provider timeouts gracefully
   - Prevent duplicate payments through transaction idempotency
   - Provide clear error messages for payment failures with actionable next steps

3. **Validation Errors**
   - Validate user input on the client side before submission
   - Display inline validation errors with specific guidance
   - Prevent form submission when validation fails

4. **Image Loading Errors**
   - Use the ImageWithFallback component to handle failed image loads
   - Display placeholder images or icons when images fail to load
   - Log image loading errors for monitoring

5. **State Management Errors**
   - Implement error boundaries to catch React component errors
   - Provide fallback UI when components fail to render
   - Log errors to monitoring service for debugging

### Server-Side Error Handling

1. **Authentication Errors**
   - Return 401 Unauthorized for invalid or expired tokens
   - Redirect to login page when authentication fails
   - Implement token refresh mechanism for expired tokens

2. **Authorization Errors**
   - Return 403 Forbidden when users lack permissions
   - Display appropriate error messages for restricted content
   - Log authorization failures for security monitoring

3. **Resource Not Found**
   - Return 404 Not Found for missing resources
   - Provide helpful suggestions or navigation options
   - Log 404 errors to identify broken links

4. **Rate Limiting**
   - Implement rate limiting to prevent abuse
   - Return 429 Too Many Requests when limits are exceeded
   - Display countdown timer for when users can retry

5. **Server Errors**
   - Return 500 Internal Server Error for unexpected failures
   - Log detailed error information for debugging
   - Display generic error message to users without exposing internals

## Testing Strategy

### Unit Testing

Unit tests will verify specific functionality of individual components and services:

- **Component Tests**: Test component rendering, prop handling, and user interactions
- **Service Tests**: Test business logic, calculations, and data transformations
- **Utility Tests**: Test helper functions, formatters, and validators
- **Hook Tests**: Test custom React hooks in isolation

Example unit tests:
- Test that fortune stat calculation produces values in the correct range
- Test that zodiac sign selection updates component state
- Test that coin balance updates correctly after transactions
- Test that experience percentage is calculated correctly

### Property-Based Testing

Property-based tests will verify universal properties across many randomly generated inputs using **fast-check** (JavaScript/TypeScript property-based testing library).

**Configuration**: Each property-based test will run a minimum of 100 iterations to ensure thorough coverage of the input space.

**Tagging Convention**: Each property-based test must include a comment tag in this exact format:
```typescript
// **Feature: tarot-fengshui-app, Property {number}: {property_text}**
```

**Property Test Coverage**:

- **Fortune Calculations**: Generate random fortune stats and verify they're always in valid ranges and averages are correct
- **Transaction Operations**: Generate random balances and transaction amounts to verify coin arithmetic is always correct
- **Filtering Operations**: Generate random search queries and data sets to verify filtering always returns matching results
- **State Transitions**: Generate random user actions and verify state updates are always consistent
- **Validation Rules**: Generate random inputs to verify validation rules are always enforced correctly

Example property tests:
- For any four fortune stats, the overall score equals their average
- For any coin balance and purchase amount, the new balance equals old balance plus purchase
- For any search query, filtered experts always have names containing the query
- For any experience values, the percentage is always between 0 and 100

### Integration Testing

Integration tests will verify interactions between components and services:

- **Page Flow Tests**: Test navigation between pages and state persistence
- **API Integration Tests**: Test communication with backend services
- **Payment Flow Tests**: Test end-to-end payment processing (using test payment providers)
- **Notification Tests**: Test push notification delivery and handling

### End-to-End Testing

E2E tests will verify complete user workflows:

- **User Registration and Onboarding**: Complete signup flow with referral code
- **Divination Reading Flow**: Select service, make payment, receive reading
- **Expert Consultation Flow**: Search expert, initiate consultation, complete payment
- **VIP Subscription Flow**: Purchase VIP membership, verify exclusive features
- **Community Interaction Flow**: Create post, like/comment, report content

### Performance Testing

- **Load Testing**: Verify app performance with many concurrent users
- **Image Loading**: Test image loading performance and fallback behavior
- **Animation Performance**: Verify smooth animations at 60fps
- **API Response Times**: Ensure API calls complete within acceptable timeframes

### Accessibility Testing

- **Screen Reader Compatibility**: Verify all content is accessible via screen readers
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Color Contrast**: Verify text meets WCAG contrast requirements
- **Touch Target Sizes**: Ensure buttons and interactive elements meet minimum size requirements

