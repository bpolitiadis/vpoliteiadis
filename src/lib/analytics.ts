interface SocialClickEvent {
  platform: string;
  route: 'deep-link' | 'web-fallback';
  timestamp: number;
}

class Analytics {
  private static instance: Analytics;
  private events: SocialClickEvent[] = [];

  private constructor() {}

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  trackSocialClick(platform: string, route: 'deep-link' | 'web-fallback'): void {
    const event: SocialClickEvent = {
      platform,
      route,
      timestamp: Date.now()
    };

    this.events.push(event);

    // Log to console in development
    if (import.meta.env.DEV) {
      // Social click tracked (development only)
      if (import.meta.env.MODE === 'development') {
        console.log('Social click tracked:', event);
      }
    }

    // Send to analytics service if configured
    this.sendToAnalytics(event);
  }

  private sendToAnalytics(event: SocialClickEvent): void {
    // Check if we have a global analytics function (e.g., gtag, plausible, etc.)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'social_click', {
        platform: event.platform,
        route: event.route,
        timestamp: event.timestamp
      });
    }

    // Note: Vercel Analytics is handled automatically by the Astro integration
    // in MainLayout.astro - no need to call it manually here
  }

  getEvents(): SocialClickEvent[] {
    return [...this.events];
  }

  clearEvents(): void {
    this.events = [];
  }
}

export const analytics = Analytics.getInstance();

// Type declaration for global analytics functions
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
