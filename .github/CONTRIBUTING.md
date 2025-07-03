# Contributing to React Zoomable Mermaid

Thank you for your interest in contributing to React Zoomable Mermaid! This document provides guidelines and instructions for contributing.

## Development Process

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Install dependencies (`npm install`)
4. Make your changes
5. Run tests (`npm test`)
6. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
7. Push to the branch (`git push origin feature/AmazingFeature`)
8. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/react-zoomable-mermaid.git

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build
npm run build
```

## Project Structure

```
src/
  ├── index.js        # Main entry point
  ├── index.d.ts      # TypeScript definitions
  └── components/     # React components
      └── ZoomableMermaid.jsx
```

## Coding Standards

- Follow the existing code style
- Write meaningful commit messages
- Include tests for new features
- Update documentation for API changes
- Keep changes focused and atomic

## Pull Request Process

1. Ensure your code follows the coding standards
2. Update the README.md with details of changes if needed
3. Update the documentation if you're changing the API
4. Add tests for new features
5. The PR will be merged once you have the sign-off of at least one maintainer

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## Documentation

If you're making changes that affect the API or add new features, please update the relevant documentation in the `docs/` directory.

## Questions or Problems?

Feel free to open an issue if you have questions or run into problems.