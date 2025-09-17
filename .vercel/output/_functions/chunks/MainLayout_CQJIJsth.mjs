import { b as createAstro, c as createComponent, a as renderTemplate, f as addAttribute, r as renderComponent, m as maybeRenderHead, h as renderSlot, v as renderHead, u as unescapeHTML } from './astro/server_oRAxjIhj.mjs';
import { jsx } from 'react/jsx-runtime';
import { Award, GraduationCap, Calendar, Clock, Info, Check, Video, Image, Play, Github, Instagram, Linkedin, Palette, Code, Monitor, Briefcase, Phone, Mail, ExternalLink, ArrowRight, ChevronRight, X, Menu } from 'lucide-react';
import './index_MaT6fT73.mjs';
import { $ as $$Image } from './_astro_assets_CaKx1WID.mjs';
/* empty css                         */
import 'clsx';

const sizeClasses = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
  "2xl": "w-10 h-10"
};
const iconMap = {
  menu: Menu,
  x: X,
  chevronright: ChevronRight,
  arrowright: ArrowRight,
  externallink: ExternalLink,
  mail: Mail,
  phone: Phone,
  briefcase: Briefcase,
  monitor: Monitor,
  code: Code,
  palette: Palette,
  linkedin: Linkedin,
  instagram: Instagram,
  github: Github,
  play: Play,
  image: Image,
  video: Video,
  check: Check,
  info: Info,
  clock: Clock,
  calendar: Calendar,
  graduationcap: GraduationCap,
  award: Award
};
function Icon({
  name,
  size = "md",
  className = "",
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden = false,
  ...props
}) {
  const iconKey = name.toLowerCase();
  const IconComponent = iconMap[iconKey];
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  return /* @__PURE__ */ jsx(
    IconComponent,
    {
      className: `${sizeClasses[size]} ${className}`.trim(),
      "aria-label": ariaLabel,
      "aria-hidden": ariaHidden || !ariaLabel,
      role: ariaLabel ? "img" : void 0,
      ...props
    }
  );
}
const MonitorIcon = (props) => /* @__PURE__ */ jsx(Icon, { name: "monitor", ...props });
const PaletteIcon = (props) => /* @__PURE__ */ jsx(Icon, { name: "palette", ...props });
const LinkedInIcon = (props) => /* @__PURE__ */ jsx(Icon, { name: "linkedin", ...props });
const InstagramIcon = (props) => /* @__PURE__ */ jsx(Icon, { name: "instagram", ...props });
const GitHubIcon = (props) => /* @__PURE__ */ jsx(Icon, { name: "github", ...props });
const GraduationIcon = (props) => /* @__PURE__ */ jsx(Icon, { name: "graduationcap", ...props });
const AwardIcon = (props) => /* @__PURE__ */ jsx(Icon, { name: "award", ...props });

const vpLogo = new Proxy({"src":"/_astro/vp-logo.iyFvXQpG.png","width":2048,"height":2048,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/vpoliteiadis/workspace/vpoliteiadis/src/assets/images/vp-logo.png";
							}
							
							return target[name];
						}
					});

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$2 = createAstro("https://vpoliteiadis.com");
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Navbar;
  const { currentPath = "/" } = Astro2.props;
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/creative", label: "Creative" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" }
  ];
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<nav class="navbar-compact sticky top-0 z-50 w-full bg-matrix-black border-b border-neon-lime/10 transition-all duration-200" role="navigation" aria-label="Main navigation" data-testid="navbar" data-astro-cid-5blmo7yk> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-5blmo7yk> <div class="flex justify-between items-center h-14 md:h-16" data-astro-cid-5blmo7yk> <!-- Left: VP logo with subtle glow --> <div class="flex-shrink-0" data-astro-cid-5blmo7yk> <a href="/" class="flex items-center space-x-3 group" aria-label="Vasileios Politeiadis - Home" data-testid="navbar-logo" data-astro-cid-5blmo7yk> <div class="logo-container relative" data-astro-cid-5blmo7yk> ', ' <!-- Subtle neon glow effect --> <div class="logo-glow absolute inset-0 rounded-md bg-neon-lime/15 blur-sm group-hover:bg-neon-lime/25 transition-all duration-200" aria-hidden="true" data-astro-cid-5blmo7yk></div> </div> <span class="font-orbitron font-bold text-neon-lime text-base md:text-lg hidden sm:block group-hover:text-neon-lime/90 transition-colors duration-200" data-astro-cid-5blmo7yk>\nVasileios Politeiadis\n</span> </a> </div> <!-- Desktop Navigation: Horizontal with compact spacing --> <div class="hidden md:block" data-testid="navbar-desktop-menu" data-astro-cid-5blmo7yk> <div class="flex items-center space-x-2 lg:space-x-3" role="menubar" data-astro-cid-5blmo7yk> ', ' </div> </div> <!-- Right side: Mobile Menu Button --> <div class="flex items-center" data-astro-cid-5blmo7yk> <!-- Mobile menu button with subtle cyan border --> <button id="mobile-menu-button" class="mobile-menu-btn md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent text-neon-cyan hover:text-neon-cyan/80 hover:bg-neon-cyan/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/40 focus-visible:ring-offset-2 focus-visible:ring-offset-matrix-black" aria-label="Toggle mobile navigation menu" aria-expanded="false" aria-controls="mobile-menu" aria-haspopup="menu" data-testid="mobile-menu-button" data-astro-cid-5blmo7yk> <!-- Hamburger icon --> ', " <!-- Close icon --> ", ' </button> </div> </div> <!-- Mobile Navigation Menu: Compact dropdown covering only top portion --> <div id="mobile-menu" class="mobile-menu hidden md:hidden fixed top-0 left-0 right-0 bg-matrix-black z-50 shadow-lg" role="menu" aria-labelledby="mobile-menu-button" data-testid="mobile-menu" data-astro-cid-5blmo7yk> <div class="flex flex-col" data-astro-cid-5blmo7yk> <!-- Mobile menu header --> <div class="flex justify-end items-center p-4 border-b border-neon-lime/10" data-astro-cid-5blmo7yk> <button id="mobile-close-button" class="p-2 text-neon-lime hover:text-neon-lime/80 transition-colors duration-200" aria-label="Close menu" data-testid="mobile-menu-close" data-astro-cid-5blmo7yk> ', ' </button> </div> <!-- Mobile navigation links --> <div class="px-4 py-6 space-y-2" data-testid="mobile-nav-links" data-astro-cid-5blmo7yk> ', ' </div> </div> </div> </div> </nav> <script src="/scripts/navbar.js" defer><\/script> '])), maybeRenderHead(), renderComponent($$result, "Image", $$Image, { "src": vpLogo, "alt": "Vasileios Politeiadis logo", "class": "w-7 h-7 md:w-8 md:h-8 rounded-md object-contain transition-transform duration-200 group-hover:scale-105", "width": 32, "height": 32, "loading": "eager", "decoding": "async", "fetchpriority": "high", "sizes": "(max-width: 768px) 28px, 32px", "data-astro-cid-5blmo7yk": true }), navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`nav-link-desktop px-3 py-2 text-sm font-medium transition-all duration-200 relative group font-orbitron ${currentPath === item.href ? "text-neon-lime" : "text-matrix-white/70 hover:text-neon-lime/90"}`, "class")} role="menuitem"${addAttribute(currentPath === item.href ? "page" : void 0, "aria-current")}${addAttribute(`${item.label}${currentPath === item.href ? " (current page)" : ""}`, "aria-label")}${addAttribute(`navbar-link-${item.label.toLowerCase()}`, "data-testid")} data-astro-cid-5blmo7yk> ${item.label}  ${currentPath === item.href && renderTemplate`<div class="nav-active-indicator absolute bottom-0 left-0 right-0 h-0.5 bg-neon-lime shadow-neon transition-all duration-200" aria-hidden="true" data-astro-cid-5blmo7yk></div>`}  <div class="nav-hover-underline absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-neon-lime/60 transform -translate-x-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" aria-hidden="true" data-astro-cid-5blmo7yk></div> </a>`), renderComponent($$result, "Icon", Icon, { "name": "Menu", "size": "sm", "className": "text-current icon-menu", "aria-hidden": "true", "data-astro-cid-5blmo7yk": true }), renderComponent($$result, "Icon", Icon, { "name": "X", "size": "sm", "className": "text-current icon-close", "aria-hidden": "true", "data-astro-cid-5blmo7yk": true }), renderComponent($$result, "Icon", Icon, { "name": "X", "size": "md", "className": "text-current", "aria-hidden": "true", "data-astro-cid-5blmo7yk": true }), navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`mobile-nav-link block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 font-orbitron ${currentPath === item.href ? "text-neon-lime bg-neon-lime/5 border border-neon-lime/20" : "text-matrix-white/80 hover:text-neon-lime hover:bg-neon-lime/5"}`, "class")} role="menuitem"${addAttribute(currentPath === item.href ? "page" : void 0, "aria-current")} tabindex="0"${addAttribute(`${item.label}${currentPath === item.href ? " (current page)" : ""}`, "aria-label")}${addAttribute(`mobile-nav-link-${item.label.toLowerCase()}`, "data-testid")} data-astro-cid-5blmo7yk> ${item.label} </a>`));
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/Navbar.astro", void 0);

const $$Astro$1 = createAstro("https://vpoliteiadis.com");
const $$SocialLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SocialLink;
  const { profile, className = "", size = "md" } = Astro2.props;
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };
  const iconSize = sizeClasses[size];
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(profile.webUrl, "href")}${addAttribute(profile.ariaLabel, "aria-label")} target="_blank" rel="noopener noreferrer"${addAttribute(`social-link group relative ${className}`, "class")}${addAttribute(profile.platform, "data-platform")}> <!-- Icon with minimal hover effect --> <div class="text-matrix-white/60 hover:text-neon-lime transition-colors duration-200 p-1.5 rounded-md hover:bg-neon-lime/5 group relative"> ${profile.icon === "github" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"${addAttribute(iconSize, "class")}> <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.014c0 4.424 2.865 8.178 6.839 9.504.5.092.682-.218.682-.483 0-.237-.009-.868-.014-1.704-2.782.605-3.369-1.342-3.369-1.342-.455-1.158-1.11-1.468-1.11-1.468-.908-.62.069-.607.069-.607 1.003.07 1.53 1.03 1.53 1.03.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.089.636-1.339-2.221-.253-4.555-1.113-4.555-4.952 0-1.094.39-1.99 1.03-2.69-.103-.253-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.027A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.297 2.748-1.027 2.748-1.027.546 1.378.202 2.397.099 2.65.64.701 1.028 1.597 1.028 2.69 0 3.848-2.337 4.696-4.565 4.944.36.31.68.92.68 1.855 0 1.338-.012 2.418-.012 2.748 0 .268.18.58.688.481A10.019 10.019 0 0 0 22 12.014C22 6.484 17.523 2 12 2Z" clip-rule="evenodd"></path> </svg>`} ${profile.icon === "linkedin" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"${addAttribute(iconSize, "class")}> <path d="M20.451 20.451h-3.554v-5.569c0-1.329-.024-3.039-1.852-3.039-1.853 0-2.136 1.447-2.136 2.944v5.664H9.355V9h3.414v1.561h.048c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.268 2.37 4.268 5.455v6.285zM5.337 7.433a2.063 2.063 0 1 1 0-4.127 2.063 2.063 0 0 1 0 4.127zM7.114 20.451H3.558V9h3.556v11.451z"></path> </svg>`} ${profile.icon === "instagram" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"${addAttribute(iconSize, "class")}> <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7Zm5.75-.75a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5Z"></path> </svg>`} </div> </a>`;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/SocialLink.astro", void 0);

const socialProfiles = [
  {
    platform: "github",
    username: "bpolitiadis",
    displayName: "GitHub",
    deepLink: "https://github.com/bpolitiadis",
    webUrl: "https://github.com/bpolitiadis",
    icon: "github",
    ariaLabel: "GitHub profile"
  },
  {
    platform: "linkedin",
    username: "vasileios-politeiadis",
    displayName: "LinkedIn",
    deepLink: "linkedin://profile/vasileios-politeiadis",
    webUrl: "https://www.linkedin.com/in/vasileios-politeiadis/",
    icon: "linkedin",
    ariaLabel: "LinkedIn profile"
  },
  {
    platform: "instagram",
    username: "arte.imaginari",
    displayName: "Instagram",
    deepLink: "instagram://user?username=arte.imaginari",
    webUrl: "https://www.instagram.com/arte.imaginari/",
    icon: "instagram",
    ariaLabel: "Instagram profile"
  }
];
const getAllSocialProfiles = () => {
  return socialProfiles;
};

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const socialProfiles = getAllSocialProfiles();
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="mt-auto" data-testid="footer"> <!-- Tiny glow divider above footer --> <div class="h-px w-full bg-gradient-to-r from-transparent via-neon-lime/40 to-transparent opacity-60"></div> <div class="relative bg-matrix-black"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex flex-col sm:flex-row justify-between items-center gap-3 py-3 min-h-[50px]"> <!-- Left: VP monogram logo with subtle glow --> <a href="/" class="flex items-center gap-2 group" aria-label="Go to homepage" data-testid="footer-logo"> <div class="relative"> ${renderComponent($$result, "Image", $$Image, { "src": vpLogo, "alt": "Vasileios Politeiadis logo", "width": 24, "height": 24, "class": "w-6 h-6 rounded-md transition-transform duration-200 group-hover:scale-105" })} <!-- Subtle glow effect --> <div class="absolute inset-0 rounded-md bg-neon-lime/15 blur-sm group-hover:bg-neon-lime/25 transition-opacity duration-200"></div> </div> </a> <!-- Center: copyright text --> <div class="flex items-center text-xs text-matrix-white/60 text-center" data-testid="footer-copyright"> <span>&copy; ${currentYear} Vasileios Politeiadis</span> </div> <!-- Right: social icons with minimal styling --> <nav class="flex items-center gap-2" aria-label="Social links" data-testid="footer-social-links"> ${socialProfiles.map((profile) => renderTemplate`${renderComponent($$result, "SocialLink", $$SocialLink, { "profile": profile, "size": "sm" })}`)} </nav> </div> </div> </div> </footer>`;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/Footer.astro", void 0);

const aboutBg = new Proxy({"src":"/_astro/about-bg.CGFTphms.png","width":1024,"height":1024,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/vpoliteiadis/workspace/vpoliteiadis/src/assets/images/about-bg.png";
							}
							
							return target[name];
						}
					});

const blogBg = new Proxy({"src":"/_astro/blog-bg.C0c9vFrE.png","width":1536,"height":1024,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/vpoliteiadis/workspace/vpoliteiadis/src/assets/images/blog-bg.png";
							}
							
							return target[name];
						}
					});

const projectsBg = new Proxy({"src":"/_astro/projects-bg.BlEphDjw.png","width":1536,"height":1024,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/vpoliteiadis/workspace/vpoliteiadis/src/assets/images/projects-bg.png";
							}
							
							return target[name];
						}
					});

const creativeBg = new Proxy({"src":"/_astro/creative-bg.Dkp1E_ym.png","width":1536,"height":1024,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/vpoliteiadis/workspace/vpoliteiadis/src/assets/images/creative-bg.png";
							}
							
							return target[name];
						}
					});

const contactBg = new Proxy({"src":"/_astro/contact-bg.BuM_VNA_.png","width":1536,"height":1024,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/vpoliteiadis/workspace/vpoliteiadis/src/assets/images/contact-bg.png";
							}
							
							return target[name];
						}
					});

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://vpoliteiadis.com");
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const backgroundMap = {
    "about-bg": aboutBg,
    "blog-bg": blogBg,
    "projects-bg": projectsBg,
    "creative-bg": creativeBg,
    "contact-bg": contactBg
  };
  const {
    title,
    description = "Vasileios Politeiadis - Senior QA Automation Specialist & Full-Stack Developer | European Commission Projects, React, Next.js, AI Automation",
    currentPath,
    // Use VP logo as default OG image (small and always present)
    image = "/images/og-default.webp",
    type = "website",
    publishedAt,
    updatedAt,
    author = "Vasileios Politeiadis",
    keywords = [
      "QA Automation Specialist",
      "QA Automation Engineer",
      "Full-Stack Developer",
      "Next.js Developer",
      "Astro Developer",
      "TailwindCSS Developer",
      "AI Automation Workflows",
      "European Commission Projects",
      "Java Selenium Testing",
      "Playwright Testing",
      "React Developer",
      "TypeScript Developer",
      "Supabase Developer",
      "Vasileios Politeiadis",
      "Portfolio",
      "Online CV"
    ],
    bgSlug,
    bgEager = false,
    bgOpacityClass = "opacity-40 md:opacity-50",
    bgOverlayClass = "from-black/30 via-black/15 to-black/35",
    structuredData
  } = Astro2.props;
  const pathname = currentPath ?? Astro2.url.pathname;
  const canonicalURL = new URL(pathname, Astro2.site);
  const ogImageURL = new URL(image, Astro2.site);
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Vasileios Politeiadis",
    "url": "https://vpoliteiadis.com",
    "image": "https://vpoliteiadis.com/images/avatar.webp",
    "sameAs": [
      "https://github.com/bpolitiadis",
      "https://www.linkedin.com/in/vpoliteiadis",
      "https://www.instagram.com/arte.imaginari/"
    ],
    "jobTitle": "Senior QA Automation Specialist & Full-Stack Developer",
    "description": "Expert in European Commission projects, Java automation frameworks, React/Next.js development, and AI-powered solutions. Specializing in end-to-end QA processes and modern web applications.",
    "worksFor": {
      "@type": "Organization",
      "name": "European Commission - DG DIGIT"
    },
    "knowsAbout": [
      "QA Automation",
      "Java Testing Frameworks",
      "Selenium WebDriver",
      "Playwright Testing",
      "React Development",
      "Next.js Applications",
      "TypeScript Development",
      "Supabase Backend",
      "AI Automation Tools",
      "European Commission Projects"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Aristotle University of Thessaloniki",
      "description": "Electrical Engineering & Computer Science"
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "ISTQB Certified Tester Foundation Level (CTFL)",
        "recognizedBy": "ISTQB\xAE - International Software Testing Qualifications Board"
      }
    ]
  };
  const finalStructuredData = structuredData ? { ...baseStructuredData, ...structuredData } : baseStructuredData;
  return renderTemplate(_a || (_a = __template(['<html lang="en" class="dark" data-astro-cid-ouamjn2i> <head><!-- Profile verification & identity hints for crawlers --><link rel="me" href="https://github.com/bpolitiadis"><link rel="me" href="https://www.linkedin.com/in/vpoliteiadis"><link rel="me" href="https://www.instagram.com/arte.imaginari/"><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- Enhanced favicon and touch icons --><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="icon" href="/favicon.png" type="image/png"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest"><meta name="theme-color" content="#39FF14"><meta name="msapplication-TileColor" content="#39FF14"><meta name="generator"', '><meta name="description"', '><meta name="keywords"', '><meta name="author"', "><title>", '</title><!-- Canonical URL --><link rel="canonical"', '><!-- Language alternates --><link rel="alternate" hreflang="en"', '><link rel="alternate" hreflang="x-default"', '><!-- Preload critical resources --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><!-- Preload critical fonts with font-display: swap for performance --><link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap"><link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"><!-- DNS prefetch for external resources --><link rel="dns-prefetch" href="//fonts.googleapis.com"><link rel="dns-prefetch" href="//fonts.gstatic.com"><!-- Performance meta tags --><meta name="color-scheme" content="dark"><!-- Structured data for SEO --><script type="application/ld+json">', '<\/script><!-- Open Graph meta tags --><meta property="og:type"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:url"', '><meta property="og:image"', '><meta property="og:image:alt"', '><meta property="og:site_name" content="Vasileios Politeiadis - Portfolio"><meta property="og:locale" content="en_US"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><!-- Twitter Card meta tags --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><meta name="twitter:image:alt"', '><meta name="twitter:creator" content="@arte_imaginari"><meta name="twitter:site" content="@arte_imaginari"><!-- Additional meta tags -->', "", "", '<!-- Security headers (HTTP headers are set in vercel.json and middleware.ts) --><meta http-equiv="X-Content-Type-Options" content="nosniff"><meta http-equiv="X-XSS-Protection" content="1; mode=block"><meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin"><!-- Resource hints for performance --><link rel="dns-prefetch" href="//www.google-analytics.com"><link rel="dns-prefetch" href="//vercel.live"><!-- Critical CSS inline for above-the-fold content -->', '</head> <body class="min-h-screen bg-background text-foreground transition-colors duration-300" data-astro-cid-ouamjn2i> ', ' <!-- Skip to main content link for accessibility --> <a href="#main-content" class="skip-link" aria-label="Skip to main content" data-astro-cid-ouamjn2i>\nSkip to main content\n</a> <div class="relative z-10 flex flex-col min-h-screen" data-astro-cid-ouamjn2i> <!-- Navbar --> ', ' <!-- Main Content --> <main id="main-content" class="flex-1 flex flex-col" role="main" data-astro-cid-ouamjn2i> ', " </main> <!-- Footer - Always visible at bottom --> ", ' </div> <!-- Theme initialization (external, CSP-safe) --> <script src="/scripts/theme-init.js" defer><\/script> <!-- Performance optimization script --> <script src="/scripts/performance.js" defer><\/script> </body> </html> '])), addAttribute(Astro2.generator, "content"), addAttribute(description, "content"), addAttribute(Array.isArray(keywords) ? keywords.join(", ") : keywords, "content"), addAttribute(author, "content"), title, addAttribute(canonicalURL, "href"), addAttribute(canonicalURL, "href"), addAttribute(canonicalURL, "href"), unescapeHTML(JSON.stringify(finalStructuredData)), addAttribute(type, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(canonicalURL, "content"), addAttribute(ogImageURL, "content"), addAttribute(title, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImageURL, "content"), addAttribute(title, "content"), publishedAt && renderTemplate`<meta property="article:published_time"${addAttribute(publishedAt, "content")}>`, updatedAt && renderTemplate`<meta property="article:modified_time"${addAttribute(updatedAt, "content")}>`, author && renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`, renderHead(), (() => {
    if (!bgSlug) return null;
    const optimized = backgroundMap[bgSlug];
    return renderTemplate`<div class="pointer-events-none fixed inset-0 z-0" aria-hidden="true" data-astro-cid-ouamjn2i> ${optimized ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": optimized, "alt": "", "widths": [480, 800, 1200, 1600, 2400], "sizes": "100vw", "format": "webp", "loading": bgEager ? "eager" : "lazy", "class": `w-full h-full object-cover ${bgOpacityClass}`, "fetchpriority": bgEager ? "high" : "auto", "data-astro-cid-ouamjn2i": true })}` : renderTemplate`<div class="w-full h-full bg-gradient-to-br from-matrix-black via-cyber-gray to-matrix-black" data-astro-cid-ouamjn2i></div>`} <div${addAttribute(`absolute inset-0 bg-gradient-to-b ${bgOverlayClass}`, "class")} data-astro-cid-ouamjn2i></div> </div>`;
  })(), renderComponent($$result, "Navbar", $$Navbar, { "currentPath": currentPath, "data-astro-cid-ouamjn2i": true }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-ouamjn2i": true }));
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $, AwardIcon as A, GraduationIcon as G, InstagramIcon as I, LinkedInIcon as L, MonitorIcon as M, PaletteIcon as P, GitHubIcon as a };
