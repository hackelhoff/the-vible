#!/usr/bin/env node

/**
 * Mobile Performance Test Script
 * Tests mobile-specific performance issues that could cause white screens
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class MobilePerformanceTester {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      tests: [],
      summary: {}
    };
  }

  async runTests() {
    console.log('🚀 Starting Mobile Performance Tests...\n');
    
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
        width: 375,
        height: 667,
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 2
      },
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    try {
      const page = await browser.newPage();
      
      // Set mobile user agent
      await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1');
      
      // Enable performance monitoring
      await page.setCacheEnabled(false);
      
      // Test 1: Basic Page Load
      await this.testBasicPageLoad(page);
      
      // Test 2: CSS Animation Performance
      await this.testCSSAnimations(page);
      
      // Test 3: JavaScript Execution
      await this.testJavaScriptExecution(page);
      
      // Test 4: Memory Usage
      await this.testMemoryUsage(page);
      
      // Test 5: Error Detection
      await this.testErrorDetection(page);
      
      // Generate report
      this.generateReport();
      
    } catch (error) {
      console.error('❌ Test execution failed:', error);
    } finally {
      await browser.close();
    }
  }

  async testBasicPageLoad(page) {
    console.log('📱 Testing Basic Page Load...');
    
    try {
      const startTime = Date.now();
      
      // Navigate to the page
      await page.goto('http://localhost:5173', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });
      
      const loadTime = Date.now() - startTime;
      
      // Check if content is visible
      const contentVisible = await page.evaluate(() => {
        const root = document.getElementById('root');
        return root && root.children.length > 0;
      });
      
      // Check for white screen
      const whiteScreen = await page.evaluate(() => {
        const body = document.body;
        const computedStyle = window.getComputedStyle(body);
        return computedStyle.backgroundColor === 'rgb(240, 248, 255)' || 
               computedStyle.backgroundColor === 'rgba(0, 0, 0, 0)';
      });
      
      const testResult = {
        name: 'Basic Page Load',
        passed: contentVisible && !whiteScreen,
        loadTime,
        contentVisible,
        whiteScreen,
        issues: []
      };
      
      if (!contentVisible) testResult.issues.push('No content visible');
      if (whiteScreen) testResult.issues.push('White screen detected');
      if (loadTime > 5000) testResult.issues.push('Load time too slow');
      
      this.results.tests.push(testResult);
      
      console.log(`   ${testResult.passed ? '✅' : '❌'} Load time: ${loadTime}ms`);
      console.log(`   Content visible: ${contentVisible ? 'Yes' : 'No'}`);
      console.log(`   White screen: ${whiteScreen ? 'Yes' : 'No'}`);
      
    } catch (error) {
      console.log(`   ❌ Test failed: ${error.message}`);
      this.results.tests.push({
        name: 'Basic Page Load',
        passed: false,
        error: error.message
      });
    }
  }

  async testCSSAnimations(page) {
    console.log('🎨 Testing CSS Animations...');
    
    try {
      const animationPerformance = await page.evaluate(() => {
        const start = performance.now();
        
        // Check if animations are running
        const animatedElements = document.querySelectorAll('*');
        let animationCount = 0;
        
        animatedElements.forEach(el => {
          const style = window.getComputedStyle(el);
          if (style.animationName !== 'none' || style.transitionProperty !== 'none') {
            animationCount++;
          }
        });
        
        const end = performance.now();
        
        return {
          animationCount,
          checkTime: end - start,
          hasAnimations: animationCount > 0
        };
      });
      
      const testResult = {
        name: 'CSS Animations',
        passed: animationPerformance.checkTime < 100,
        animationCount: animationPerformance.animationCount,
        checkTime: animationPerformance.checkTime,
        hasAnimations: animationPerformance.hasAnimations,
        issues: []
      };
      
      if (animationPerformance.checkTime > 100) {
        testResult.issues.push('Animation check too slow');
      }
      if (animationPerformance.animationCount > 10) {
        testResult.issues.push('Too many animations for mobile');
      }
      
      this.results.tests.push(testResult);
      
      console.log(`   ${testResult.passed ? '✅' : '❌'} Animations: ${animationPerformance.animationCount}`);
      console.log(`   Check time: ${animationPerformance.checkTime.toFixed(2)}ms`);
      
    } catch (error) {
      console.log(`   ❌ Test failed: ${error.message}`);
      this.results.tests.push({
        name: 'CSS Animations',
        passed: false,
        error: error.message
      });
    }
  }

  async testJavaScriptExecution(page) {
    console.log('⚡ Testing JavaScript Execution...');
    
    try {
      const jsPerformance = await page.evaluate(() => {
        const start = performance.now();
        
        // Simulate some JavaScript operations
        let result = 0;
        for (let i = 0; i < 1000; i++) {
          result += Math.random();
        }
        
        const end = performance.now();
        
        return {
          executionTime: end - start,
          hasErrors: false,
          errorCount: 0
        };
      });
      
      // Check for console errors
      const errors = await page.evaluate(() => {
        return window.consoleErrors || [];
      });
      
      const testResult = {
        name: 'JavaScript Execution',
        passed: jsPerformance.executionTime < 50 && errors.length === 0,
        executionTime: jsPerformance.executionTime,
        errorCount: errors.length,
        issues: []
      };
      
      if (jsPerformance.executionTime > 50) {
        testResult.issues.push('JavaScript execution too slow');
      }
      if (errors.length > 0) {
        testResult.issues.push(`${errors.length} JavaScript errors detected`);
      }
      
      this.results.tests.push(testResult);
      
      console.log(`   ${testResult.passed ? '✅' : '❌'} Execution time: ${jsPerformance.executionTime.toFixed(2)}ms`);
      console.log(`   Errors: ${errors.length}`);
      
    } catch (error) {
      console.log(`   ❌ Test failed: ${error.message}`);
      this.results.tests.push({
        name: 'JavaScript Execution',
        passed: false,
        error: error.message
      });
    }
  }

  async testMemoryUsage(page) {
    console.log('💾 Testing Memory Usage...');
    
    try {
      const memoryInfo = await page.evaluate(() => {
        if ('memory' in performance) {
          return {
            usedJSHeapSize: performance.memory.usedJSHeapSize,
            totalJSHeapSize: performance.memory.totalJSHeapSize,
            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
            memoryUsage: (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100
          };
        }
        return null;
      });
      
      const testResult = {
        name: 'Memory Usage',
        passed: !memoryInfo || memoryInfo.memoryUsage < 80,
        memoryInfo,
        issues: []
      };
      
      if (memoryInfo && memoryInfo.memoryUsage > 80) {
        testResult.issues.push('Memory usage too high');
      }
      
      this.results.tests.push(testResult);
      
      if (memoryInfo) {
        console.log(`   ${testResult.passed ? '✅' : '❌'} Memory usage: ${memoryInfo.memoryUsage.toFixed(1)}%`);
        console.log(`   Used: ${(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(1)}MB`);
      } else {
        console.log(`   ℹ️  Memory info not available`);
      }
      
    } catch (error) {
      console.log(`   ❌ Test failed: ${error.message}`);
      this.results.tests.push({
        name: 'Memory Usage',
        passed: false,
        error: error.message
      });
    }
  }

  async testErrorDetection(page) {
    console.log('🚨 Testing Error Detection...');
    
    try {
      const errors = await page.evaluate(() => {
        return {
          consoleErrors: window.consoleErrors || [],
          unhandledErrors: window.unhandledErrors || [],
          networkErrors: window.networkErrors || []
        };
      });
      
      const testResult = {
        name: 'Error Detection',
        passed: errors.consoleErrors.length === 0 && errors.unhandledErrors.length === 0,
        errorCounts: errors,
        issues: []
      };
      
      if (errors.consoleErrors.length > 0) {
        testResult.issues.push(`${errors.consoleErrors.length} console errors`);
      }
      if (errors.unhandledErrors.length > 0) {
        testResult.issues.push(`${errors.unhandledErrors.length} unhandled errors`);
      }
      if (errors.networkErrors.length > 0) {
        testResult.issues.push(`${errors.networkErrors.length} network errors`);
      }
      
      this.results.tests.push(testResult);
      
      console.log(`   ${testResult.passed ? '✅' : '❌'} Console errors: ${errors.consoleErrors.length}`);
      console.log(`   Unhandled errors: ${errors.unhandledErrors.length}`);
      console.log(`   Network errors: ${errors.networkErrors.length}`);
      
    } catch (error) {
      console.log(`   ❌ Test failed: ${error.message}`);
      this.results.tests.push({
        name: 'Error Detection',
        passed: false,
        error: error.message
      });
    }
  }

  generateReport() {
    console.log('\n📊 Generating Test Report...\n');
    
    const passedTests = this.results.tests.filter(t => t.passed).length;
    const totalTests = this.results.tests.length;
    const successRate = (passedTests / totalTests) * 100;
    
    this.results.summary = {
      totalTests,
      passedTests,
      failedTests: totalTests - passedTests,
      successRate: successRate.toFixed(1)
    };
    
    console.log('📋 Test Summary:');
    console.log(`   Total Tests: ${totalTests}`);
    console.log(`   Passed: ${passedTests}`);
    console.log(`   Failed: ${totalTests - passedTests}`);
    console.log(`   Success Rate: ${successRate.toFixed(1)}%`);
    
    // Show failed tests
    const failedTests = this.results.tests.filter(t => !t.passed);
    if (failedTests.length > 0) {
      console.log('\n❌ Failed Tests:');
      failedTests.forEach(test => {
        console.log(`   ${test.name}:`);
        if (test.issues && test.issues.length > 0) {
          test.issues.forEach(issue => console.log(`     - ${issue}`));
        }
        if (test.error) {
          console.log(`     - Error: ${test.error}`);
        }
      });
    }
    
    // Save report
    const reportPath = path.join(__dirname, 'mobile-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\n📄 Report saved to: ${reportPath}`);
    
    // Recommendations
    console.log('\n💡 Recommendations:');
    if (successRate < 80) {
      console.log('   - Review failed tests and fix issues');
      console.log('   - Consider reducing CSS animations on mobile');
      console.log('   - Optimize JavaScript execution');
    } else if (successRate < 100) {
      console.log('   - Minor optimizations needed');
      console.log('   - Monitor performance in production');
    } else {
      console.log('   - Excellent mobile performance!');
      console.log('   - Ready for production');
    }
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new MobilePerformanceTester();
  tester.runTests().catch(console.error);
}

module.exports = MobilePerformanceTester;
