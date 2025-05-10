# Crypto Tracker App

A mobile application for tracking cryptocurrency prices and information, built with React Native and Expo.

## Overview

This application allows users to:
- View a list of cryptocurrencies with their current prices in USD
- Filter and search for specific cryptocurrencies
- View detailed information about each cryptocurrency
- Track price changes over time
- View global cryptocurrency market data and statistics
- Monitor market dominance of major cryptocurrencies

The app uses the [CoinLore API](https://www.coinlore.com/cryptocurrency-data-api) to fetch real-time cryptocurrency data and features a professional UI with orange, white, and yellow color scheme.

## Technologies

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform for React Native
- **TypeScript**: For type-safe code
- **Redux Toolkit**: For state management (v2.8.1)
  - State management for cryptocurrency data
  - Theme preferences management (system theme and dark mode)
  - Persistent storage integration
  - Configured for OOP model serialization
- **RTK Query**: For API data fetching and caching
  - Automatic loading and error states
  - Data transformation and normalization
  - Caching and refetching strategies
- **React Native Paper**: Material Design UI components (see [UI Components](UI_COMPONENTS.md))
  - Consistent UI across platforms
  - Light and dark theme support
  - Material Design 3 (You) components
- **Expo Router**: For file-based navigation and routing
  - Deep linking support
  - Type-safe navigation
  - Tab and stack navigation
- **Object-Oriented Programming**: Architecture follows OOP principles
  - Models with private properties and public getters
  - Encapsulation and data validation
  - Business logic methods
  - Serialization for Redux compatibility

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crypto-tracker-app.git
   cd crypto-tracker-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on a specific platform:
   ```bash
   # For iOS
   npm run ios

   # For Android
   npm run android

   # For web
   npm run web
   ```

## Project Structure

```
src/
├── app/                  # Application screens and navigation
│   ├── (tabs)/           # Tab-based navigation
│   │   ├── index.tsx     # Cryptocurrencies list screen
│   │   ├── compare.tsx   # Currency comparison screen
│   │   ├── explore.tsx   # About screen
│   │   └── _layout.tsx   # Tab navigation configuration
│   ├── detail.tsx        # Cryptocurrency detail screen
│   ├── market-overview.tsx # Market overview screen with global data
│   ├── search.tsx        # Search screen
│   ├── settings.tsx      # Settings screen
│   ├── +not-found.tsx    # 404 Not Found screen
│   └── _layout.tsx       # Root layout with stack navigation
├── assets/               # Static assets (images, fonts)
├── components/           # Reusable UI components
│   ├── AppWrapper.tsx    # Wrapper component for Redux Provider
│   ├── ThemeProvider.tsx # Contains ThemeProvider and ThemeConsumer components
│   ├── crypto/           # Cryptocurrency-specific components
│   │   ├── CryptoCard.tsx    # Card component for cryptocurrency
│   │   ├── CryptoList.tsx    # List component for cryptocurrencies
│   │   ├── DetailView.tsx    # Detailed view for cryptocurrency
│   │   ├── SearchBar.tsx     # Search component
│   │   ├── FilterPanel.tsx   # Filtering component
│   │   ├── LoadingIndicator.tsx # Loading state component
│   │   └── ErrorDisplay.tsx  # Error display component
│   └── ui/               # UI-specific components
├── constants/            # App constants
│   └── theme/            # Theme configuration
├── hooks/                # Custom React hooks
├── models/               # Data models and classes
├── services/             # API services and data fetching
│   ├── api/              # API client and endpoints
│   └── storage/          # Local storage services
├── store/                # Redux store configuration
│   ├── api/              # RTK Query API definitions
│   ├── slices/           # Redux slices
│   └── ...               # Redux configuration files
└── utils/                # Utility functions
```

## Features

- **Professional UI**: Clean and modern user interface with orange, white, and yellow color scheme
- **Cryptocurrency List**: View all cryptocurrencies with their current prices in USD with a clean, modern design
- **Search and Filter**: Find specific cryptocurrencies by name or symbol, filter by price range, and sort by various criteria
- **Detailed View**: See comprehensive information about each cryptocurrency including price, market cap, volume, and supply
- **Price Metrics**: View interactive charts and key metrics for cryptocurrencies in the detailed view
- **Currency Comparison**: Compare up to 5 cryptocurrencies with interactive charts and metrics
- **Market Overview**: View global cryptocurrency market data, including total market cap, volume, and market dominance
- **Market Dominance Visualization**: Visual representation of BTC, ETH, and other cryptocurrencies' market dominance
- **Market Data**: View exchanges and markets where each cryptocurrency is traded
- **Settings**: Customize app preferences including theme and display currency
- **Cache Management**: Control local data storage for offline use
- **Theme Management**: 
  - Support for system theme and manual theme selection
  - Orange, white, and yellow color scheme for light mode and orange, black, and yellow for dark mode
  - Persistent theme preferences using AsyncStorage
  - Seamless integration between React Navigation and React Native Paper themes
- **Real-time Data**: Fetch and display real-time cryptocurrency data with automatic refresh
- **Error Handling**: Graceful error handling with retry functionality
- **Responsive Design**: Optimized for various screen sizes and orientations

## API Integration

The app integrates with the CoinLore API to fetch cryptocurrency data:
- Global market data
- Cryptocurrency tickers
- Specific coin information
- Market data for coins

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
