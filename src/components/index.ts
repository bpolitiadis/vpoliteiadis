// UI Components - Named exports from ui/index.ts
export * from './ui';

// Custom Components
export { default as DecryptedText } from './DecryptedText';
export { default as ElectricBorder } from './ElectricBorder';
export { default as FeaturedProjectCard } from './FeaturedProjectCard';
export { default as FuzzyText } from './FuzzyText';
export { default as LightboxGallery } from './LightboxGallery';
export { default as TextType } from './TextType';

// Astro Components
export { default as Footer } from './Footer.astro';
export { default as GlassCard } from './GlassCard.astro';
export { default as HeroIntro } from './hero/HeroIntro.astro';
export { default as Navbar } from './Navbar.astro';
export { default as NeonCTA } from './NeonCTA.astro';
export { default as PageHero } from './PageHero.astro';
export { default as ScreenshotFrame } from './ScreenshotFrame.astro';
export { default as SocialLink } from './SocialLink.astro';
export { default as SpotifyEmbed } from './SpotifyEmbed.astro';
export { default as AImage } from './media/AImage.astro';
// Removed legacy image wrappers in favor of astro:assets or <img>

// SEO Components (2025)
export { default as Seo } from './Seo.astro';
export { default as SchemaOrg } from './SchemaOrg.astro';
export { default as Breadcrumb } from './Breadcrumb.astro';
