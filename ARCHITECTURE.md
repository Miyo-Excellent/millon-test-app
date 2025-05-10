# Architecture Documentation

## Overview
This document outlines the architecture of the Crypto Tracker App, explaining the design patterns, data flow, and component structure.

## Architectural Pattern
The application follows a **Clean Architecture** approach with **Object-Oriented Programming** principles. This ensures separation of concerns and maintainability of the codebase.

## Layers

### 1. Presentation Layer
- **UI Components**: Reusable UI elements that make up the interface
- **Screens**: Composed of UI components to create full application screens
- **Navigation**: Handles routing between different screens

### 2. Domain Layer
- **Models**: Data structures representing business entities
- **Use Cases**: Business logic operations
- **Repositories Interfaces**: Contracts for data operations

### 3. Data Layer
- **Repositories Implementation**: Concrete implementations of repository interfaces
- **API Services**: Services for communicating with external APIs
- **Local Storage**: Services for local data persistence

## Data Flow
1. User interacts with the UI
2. UI components dispatch actions to use cases
3. Use cases process the request using domain models and repositories
4. Repositories fetch data from API services or local storage
5. Data flows back through the layers to update the UI

## Directory Structure
```
src/
├── app/                  # Application screens and navigation
│   ├── (tabs)/           # Tab-based navigation
│   │   ├── index.tsx     # Cryptocurrencies list screen
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
│       └── paperTheme.ts # React Native Paper theme
├── hooks/                # Custom React hooks
├── models/               # Data models and classes
│   ├── Cryptocurrency.ts # Cryptocurrency model
│   └── Market.ts         # Market model
├── services/             # API services and data fetching
│   ├── api/              # API client and endpoints
│   └── storage/          # Local storage services
├── store/                # Redux store configuration
│   ├── api/              # RTK Query API definitions
│   │   └── cryptoApi.ts  # API endpoints for cryptocurrency data
│   ├── slices/           # Redux slices for different features
│   │   ├── cryptocurrencySlice.ts  # Cryptocurrency state management
│   │   ├── marketSlice.ts          # Market data state management
│   │   ├── globalDataSlice.ts      # Global market data state management
│   │   └── themeSlice.ts           # Theme preferences state management
│   ├── hooks.ts          # Typed hooks for accessing the store
│   ├── provider.tsx      # Redux provider component
│   └── store.ts          # Store configuration
└── utils/                # Utility functions
    ├── formatUtils.ts    # Formatting utilities
    └── calculationUtils.ts # Calculation utilities
```

## Key Components

### Models
- **Cryptocurrency**: Class representing a cryptocurrency with private properties (e.g., _id, _name, _symbol, _price), public getters, and methods for business logic (e.g., calculateFullyDilutedMarketCap, calculateCirculatingSupplyPercentage)
- **Market**: Class representing a market where cryptocurrencies are traded, with private properties, public getters, and methods for business logic (e.g., calculatePriceDifferenceFromUsd, calculateMarketShare)
- **GlobalData**: Class representing global cryptocurrency market data, with private properties, public getters, and methods for business logic (e.g., calculateMarketCapAthPercentage, calculateBtcEthCombinedDominance)

All models follow OOP principles with proper encapsulation and include a toPlainObject() method for serialization to plain objects for Redux compatibility.

### Services
- **CryptoService**: Handles API calls to fetch cryptocurrency data
- **StorageService**: Manages local caching of data

### UI Components
- **CryptoList**: Displays a list of cryptocurrencies with loading, error, and refresh states in a Binance-inspired design
- **CryptoCard**: Card component for displaying cryptocurrency information in a compact format with rank indicator and styled price changes
- **DetailView**: Component for displaying detailed cryptocurrency information including markets with an intuitive, Binance-like layout
- **MarketOverview**: Component for displaying global cryptocurrency market data, including market cap, volume, and dominance
- **MarketDominance**: Visual component for displaying cryptocurrency market dominance with interactive progress bars
- **SearchBar**: Component for searching cryptocurrencies with debounce functionality and Binance-inspired styling
- **FilterPanel**: Component for filtering cryptocurrencies by price range and sorting options
- **LoadingIndicator**: Component for displaying loading states with customizable text and themed colors
- **ErrorDisplay**: Component for displaying error messages with retry functionality and consistent styling

### UI Library
The application uses **React Native Paper** as its UI component library:
- **Material Design**: Components follow Material Design guidelines
- **Theming**: Customizable theming system with light and dark mode support
- **Accessibility**: Built-in accessibility features
- **Integration**: Seamless integration with React Navigation

For a comprehensive list of available UI components, see [UI Components](UI_COMPONENTS.md).

#### Theme Configuration
The application implements a Binance-inspired custom theme that:
- Defines custom colors for both light and dark modes based on Binance's color scheme
  - Light mode: Yellow primary color (#F0B90B), white background, and green/red for price changes
  - Dark mode: Yellow accent color on dark background (#0B0E11), with consistent green/red indicators
- Integrates React Navigation's theme with React Native Paper
- Adapts to the device's color scheme
- Provides consistent styling across the application with a professional, exchange-like appearance
- Uses visual indicators and color coding for price changes and market trends

### Navigation Architecture
The application uses **Expo Router** for file-based navigation, which provides a seamless navigation experience across all platforms (Android, iOS, and web):

#### Stack Navigation
The root `_layout.tsx` file sets up a Stack navigator using the `Stack` component from Expo Router:
- Provides hierarchical navigation between screens
- Handles screen transitions with platform-specific animations
- Manages the navigation history and back button behavior
- Configures screen options like headers and titles

#### Tab Navigation
The `(tabs)/_layout.tsx` file sets up a Tab navigator using the `Tabs` component from Expo Router:
- Creates a bottom tab bar for quick navigation between main sections in a Binance-like style
- Customizes tab appearance with icons from Ionicons that match Binance's iconography
- Implements haptic feedback for tab presses
- Applies custom styling for active and inactive tabs with Binance's yellow highlight color

#### Screen Navigation
Individual screens are defined as files in the app directory:
- `(tabs)/index.tsx` - Cryptocurrencies list screen with the main cryptocurrency list
- `(tabs)/explore.tsx` - About screen with information about the app
- `market-overview.tsx` - Market Overview screen with global cryptocurrency data and market dominance visualization
- `detail.tsx` - Detail screen for viewing comprehensive cryptocurrency information
- `search.tsx` - Search screen for finding and filtering cryptocurrencies
- `settings.tsx` - Settings screen for customizing app preferences
- `+not-found.tsx` - 404 screen for handling invalid routes

#### Navigation Patterns
The application implements several navigation patterns:
- **Deep Linking**: All screens are automatically deep-linkable
- **Tab-to-Stack Navigation**: Users can navigate from tabs to stack screens
- **Back Navigation**: Users can return to previous screens
- **Error Handling**: Invalid routes are redirected to the Not Found screen
- **Floating Action Buttons**: Quick access to search and settings from the main screen

## State Management
The application uses Redux Toolkit (v2.8.1) for centralized state management:
- **Redux Store**: Central state container for the entire application
- **Redux Slices**: Feature-based state and logic organization
- **RTK Query**: Data fetching and caching with automatic loading and error states
- **Redux Hooks**: Typed hooks for accessing the store (useAppSelector, useAppDispatch)
- **Redux Provider**: Provides the Redux store to all components in the application

### Redux Provider Setup
The application uses a modular approach to initialize the Redux Provider:
- **AppWrapper**: A component that wraps the entire application with the Redux Provider, ensuring that all components have access to the Redux store
- **ThemeProvider**: A component that acts as a placeholder and doesn't use any Redux hooks directly
- **ThemeConsumer**: A component that uses Redux hooks to determine the theme and is only rendered inside the Redux Provider
- **AppContent**: A component that is rendered inside the Redux Provider and uses the ThemeConsumer component

This architecture ensures proper initialization of the Redux Provider before any component tries to use Redux hooks, preventing "could not find react-redux context value" errors. By separating the components that use Redux hooks (ThemeConsumer) from those that don't (ThemeProvider), we ensure that Redux hooks are only called within components that are already wrapped with the Redux Provider.

### Theme Management
Theme management is handled through Redux with the following components:
- **themeSlice.ts**: Redux slice for managing theme preferences (system theme vs. manual selection, dark mode vs. light mode)
- **useColorScheme**: Custom hook that determines the current color scheme based on user preferences and system settings
- **ThemeProvider**: Component that acts as a placeholder and doesn't use any Redux hooks directly
- **ThemeConsumer**: Component that uses Redux hooks to determine the theme and provides it to both React Navigation and React Native Paper
- **AsyncStorage**: Used to persist theme preferences between app sessions

### Redux Store Structure
```
store/
├── api/                  # RTK Query API definitions
│   └── cryptoApi.ts      # API endpoints for cryptocurrency data
├── slices/               # Redux slices for different features
│   ├── cryptocurrencySlice.ts  # Cryptocurrency state management
│   ├── marketSlice.ts          # Market data state management
│   ├── globalDataSlice.ts      # Global market data state management
│   └── themeSlice.ts           # Theme preferences state management
├── hooks.ts              # Typed hooks for accessing the store
├── provider.tsx          # Redux provider component
├── store.ts              # Store configuration
└── index.ts              # Re-exports for easy imports
```

#### Redux Serialization Configuration
The Redux store is configured to handle non-serializable values from the OOP model classes:

1. **Model Serialization**: Each model class implements a `toPlainObject()` method that converts the instance to a plain JavaScript object for Redux.

2. **RTK Query Transformation**: The RTK Query API endpoints use `transformResponse` functions to convert API responses to model instances and then to plain objects:
   ```typescript
   transformResponse: (response: any[]) => {
     const globalData = GlobalData.fromApiData(response[0]);
     return globalData.toPlainObject();
   }
   ```

3. **Redux Middleware Configuration**: The Redux store is configured to ignore certain paths in the state and actions to prevent serialization checks on RTK Query internal state:
   ```typescript
   middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware({
       serializableCheck: {
         ignoredActions: ['cryptoApi/executeQuery/fulfilled', ...],
         ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
         ignoredPaths: ['cryptoApi.queries'],
       },
     }).concat(cryptoApi.middleware),
   ```

This configuration ensures that the OOP model classes can be used with Redux without serialization issues.

### Data Flow with Redux
1. Components use RTK Query hooks or dispatch actions to request data
2. RTK Query automatically handles API requests, caching, and loading states
3. Redux reducers process actions and update the store
4. Components receive updates through selectors
5. UI re-renders with the latest data

## API Integration
The application integrates with the CoinLore API:
- API calls are abstracted through service classes
- Rate limiting is handled at the service level
- Error handling and retry logic are implemented

## Performance Considerations
- **Pagination**: Data is loaded in chunks to improve performance
- **Caching**: Frequently accessed data is cached locally
- **Memoization**: React.memo and useMemo are used to prevent unnecessary re-renders
- **Lazy Loading**: Components and screens are loaded only when needed

## Testing Strategy
- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test interactions between components
- **End-to-End Tests**: Test complete user flows

## Future Considerations
- **Offline Support**: Implement more robust offline capabilities with Redux Persist
- **Push Notifications**: Add notifications for price alerts
- **Analytics**: Integrate analytics for user behavior tracking
- **Server-Side Rendering**: Explore SSR options for improved performance
- **Middleware Extensions**: Add custom middleware for logging, analytics, etc.
