#!/usr/bin/env node

/**
 * Contact Form Test Runner
 * 
 * This script provides convenient commands for running contact form tests
 * with different configurations and options.
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const projectRoot = process.cwd();
const testDir = join(projectRoot, 'tests');

// Check if tests directory exists
if (!existsSync(testDir)) {
  console.error('❌ Tests directory not found. Please run this script from the project root.');
  process.exit(1);
}

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0] || 'help';

const commands = {
  help: () => {
    console.log(`
🚀 Contact Form Test Runner

Available commands:
  help              Show this help message
  install           Install Playwright browsers
  run               Run all contact form tests
  run:headed        Run tests with browser UI
  run:debug         Run tests in debug mode
  run:ui            Run tests with Playwright UI
  run:report        Show test report
  run:chromium      Run tests on Chromium only
  run:firefox       Run tests on Firefox only
  run:webkit        Run tests on WebKit only
  run:mobile        Run tests on mobile viewports
  run:focused       Run focused test suite only
  run:comprehensive Run comprehensive test suite only
  run:mock          Run mocked API tests only
  run:real          Run real API tests only
  run:all           Run all contact form tests

Examples:
  node scripts/run-contact-tests.mjs run
  node scripts/run-contact-tests.mjs run:headed
  node scripts/run-contact-tests.mjs run:debug
    `);
  },

  install: () => {
    console.log('📦 Installing Playwright browsers...');
    execSync('pnpm exec playwright install', { stdio: 'inherit' });
    console.log('✅ Playwright browsers installed successfully!');
  },

  run: () => {
    console.log('🧪 Running all contact form tests...');
    execSync('pnpm exec playwright test contact-form', { stdio: 'inherit' });
  },

  'run:headed': () => {
    console.log('🧪 Running contact form tests with browser UI...');
    execSync('pnpm exec playwright test contact-form --headed', { stdio: 'inherit' });
  },

  'run:debug': () => {
    console.log('🐛 Running contact form tests in debug mode...');
    execSync('pnpm exec playwright test contact-form --debug', { stdio: 'inherit' });
  },

  'run:ui': () => {
    console.log('🎨 Running contact form tests with Playwright UI...');
    execSync('pnpm exec playwright test contact-form --ui', { stdio: 'inherit' });
  },

  'run:report': () => {
    console.log('📊 Opening test report...');
    execSync('pnpm exec playwright show-report', { stdio: 'inherit' });
  },

  'run:chromium': () => {
    console.log('🧪 Running contact form tests on Chromium...');
    execSync('pnpm exec playwright test contact-form --project=chromium', { stdio: 'inherit' });
  },

  'run:firefox': () => {
    console.log('🧪 Running contact form tests on Firefox...');
    execSync('pnpm exec playwright test contact-form --project=firefox', { stdio: 'inherit' });
  },

  'run:webkit': () => {
    console.log('🧪 Running contact form tests on WebKit...');
    execSync('pnpm exec playwright test contact-form --project=webkit', { stdio: 'inherit' });
  },

  'run:mobile': () => {
    console.log('📱 Running contact form tests on mobile viewports...');
    execSync('pnpm exec playwright test contact-form --project="Mobile Chrome" --project="Mobile Safari"', { stdio: 'inherit' });
  },

  'run:focused': () => {
    console.log('🎯 Running focused contact form tests...');
    execSync('pnpm exec playwright test contact-form-focused.spec.ts', { stdio: 'inherit' });
  },

  'run:comprehensive': () => {
    console.log('📋 Running comprehensive contact form tests...');
    execSync('pnpm exec playwright test contact-form.spec.ts', { stdio: 'inherit' });
  },

  'run:mock': () => {
    console.log('🎭 Running mocked contact form tests...');
    execSync('pnpm exec playwright test contact-form.spec.ts contact-form-focused.spec.ts', { stdio: 'inherit' });
  },

  'run:real': () => {
    console.log('📧 Running real API contact form tests...');
    execSync('pnpm exec playwright test contact-form-real-api.spec.ts', { stdio: 'inherit' });
  },

  'run:all': () => {
    console.log('🧪 Running all contact form tests...');
    execSync('pnpm exec playwright test contact-form', { stdio: 'inherit' });
  },
};

// Execute command
if (commands[command]) {
  try {
    commands[command]();
  } catch (error) {
    console.error('❌ Error running command:', error.message);
    process.exit(1);
  }
} else {
  console.error(`❌ Unknown command: ${command}`);
  commands.help();
  process.exit(1);
}
