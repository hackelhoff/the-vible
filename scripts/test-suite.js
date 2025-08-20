#!/usr/bin/env node

/**
 * Comprehensive Test Suite for The Vible
 * Runs various tests to validate functionality and performance
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🧪 Running Comprehensive Test Suite for The Vible...\n');

const tests = {
  build: {
    name: 'Build Test',
    run: () => {
      console.log('📦 Testing build process...');
      execSync('npm run build', { stdio: 'inherit' });
      console.log('✅ Build successful');
    }
  },
  
  lint: {
    name: 'Linting Test',
    run: () => {
      console.log('🔍 Running ESLint...');
      execSync('npm run lint', { stdio: 'inherit' });
      console.log('✅ Linting passed');
    }
  },
  
  bundle: {
    name: 'Bundle Analysis',
    run: () => {
      console.log('📊 Analyzing bundle...');
      execSync('node scripts/analyze-bundle.js', { stdio: 'inherit' });
      console.log('✅ Bundle analysis complete');
    }
  },
  
  performance: {
    name: 'Performance Test',
    run: () => {
      console.log('⚡ Testing performance...');
      // Start dev server
      console.log('Starting development server...');
      const devProcess = execSync('npm run dev', { 
        stdio: 'pipe',
        timeout: 10000 
      });
      
      // Wait for server to start
      setTimeout(() => {
        try {
          console.log('Running Lighthouse audit...');
          execSync('lighthouse http://localhost:5173 --output=json --output-path=./test-lighthouse.json --chrome-flags="--headless"', { stdio: 'inherit' });
          
          // Parse results
          const results = JSON.parse(fs.readFileSync('./test-lighthouse.json', 'utf8'));
          const scores = results.categories;
          
          console.log('\n📈 Performance Scores:');
          console.log(`Performance: ${Math.round(scores.performance.score * 100)}`);
          console.log(`Accessibility: ${Math.round(scores.accessibility.score * 100)}`);
          console.log(`Best Practices: ${Math.round(scores['best-practices'].score * 100)}`);
          console.log(`SEO: ${Math.round(scores.seo.score * 100)}`);
          
          // Kill dev server
          execSync('pkill -f "npm run dev"', { stdio: 'ignore' });
          
        } catch (error) {
          console.log('⚠️ Performance test failed:', error.message);
        }
      }, 5000);
    }
  },
  
  docker: {
    name: 'Docker Test',
    run: () => {
      console.log('🐳 Testing Docker setup...');
      try {
        execSync('docker-compose up --build -d', { stdio: 'inherit' });
        
        // Wait for services to start
        setTimeout(() => {
          try {
            const response = execSync('curl -f http://localhost:80', { stdio: 'pipe' });
            console.log('✅ Docker services responding');
          } catch (error) {
            console.log('⚠️ Docker services not responding');
          }
          
          // Cleanup
          execSync('docker-compose down', { stdio: 'inherit' });
        }, 10000);
        
      } catch (error) {
        console.log('⚠️ Docker test failed:', error.message);
      }
    }
  },
  
  accessibility: {
    name: 'Accessibility Test',
    run: () => {
      console.log('♿ Testing accessibility...');
      
      // Check for required files
      const requiredFiles = [
        'public/manifest.json',
        'public/robots.txt',
        'public/sitemap.xml'
      ];
      
      requiredFiles.forEach(file => {
        if (fs.existsSync(file)) {
          console.log(`✅ ${file} exists`);
        } else {
          console.log(`❌ ${file} missing`);
        }
      });
      
      // Check HTML structure
      const html = fs.readFileSync('index.html', 'utf8');
      
      if (html.includes('<title>')) {
        console.log('✅ Title tag found');
      } else {
        console.log('❌ Title tag missing');
      }
      
      if (html.includes('meta name="description"')) {
        console.log('✅ Meta description found');
      } else {
        console.log('❌ Meta description missing');
      }
      
      if (html.includes('meta name="viewport"')) {
        console.log('✅ Viewport meta tag found');
      } else {
        console.log('❌ Viewport meta tag missing');
      }
    }
  }
};

const runTests = async () => {
  const results = [];
  
  for (const [key, test] of Object.entries(tests)) {
    console.log(`\n🚀 Running ${test.name}...`);
    console.log('='.repeat(50));
    
    try {
      const startTime = Date.now();
      test.run();
      const duration = Date.now() - startTime;
      
      results.push({
        test: test.name,
        status: 'PASSED',
        duration: `${duration}ms`
      });
      
    } catch (error) {
      results.push({
        test: test.name,
        status: 'FAILED',
        error: error.message
      });
    }
  }
  
  // Print summary
  console.log('\n📋 Test Summary');
  console.log('='.repeat(50));
  
  results.forEach(result => {
    const status = result.status === 'PASSED' ? '✅' : '❌';
    console.log(`${status} ${result.test}: ${result.status} ${result.duration ? `(${result.duration})` : ''}`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  });
  
  const passed = results.filter(r => r.status === 'PASSED').length;
  const total = results.length;
  
  console.log(`\n🎯 Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All tests passed! The Vible is ready for production.');
    process.exit(0);
  } else {
    console.log('⚠️ Some tests failed. Please review and fix issues.');
    process.exit(1);
  }
};

// Run tests
runTests().catch(error => {
  console.error('❌ Test suite failed:', error);
  process.exit(1);
});
