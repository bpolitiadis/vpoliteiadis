import { type FullConfig } from '@playwright/test';
import { config as loadDotenv } from 'dotenv';
import { resolve } from 'path';

async function globalSetup(_config: FullConfig) {
  // Load environment variables from .env file
  const envPath = resolve(process.cwd(), '.env');
  loadDotenv({ path: envPath });
  
  // Also load from .env.example for reference
  const envExamplePath = resolve(process.cwd(), '.env.example');
  loadDotenv({ path: envExamplePath });
  
  console.log('🔧 Global setup: Environment variables loaded');
  
  // Check if Resend API key is configured
  if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('xxxxxxxx')) {
    console.log('✅ Resend API key is configured - real API tests will run');
  } else {
    console.log('⚠️  Resend API key not configured or is placeholder - real API tests will be skipped');
  }
  
  // Check if FROM_EMAIL is configured
  if (process.env.FROM_EMAIL && !process.env.FROM_EMAIL.includes('yourdomain.com')) {
    console.log('✅ FROM_EMAIL is configured');
  } else {
    console.log('⚠️  FROM_EMAIL not configured or is placeholder');
  }
  
  // Check if CONTACT_EMAIL is configured
  if (process.env.CONTACT_EMAIL && !process.env.CONTACT_EMAIL.includes('yourdomain.com')) {
    console.log('✅ CONTACT_EMAIL is configured');
  } else {
    console.log('⚠️  CONTACT_EMAIL not configured or is placeholder');
  }
}

export default globalSetup;
