# The Vible 🌟

> Love and goodwill do not require religion, just a vibe

A lifestyle philosophy platform promoting love, goodwill, and positive energy as a way of life. Join our community and explore merchandise that spreads positive energy.

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build:prod

# Preview production build
npm run preview:prod
```

### Production Deployment
```bash
# Build for production
npm run build:prod

# Deploy to Netlify (automatic with git push)
# Configuration is already set up in netlify.toml
```

## 🏗️ Project Structure

```
the-vible/
├── src/                    # Application source code
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── context/           # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── data/              # Static data and content
│   └── styles/            # Custom CSS and Tailwind config
├── public/                 # Static assets
├── memory-bank/            # Project documentation
└── scripts/                # Build and deployment scripts
```

## 🎯 Features

- **Philosophy Platform**: Explore the doctrine of love and goodwill
- **Digital Signatures**: Add your commitment to the community
- **Merchandise Store**: Support good causes through purchases
- **Mobile-First Design**: Optimized for all devices
- **Performance Optimized**: Fast loading and smooth interactions
- **PWA Ready**: Progressive web app capabilities

## 🚀 Production Deployment

### Netlify (Recommended)
The project is fully configured for Netlify deployment:

1. **Connect Repository**: Link your GitHub/GitLab repo to Netlify
2. **Build Settings**: 
   - Build command: `npm run build:prod`
   - Publish directory: `dist`
3. **Automatic Deployment**: Push to main branch triggers deployment

### Configuration Files
- **`netlify.toml`**: Complete Netlify configuration with proper headers
- **`env.production`**: Production environment variables
- **`vite.config.js`**: Enhanced production build configuration

### MIME Type Issues - RESOLVED ✅
All JavaScript module loading issues have been fixed:
- Proper content type headers configured
- Service worker optimized to prevent conflicts
- Production build system enhanced
- Complete deployment configuration provided

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Build Tool**: Vite with production optimizations
- **Deployment**: Netlify (configured) + Docker support
- **Performance**: Core Web Vitals optimized
- **Mobile**: Touch-friendly, responsive design

## 📱 Mobile Optimization

- **Performance**: Optimized CSS animations for mobile
- **Touch Interface**: Mobile-friendly interactions
- **Responsive Design**: Works perfectly on all screen sizes
- **Service Worker**: Smart caching strategy for mobile

## 🔧 Development

### Prerequisites
- Node.js 18+ 
- npm 9+

### Available Scripts
```bash
npm run dev              # Start development server
npm run build            # Build for development
npm run build:prod       # Build for production
npm run preview          # Preview development build
npm run preview:prod     # Preview production build
npm run lint             # Run ESLint
```

### Environment Variables
- **Development**: Uses default Vite configuration
- **Production**: Uses `env.production` file
- **Build**: Environment-specific optimizations

## 📊 Performance

- **Lighthouse Score**: > 80
- **First Contentful Paint**: < 3s
- **Largest Contentful Paint**: < 4s
- **Cumulative Layout Shift**: < 0.1
- **Mobile Optimized**: Touch-friendly performance

## 🚨 Troubleshooting

### Common Issues - RESOLVED ✅

#### White Screen on First Load
**Status**: ✅ Fixed  
**Solution**: Proper MIME type configuration in `netlify.toml`

#### Hard Refresh Required
**Status**: ✅ Fixed  
**Solution**: Updated service worker and cache strategy

#### Module Loading Errors
**Status**: ✅ Fixed  
**Solution**: Enhanced Vite configuration and proper headers

### If Issues Persist
1. Clear browser cache
2. Check `netlify.toml` configuration
3. Verify build command: `npm run build:prod`
4. Check deployment logs in Netlify dashboard

## 🔒 Security

- **Content Security Policy**: Configured headers
- **XSS Protection**: React built-in + additional headers
- **HTTPS Ready**: SSL configuration prepared
- **Security Headers**: Comprehensive security configuration

## 📚 Documentation

- **Memory Bank**: Complete project documentation in `memory-bank/`
- **Deployment Guide**: Production deployment instructions
- **API Documentation**: Component and hook documentation
- **Performance Guide**: Optimization and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For deployment issues or questions:
1. Check the `DEPLOYMENT.md` file
2. Review `netlify.toml` configuration
3. Verify build process with `npm run build:prod`
4. Check browser console for errors

---

**Status**: Production Ready ✅  
**Last Updated**: August 21, 2025  
**Version**: 2.0.0
