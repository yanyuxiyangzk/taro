# Implementation Plan

- [x] 1. Set up backend infrastructure and API client



  - Create API client service with axios for HTTP requests
  - Implement request/response interceptors for authentication and error handling
  - Set up environment configuration for API endpoints
  - Create TypeScript interfaces for API request/response types
  - _Requirements: All requirements depend on backend communication_

- [ ]* 1.1 Write property test for API error handling
  - **Feature: tarot-fengshui-app, Property 23: Image load failure shows fallback**
  - **Validates: Requirements 11.2**

- [x] 2. Implement user authentication and profile management



  - Create authentication service with login, register, and logout methods
  - Implement JWT token storage and refresh mechanism
  - Add authentication context provider for app-wide auth state
  - Create protected route wrapper component
  - Build user profile service for fetching and updating user data
  - _Requirements: 8.1, 8.2, 8.3, 12.1_

- [x] 2.1 Integrate user profile data with ProfilePage component


  - Connect ProfilePage to user service to fetch real profile data
  - Update coin balance display to show real-time balance
  - Implement experience progress calculation and display
  - _Requirements: 8.1, 8.2, 8.4, 12.1_

- [ ]* 2.2 Write property test for experience percentage calculation
  - **Feature: tarot-fengshui-app, Property 17: Experience percentage calculation**
  - **Validates: Requirements 8.4**

- [ ]* 2.3 Write property test for level up mechanics
  - **Feature: tarot-fengshui-app, Property 18: Level up resets experience**
  - **Validates: Requirements 8.5**

- [ ] 3. Implement virtual currency and payment system
  - Create payment service with coin package retrieval
  - Build payment modal component with package selection UI
  - Integrate WeChat Pay and Alipay payment providers (mock for development)
  - Implement payment verification and coin balance update
  - Add transaction recording for all coin operations
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [ ] 3.1 Add recharge button and payment modal to ProfilePage
  - Create PaymentModal component with coin package cards
  - Implement payment method selection (WeChat/Alipay)
  - Add payment confirmation and success/error handling
  - Update coin balance display after successful payment
  - _Requirements: 12.2, 12.3, 12.4, 12.5_

- [ ]* 3.2 Write property test for coin balance updates
  - **Feature: tarot-fengshui-app, Property 24: Successful payment increases coin balance**
  - **Validates: Requirements 12.4**

- [ ]* 3.3 Write property test for coin deduction
  - **Feature: tarot-fengshui-app, Property 27: Service payment deducts coins**
  - **Validates: Requirements 13.4**

- [ ] 4. Build transaction history and receipt system
  - Create transaction service for fetching transaction history
  - Build TransactionHistory component with list and filtering
  - Implement transaction detail modal
  - Add receipt generation functionality (PDF/image export)
  - Create transaction filtering by date, type, and status
  - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5_

- [ ] 4.1 Add transaction history page to navigation
  - Create new TransactionHistoryPage component
  - Add navigation link from ProfilePage menu
  - Implement chronological sorting of transactions
  - _Requirements: 16.1, 16.2_

- [ ]* 4.2 Write property test for transaction ordering
  - **Feature: tarot-fengshui-app, Property 36: Transaction history is chronologically ordered**
  - **Validates: Requirements 16.1**

- [ ]* 4.3 Write property test for transaction filtering
  - **Feature: tarot-fengshui-app, Property 38: Transaction filtering matches criteria**
  - **Validates: Requirements 16.5**

- [ ] 5. Implement fortune calculation service
  - Create fortune service with daily fortune calculation algorithm
  - Implement zodiac-based fortune generation
  - Add lunar calendar integration for date calculations
  - Implement fortune caching mechanism (cache per user per day)
  - Build fortune stats calculation (health, love, career, wealth)
  - _Requirements: 1.4, 1.5, 22.1, 22.2, 22.3, 22.4, 22.5_

- [ ] 5.1 Connect DivinationPage to fortune service
  - Replace mock fortune data with API calls
  - Implement fortune refresh on zodiac sign change
  - Add loading states during fortune calculation
  - Display cached fortune when available
  - _Requirements: 1.4, 1.5, 22.5_

- [ ]* 5.2 Write property test for fortune stat bounds
  - **Feature: tarot-fengshui-app, Property 1: Fortune stat values are bounded**
  - **Validates: Requirements 1.4, 22.4**

- [ ]* 5.3 Write property test for overall fortune calculation
  - **Feature: tarot-fengshui-app, Property 2: Overall fortune score is the average of stats**
  - **Validates: Requirements 1.5**

- [ ]* 5.4 Write property test for fortune caching
  - **Feature: tarot-fengshui-app, Property 50: Fortune results are cached per day**
  - **Validates: Requirements 22.5**

- [ ] 6. Build detailed tarot card reading flow
  - Create TarotReading component with card deck display
  - Implement card selection interaction with flip animations
  - Build card shuffle animation
  - Create reading interpretation display component
  - Implement reading history storage
  - Add coin cost verification before starting reading
  - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 13.1, 13.2, 13.4_

- [ ] 6.1 Create tarot card data and images
  - Define tarot card data structure with 78 cards
  - Add card images or use placeholder images
  - Implement card meaning database
  - Create card interpretation logic based on position and question
  - _Requirements: 17.5_

- [ ] 6.2 Integrate tarot reading with divination service cards
  - Update "卡牌问答" card to navigate to tarot reading flow
  - Pass question/category from service card to reading component
  - Implement payment flow before starting reading
  - Save completed reading to history
  - _Requirements: 13.1, 13.2, 13.4, 13.5_

- [ ]* 6.3 Write property test for card selection
  - **Feature: tarot-fengshui-app, Property 39: Card selection updates reading state**
  - **Validates: Requirements 17.3**

- [ ]* 6.4 Write property test for reading generation
  - **Feature: tarot-fengshui-app, Property 40: Reading generation requires complete card selection**
  - **Validates: Requirements 17.4**

- [ ]* 6.5 Write property test for interpretation completeness
  - **Feature: tarot-fengshui-app, Property 41: Reading interpretation includes all card meanings**
  - **Validates: Requirements 17.5**

- [ ] 7. Implement dream interpretation service
  - Create DreamInterpretation component with text input
  - Implement dream text validation (minimum 20 characters)
  - Build AI interpretation service (mock or simple keyword matching)
  - Create expert routing logic for complex dreams
  - Implement symbol highlighting in interpretation results
  - Add cost differentiation (AI vs expert interpretation)
  - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_

- [ ] 7.1 Integrate dream interpretation with divination service cards
  - Update "梦境详解" card to navigate to dream interpretation
  - Implement payment flow with cost selection (AI/expert)
  - Display interpretation results with highlighted symbols
  - Save interpretation to reading history
  - _Requirements: 18.1, 18.3, 18.5_

- [ ]* 7.2 Write property test for dream text validation
  - **Feature: tarot-fengshui-app, Property 42: Dream text validates minimum length**
  - **Validates: Requirements 18.1**

- [ ]* 7.3 Write property test for interpretation cost difference
  - **Feature: tarot-fengshui-app, Property 43: AI interpretation costs less than expert interpretation**
  - **Validates: Requirements 18.3**

- [ ] 8. Build expert consultation system
  - Create ConsultationChat component with message interface
  - Implement real-time messaging (WebSocket or polling)
  - Build consultation payment flow with balance verification
  - Add consultation session tracking (time/message count)
  - Implement consultation end summary with cost display
  - Create expert rating system
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

- [ ] 8.1 Connect expert listings to consultation flow
  - Update "咨询TA" button to initiate consultation
  - Implement balance check and confirmation dialog
  - Deduct coins on consultation start
  - Navigate to consultation chat interface
  - _Requirements: 14.2, 14.3_

- [ ]* 8.2 Write property test for consultation balance verification
  - **Feature: tarot-fengshui-app, Property 30: Consultation requires sufficient balance**
  - **Validates: Requirements 14.2**

- [ ]* 8.3 Write property test for consultation payment
  - **Feature: tarot-fengshui-app, Property 31: Consultation payment deducts coins**
  - **Validates: Requirements 14.3**

- [ ] 9. Implement VIP membership system
  - Create VIP subscription service with tier management
  - Build VIPSubscription component with tier selection
  - Implement VIP badge display on profile and posts
  - Add VIP discount calculation for services
  - Create exclusive feature gating logic
  - Implement subscription expiry tracking and reminders
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

- [ ] 9.1 Add VIP subscription option to ProfilePage
  - Create VIP subscription modal with tier cards
  - Display VIP badge when user is VIP member
  - Show VIP expiry date and renewal option
  - _Requirements: 15.1, 15.2_

- [ ]* 9.2 Write property test for VIP badge display
  - **Feature: tarot-fengshui-app, Property 33: VIP members display badge**
  - **Validates: Requirements 15.2**

- [ ]* 9.3 Write property test for VIP discount calculation
  - **Feature: tarot-fengshui-app, Property 34: VIP discount applies to services**
  - **Validates: Requirements 15.3**

- [ ] 10. Build community post management
  - Create post service for fetching and creating posts
  - Implement post creation modal with image upload
  - Add like/unlike functionality with optimistic updates
  - Build comment system with nested replies
  - Implement post detail view
  - Add hot post detection algorithm
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 10.1 Connect CommunityPage to post service
  - Replace mock post data with API calls
  - Implement infinite scroll for post feed
  - Add post creation button and modal
  - Connect like button to post service
  - _Requirements: 6.1, 6.2, 6.4_

- [ ]* 10.2 Write property test for like increment
  - **Feature: tarot-fengshui-app, Property 13: Liking a post increments count**
  - **Validates: Requirements 6.4**

- [ ]* 10.3 Write property test for hot post indicator
  - **Feature: tarot-fengshui-app, Property 12: Hot posts display trending indicator**
  - **Validates: Requirements 6.3**

- [ ] 11. Implement content moderation and reporting
  - Create report service for submitting content reports
  - Build report modal with category selection
  - Implement reported content hiding for reporter
  - Create moderator dashboard (admin only)
  - Add content removal and author notification
  - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5_

- [ ] 11.1 Add report functionality to posts
  - Add report button to post menu
  - Create ReportModal component with categories
  - Implement report submission
  - Hide reported posts from user's feed
  - _Requirements: 20.1, 20.2, 20.3_

- [ ]* 11.2 Write property test for reported content hiding
  - **Feature: tarot-fengshui-app, Property 46: Reported content is hidden from reporter**
  - **Validates: Requirements 20.3**

- [ ] 12. Build expert search and filtering
  - Implement expert search by name
  - Add expert filtering by specialization, price, rating
  - Create expert sorting options (response time, rating, price)
  - Implement online status real-time updates
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 12.1 Enhance expert listings with search and filters
  - Connect search input to expert filtering
  - Add filter chips for specialization and availability
  - Implement real-time online status updates
  - _Requirements: 7.4_

- [ ]* 12.2 Write property test for expert search filtering
  - **Feature: tarot-fengshui-app, Property 16: Expert search filters by name**
  - **Validates: Requirements 7.4**

- [ ] 13. Implement achievement system
  - Create achievement service with unlock logic
  - Build achievement unlock detection (event-based)
  - Implement achievement notification/celebration
  - Add achievement progress tracking
  - Create achievement detail modal
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 13.1 Connect ProfilePage to achievement service
  - Replace mock achievement data with API calls
  - Implement achievement unlock animation
  - Add achievement detail view on click
  - _Requirements: 9.2, 9.3, 9.5_

- [ ]* 13.2 Write property test for unlocked achievement display
  - **Feature: tarot-fengshui-app, Property 19: Unlocked achievements display fully**
  - **Validates: Requirements 9.2**

- [ ]* 13.3 Write property test for locked achievement display
  - **Feature: tarot-fengshui-app, Property 20: Locked achievements display with reduced opacity**
  - **Validates: Requirements 9.3**

- [ ] 14. Build social sharing and referral system
  - Create share service with platform integration (WeChat, Weibo)
  - Implement shareable card generation with reading summary
  - Build referral code generation and tracking
  - Add referral bonus coin distribution
  - Create referral statistics page
  - Implement privacy controls for shared content
  - _Requirements: 23.1, 23.2, 23.3, 23.4, 23.5_

- [ ] 14.1 Add share functionality to reading results
  - Add share button to tarot reading and dream interpretation results
  - Create ShareCard component with visual design
  - Implement referral code inclusion in shared content
  - Add privacy consent checkbox
  - _Requirements: 23.1, 23.2, 23.5_

- [ ]* 14.2 Write property test for referral code inclusion
  - **Feature: tarot-fengshui-app, Property 51: Shared content includes referral code**
  - **Validates: Requirements 23.2**

- [ ]* 14.3 Write property test for referral bonus distribution
  - **Feature: tarot-fengshui-app, Property 52: Referral registration credits both users**
  - **Validates: Requirements 23.3**

- [ ]* 14.4 Write property test for privacy in shared content
  - **Feature: tarot-fengshui-app, Property 54: Shared content respects privacy**
  - **Validates: Requirements 23.5**

- [ ] 15. Implement push notification system
  - Create notification service with permission handling
  - Implement notification scheduling for daily fortune
  - Add real-time notifications for expert responses
  - Build notification for post interactions (likes, comments)
  - Implement VIP expiry reminder notifications
  - Create notification preferences management
  - _Requirements: 21.1, 21.2, 21.3, 21.4, 21.5_

- [ ] 15.1 Add notification settings to ProfilePage
  - Create notification preferences UI
  - Implement notification permission request
  - Add daily fortune time picker
  - Create notification toggle switches
  - _Requirements: 21.1, 21.2_

- [ ] 16. Build feng shui compass and room scanner
  - Create FengShuiCompass component with device orientation
  - Implement compass permission handling
  - Add real-time compass direction display
  - Build RoomScanner component with camera integration
  - Implement basic room layout analysis
  - Add personalized recommendations based on user data
  - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5_

- [ ] 16.1 Add compass and scanner features to FengShuiPage
  - Add "使用罗盘" button to activate compass
  - Add "扫描房间" button to activate camera
  - Display compass overlay with real-time direction
  - Show room analysis results with recommendations
  - _Requirements: 19.1, 19.2, 19.3, 19.4_

- [ ]* 16.2 Write property test for personalized recommendations
  - **Feature: tarot-fengshui-app, Property 45: Personalized recommendations include user data**
  - **Validates: Requirements 19.5**

- [ ] 17. Implement data persistence and caching
  - Set up local storage for offline data caching
  - Implement cache invalidation strategies
  - Add optimistic UI updates for better UX
  - Create data synchronization on reconnection
  - Implement background data refresh
  - _Requirements: All requirements benefit from caching_

- [ ] 18. Add loading states and error boundaries
  - Create LoadingSpinner component
  - Implement skeleton screens for page loading
  - Add error boundary components for graceful error handling
  - Create error fallback UI components
  - Implement retry mechanisms for failed operations
  - _Requirements: All requirements need error handling_

- [ ] 19. Implement responsive design improvements
  - Test and fix layout issues on different screen sizes
  - Optimize touch target sizes for mobile
  - Improve scrolling performance
  - Add pull-to-refresh functionality
  - Optimize image loading for mobile networks
  - _Requirements: All UI requirements_

- [ ] 20. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
