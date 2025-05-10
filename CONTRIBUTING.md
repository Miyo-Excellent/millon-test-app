# Contributing to Crypto Tracker App

Thank you for your interest in contributing to the Crypto Tracker App! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to foster an inclusive and respectful community.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/crypto-tracker-app.git`
3. Create a new branch for your feature or bugfix: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Start the development server: `npm start`

## Development Workflow

### Branching Strategy

- `main`: Production-ready code
- `develop`: Development branch for integrating features
- `feature/*`: Feature branches
- `bugfix/*`: Bug fix branches
- `release/*`: Release preparation branches

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Changes to the build process or auxiliary tools

Example:
```
feat(crypto-list): add search functionality

Implement search bar to filter cryptocurrencies by name or symbol
```

### Pull Requests

1. Update your branch with the latest changes from the develop branch
2. Ensure your code passes all tests
3. Submit a pull request to the `develop` branch
4. Include a clear description of the changes
5. Reference any related issues

## Coding Standards

### TypeScript

- Follow the [TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- Use strong typing and avoid `any` where possible
- Document public APIs with JSDoc comments

### React Native

- Use functional components with hooks
- Follow component composition patterns
- Keep components small and focused on a single responsibility
- Use the provided theming system for consistent styling

### Object-Oriented Programming

- Follow SOLID principles
- Use classes for models and services
- Implement proper encapsulation and abstraction
- Use interfaces to define contracts

### Testing

- Write unit tests for all new features
- Ensure tests are meaningful and cover edge cases
- Run the test suite before submitting a pull request

## Project Structure

Please maintain the existing project structure:

```
src/
├── app/                  # Application screens and navigation
├── assets/               # Static assets (images, fonts)
├── components/           # Reusable UI components
├── constants/            # App constants
├── hooks/                # Custom React hooks
├── models/               # Data models and classes
├── services/             # API services and data fetching
└── utils/                # Utility functions
```

## Documentation

- Update documentation for any changes to APIs or functionality
- Document complex algorithms or business logic
- Add comments for non-obvious code
- Update README.md if necessary

## Performance Considerations

- Minimize re-renders by using React.memo and useMemo
- Use virtualized lists for long scrollable content
- Optimize images and assets
- Be mindful of bundle size

## Accessibility

- Ensure all UI elements are accessible
- Use proper semantic elements
- Provide alternative text for images
- Test with screen readers

## Submitting Issues

When submitting an issue, please include:

1. A clear and descriptive title
2. Steps to reproduce the issue
3. Expected behavior
4. Actual behavior
5. Screenshots if applicable
6. Environment information (OS, device, app version)

## Questions?

If you have any questions or need help, please:

1. Check existing issues and documentation
2. Open a new issue with the "question" label
3. Reach out to the maintainers

Thank you for contributing to the Crypto Tracker App!