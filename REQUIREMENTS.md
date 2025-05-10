# Project Requirements

## Overview
This document outlines the requirements for the Crypto Tracker App, a mobile application that provides information about cryptocurrencies in USD.

## Technical Requirements

### Technology Stack
- **TypeScript**: The application must be developed using TypeScript for type safety and better code organization.
- **React Native**: The application must be built using React Native for cross-platform compatibility.
- **Expo**: The application must utilize Expo for development and deployment.
- **Redux Toolkit**: The application must use Redux Toolkit (v2.8.1) for state management.
- **RTK Query**: The application must use RTK Query for API data fetching and caching.
- **React Native Paper**: The application must use React Native Paper for Material Design UI components.
- **iOS and Android Support**: The application must work on both iOS and Android platforms.

### Architecture and Structure
- **Object-Oriented Programming**: The application must follow OOP principles in its architecture.
- **Clean Architecture**: The codebase should be organized with clear separation of concerns.
- **Component-Based Design**: UI elements should be built as reusable components.
- **Responsive Design**: The application must be responsive and work on various screen sizes.

### Code Quality
- **Documentation**: Code must be well-documented with comments and JSDoc where appropriate.
- **Best Practices**: The application must follow React Native and TypeScript best practices.
- **Performance**: The application must be optimized for performance, especially when handling large datasets.
- **Unit Testing (Optional)**: Unit tests should be implemented where possible.

## Functional Requirements

### Cryptocurrency List
- The application must display a list of cryptocurrencies.
- Each cryptocurrency in the list must show:
  - Name
  - Symbol
  - Current price in USD
  - Price change percentage (24h)
  - Market cap

### Filtering and Searching
- Users must be able to search for cryptocurrencies by name or symbol.
- Users must be able to filter cryptocurrencies based on criteria such as price, market cap, etc.

### Detailed Cryptocurrency View
- Users must be able to view detailed information about a specific cryptocurrency, including:
  - Price in USD
  - Price changes (1h, 24h, 7d)
  - Market cap
  - Volume
  - Supply information
  - Rank

### API Integration
- The application must integrate with the CoinLore API (https://www.coinlore.com/cryptocurrency-data-api).
- The application must handle API rate limits appropriately (recommended: one request per second).
- The application must handle API errors gracefully and provide appropriate feedback to users.

## Non-Functional Requirements

### Performance
- The application must load cryptocurrency data quickly.
- The application must remain responsive during data fetching operations.
- The application must implement caching mechanisms to reduce API calls.

### User Experience
- The application must have an intuitive and user-friendly interface following Material Design guidelines.
- The application must provide visual feedback during loading operations.
- The application must support both light and dark themes with consistent Material Design styling.
- The application must use consistent UI components from React Native Paper.

### Accessibility
- The application must be accessible to users with disabilities.
- The application must follow accessibility best practices.

## Evaluation Criteria
The application will be evaluated based on:
1. Architecture
2. Structure
3. Documentation
4. Best Practices
5. Performance
6. Unit Testing (optional)
