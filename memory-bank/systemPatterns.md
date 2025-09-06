# System Patterns: The Vible

## System Architecture
**Single Page Application (SPA)** with Docker containerization and component-based architecture optimized for mobile-first design and performance.

## High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    The Vible Web App                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Informational │  │   Navigation    │  │   Shopping  │ │
│  │      Page       │  │     Header      │  │     Cart    │ │
│  │  + Random       │  │                 │  │             │ │
│  │    Quotes       │  └─────────────────┘  └─────────────┘ │
│  └─────────────────┘                                       │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                 Merchandise Storefront                  │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │ │
│  │  │  Product    │  │  Product    │  │  Product Grid   │ │ │
│  │  │  Card 1     │  │  Card 2     │  │  & Filtering    │ │ │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                   Checkout Flow                        │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │ │
│  │  │   Cart      │  │  Checkout   │  │  Confirmation   │ │ │
│  │  │  Summary    │  │   Form      │  │     Page        │ │ │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘ │ │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Docker Architecture                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Frontend      │  │    Backend      │  │    Nginx    │ │
│  │   Container     │  │   Container     │  │  Container  │ │
│  │  (React + Vite) │  │  (Express.js)   │  │ (Reverse    │ │
│  │                 │  │                 │  │   Proxy)    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                 Data Persistence                       │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │ │
│  │  │  Product    │  │  Signature  │  │  Session        │ │ │
│  │  │    Data     │  │    Data     │  │    Storage      │ │ │
│  │  │  (JSON)     │  │  (JSON)     │  │   (Volumes)     │ │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Design Patterns
**Frontend Patterns:**
- **Component-Based Architecture** - Reusable UI components for consistency
- **Mobile-First Design** - CSS Grid and Flexbox for responsive layouts
- **Progressive Enhancement** - Core functionality works without JavaScript
- **Context Pattern** - React Context for global state management
- **Random Quote System** - Dynamic content that changes on page load

**Backend Patterns:**
- **File-based Storage** - JSON files for data persistence

**Container Patterns:**
- **Multi-stage Builds** - Optimized production images
- **Service Separation** - Frontend, backend, and proxy containers
- **Volume Mounts** - Persistent data storage across container restarts
- **Environment Configuration** - Environment-specific container settings

## Component Relationships
**Core Components:**
- **App** - Main application container with routing
- **Header** - Navigation and branding component
- **InformationalPage** - Doctrine content with random spiritual quotes
- **Storefront** - Product grid and filtering
- **ProductCard** - Individual product display component
- **ShoppingCart** - Cart management and checkout
- **CheckoutForm** - Purchase completion form
- **RandomQuote** - Dynamic spiritual quote display

**Component Dependencies:**
- **App** → **Header**, **Router**
- **Storefront** → **ProductCard**, **ProductGrid**
- **ShoppingCart** → **CartContext**, **CheckoutForm**
- **Header** → **Navigation**, **CartIcon**
- **InformationalPage** → **RandomQuote**

## Data Flow
**Primary Data Flow:**
- **Product Data** → JSON files → Product components → Storefront
- **Cart Actions** → Cart Context → Local Storage → UI Updates
- **User Navigation** → React Router → Component rendering
- **Random Quotes** → JSON data → Quote component → Page display

**Data Models:**
- **Product Model** - ID, name, description, price, image, category
- **Cart Item Model** - Product ID, quantity, price
- **Checkout Model** - Customer info, shipping, payment
- **Quote Model** - Text, author, category, inspiration level

## Security Patterns
- **Input Validation** - Form data validation and sanitization
- **XSS Prevention** - React's built-in XSS protection
- **HTTPS Only** - Secure connections for all production traffic

## Scalability Considerations
- **Component Reusability** - Modular design for easy feature addition
- **Performance Optimization** - Lazy loading and code splitting
- **Container Orchestration** - Docker Compose for local, Kubernetes for production
- **Data Backup** - Regular product data backups and recovery

## Error Handling Patterns
- **Graceful Degradation** - Core functionality works without JavaScript
- **User-Friendly Messages** - Clear error communication
- **Fallback States** - Loading and error state components
- **API Error Handling** - Proper HTTP status codes and error messages

## Testing Patterns
- **Component Testing** - Individual component functionality
- **Integration Testing** - User flow testing
- **Performance Testing** - Lighthouse and Core Web Vitals
- **Cross-Browser Testing** - Multiple browser compatibility
- **Container Testing** - Docker container functionality and integration

---
*This document defines the architectural patterns and system design for The Vible.*
