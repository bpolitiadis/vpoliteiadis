import type { Logger } from 'pino';
import type { RequestContext } from '../lib/logger.js';

declare global {
  namespace App {
    interface Locals {
      requestContext?: RequestContext;
      logger?: Logger;
    }
  }
}

export {};
