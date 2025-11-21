# Requirements Document

## Introduction

The Tarot and Feng Shui App is a mystical mobile application that provides users with divination services, feng shui guidance, community interaction, and personal profile management. The application combines traditional Chinese metaphysics with modern UI/UX design, featuring a dark, mystical aesthetic with purple and red gradients. The app serves users interested in tarot reading, feng shui consultation, astrology, and connecting with spiritual experts.

## Glossary

- **System**: The Tarot and Feng Shui mobile application
- **User**: An individual using the application for divination, feng shui guidance, or community interaction
- **Divination**: The practice of seeking knowledge of the future or unknown through supernatural means, including tarot cards, dice, and dream interpretation
- **Feng Shui**: The ancient Chinese practice of arranging physical space to achieve harmony with spiritual forces
- **Zodiac Sign**: One of twelve astrological signs (白羊座 through 双鱼座) representing different personality types and fortune patterns
- **Expert**: A professional consultant available for paid divination or feng shui services
- **Post**: User-generated content shared in the community section
- **Fortune Stats**: Numerical indicators (0-100) representing health, love, career, and wealth prospects
- **Eight Directions**: The eight cardinal and intercardinal compass directions used in feng shui analysis (北, 东北, 东, 东南, 南, 西南, 西, 西北)
- **Five Elements**: The fundamental substances in Chinese philosophy (水, 木, 火, 土, 金) associated with feng shui directions
- **Achievement**: A milestone or badge earned by users for completing specific activities
- **Experience Points**: Numerical values that accumulate to increase user level
- **Coins**: Virtual currency used within the app to purchase services and consultations
- **VIP Member**: A user with an active paid subscription that provides exclusive benefits and discounts
- **Recharge**: The process of purchasing virtual currency (coins) using real money
- **Consultation Session**: A paid interaction between a user and an expert for personalized guidance
- **Reading**: The result of a divination service, including card interpretations and predictions
- **Referral Code**: A unique identifier used to track new user registrations and reward the referrer
- **Transaction**: Any exchange of coins, including purchases, service payments, and refunds
- **Moderator**: An administrator responsible for reviewing reported content and maintaining community standards

## Requirements

### Requirement 1: Zodiac Sign Selection and Fortune Display

**User Story:** As a user, I want to select my zodiac sign and view personalized daily fortune information, so that I can understand my prospects for the day.

#### Acceptance Criteria

1. WHEN a user opens the divination page, THE System SHALL display the currently selected zodiac sign in the header
2. WHEN a user clicks the zodiac sign selector, THE System SHALL display a dropdown menu containing all twelve zodiac signs
3. WHEN a user selects a zodiac sign from the dropdown, THE System SHALL update the displayed zodiac sign and close the dropdown menu
4. WHEN displaying daily fortune, THE System SHALL show four fortune stats (health, love, career, wealth) with values between 0 and 100
5. WHEN displaying daily fortune, THE System SHALL calculate and display an overall fortune score as the average of the four fortune stats

### Requirement 2: Banner Carousel Display

**User Story:** As a user, I want to see rotating promotional banners on the divination page, so that I can discover featured content and services.

#### Acceptance Criteria

1. WHEN the divination page loads, THE System SHALL display a banner carousel with multiple images
2. WHEN the banner carousel is active, THE System SHALL automatically rotate to the next banner every 4 seconds
3. WHEN displaying the banner carousel, THE System SHALL show indicator dots representing the total number of banners and current position
4. WHEN a user clicks an indicator dot, THE System SHALL navigate to the corresponding banner immediately
5. WHEN transitioning between banners, THE System SHALL apply a smooth fade transition lasting 1 second

### Requirement 3: Divination Service Cards

**User Story:** As a user, I want to browse and select different divination services, so that I can choose the type of reading that suits my needs.

#### Acceptance Criteria

1. WHEN the divination page displays service cards, THE System SHALL show at least six different divination types (card reading, star chart, dice, dream interpretation, palm reading)
2. WHEN displaying each service card, THE System SHALL include a title, description, icon, and optional background image
3. WHEN a user hovers over a service card, THE System SHALL apply a visual hover effect to indicate interactivity
4. WHEN service cards have background images, THE System SHALL apply a gradient overlay to ensure text readability
5. WHEN displaying the service card grid, THE System SHALL arrange cards in a two-column layout with varying heights

### Requirement 4: Feng Shui Direction Analysis

**User Story:** As a user, I want to explore the eight feng shui directions and their associated elements, so that I can understand how to optimize my living space.

#### Acceptance Criteria

1. WHEN the feng shui page loads, THE System SHALL display all eight directions (北, 东北, 东, 东南, 南, 西南, 西, 西北) in a grid layout
2. WHEN displaying each direction, THE System SHALL show the direction name, associated element (水, 木, 火, 土, 金), and corresponding icon
3. WHEN a user selects a direction, THE System SHALL display detailed information including the element, fortune type, and placement recommendations
4. WHEN a direction is selected, THE System SHALL highlight the selected direction with a distinct visual style
5. WHEN displaying direction details, THE System SHALL show the information in an animated card that slides in from the bottom

### Requirement 5: Feng Shui Home Layout Recommendations

**User Story:** As a user, I want to receive feng shui recommendations for different areas of my home, so that I can improve the energy flow in my living space.

#### Acceptance Criteria

1. WHEN the feng shui page displays recommendations, THE System SHALL show at least four home layout tips (living room, bedroom, wealth position, kitchen)
2. WHEN displaying each recommendation, THE System SHALL include a title, description, and quality level (优, 良, 中)
3. WHEN displaying quality levels, THE System SHALL use color-coded badges (green for 优, blue for 良, yellow for 中)
4. WHEN a user views recommendations, THE System SHALL present them in a vertically scrollable list
5. WHEN displaying recommendations, THE System SHALL apply consistent styling with the mystical theme

### Requirement 6: Community Posts and Interactions

**User Story:** As a user, I want to view and interact with community posts from other users and experts, so that I can learn from shared experiences and knowledge.

#### Acceptance Criteria

1. WHEN the community page loads with the community tab active, THE System SHALL display a feed of posts from users and experts
2. WHEN displaying each post, THE System SHALL show the author name, avatar, level badge, title, content preview, optional image, like count, and comment count
3. WHEN a post is marked as hot, THE System SHALL display a trending indicator icon
4. WHEN a user clicks the like button on a post, THE System SHALL increment the like count and update the button state
5. WHEN a user clicks the comment button on a post, THE System SHALL navigate to the post detail view with comments

### Requirement 7: Expert Consultation Listings

**User Story:** As a user, I want to browse available experts and their consultation services, so that I can select an expert for personalized guidance.

#### Acceptance Criteria

1. WHEN the community page loads with the experts tab active, THE System SHALL display a list of available experts
2. WHEN displaying each expert, THE System SHALL show avatar, name, gender indicator, online status, response time, last active time, description, and pricing
3. WHEN an expert is online, THE System SHALL display a green status indicator and animated pulse effect
4. WHEN a user enters text in the search field, THE System SHALL filter the expert list by name matching the search query
5. WHEN a user clicks the consult button for an expert, THE System SHALL initiate a consultation session with that expert

### Requirement 8: User Profile and Statistics

**User Story:** As a user, I want to view my profile information and activity statistics, so that I can track my engagement with the app.

#### Acceptance Criteria

1. WHEN the profile page loads, THE System SHALL display the user avatar, username, level, and experience progress
2. WHEN displaying experience progress, THE System SHALL show current experience points, required points for next level, and a visual progress bar
3. WHEN displaying user statistics, THE System SHALL show divination count, learning days, and earned achievements count
4. WHEN the experience bar is displayed, THE System SHALL calculate the percentage as (current experience / required experience) × 100
5. WHEN a user levels up, THE System SHALL update the level badge and reset the experience progress bar

### Requirement 9: Achievement System

**User Story:** As a user, I want to view my earned achievements and locked achievements, so that I can understand what milestones I have reached and what goals remain.

#### Acceptance Criteria

1. WHEN the profile page displays achievements, THE System SHALL show both unlocked and locked achievements
2. WHEN displaying an unlocked achievement, THE System SHALL use full color, a glowing effect, and display the achievement name and description
3. WHEN displaying a locked achievement, THE System SHALL use reduced opacity, grayscale styling, and show the unlock requirements
4. WHEN achievements are displayed, THE System SHALL arrange them in a two-column grid layout
5. WHEN a user earns a new achievement, THE System SHALL display a celebration animation and update the achievement display

### Requirement 10: Navigation and Tab Management

**User Story:** As a user, I want to navigate between different sections of the app using a bottom navigation bar, so that I can easily access all features.

#### Acceptance Criteria

1. WHEN the app is running, THE System SHALL display a fixed bottom navigation bar with four tabs (占卜, 风水, 社区, 我的)
2. WHEN a user clicks a navigation tab, THE System SHALL switch to the corresponding page and update the active tab indicator
3. WHEN a tab is active, THE System SHALL apply a gradient background, scale effect, and glow shadow to the tab icon
4. WHEN a tab is inactive, THE System SHALL display the icon with reduced opacity and no special effects
5. WHEN switching between tabs, THE System SHALL maintain the scroll position and state of the previous tab

### Requirement 11: Responsive Image Loading

**User Story:** As a user, I want images to load gracefully with fallback handling, so that I have a smooth experience even with slow network connections.

#### Acceptance Criteria

1. WHEN the System loads an image, THE System SHALL display a placeholder or loading state until the image is fully loaded
2. WHEN an image fails to load, THE System SHALL display a fallback image or placeholder instead of a broken image icon
3. WHEN images are displayed in carousels or grids, THE System SHALL apply consistent aspect ratios and object-fit properties
4. WHEN multiple images load simultaneously, THE System SHALL prioritize visible images over off-screen images
5. WHEN an image loads successfully, THE System SHALL apply a smooth fade-in transition

### Requirement 12: Payment and Virtual Currency System

**User Story:** As a user, I want to purchase virtual currency and use it to pay for premium services, so that I can access advanced divination and consultation features.

#### Acceptance Criteria

1. WHEN a user views their profile, THE System SHALL display the current balance of virtual currency (coins)
2. WHEN a user clicks the recharge button, THE System SHALL display a payment modal with multiple currency package options (e.g., 60 coins for ¥6, 300 coins for ¥30, 1000 coins for ¥98)
3. WHEN a user selects a currency package, THE System SHALL integrate with payment providers (WeChat Pay, Alipay) to process the transaction
4. WHEN a payment is successful, THE System SHALL immediately update the user's coin balance and display a success notification
5. WHEN a payment fails, THE System SHALL display an error message and allow the user to retry or select a different payment method

### Requirement 13: Premium Divination Services

**User Story:** As a user, I want to access premium divination services by spending coins, so that I can receive detailed and personalized readings.

#### Acceptance Criteria

1. WHEN displaying divination service cards, THE System SHALL show the coin cost for premium services (e.g., 9 coins for basic reading, 29 coins for detailed reading)
2. WHEN a user selects a premium divination service, THE System SHALL verify the user has sufficient coin balance before proceeding
3. WHEN a user has insufficient coins, THE System SHALL display a prompt to recharge and provide a direct link to the payment modal
4. WHEN a user completes a paid divination, THE System SHALL deduct the coin cost from their balance and unlock the reading results
5. WHEN a paid divination is completed, THE System SHALL save the reading to the user's history for future reference

### Requirement 14: Expert Consultation Payment Flow

**User Story:** As a user, I want to pay for expert consultations using coins, so that I can receive personalized guidance from professional consultants.

#### Acceptance Criteria

1. WHEN displaying expert profiles, THE System SHALL show the consultation price in coins per message or per session
2. WHEN a user initiates a consultation, THE System SHALL verify sufficient coin balance and display a confirmation dialog with the cost
3. WHEN a user confirms the consultation payment, THE System SHALL deduct coins from the user's balance and establish a chat session with the expert
4. WHEN a consultation session is active, THE System SHALL track the number of messages or time elapsed to calculate additional charges if applicable
5. WHEN a consultation ends, THE System SHALL display a summary of coins spent and prompt the user to rate the expert

### Requirement 15: Subscription and VIP Membership

**User Story:** As a user, I want to purchase a VIP membership subscription, so that I can access exclusive features and receive discounts on services.

#### Acceptance Criteria

1. WHEN a user views subscription options, THE System SHALL display multiple tiers (e.g., Monthly VIP for ¥18, Quarterly VIP for ¥48, Annual VIP for ¥168)
2. WHEN a user is a VIP member, THE System SHALL display a VIP badge on their profile and in community posts
3. WHEN a VIP member accesses divination services, THE System SHALL apply a discount (e.g., 20% off all coin-based services)
4. WHEN a VIP member views content, THE System SHALL unlock exclusive features (e.g., unlimited daily fortune checks, priority expert responses, ad-free experience)
5. WHEN a VIP subscription expires, THE System SHALL send a renewal reminder notification 3 days before expiration

### Requirement 16: Transaction History and Receipts

**User Story:** As a user, I want to view my transaction history and download receipts, so that I can track my spending and manage my finances.

#### Acceptance Criteria

1. WHEN a user accesses transaction history, THE System SHALL display all coin purchases, service payments, and refunds in chronological order
2. WHEN displaying each transaction, THE System SHALL show the date, time, transaction type, amount, payment method, and status
3. WHEN a user selects a transaction, THE System SHALL display detailed information including order number, service description, and expert name if applicable
4. WHEN a user requests a receipt, THE System SHALL generate a downloadable PDF or image with transaction details
5. WHEN displaying transaction history, THE System SHALL allow filtering by date range, transaction type, and status

### Requirement 17: Detailed Tarot Card Reading Flow

**User Story:** As a user, I want to perform a detailed tarot card reading with card selection and interpretation, so that I can gain insights into my questions.

#### Acceptance Criteria

1. WHEN a user starts a tarot reading, THE System SHALL prompt the user to enter a question or select a reading category (love, career, health, general)
2. WHEN the user proceeds, THE System SHALL display a virtual deck of face-down tarot cards with shuffle animation
3. WHEN a user selects cards, THE System SHALL flip the selected cards with animation and display the card images and names
4. WHEN all required cards are selected (e.g., 1 card for single reading, 3 cards for past-present-future), THE System SHALL generate an interpretation based on the cards and question
5. WHEN displaying the interpretation, THE System SHALL show each card's meaning, position significance, and an overall reading summary

### Requirement 18: Dream Interpretation Service

**User Story:** As a user, I want to submit dream descriptions and receive interpretations, so that I can understand the symbolic meaning of my dreams.

#### Acceptance Criteria

1. WHEN a user accesses dream interpretation, THE System SHALL display a text input field for dream description with a minimum length of 20 characters
2. WHEN a user submits a dream, THE System SHALL analyze keywords and symbols to generate an interpretation or route to an expert
3. WHEN the interpretation is AI-generated, THE System SHALL display the result immediately at a lower coin cost (e.g., 5 coins)
4. WHEN the interpretation requires expert review, THE System SHALL queue the request and notify the user when an expert responds (e.g., 15 coins)
5. WHEN displaying dream interpretations, THE System SHALL highlight key symbols and provide cultural context from Chinese dream interpretation traditions

### Requirement 19: Feng Shui Compass and Room Scanner

**User Story:** As a user, I want to use my device's compass and camera to analyze room feng shui, so that I can receive location-specific recommendations.

#### Acceptance Criteria

1. WHEN a user activates the feng shui compass feature, THE System SHALL request permission to access the device's compass sensor
2. WHEN compass access is granted, THE System SHALL display a real-time compass overlay showing the eight directions relative to the user's orientation
3. WHEN a user activates room scanning, THE System SHALL request camera permission and display an AR overlay for room analysis
4. WHEN the user captures a room photo, THE System SHALL analyze the layout and provide feng shui recommendations based on furniture placement and direction
5. WHEN generating recommendations, THE System SHALL consider the user's birth date and zodiac sign for personalized feng shui advice

### Requirement 20: Community Content Moderation and Reporting

**User Story:** As a user, I want to report inappropriate content and have it reviewed by moderators, so that the community remains safe and respectful.

#### Acceptance Criteria

1. WHEN a user views a post or comment, THE System SHALL display a report button accessible via a menu
2. WHEN a user clicks report, THE System SHALL display report categories (spam, harassment, inappropriate content, misinformation)
3. WHEN a report is submitted, THE System SHALL queue the content for moderator review and hide it from the reporting user's feed
4. WHEN a moderator reviews reported content, THE System SHALL provide options to remove, warn the author, or dismiss the report
5. WHEN content is removed, THE System SHALL notify the author with the reason and any applicable penalties (e.g., temporary posting restrictions)

### Requirement 21: Push Notifications and Reminders

**User Story:** As a user, I want to receive notifications for daily fortune updates, expert responses, and community interactions, so that I stay engaged with the app.

#### Acceptance Criteria

1. WHEN a user enables notifications, THE System SHALL request notification permission from the device operating system
2. WHEN daily fortune is available, THE System SHALL send a push notification at the user's preferred time (default 8:00 AM)
3. WHEN an expert responds to a consultation, THE System SHALL send an immediate push notification with the expert's name
4. WHEN a user's post receives likes or comments, THE System SHALL send a notification summarizing the interactions
5. WHEN a user's VIP subscription is about to expire, THE System SHALL send reminder notifications at 7 days, 3 days, and 1 day before expiration

### Requirement 22: Personalized Fortune Algorithm

**User Story:** As a user, I want my daily fortune to be calculated based on my zodiac sign, birth date, and current astrological conditions, so that I receive accurate and relevant predictions.

#### Acceptance Criteria

1. WHEN calculating daily fortune, THE System SHALL use the user's zodiac sign as the primary input factor
2. WHEN the user has provided their birth date, THE System SHALL incorporate Chinese zodiac year, month, and day elements into the calculation
3. WHEN generating fortune stats, THE System SHALL consider current lunar calendar date and planetary positions
4. WHEN fortune values are calculated, THE System SHALL ensure each stat (health, love, career, wealth) is an integer between 0 and 100
5. WHEN fortune data is displayed, THE System SHALL cache the results for the current day and regenerate at midnight local time

### Requirement 23: Social Sharing and Referral System

**User Story:** As a user, I want to share my readings and invite friends to the app, so that I can earn rewards and share interesting content.

#### Acceptance Criteria

1. WHEN a user completes a divination reading, THE System SHALL display a share button with options for WeChat, Weibo, and image export
2. WHEN a user shares content, THE System SHALL generate a visually appealing card with the reading summary and a referral code
3. WHEN a new user registers using a referral code, THE System SHALL credit both the referrer and new user with bonus coins (e.g., 10 coins each)
4. WHEN a user views their referral statistics, THE System SHALL display the number of successful referrals and total coins earned
5. WHEN generating shareable content, THE System SHALL ensure user privacy by not including personal information without explicit consent

### Requirement 24: Theme and Visual Consistency

**User Story:** As a user, I want the app to maintain a consistent mystical aesthetic throughout all pages, so that I have an immersive experience.

#### Acceptance Criteria

1. WHEN any page is displayed, THE System SHALL use a dark background with purple and red gradient accents
2. WHEN displaying cards and containers, THE System SHALL apply semi-transparent backgrounds with backdrop blur effects
3. WHEN displaying borders, THE System SHALL use purple tones with varying opacity (typically 30-50%)
4. WHEN applying animations, THE System SHALL use smooth transitions with durations between 0.3 and 1 second
5. WHEN displaying text, THE System SHALL use purple-tinted colors for primary text and reduced opacity for secondary text
