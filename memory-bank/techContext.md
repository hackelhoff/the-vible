# Technical Context: The Vible

## Technology Stack
**Frontend-Focused SPA** with Docker containerization and modern web technologies for optimal performance and user experience.

## Frontend Technologies
**Framework:**
- **React 18** - Modern, performant frontend framework with excellent mobile support

**UI Library:**
- **Tailwind CSS** - Utility-first CSS framework for rapid, responsive design
- **Custom Components** - Built specifically for the cloudy blue sky theme

**State Management:**
- **React Context + useReducer** - Lightweight state management for cart and UI state
- **Local Storage** - Persist cart data between sessions

**Styling:**
- **Tailwind CSS** - For responsive design and utility classes
- **Custom CSS Variables** - For cloudy blue sky color palette
- **CSS Grid & Flexbox** - For responsive layouts

## Backend Technologies
**Runtime:**
- **Node.js** - For development server and build tools

**Framework:**
- **Vite** - Fast build tool and development server
- **Express.js** - Simple backend for API endpoints and signature tracking

**Database:**
- **Local Storage** - For cart persistence (no server-side storage required)
- **JSON Files** - For product data and content
- **Simple File Storage** - For signature collection (IP + session tracking)

**API:**
- **Static Site Generation** - Pre-built HTML for optimal performance
- **API Routes** - For signature collection and duplicate prevention
- **Session Management** - For tracking user sessions and preventing duplicate signatures

## Containerization
**Docker Setup:**
- **Multi-stage Builds** - Optimized production images
- **Development Container** - Consistent development environment
- **Production Container** - Lightweight production deployment
- **Docker Compose** - Local development with services

**Container Strategy:**
- **Frontend Container** - React application with Vite
- **Backend Container** - Express.js API for signatures
- **Nginx Container** - Reverse proxy and static file serving
- **Data Persistence** - Volume mounts for signature storage

## Development Environment
**Required Tools:**
- **Node.js 18+** - JavaScript runtime
- **npm/yarn** - Package manager
- **Git** - Version control (already initialized)
- **VS Code/Cursor** - Development editor
- **Docker Desktop** - Container runtime and management

**Version Control:**
- Git (already initialized)

**Package Manager:**
- **npm** - Standard Node.js package manager

## Dependencies
**Core Dependencies:**
- **React 18** - Frontend framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library for UI elements

**Backend Dependencies:**
- **Express.js** - Web framework for API
- **Cors** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Morgan** - HTTP request logging

**Development Dependencies:**
- **Vite** - Build tool and dev server
- **@vitejs/plugin-react** - React plugin for Vite
- **Autoprefixer** - CSS vendor prefixing
- **PostCSS** - CSS processing
- **Docker** - Containerization

## Build & Deployment
**Build Tools:**
- **Vite** - Fast build tool with excellent React support
- **Tailwind CSS** - Purge unused styles for production
- **Docker** - Containerized builds and deployment

**Deployment Platform:**
- **Docker Containers** - Consistent deployment across environments
- **Vercel** - Excellent for React apps with automatic deployments
- **Netlify** - Alternative with similar features
- **Self-hosted** - Docker-based deployment option

**CI/CD:**
- **GitHub Actions** - Automated build and deploy on push
- **Docker Hub** - Container image registry
- **Vercel/Netlify** - Automatic deployments from Git

## Technical Constraints
- **No Authentication** - Must work for anonymous users
- **Mobile-First** - Design must prioritize mobile experience
- **Lightweight** - Fast loading and simple implementation
- **Static-Friendly** - Should work well with static hosting
- **Docker Required** - Must be containerized for deployment
- **Signature Tracking** - Must prevent duplicate signatures effectively

## Performance Requirements
- **First Contentful Paint:** < 1.5 seconds
- **Largest Contentful Paint:** < 2.5 seconds
- **Cumulative Layout Shift:** < 0.1
- **Mobile Performance:** Must score 90+ on Lighthouse
- **Container Startup:** < 10 seconds for development, < 5 seconds for production

## Browser/Platform Support
- **Modern Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile:** iOS Safari 14+, Chrome Mobile 90+
- **Progressive Enhancement:** Core functionality works without JavaScript
- **Container Support:** Docker runtime on target deployment platforms

## Signature Tracking Implementation
**Duplicate Prevention Strategy:**
- **IP Address Tracking** - Store hashed IP addresses
- **Session Management** - Browser session cookies
- **Combination Logic** - IP + session + timestamp validation
- **Privacy Protection** - No personal data storage, only anonymous tracking

**Data Storage:**
- **JSON File Storage** - Simple file-based signature collection
- **Hashed Identifiers** - Secure storage of tracking data
- **Timestamp Tracking** - Rate limiting and validation
- **Backup Strategy** - Regular signature data backups

---
*This document defines the technology choices and development setup for The Vible.*
