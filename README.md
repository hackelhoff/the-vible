# The Vible - Love & goodwill do not require a religion, just a ✨Vibe✨

A lifestyle philosophy web application promoting love and goodwill as a "vibe" with merchandise storefront.

## ✨ Features

### Core Application
- **Philosophy Page**: Inspirational content about love and goodwill
- **Storefront**: E-commerce functionality with shopping cart
- **Signature Quotes**: Daily inspirational quotes
- **Responsive Design**: Mobile-first approach with cloudy blue sky theme

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context + useReducer
- **Build Tool**: Vite with optimization plugins
- **Performance**: Lighthouse CI, Core Web Vitals
- **Testing**: Comprehensive test suite
- **Deployment**: Docker + Nginx

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/yourusername/the-vible.git
cd the-vible

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🧪 Testing Suite

### Comprehensive Testing
```bash
# Run all tests
npm test

# Performance testing
npm run test:performance

# Bundle analysis
npm run test:bundle

# Accessibility testing
npm run test:accessibility

# Docker testing
npm run test:docker

# Full validation
npm run validate
```

### Test Coverage
- ✅ Build process validation
- ✅ Linting and code quality
- ✅ Bundle size analysis
- ✅ Performance metrics (Lighthouse)
- ✅ Docker container testing
- ✅ Accessibility compliance
- ✅ SEO optimization checks

## 🚀 Performance

### Core Web Vitals
- **First Contentful Paint (FCP)**: 2.7s (Score: 61)
- **Largest Contentful Paint (LCP)**: 2.8s (Score: 82)
- **Speed Index**: 2.7s (Score: 97)
- **Cumulative Layout Shift (CLS)**: Optimized

### Optimization Features
- Code splitting and lazy loading
- Service worker for caching
- Image optimization and lazy loading
- Bundle size optimization
- Tree shaking and dead code elimination

## 🐳 Docker Deployment

### Development
```bash
# Start development environment
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production
```bash
# Build production image
docker build -t the-vible:latest .

# Run production container
docker run -p 80:80 the-vible:latest
```

## 📊 Bundle Analysis

```bash
# Analyze production bundle
npm run analyze:bundle

# Interactive bundle analyzer
npm run analyze
```

## 🔧 Development Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing & Quality
npm run lint         # Run ESLint
npm run test         # Run test suite
npm run validate     # Full validation

# Performance
npm run test:performance  # Lighthouse audit
npm run test:bundle      # Bundle analysis
npm run analyze          # Interactive analyzer

# Deployment
npm run predeploy    # Pre-deployment validation
```

## 📁 Project Structure

```
the-vible/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── features/        # Feature components (Cart, etc.)
│   │   ├── layout/          # Layout components
│   │   ├── quotes/          # Quote components
│   │   └── ui/              # UI components
│   ├── context/             # React Context providers
│   ├── data/                # Static data and content
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   └── styles/              # CSS and styling
├── scripts/                 # Testing and build scripts
├── docker/                  # Docker configuration
├── public/                  # Static assets
└── memory-bank/             # Project documentation
```

### Test Suite
- Automated testing pipeline
- Performance regression detection
- Accessibility compliance
- Build validation

## 🚀 Deployment

### Pre-deployment Checklist
```bash
npm run validate     # Run all validations
npm run test:all     # Run all tests
npm run analyze      # Check bundle size
```

### Production Build
```bash
npm run build        # Create optimized build
npm run preview      # Test production build locally
```

### Service Endpoints
- **Frontend Application**: `http://localhost:3000` ✅
- **Backend API**: `http://localhost:3001` ✅
- **Nginx Proxy**: `http://localhost:80` ✅
- **Health Checks**: All endpoints responding ✅

## 📚 Documentation

- **Project Brief**: `memory-bank/projectbrief.md`
- **Implementation Plan**: `memory-bank/implementation-plan.md`
- **System Patterns**: `memory-bank/systemPatterns.md`
- **Progress Tracking**: `memory-bank/progress.md`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run the test suite: `npm test`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**The Vible** - Spreading love and goodwill as a lifestyle philosophy. ✨💙
