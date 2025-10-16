import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CVZbsiOP.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_BQqTk3O_.mjs';
import { jsx } from 'react/jsx-runtime';
import React__default, { useRef, useEffect } from 'react';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const FuzzyText = ({
  children,
  fontSize = "clamp(2rem, 8vw, 8rem)",
  fontWeight = 900,
  fontFamily = "inherit",
  color = "#fff",
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5
}) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    let animationFrameId;
    let isCancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn("FuzzyText: Canvas ref not found");
      return;
    }
    console.log("FuzzyText: Initializing with props:", {
      children,
      fontSize,
      fontWeight,
      fontFamily,
      color,
      enableHover,
      baseIntensity,
      hoverIntensity
    });
    const init = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (isCancelled) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const computedFontFamily = fontFamily === "inherit" ? window.getComputedStyle(canvas).fontFamily || "sans-serif" : fontFamily;
      const fontSizeStr = typeof fontSize === "number" ? `${fontSize}px` : fontSize;
      let numericFontSize;
      if (typeof fontSize === "number") {
        numericFontSize = fontSize;
      } else {
        const temp = document.createElement("span");
        temp.style.fontSize = fontSize;
        document.body.appendChild(temp);
        const computedSize = window.getComputedStyle(temp).fontSize;
        numericFontSize = parseFloat(computedSize);
        document.body.removeChild(temp);
      }
      const text = React__default.Children.toArray(children).join("");
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;
      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = "alphabetic";
      const metrics = offCtx.measureText(text);
      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
      const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
      const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;
      const textBoundingWidth = Math.ceil(actualLeft + actualRight);
      const tightHeight = Math.ceil(actualAscent + actualDescent);
      const extraWidthBuffer = 10;
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;
      offscreen.width = offscreenWidth;
      offscreen.height = tightHeight;
      const xOffset = extraWidthBuffer / 2;
      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = "alphabetic";
      offCtx.fillStyle = color;
      offCtx.fillText(text, xOffset - actualLeft, actualAscent);
      const horizontalMargin = 50;
      const verticalMargin = 0;
      canvas.width = offscreenWidth + horizontalMargin * 2;
      canvas.height = tightHeight + verticalMargin * 2;
      ctx.translate(horizontalMargin, verticalMargin);
      const interactiveLeft = horizontalMargin + xOffset;
      const interactiveTop = verticalMargin;
      const interactiveRight = interactiveLeft + textBoundingWidth;
      const interactiveBottom = interactiveTop + tightHeight;
      let isHovering = false;
      const fuzzRange = 30;
      const run = () => {
        if (isCancelled) return;
        ctx.clearRect(
          -fuzzRange,
          -fuzzRange,
          offscreenWidth + 2 * fuzzRange,
          tightHeight + 2 * fuzzRange
        );
        const intensity = isHovering ? hoverIntensity : baseIntensity;
        for (let j = 0; j < tightHeight; j++) {
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
          ctx.drawImage(
            offscreen,
            0,
            j,
            offscreenWidth,
            1,
            dx,
            j,
            offscreenWidth,
            1
          );
        }
        animationFrameId = window.requestAnimationFrame(run);
      };
      console.log("FuzzyText: Canvas dimensions:", {
        width: canvas.width,
        height: canvas.height,
        offscreenWidth,
        tightHeight
      });
      run();
      const isInsideTextArea = (x, y) => x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom;
      const handleMouseMove = (e) => {
        if (!enableHover) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };
      const handleMouseLeave = () => {
        isHovering = false;
      };
      const handleTouchMove = (e) => {
        if (!enableHover) return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };
      const handleTouchEnd = () => {
        isHovering = false;
      };
      if (enableHover) {
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);
        canvas.addEventListener("touchmove", handleTouchMove, {
          passive: false
        });
        canvas.addEventListener("touchend", handleTouchEnd);
      }
      const cleanup = () => {
        window.cancelAnimationFrame(animationFrameId);
        if (enableHover) {
          canvas.removeEventListener("mousemove", handleMouseMove);
          canvas.removeEventListener("mouseleave", handleMouseLeave);
          canvas.removeEventListener("touchmove", handleTouchMove);
          canvas.removeEventListener("touchend", handleTouchEnd);
        }
      };
      canvas.cleanupFuzzyText = cleanup;
    };
    init();
    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(animationFrameId);
      if (canvas && canvas.cleanupFuzzyText) {
        canvas.cleanupFuzzyText();
      }
    };
  }, [
    children,
    fontSize,
    fontWeight,
    fontFamily,
    color,
    enableHover,
    baseIntensity,
    hoverIntensity
  ]);
  return /* @__PURE__ */ jsx("canvas", { ref: canvasRef });
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$404 = createComponent(($$result, $$props, $$slots) => {
  const errorStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Page Not Found - 404 Error",
    "description": "The page you're looking for doesn't exist. Navigate back to the main portfolio or explore our projects and blog.",
    "url": "https://vpoliteiadis.com/404",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Vasileios Politeiadis - Portfolio",
      "url": "https://vpoliteiadis.com"
    }
  };
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Page Not Found - 404 Error | Vasileios Politeiadis", "description": "The page you're looking for doesn't exist. Navigate back to the main portfolio or explore our projects and blog.", "currentPath": "/404", "structuredData": errorStructuredData, "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<div class="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" data-astro-cid-zetdm5md> <canvas id="matrixCanvas" class="w-full h-full opacity-20" style="filter: blur(0.5px);" data-astro-cid-zetdm5md></canvas> </div>  <section class="relative flex-1 flex flex-col items-center justify-center px-4 z-10" data-astro-cid-zetdm5md> <div class="text-center" data-astro-cid-zetdm5md> <!-- 404 Number with Fuzzy Effect --> <div class="mb-6" data-astro-cid-zetdm5md> ', ' </div> <!-- Error Message with Fuzzy Effect --> <div class="mb-8" data-astro-cid-zetdm5md> ', ' </div> </div> </section>  <script src="/scripts/matrix-rain.js"><\/script> '])), maybeRenderHead(), renderComponent($$result2, "FuzzyText", FuzzyText, { "client:load": true, "fontSize": "clamp(4rem, 15vw, 12rem)", "fontWeight": 900, "fontFamily": "Orbitron, sans-serif", "color": "#39FF14", "enableHover": true, "baseIntensity": 0.05, "hoverIntensity": 0.2, "client:component-hydration": "load", "client:component-path": "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/FuzzyText", "client:component-export": "default", "data-astro-cid-zetdm5md": true }, { "default": ($$result3) => renderTemplate`
404
` }), renderComponent($$result2, "FuzzyText", FuzzyText, { "client:load": true, "fontSize": "clamp(1.5rem, 5vw, 2.5rem)", "fontWeight": 700, "fontFamily": "Orbitron, sans-serif", "color": "#E8FFE8", "enableHover": true, "baseIntensity": 0.05, "hoverIntensity": 0.2, "client:component-hydration": "load", "client:component-path": "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/FuzzyText", "client:component-export": "default", "data-astro-cid-zetdm5md": true }, { "default": ($$result3) => renderTemplate`
ERROR: Page Not Found
` })) })} `;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/404.astro", void 0);

const $$file = "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
