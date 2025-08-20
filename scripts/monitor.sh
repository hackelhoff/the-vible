#!/bin/bash

# The Vible - Phase 4 Monitoring Script
# Production monitoring and analytics

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="the-vible"
DOCKER_COMPOSE_PROD="docker-compose.prod.yml"
LOG_FILE="monitoring.log"
PERFORMANCE_FILE="performance-report.json"

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

# Function to log messages
log_message() {
    local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    echo "[$timestamp] $1" >> "$LOG_FILE"
}

# Function to check container status
check_container_status() {
    print_status "Checking container status..."
    
    if docker-compose -f "$DOCKER_COMPOSE_PROD" ps | grep -q "Up"; then
        print_success "All containers are running"
        log_message "Container status: All containers running"
    else
        print_error "Some containers are not running"
        log_message "Container status: Some containers not running"
        docker-compose -f "$DOCKER_COMPOSE_PROD" ps
        return 1
    fi
}

# Function to check service health
check_service_health() {
    print_status "Checking service health..."
    
    local services=("http://localhost:3000/health" "http://localhost:3001/health" "http://localhost:80/health")
    local all_healthy=true
    
    for service in "${services[@]}"; do
        if curl -f "$service" >/dev/null 2>&1; then
            print_success "Health check passed: $service"
            log_message "Health check passed: $service"
        else
            print_error "Health check failed: $service"
            log_message "Health check failed: $service"
            all_healthy=false
        fi
    done
    
    if [ "$all_healthy" = false ]; then
        return 1
    fi
}

# Function to check performance metrics
check_performance() {
    print_status "Checking performance metrics..."
    
    # Check if lighthouse is available
    if command -v lighthouse >/dev/null 2>&1; then
        print_status "Running Lighthouse performance test..."
        lighthouse http://localhost:80 --output=json --output-path="$PERFORMANCE_FILE" --chrome-flags='--headless'
        
        if [ -f "$PERFORMANCE_FILE" ]; then
            print_success "Performance test completed"
            log_message "Performance test completed: $PERFORMANCE_FILE"
            
            # Extract key metrics
            local fcp=$(cat "$PERFORMANCE_FILE" | grep -o '"firstContentfulPaint":[0-9]*' | cut -d':' -f2)
            local lcp=$(cat "$PERFORMANCE_FILE" | grep -o '"largestContentfulPaint":[0-9]*' | cut -d':' -f2)
            local score=$(cat "$PERFORMANCE_FILE" | grep -o '"score":[0-9]*\.[0-9]*' | cut -d':' -f2)
            
            echo "Performance Metrics:"
            echo "  First Contentful Paint: ${fcp}ms"
            echo "  Largest Contentful Paint: ${lcp}ms"
            echo "  Lighthouse Score: ${score}"
            
            log_message "Performance metrics - FCP: ${fcp}ms, LCP: ${lcp}ms, Score: ${score}"
        else
            print_warning "Performance test failed"
            log_message "Performance test failed"
        fi
    else
        print_warning "Lighthouse not available - skipping performance test"
        log_message "Lighthouse not available - skipping performance test"
    fi
}

# Function to check resource usage
check_resource_usage() {
    print_status "Checking resource usage..."
    
    echo "Container Resource Usage:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
    
    # Log resource usage
    local cpu_usage=$(docker stats --no-stream --format "{{.CPUPerc}}" | tr '\n' ' ')
    local mem_usage=$(docker stats --no-stream --format "{{.MemUsage}}" | tr '\n' ' ')
    
    log_message "Resource usage - CPU: $cpu_usage, Memory: $mem_usage"
}

# Function to check logs for errors
check_logs() {
    print_status "Checking container logs for errors..."
    
    local error_count=0
    
    # Check frontend logs
    if docker-compose -f "$DOCKER_COMPOSE_PROD" logs frontend 2>/dev/null | grep -i "error\|exception\|fail" >/dev/null; then
        print_warning "Errors found in frontend logs"
        log_message "Errors found in frontend logs"
        ((error_count++))
    fi
    
    # Check backend logs
    if docker-compose -f "$DOCKER_COMPOSE_PROD" logs backend 2>/dev/null | grep -i "error\|exception\|fail" >/dev/null; then
        print_warning "Errors found in backend logs"
        log_message "Errors found in backend logs"
        ((error_count++))
    fi
    
    # Check nginx logs
    if docker-compose -f "$DOCKER_COMPOSE_PROD" logs nginx 2>/dev/null | grep -i "error\|exception\|fail" >/dev/null; then
        print_warning "Errors found in nginx logs"
        log_message "Errors found in nginx logs"
        ((error_count++))
    fi
    
    if [ $error_count -eq 0 ]; then
        print_success "No errors found in logs"
        log_message "No errors found in logs"
    fi
}

# Function to check disk usage
check_disk_usage() {
    print_status "Checking disk usage..."
    
    local disk_usage=$(df -h . | tail -1 | awk '{print $5}')
    local available_space=$(df -h . | tail -1 | awk '{print $4}')
    
    echo "Disk Usage: $disk_usage used, $available_space available"
    log_message "Disk usage: $disk_usage used, $available_space available"
    
    # Check if usage is high (>80%)
    local usage_percent=$(echo $disk_usage | sed 's/%//')
    if [ $usage_percent -gt 80 ]; then
        print_warning "High disk usage detected: $disk_usage"
        log_message "High disk usage warning: $disk_usage"
    fi
}

# Function to generate monitoring report
generate_report() {
    print_status "Generating monitoring report..."
    
    local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    local report_file="monitoring-report-$(date +%Y%m%d-%H%M%S).txt"
    
    {
        echo "The Vible - Phase 4 Monitoring Report"
        echo "====================================="
        echo "Generated: $timestamp"
        echo ""
        echo "Container Status:"
        docker-compose -f "$DOCKER_COMPOSE_PROD" ps
        echo ""
        echo "Resource Usage:"
        docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
        echo ""
        echo "Recent Logs (last 10 lines):"
        echo "Frontend:"
        docker-compose -f "$DOCKER_COMPOSE_PROD" logs --tail=10 frontend
        echo ""
        echo "Backend:"
        docker-compose -f "$DOCKER_COMPOSE_PROD" logs --tail=10 backend
        echo ""
        echo "Nginx:"
        docker-compose -f "$DOCKER_COMPOSE_PROD" logs --tail=10 nginx
    } > "$report_file"
    
    print_success "Monitoring report generated: $report_file"
    log_message "Monitoring report generated: $report_file"
}

# Function to display monitoring dashboard
display_dashboard() {
    echo ""
    echo "📊 The Vible - Phase 4 Monitoring Dashboard"
    echo "============================================"
    echo "Timestamp: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
    echo ""
    
    # Container status
    echo "🐳 Container Status:"
    docker-compose -f "$DOCKER_COMPOSE_PROD" ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
    echo ""
    
    # Health status
    echo "❤️  Health Status:"
    local services=("Frontend" "Backend" "Nginx")
    local endpoints=("http://localhost:3000/health" "http://localhost:3001/health" "http://localhost:80/health")
    
    for i in "${!services[@]}"; do
        if curl -f "${endpoints[$i]}" >/dev/null 2>&1; then
            echo "  ✅ ${services[$i]}: Healthy"
        else
            echo "  ❌ ${services[$i]}: Unhealthy"
        fi
    done
    echo ""
    
    # Resource usage summary
    echo "💾 Resource Usage:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
    echo ""
    
    # Log summary
    echo "📝 Recent Activity:"
    echo "  Log file: $LOG_FILE"
    echo "  Performance file: $PERFORMANCE_FILE"
    echo ""
}

# Main monitoring process
main() {
    echo "📊 The Vible - Phase 4: Production Monitoring"
    echo "=============================================="
    
    # Initialize log file
    touch "$LOG_FILE"
    log_message "Monitoring session started"
    
    # Run monitoring checks
    check_container_status
    check_service_health
    check_performance
    check_resource_usage
    check_logs
    check_disk_usage
    
    # Generate report
    generate_report
    
    # Display dashboard
    display_dashboard
    
    print_success "Monitoring completed successfully!"
    log_message "Monitoring session completed"
}

# Check if script is run with arguments
if [ "$1" = "continuous" ]; then
    print_status "Starting continuous monitoring (press Ctrl+C to stop)..."
    while true; do
        main
        sleep 300  # Run every 5 minutes
    done
else
    # Run once
    main "$@"
fi
