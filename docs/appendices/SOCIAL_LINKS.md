# Social Links System

This document explains how the social media links system works and how to add or update social profiles.

## Overview

The social links system provides smart deep-linking for mobile users while maintaining web fallbacks for desktop users. It automatically detects mobile devices and attempts to open native apps when available.

## How It Works

1. **Mobile Detection**: Automatically detects mobile devices using user agent detection
2. **Deep Link Attempt**: Tries to open native apps using platform-specific deep link URLs
3. **Fallback**: If deep linking fails, falls back to web URLs
4. **Analytics**: Tracks clicks with platform and route information

## Supported Platforms

- **Instagram**: `instagram://user?username=...` → `https://instagram.com/...`
- **LinkedIn**: `linkedin://profile/...` → `https://linkedin.com/in/...`
- **GitHub**: Direct HTTPS links (no deep linking needed)

## Configuration

All social profiles are configured in `src/lib/social-config.ts`:

```typescript
export const socialProfiles: SocialProfile[] = [
  {
    platform: 'github',
    username: 'bpolitiadis',
    displayName: 'GitHub',
    deepLink: 'https://github.com/bpolitiadis', // GitHub doesn't need deep linking
    webUrl: 'https://github.com/bpolitiadis',
    icon: 'github',
    ariaLabel: 'GitHub profile'
  },
  {
    platform: 'linkedin',
    username: 'vasileios-politeiadis',
    displayName: 'LinkedIn',
    deepLink: 'linkedin://profile/vasileios-politeiadis',
    webUrl: 'https://www.linkedin.com/in/vasileios-politeiadis/',
    icon: 'linkedin',
    ariaLabel: 'LinkedIn profile'
  },
  // ... more platforms
];
```

## Adding a New Social Platform

1. **Update the configuration** in `src/lib/social-config.ts`:
   ```typescript
   {
     platform: 'twitter', // or 'x', 'youtube', etc.
     username: 'your-handle',
     displayName: 'Twitter',
     deepLink: 'twitter://user?screen_name=your-handle',
     webUrl: 'https://twitter.com/your-handle',
     icon: 'twitter',
     ariaLabel: 'Twitter profile'
   }
   ```

2. **Add the icon** to `src/components/SocialLink.astro`:
   ```astro
   {profile.icon === 'twitter' && (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class={iconSize}>
       <!-- SVG path for Twitter/X icon -->
     </svg>
   )}
   ```

3. **Update deep linking logic** in `SocialLinkHandler.shouldTryDeepLink()` if needed:
   ```typescript
   private shouldTryDeepLink(platform: string): boolean {
     return ['instagram', 'linkedin', 'twitter'].includes(platform);
   }
   ```

## Updating Existing Profiles

To update a social profile (e.g., change username, add new platform):

1. **Edit** `src/lib/social-config.ts`
2. **Update** the relevant profile object
3. **Test** the deep linking on mobile devices
4. **Verify** web fallbacks work on desktop

## Deep Link URLs

Common deep link patterns:

- **Instagram**: `instagram://user?username=username`
- **LinkedIn**: `linkedin://profile/username` or `linkedin://company/company-name`
- **Twitter/X**: `twitter://user?screen_name=username`
- **YouTube**: `youtube://channel/CHANNEL_ID`
- **Facebook**: `fb://profile/PROFILE_ID`

## Analytics

The system automatically tracks:
- Platform clicked (e.g., 'instagram', 'linkedin')
- Route taken ('deep-link' or 'web-fallback')
- Timestamp of click

Analytics are sent to:
- Vercel Analytics (if available)
- Google Analytics (if gtag is configured)
- Console logs (in development)

## Testing

1. **Mobile Testing**: Use browser dev tools to simulate mobile devices
2. **Deep Link Testing**: Install the relevant apps and test deep linking
3. **Fallback Testing**: Test on desktop or devices without apps installed
4. **Analytics Testing**: Check console logs and analytics dashboards

## Troubleshooting

**Deep links not working?**
- Verify the deep link URL format is correct
- Check if the app supports the deep link scheme
- Test on actual mobile devices (not just browser simulation)

**Analytics not tracking?**
- Ensure Vercel Analytics is properly configured
- Check browser console for errors
- Verify the analytics service is loaded

**Icons not displaying?**
- Check if the icon name matches the configuration
- Verify the SVG path is correct
- Ensure the icon is added to the SocialLink component

## Performance Considerations

- Deep linking detection is lightweight and only runs on click
- No external dependencies added
- Minimal JavaScript footprint
- Graceful degradation for unsupported platforms

## Accessibility

- All links have proper `aria-label` attributes
- Keyboard navigation supported
- Screen reader friendly
- High contrast hover states
