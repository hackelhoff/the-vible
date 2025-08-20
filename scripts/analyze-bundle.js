#!/usr/bin/env node

/**
 * Bundle Analysis Script for The Vible
 * Analyzes the production build bundle for optimization opportunities
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 Analyzing bundle for The Vible...\n');

try {
  // Check if dist folder exists
  if (!fs.existsSync('dist')) {
    console.log('📦 Building project first...');
    execSync('npm run build', { stdio: 'inherit' });
  }

  // Run bundle analyzer
  console.log('📊 Running bundle analyzer...');
  execSync('npx vite-bundle-analyzer dist', { stdio: 'inherit' });

  // Analyze bundle size
  const distPath = path.join(process.cwd(), 'dist');
  const analyzeFolder = (folderPath) => {
    let totalSize = 0;
    let fileCount = 0;
    
    const files = fs.readdirSync(folderPath);
    
    files.forEach(file => {
      const filePath = path.join(folderPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        const subResult = analyzeFolder(filePath);
        totalSize += subResult.size;
        fileCount += subResult.count;
      } else {
        totalSize += stats.size;
        fileCount++;
      }
    });
    
    return { size: totalSize, count: fileCount };
  };

  const result = analyzeFolder(distPath);
  
  console.log('\n📈 Bundle Analysis Results:');
  console.log(`Total files: ${result.count}`);
  console.log(`Total size: ${(result.size / 1024 / 1024).toFixed(2)} MB`);
  
  // Check for large files
  const checkLargeFiles = (folderPath, maxSize = 500 * 1024) => {
    const largeFiles = [];
    
    const scanFolder = (currentPath) => {
      const files = fs.readdirSync(currentPath);
      
      files.forEach(file => {
        const filePath = path.join(currentPath, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isDirectory()) {
          scanFolder(filePath);
        } else if (stats.size > maxSize) {
          largeFiles.push({
            path: path.relative(distPath, filePath),
            size: stats.size
          });
        }
      });
    };
    
    scanFolder(folderPath);
    return largeFiles;
  };

  const largeFiles = checkLargeFiles(distPath);
  
  if (largeFiles.length > 0) {
    console.log('\n⚠️  Large files detected (>500KB):');
    largeFiles.forEach(file => {
      console.log(`  ${file.path}: ${(file.size / 1024).toFixed(2)} KB`);
    });
  } else {
    console.log('\n✅ No excessively large files detected');
  }

  console.log('\n🎯 Optimization Recommendations:');
  console.log('1. Check if all dependencies are necessary');
  console.log('2. Consider code splitting for large components');
  console.log('3. Optimize images and assets');
  console.log('4. Use tree shaking for unused code');
  console.log('5. Consider lazy loading for routes');

} catch (error) {
  console.error('❌ Bundle analysis failed:', error.message);
  process.exit(1);
}
