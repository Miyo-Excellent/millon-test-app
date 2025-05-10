# Changelog

All notable changes to the Crypto Tracker App will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.7.0] r21 - 2025-05-09

### Added
- Integrated react-native-gifted-charts library for data visualization
- Added price metrics to the Details view with interactive charts
- Created new Currency Comparison tab for comparing multiple cryptocurrencies
- Implemented interactive charts and metrics in the comparison view
- Added ability to select and compare up to 5 cryptocurrencies
- Added comparison of different metrics (price, 24h change, market cap, volume)

### Changed
- Changed search button color from purple to yellow for better consistency with the theme
- Enhanced Details view with price trend visualization and key metrics
- Improved overall data visualization with charts and metrics

## [1.6.0] r20 - 2025-05-09

### Added
- Implemented Binance-inspired UI throughout the application
- Created new Market Overview screen with global cryptocurrency data
- Added market dominance visualization with interactive progress bars
- Implemented market statistics display with key metrics
- Added new tab navigation item for Market Overview

### Changed
- Updated theme colors to match Binance's color scheme for both light and dark modes
- Improved component styling for a more professional and modern look
- Enhanced CryptoCard component with rank indicator and better price change visualization
- Redesigned DetailView component with a more intuitive layout
- Updated documentation to reflect the new UI and features

## [1.5.0] r19 - 2025-05-09

### Added
- Completed all requirements for Phases 1-5 of the development plan
- Verified integration of all components and features
- Added comprehensive documentation of the architecture and implementation

### Changed
- Enhanced documentation with detailed explanations of OOP model implementation
- Updated architecture documentation with Redux serialization configuration details
- Improved README with detailed technology stack and feature descriptions
- Added future improvement suggestions to the implementation plan

## [1.4.2] r18 - 2025-05-09

### Fixed
- Resolved remaining non-serializable value errors by configuring Redux middleware
- Added serializableCheck configuration to ignore RTK Query paths in state and actions
- Improved Redux performance by preventing unnecessary serialization checks

## [1.4.1] r17 - 2025-05-09

### Fixed
- Fixed non-serializable value error in Redux state by ensuring class instances are converted to plain objects
- Updated API transformResponse functions to use toPlainObject() method for all model instances
- Improved Redux serialization compatibility for OOP data models

## [1.4.0] r16 - 2025-05-09

### Added
- Completed Phase 5 development with core functionality
- Implemented cryptocurrency listing with search and filter capabilities
- Added detailed cryptocurrency view with comprehensive information
- Implemented settings screen with theme switching and cache management
- Integrated Redux with UI components for state management
- Added refresh functionality for cryptocurrency data
- Implemented error handling and loading states

### Changed
- Updated implementation plan to reflect completed tasks
- Enhanced documentation with details about implemented features
- Improved user experience with responsive UI components

## [1.3.3] r15 - 2025-05-09

### Fixed
- Fixed theme switching in settings screen not working correctly
- Implemented Redux state management for theme preferences
- Added persistence of theme settings using AsyncStorage
- Created custom useColorScheme hook to respect user theme preferences

## [1.3.2] r14 - 2025-05-09

### Fixed
- Added missing component exports in crypto components index file
- Created missing SearchBar and FilterPanel components
- Fixed component import issues in search and detail screens
- Ensured proper component integration across the application

## [1.3.1] r13 - 2025-05-09

### Fixed
- Replaced deprecated Title and Paragraph components with Text component using appropriate variants
- Updated component imports to follow React Native Paper v5.x guidelines
- Ensured consistent typography styling across the application

## [1.3.0] r12 - 2025-05-09

### Added
- Created detailed cryptocurrency screens (detail, search, settings)
- Implemented comprehensive search and filter functionality
- Added settings screen with theme and currency preferences
- Integrated cryptocurrency components with navigation
- Enhanced error handling and loading states

### Changed
- Updated navigation structure with proper routing between screens
- Improved tab navigation with appropriate icons and titles
- Enhanced documentation to reflect the new screens and navigation
- Refactored HomeScreen to display cryptocurrency list

## [1.2.0] r11 - 2025-05-09

### Added
- Integrated React Native Paper UI component library
- Implemented Material Design components throughout the application
- Created custom theme configuration with light and dark mode support
- Added seamless integration between React Navigation and React Native Paper themes

### Changed
- Updated UI components to use Material Design
- Enhanced visual consistency across the application
- Improved accessibility with Material Design components

## [1.1.0] r10 - 2025-05-09

### Added
- Implemented Redux Toolkit v2.8.1 for centralized state management
- Added RTK Query for API data fetching with automatic caching
- Created typed hooks for accessing the Redux store
- Implemented Redux slices for cryptocurrency, market, and global data

### Changed
- Refactored state management to use Redux throughout the application
- Updated documentation to reflect Redux implementation
- Improved API integration with RTK Query

## [1.0.0] r09 - 2025-05-09

### Added
- Initial release of the Crypto Tracker App
- Cryptocurrency listing with real-time prices in USD
- Search and filter functionality for cryptocurrencies
- Detailed view for individual cryptocurrencies
- Price change tracking (1h, 24h, 7d)
- Support for both light and dark themes
- Integration with CoinLore API
- Responsive UI for both iOS and Android platforms

### Technical
- Project structure setup with React Native and Expo
- TypeScript implementation for type safety
- Object-oriented programming architecture
- Expo Router for navigation
- Reusable component library
- API service layer for data fetching
