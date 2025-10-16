/* empty css                                 */
import { c as createComponent, m as maybeRenderHead, r as renderComponent, d as renderScript, a as renderTemplate } from '../chunks/astro/server_oRAxjIhj.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CQJIJsth.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { c as clientLogger } from '../chunks/logger-client_B7l03hPb.mjs';
import { L as LetterGlitch } from '../chunks/LetterGlitch_McnhYqDE.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

function AvatarBubble({ alt = "Vasileios Politeiadis portrait", size = 60 }) {
  const getOptimizedAvatarSrc = () => {
    if (typeof window !== "undefined" && true) {
      return "/images/avatar.webp";
    }
    return "/images/avatar.webp";
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-testid": "avatar-bubble",
      className: "relative",
      style: { width: size + 20, height: size + 20 },
      children: /* @__PURE__ */ jsxs("div", { className: "relative rounded-full bg-black/50 backdrop-blur-md border border-[#00B86B]", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30" }) }),
        /* @__PURE__ */ jsx("div", { className: "relative rounded-full overflow-hidden w-full h-full", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: getOptimizedAvatarSrc(),
            width: size,
            height: size,
            alt,
            loading: "eager",
            fetchPriority: "high",
            decoding: "async",
            className: "w-full h-full object-cover rounded-full transition-transform duration-300 hover:scale-105"
          }
        ) })
      ] })
    }
  );
}

function MessageBubble({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [displayText, setDisplayText] = useState("");
  const [showAccessGranted, setShowAccessGranted] = useState(false);
  const [accessGrantedComplete, setAccessGrantedComplete] = useState(false);
  const [accessGrantedText, setAccessGrantedText] = useState("");
  const messages = [
    "Access granted.",
    "Hello, I am Vasilis.",
    "I break your code professionally.",
    "I like to build things.",
    "I automate boring workflows with AI.",
    "Welcome to my website."
  ];
  clientLogger.animation("MessageBubble", `rendered, currentStep: ${currentStep}, displayText: ${displayText}`);
  useEffect(() => {
    if (currentStep !== 1 || !showAccessGranted) return;
    const accessGrantedMessage = "Access granted.";
    let index = 0;
    let isDeleting = false;
    const startDelay = setTimeout(() => {
      const typeTimer = setInterval(() => {
        if (!isDeleting) {
          if (index < accessGrantedMessage.length) {
            setAccessGrantedText(accessGrantedMessage.slice(0, index + 1));
            index++;
          } else {
            setTimeout(() => {
              isDeleting = true;
              index = accessGrantedMessage.length - 1;
            }, 1200);
          }
        } else {
          if (index >= 0) {
            setAccessGrantedText(accessGrantedMessage.slice(0, index));
            index--;
          } else {
            clearInterval(typeTimer);
            setAccessGrantedComplete(true);
            setTimeout(() => {
              setCurrentStep(2);
            }, 500);
          }
        }
      }, isDeleting ? 30 : 50);
      return () => clearInterval(typeTimer);
    }, 800);
    return () => {
      clearTimeout(startDelay);
    };
  }, [currentStep, showAccessGranted]);
  useEffect(() => {
    if (currentStep === 1) return;
    clientLogger.animation("MessageBubble", `useEffect triggered, currentStep: ${currentStep}`);
    const message = messages[currentStep - 1];
    let index = 0;
    setDisplayText("");
    const typeTimer = setInterval(() => {
      if (index < message.length) {
        setDisplayText(message.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeTimer);
        if (currentStep < messages.length) {
          setTimeout(() => {
            setCurrentStep((prev) => prev + 1);
          }, 800);
        } else {
          setTimeout(() => {
            onComplete?.();
            const element = document.querySelector('[data-testid="message-bubble"]');
            if (element) {
              element.setAttribute("data-complete", "true");
              clientLogger.animation("MessageBubble", "sequence completed");
            }
          }, 800);
        }
      }
    }, 30);
    return () => clearInterval(typeTimer);
  }, [currentStep, onComplete]);
  useEffect(() => {
    if (currentStep === 1) {
      setShowAccessGranted(true);
    }
  }, [currentStep]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "relative max-w-lg",
      "data-testid": "message-bubble",
      role: "dialog",
      "aria-live": "polite",
      "aria-label": "Welcome message",
      children: /* @__PURE__ */ jsx("div", { className: "relative rounded-tl-none rounded-tr-[22px] rounded-br-[22px] rounded-bl-[22px] bg-black/30 backdrop-blur-lg border border-[#39FF14]/60 chat-bubble-glitch", children: /* @__PURE__ */ jsx("div", { className: "p-6 md:p-8", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        showAccessGranted && !accessGrantedComplete && /* @__PURE__ */ jsxs("p", { className: "text-[#39FF14] font-orbitron text-lg font-bold text-shadow-neon", children: [
          accessGrantedText,
          /* @__PURE__ */ jsx("span", { className: "ml-1 animate-pulse", children: "|" })
        ] }),
        currentStep >= 2 && /* @__PURE__ */ jsx("p", { className: "text-[#39FF14] font-orbitron text-lg font-bold text-shadow-neon", children: currentStep === 2 ? displayText : messages[1] }),
        currentStep >= 3 && /* @__PURE__ */ jsx("p", { className: "text-[#B5B5B5] font-inter text-base leading-relaxed", children: currentStep === 3 ? displayText : messages[2] }),
        currentStep >= 4 && /* @__PURE__ */ jsx("p", { className: "text-[#B5B5B5] font-inter text-base leading-relaxed", children: currentStep === 4 ? displayText : messages[3] }),
        currentStep >= 5 && /* @__PURE__ */ jsx("p", { className: "text-[#B5B5B5] font-inter text-base leading-relaxed", children: currentStep === 5 ? displayText : messages[4] }),
        currentStep >= 6 && /* @__PURE__ */ jsx("p", { className: "text-[#39FF14] font-orbitron text-lg font-bold text-shadow-neon", children: currentStep === 6 ? displayText : messages[5] })
      ] }) }) })
    }
  );
}

const StarBorder = ({
  as,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  children,
  ...rest
}) => {
  const Component = as || "button";
  return /* @__PURE__ */ jsxs(
    Component,
    {
      className: `relative inline-block rounded-[20px] ${className}`,
      ...rest,
      style: {
        padding: `${thickness}px 0`,
        ...rest.style
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 rounded-[20px] opacity-60",
            style: {
              background: `linear-gradient(45deg, transparent 30%, ${color}40 50%, transparent 70%)`,
              animation: `sparkle-border ${speed} linear infinite`,
              backgroundSize: "200% 200%"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 rounded-[20px] opacity-40",
            style: {
              background: `linear-gradient(-45deg, transparent 30%, ${color}60 50%, transparent 70%)`,
              animation: `sparkle-border-reverse ${speed} linear infinite`,
              backgroundSize: "200% 200%"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "relative z-10 bg-black/40 backdrop-blur-sm text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px] transition-all duration-300 hover:bg-black/60 hover:backdrop-blur-md group",
            style: {
              border: `1px solid ${color}40`,
              boxShadow: `0 0 15px ${color}20, inset 0 0 15px ${color}10`
            },
            children
          }
        )
      ]
    }
  );
};

const navigationItems = [
  { label: "About", path: "/about", color: "#39FF14", speed: "4s" },
  { label: "Projects", path: "/projects", color: "#00FFFF", speed: "5s" },
  { label: "Creative", path: "/creative", color: "#00FFFF", speed: "6s" },
  { label: "Blog", path: "/blog", color: "#8A2BE2", speed: "7s" },
  { label: "Contact", path: "/contact", color: "#FF1493", speed: "8s" }
];
function NavigationButtons({ onNavigate }) {
  const [visibleButtons, setVisibleButtons] = useState([]);
  useEffect(() => {
    navigationItems.forEach((_, index) => {
      setTimeout(() => {
        setVisibleButtons((prev) => [...prev, index]);
      }, index * 100);
    });
  }, []);
  const handleClick = (path) => {
    onNavigate?.(path);
    if (typeof window !== "undefined") {
      window.location.href = path;
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "flex flex-wrap sm:flex-nowrap justify-center items-center gap-3 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 animate-reveal-up overflow-x-visible sm:overflow-x-visible w-full",
      "data-testid": "navigation-buttons",
      role: "navigation",
      "aria-label": "Main navigation",
      children: navigationItems.map((item, index) => /* @__PURE__ */ jsx(
        StarBorder,
        {
          as: "button",
          onClick: () => handleClick(item.path),
          color: item.color,
          speed: item.speed,
          className: `
            font-orbitron font-bold text-xs sm:text-sm md:text-base
            transition-all duration-300 transform
            ${visibleButtons.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            hover:scale-105 hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
            group
            min-w-[44%] xs:min-w-[42%] sm:min-w-[90px] md:min-w-[100px] lg:min-w-[110px]
            px-3 sm:px-4 md:px-5 lg:px-6
            py-2 sm:py-3 md:py-4
            whitespace-nowrap
          `,
          style: {
            transitionDelay: `${index * 100}ms`
          },
          "aria-label": `Navigate to ${item.label}`,
          "data-testid": `nav-button-${item.label.toLowerCase()}`,
          children: /* @__PURE__ */ jsx("span", { className: "relative z-10 text-[#E8FFE8] font-orbitron font-bold group-hover:text-white transition-colors duration-300", children: item.label })
        },
        item.path
      ))
    }
  );
}

const $$HeroIntro = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="relative w-full h-full flex flex-col justify-between" aria-label="Intro hero" data-testid="hero-intro-section"> <!-- Chat bubble layout - centered --> <div class="relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto flex items-center justify-center flex-1" data-testid="hero-chat-layout"> <div id="chat-layout" class="flex items-start gap-4 md:gap-6 justify-center"> <!-- Avatar --> <div class="flex-shrink-0"> ${renderComponent($$result, "AvatarBubble", AvatarBubble, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/hero/AvatarBubble.tsx", "client:component-export": "default" })} </div> <!-- Message bubble --> <div class="max-w-lg lg:max-w-xl"> ${renderComponent($$result, "MessageBubble", MessageBubble, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/hero/MessageBubble.tsx", "client:component-export": "default" })} </div> </div> </div> <!-- Navigation buttons - positioned near footer --> <div id="nav-layout" class="hidden relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto pb-8 justify-center" data-testid="hero-navigation-buttons"> ${renderComponent($$result, "NavigationButtons", NavigationButtons, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/hero/NavigationButtons.tsx", "client:component-export": "default" })} </div> </section> ${renderScript($$result, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/hero/HeroIntro.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/hero/HeroIntro.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const homeStructuredData = {
    "@type": "WebSite",
    "name": "Vasileios Politeiadis - Portfolio",
    "description": "Professional portfolio of Vasileios Politeiadis, Senior QA Automation Specialist and Full-Stack Developer specializing in European Commission projects, React/Next.js development, and AI automation solutions.",
    "url": "https://vpoliteiadis.com",
    "author": {
      "@type": "Person",
      "name": "Vasileios Politeiadis",
      "jobTitle": "Senior QA Automation Specialist & Full-Stack Developer"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://vpoliteiadis.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Vasileios Politeiadis - Senior QA Automation Specialist & Full-Stack Developer | Portfolio", "description": "Vasileios Politeiadis is a Senior QA Automation Specialist at European Commission DG DIGIT and Full-Stack Developer. Expert in Java automation frameworks, React/Next.js applications, and AI-powered solutions. View portfolio, projects, and professional experience.", "currentPath": "/", "keywords": [
    "Vasileios Politeiadis",
    "QA Automation Specialist",
    "QA Automation Engineer",
    "Full-Stack Developer",
    "Next.js Developer",
    "React Developer",
    "European Commission Projects",
    "Java Selenium Testing",
    "Playwright Testing",
    "TypeScript Developer",
    "AI Automation",
    "Professional Portfolio",
    "Online CV"
  ], "structuredData": homeStructuredData, "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative h-[calc(100svh-150px)] sm:h-[calc(100vh-120px)] overflow-hidden flex flex-col justify-between py-1 sm:py-8" role="banner" aria-labelledby="hero-heading" data-testid="page-home" data-astro-cid-j7pv25f6> <h1 id="hero-heading" class="sr-only" data-astro-cid-j7pv25f6>Vasileios Politeiadis - Senior QA Automation Specialist & Full-Stack Developer</h1> <!-- Full-screen glitch background --> <div class="absolute inset-0 pointer-events-none opacity-20 z-0" aria-hidden="true" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "LetterGlitch", LetterGlitch, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/LetterGlitch.tsx", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> <!-- Hero content with better spacing --> <div class="flex-1 flex items-center justify-center" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "HeroIntro", $$HeroIntro, { "data-astro-cid-j7pv25f6": true })} </div> </section> ` })} ${renderScript($$result, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/index.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/index.astro", void 0);

const $$file = "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
