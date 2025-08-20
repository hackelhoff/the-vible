#!/bin/bash

# The Vible - Phase 4 Deployment Script
# Production deployment and launch

set -e

echo "🚀 Starting Phase 4: Deployment & Launch for The Vible"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="the-vible"
BUILD_TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
BUILD_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
DOCKER_COMPOSE_PROD="docker-compose.prod.yml"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check if Docker is running
    if ! docker info >/dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker Desktop."
        exit 1
    fi
    
    # Check if docker-compose is available
    if ! command -v docker-compose >/dev/null 2>&1; then
        print_error "docker-compose is not installed."
        exit 1
    fi
    
    # Check if npm is available
    if ! command -v npm >/dev/null 2>&1; then
        print_error "npm is not installed."
        exit 1
    fi
    
    print_success "Prerequisites check passed"
}

# Function to build the application
build_application() {
    print_status "Building application for production..."
    
    # Clean previous build
    if [ -d "dist" ]; then
        rm -rf dist
        print_status "Cleaned previous build"
    fi
    
    # Install dependencies
    print_status "Installing dependencies..."
    npm ci
    
    # Run tests
    print_status "Running test suite..."
    npm run test:all
    
    # Build application
    print_status "Building production bundle..."
    npm run build
    
    # Verify build
    if [ ! -f "dist/index.html" ]; then
        print_error "Build failed - index.html not found"
        exit 1
    fi
    
    print_success "Application built successfully"
}

# Function to build Docker images
build_docker_images() {
    print_status "Building Docker images for production..."
    
    # Set build arguments
    export BUILD_TIMESTAMP="$BUILD_TIMESTAMP"
    export BUILD_HASH="$BUILD_HASH"
    
    # Build and start production containers
    print_status "Building production containers..."
    docker-compose -f "$DOCKER_COMPOSE_PROD" build --no-cache
    
    print_success "Docker images built successfully"
}

# Function to deploy containers
deploy_containers() {
    print_status "Deploying production containers..."
    
    # Stop any existing containers
    print_status "Stopping existing containers..."
    docker-compose -f "$DOCKER_COMPOSE_PROD" down --remove-orphans
    
    # Start production containers
    print_status "Starting production containers..."
    docker-compose -f "$DOCKER_COMPOSE_PROD" up -d
    
    # Wait for containers to be ready
    print_status "Waiting for containers to be ready..."
    sleep 30
    
    # Check container health
    print_status "Checking container health..."
    if ! docker-compose -f "$DOCKER_COMPOSE_PROD" ps | grep -q "Up"; then
        print_error "Containers failed to start properly"
        docker-compose -f "$DOCKER_COMPOSE_PROD" logs
        exit 1
    fi
    
    print_success "Containers deployed successfully"
}

# Function to run health checks
run_health_checks() {
    print_status "Running health checks..."
    
    # Check frontend
    if curl -f http://localhost:3000/health >/dev/null 2>&1; then
        print_success "Frontend health check passed"
    else
        print_error "Frontend health check failed"
        return 1
    fi
    
    # Check backend
    if curl -f http://localhost:3001/health >/dev/null 2>&1; then
        print_success "Backend health check passed"
    else
        print_error "Backend health check failed"
        return 1
    fi
    
    # Check nginx
    if curl -f http://localhost:80/health >/dev/null 2>&1; then
        print_success "Nginx health check passed"
    else
        print_error "Nginx health check failed"
        return 1
    fi
    
    print_success "All health checks passed"
}

# Function to run performance tests
run_performance_tests() {
    print_status "Running performance tests..."
    
    # Check if lighthouse is available
    if command -v lighthouse >/dev/null 2>&1; then
        print_status "Running Lighthouse performance test..."
        lighthouse http://localhost:80 --output=json --output-path=./lighthouse-production.json --chrome-flags='--headless'
        
        if [ -f "lighthouse-production.json" ]; then
            print_success "Lighthouse test completed"
        else
            print_warning "Lighthouse test failed"
        fi
    else
        print_warning "Lighthouse not available - skipping performance test"
    fi
}

# Function to display deployment info
display_deployment_info() {
    echo ""
    echo "🎉 The Vible - Phase 4 Deployment Complete!"
    echo "=============================================="
    echo "Application: $APP_NAME"
    echo "Build Timestamp: $BUILD_TIMESTAMP"
    echo "Build Hash: $BUILD_HASH"
    echo ""
    echo "🌐 Access Points:"
    echo "  Frontend: http://localhost:3000"
    echo "  Backend API: http://localhost:3001"
    echo "  Nginx Proxy: http://localhost:80"
    echo ""
    echo "📊 Health Endpoints:"
    echo "  Frontend: http://localhost:3000/health"
    echo "  Backend: http://localhost:3001/health"
    echo "  Nginx: http://localhost:80/health"
    echo ""
    echo "🔍 Monitoring:"
    echo "  Container Status: docker-compose -f $DOCKER_COMPOSE_PROD ps"
    echo "  Container Logs: docker-compose -f $DOCKER_COMPOSE_PROD logs"
    echo "  Performance: lighthouse http://localhost:80"
    echo ""
}

# Main deployment process
main() {
    echo "🚀 The Vible - Phase 4: Deployment & Launch"
    echo "=============================================="
    echo "Build Timestamp: $BUILD_TIMESTAMP"
    echo "Build Hash: $BUILD_HASH"
    echo ""
    
    # Run deployment steps
    check_prerequisites
    build_application
    build_docker_images
    deploy_containers
    
    # Wait a bit for services to stabilize
    print_status "Waiting for services to stabilize..."
    sleep 10
    
    # Run verification
    run_health_checks
    run_performance_tests
    
    # Display results
    display_deployment_info
    
    print_success "Phase 4 deployment completed successfully!"
}

# Run main function
main "$@"
