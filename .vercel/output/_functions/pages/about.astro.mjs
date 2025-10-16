import { b as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CVZbsiOP.mjs';
import { $ as $$MainLayout, A as AwardIcon, M as MonitorIcon, G as GraduationIcon, P as PaletteIcon } from '../chunks/MainLayout_BQqTk3O_.mjs';
import '../chunks/index_MaT6fT73.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_CHg-JfGd.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from '../chunks/card_D2wKyJ59.mjs';
import { B as Badge } from '../chunks/badge_BCuiEq3Z.mjs';
import { B as Button } from '../chunks/button_BBjbKaKr.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useId, useRef, useEffect, useLayoutEffect, useState, useMemo, useCallback, createElement } from 'react';
import { c as clientLogger } from '../chunks/logger-client_B7l03hPb.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const arteImaginariAvatar = new Proxy({"src":"/_astro/arte-imaginari-avatar.AGClqMwA.png","width":4000,"height":4000,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/vpoliteiadis/workspace/vpoliteiadis/src/assets/images/arte-imaginari-avatar.png";
							}
							
							return target[name];
						}
					});

function hexToRgba(hex, alpha = 1) {
  if (!hex) return `rgba(0,0,0,${alpha})`;
  let h = hex.replace("#", "");
  if (h.length === 3) {
    h = h.split("").map((c) => c + c).join("");
  }
  const int = parseInt(h, 16);
  const r = int >> 16 & 255;
  const g = int >> 8 & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
const ElectricBorder = ({
  children,
  color = "#39FF14",
  // Default to brand primary neon-lime
  speed = 1,
  chaos = 1,
  thickness = 2,
  className,
  style
}) => {
  const rawId = useId().replace(/[:]/g, "");
  const filterId = `turbulent-displace-${rawId}`;
  const svgRef = useRef(null);
  const rootRef = useRef(null);
  const strokeRef = useRef(null);
  const updateAnim = () => {
    const svg = svgRef.current;
    const host = rootRef.current;
    if (!svg || !host) return;
    if (strokeRef.current) {
      strokeRef.current.style.filter = `url(#${filterId})`;
    }
    const width = Math.max(
      1,
      Math.round(host.clientWidth || host.getBoundingClientRect().width || 0)
    );
    const height = Math.max(
      1,
      Math.round(host.clientHeight || host.getBoundingClientRect().height || 0)
    );
    const dyAnims = Array.from(
      svg.querySelectorAll(
        'feOffset > animate[attributeName="dy"]'
      )
    );
    if (dyAnims.length >= 2) {
      dyAnims[0].setAttribute("values", `${height}; 0`);
      dyAnims[1].setAttribute("values", `0; -${height}`);
    }
    const dxAnims = Array.from(
      svg.querySelectorAll(
        'feOffset > animate[attributeName="dx"]'
      )
    );
    if (dxAnims.length >= 2) {
      dxAnims[0].setAttribute("values", `${width}; 0`);
      dxAnims[1].setAttribute("values", `0; -${width}`);
    }
    const baseDur = 6;
    const dur = Math.max(1e-3, baseDur / (speed || 1));
    [...dyAnims, ...dxAnims].forEach((a) => a.setAttribute("dur", `${dur}s`));
    const disp = svg.querySelector("feDisplacementMap");
    if (disp) disp.setAttribute("scale", String(30 * (chaos || 1)));
    const filterEl = svg.querySelector(
      `#${CSS.escape(filterId)}`
    );
    if (filterEl) {
      filterEl.setAttribute("x", "-200%");
      filterEl.setAttribute("y", "-200%");
      filterEl.setAttribute("width", "500%");
      filterEl.setAttribute("height", "500%");
    }
    requestAnimationFrame(() => {
      [...dyAnims, ...dxAnims].forEach((a) => {
        if (typeof a.beginElement === "function") {
          try {
            a.beginElement();
          } catch {
          }
        }
      });
    });
  };
  useEffect(() => {
    updateAnim();
  }, [speed, chaos]);
  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ro = new ResizeObserver(() => updateAnim());
    ro.observe(rootRef.current);
    updateAnim();
    return () => ro.disconnect();
  }, []);
  const inheritRadius = {
    borderRadius: style?.borderRadius ?? "inherit"
  };
  const strokeStyle = {
    ...inheritRadius,
    borderWidth: thickness,
    borderStyle: "solid",
    borderColor: color
  };
  const glow1Style = {
    ...inheritRadius,
    borderWidth: thickness,
    borderStyle: "solid",
    borderColor: hexToRgba(color, 0.6),
    filter: `blur(${0.5 + thickness * 0.25}px)`,
    opacity: 0.5
  };
  const glow2Style = {
    ...inheritRadius,
    borderWidth: thickness,
    borderStyle: "solid",
    borderColor: color,
    filter: `blur(${2 + thickness * 0.5}px)`,
    opacity: 0.5
  };
  const bgGlowStyle = {
    ...inheritRadius,
    transform: "scale(1.08)",
    filter: "blur(32px)",
    opacity: 0.3,
    zIndex: -1,
    background: `linear-gradient(-30deg, ${hexToRgba(color, 0.8)}, transparent, ${color})`
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: rootRef,
      className: "relative isolate " + (className ?? ""),
      style,
      children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            ref: svgRef,
            className: "fixed -left-[10000px] -top-[10000px] w-[10px] h-[10px] opacity-[0.001] pointer-events-none",
            "aria-hidden": true,
            focusable: "false",
            children: /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
              "filter",
              {
                id: filterId,
                colorInterpolationFilters: "sRGB",
                x: "-20%",
                y: "-20%",
                width: "140%",
                height: "140%",
                children: [
                  /* @__PURE__ */ jsx(
                    "feTurbulence",
                    {
                      type: "turbulence",
                      baseFrequency: "0.02",
                      numOctaves: "10",
                      result: "noise1",
                      seed: "1"
                    }
                  ),
                  /* @__PURE__ */ jsx("feOffset", { in: "noise1", dx: "0", dy: "0", result: "offsetNoise1", children: /* @__PURE__ */ jsx(
                    "animate",
                    {
                      attributeName: "dy",
                      values: "700; 0",
                      dur: "6s",
                      repeatCount: "indefinite",
                      calcMode: "linear"
                    }
                  ) }),
                  /* @__PURE__ */ jsx(
                    "feTurbulence",
                    {
                      type: "turbulence",
                      baseFrequency: "0.02",
                      numOctaves: "10",
                      result: "noise2",
                      seed: "1"
                    }
                  ),
                  /* @__PURE__ */ jsx("feOffset", { in: "noise2", dx: "0", dy: "0", result: "offsetNoise2", children: /* @__PURE__ */ jsx(
                    "animate",
                    {
                      attributeName: "dy",
                      values: "0; -700",
                      dur: "6s",
                      repeatCount: "indefinite",
                      calcMode: "linear"
                    }
                  ) }),
                  /* @__PURE__ */ jsx(
                    "feTurbulence",
                    {
                      type: "turbulence",
                      baseFrequency: "0.02",
                      numOctaves: "10",
                      result: "noise1",
                      seed: "2"
                    }
                  ),
                  /* @__PURE__ */ jsx("feOffset", { in: "noise1", dx: "0", dy: "0", result: "offsetNoise3", children: /* @__PURE__ */ jsx(
                    "animate",
                    {
                      attributeName: "dx",
                      values: "490; 0",
                      dur: "6s",
                      repeatCount: "indefinite",
                      calcMode: "linear"
                    }
                  ) }),
                  /* @__PURE__ */ jsx(
                    "feTurbulence",
                    {
                      type: "turbulence",
                      baseFrequency: "0.02",
                      numOctaves: "10",
                      result: "noise2",
                      seed: "2"
                    }
                  ),
                  /* @__PURE__ */ jsx("feOffset", { in: "noise2", dx: "0", dy: "0", result: "offsetNoise4", children: /* @__PURE__ */ jsx(
                    "animate",
                    {
                      attributeName: "dx",
                      values: "0; -490",
                      dur: "6s",
                      repeatCount: "indefinite",
                      calcMode: "linear"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("feComposite", { in: "offsetNoise1", in2: "offsetNoise2", result: "part1" }),
                  /* @__PURE__ */ jsx("feComposite", { in: "offsetNoise3", in2: "offsetNoise4", result: "part2" }),
                  /* @__PURE__ */ jsx(
                    "feBlend",
                    {
                      in: "part1",
                      in2: "part2",
                      mode: "color-dodge",
                      result: "combinedNoise"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "feDisplacementMap",
                    {
                      in: "SourceGraphic",
                      in2: "combinedNoise",
                      scale: "30",
                      xChannelSelector: "R",
                      yChannelSelector: "B"
                    }
                  )
                ]
              }
            ) })
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: inheritRadius,
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  ref: strokeRef,
                  className: "absolute inset-0 box-border",
                  style: strokeStyle
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 box-border", style: glow1Style }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 box-border", style: glow2Style }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: bgGlowStyle })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative", style: inheritRadius, children })
      ]
    }
  );
};

function DecryptedText({
  text,
  speed = 50,
  maxIterations = 15,
  sequential = true,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}[]|\\:\";'<>?,./~`",
  className = "",
  parentClassName = "",
  encryptedClassName = "text-primary/60",
  animateOn = "view",
  onComplete,
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(/* @__PURE__ */ new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    let interval;
    let currentIteration = 0;
    const getNextIndex = (revealedSet) => {
      const textLength = text.length;
      switch (revealDirection) {
        case "start":
          return revealedSet.size;
        case "end":
          return textLength - 1 - revealedSet.size;
        case "center": {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;
          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
            return nextIndex;
          }
          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealedSet.size;
      }
    };
    const availableChars = useOriginalCharsOnly ? Array.from(new Set(text.split(""))).filter((char) => char !== " ") : characters.split("");
    const shuffleText = (originalText, currentRevealed) => {
      if (useOriginalCharsOnly) {
        const positions = originalText.split("").map((char, i) => ({
          char,
          isSpace: char === " ",
          index: i,
          isRevealed: currentRevealed.has(i)
        }));
        const nonSpaceChars = positions.filter((p) => !p.isSpace && !p.isRevealed).map((p) => p.char);
        for (let i = nonSpaceChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];
        }
        let charIndex = 0;
        return positions.map((p) => {
          if (p.isSpace) return " ";
          if (p.isRevealed) return originalText[p.index];
          return nonSpaceChars[charIndex++] || p.char;
        }).join("");
      } else {
        return originalText.split("").map((char, i) => {
          if (char === " ") return " ";
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        }).join("");
      }
    };
    if (isAnimating) {
      setIsScrambling(true);
      interval = window.setInterval(() => {
        setRevealedIndices((prevRevealed) => {
          if (sequential) {
            if (prevRevealed.size < text.length) {
              const nextIndex = getNextIndex(prevRevealed);
              const newRevealed = new Set(prevRevealed);
              newRevealed.add(nextIndex);
              setDisplayText(shuffleText(text, newRevealed));
              return newRevealed;
            } else {
              window.clearInterval(interval);
              setIsScrambling(false);
              setTimeout(() => {
                onComplete?.();
              }, 200);
              return prevRevealed;
            }
          } else {
            setDisplayText(shuffleText(text, prevRevealed));
            currentIteration++;
            if (currentIteration >= maxIterations) {
              window.clearInterval(interval);
              setIsScrambling(false);
              setDisplayText(text);
              setTimeout(() => {
                onComplete?.();
              }, 200);
            }
            return prevRevealed;
          }
        });
      }, speed);
    }
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [
    isAnimating,
    text,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    characters,
    useOriginalCharsOnly,
    onComplete
  ]);
  useEffect(() => {
    if (animateOn !== "view") return;
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsAnimating(true);
          setHasAnimated(true);
        }
      });
    };
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [animateOn, hasAnimated]);
  const hoverProps = animateOn === "hover" ? {
    onMouseEnter: () => setIsAnimating(true),
    onMouseLeave: () => {
      setIsAnimating(false);
      setRevealedIndices(/* @__PURE__ */ new Set());
      setDisplayText(text);
      setIsScrambling(false);
    }
  } : {};
  return /* @__PURE__ */ jsxs(
    "span",
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap ${parentClassName}`,
      ...hoverProps,
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: text }),
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "relative", children: displayText.split("").map((char, index) => {
          const isRevealedOrDone = revealedIndices.has(index) || !isScrambling || !isAnimating;
          return /* @__PURE__ */ jsx(
            "span",
            {
              className: `${isRevealedOrDone ? `${className} transition-all duration-200` : `${encryptedClassName} animate-pulse transition-all duration-100`}`,
              style: {
                textShadow: isRevealedOrDone && className.includes("text-glow") ? "0 0 10px rgba(57, 255, 20, 0.8), 0 0 20px rgba(57, 255, 20, 0.4)" : void 0
              },
              children: char
            },
            `${char}-${index}`
          );
        }) })
      ]
    }
  );
}

const TextType = ({
  text,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2e3,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  onStart,
  startOnVisible = false,
  reverseMode = false,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);
  const textArray = useMemo(() => Array.isArray(text) ? text : [text], [text]);
  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);
  const getCurrentTextColor = () => {
    if (textColors.length === 0) return "#ffffff";
    return textColors[currentTextIndex % textColors.length];
  };
  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);
  useEffect(() => {
    if (showCursor && cursorRef.current) {
      cursorRef.current.style.animation = `cursorBlink ${cursorBlinkDuration}s ease-in-out infinite`;
    }
  }, [showCursor, cursorBlinkDuration]);
  useEffect(() => {
    if (!isVisible) return;
    let timeout;
    const currentText = textArray[currentTextIndex];
    const processedText = reverseMode ? currentText.split("").reverse().join("") : currentText;
    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === "") {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }
          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }
          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {
          }, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          if (currentCharIndex === 0 && onStart) {
            onStart();
          }
          timeout = setTimeout(
            () => {
              setDisplayedText(
                (prev) => prev + processedText[currentCharIndex]
              );
              setCurrentCharIndex((prev) => prev + 1);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed
          );
        } else if (textArray.length > 1) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };
    if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }
    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete
  ]);
  const shouldHideCursor = hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);
  return createElement(
    Component,
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
      ...props
    },
    /* @__PURE__ */ jsx("span", { className: "inline", style: { color: getCurrentTextColor() }, children: displayedText }),
    showCursor && /* @__PURE__ */ jsx(
      "span",
      {
        ref: cursorRef,
        className: `ml-1 inline-block opacity-100 ${shouldHideCursor ? "hidden" : ""} ${cursorClassName}`,
        children: cursorCharacter
      }
    )
  );
};

function AboutHero({ quotes }) {
  const [headlineComplete, setHeadlineComplete] = useState(false);
  const [startTextType, setStartTextType] = useState(false);
  const [subtitle1Complete, setSubtitle1Complete] = useState(false);
  const [subtitle2Complete, setSubtitle2Complete] = useState(false);
  const [textTypeStarted, setTextTypeStarted] = useState(false);
  const [heroCompleteDispatched, setHeroCompleteDispatched] = useState(false);
  useEffect(() => {
    if (headlineComplete) {
      setStartTextType(true);
    }
  }, [headlineComplete]);
  const handleTextTypeStart = () => {
    setTextTypeStarted(true);
    const event = new CustomEvent("textTypeStarted", {
      detail: { timestamp: Date.now() }
    });
    window.dispatchEvent(event);
  };
  useEffect(() => {
    if (!heroCompleteDispatched && headlineComplete && subtitle1Complete && subtitle2Complete && textTypeStarted) {
      clientLogger.animation("AboutHero", "fully completed — dispatching aboutHeroComplete");
      const completeEvent = new CustomEvent("aboutHeroComplete", {
        detail: { timestamp: Date.now() }
      });
      window.dispatchEvent(completeEvent);
      setHeroCompleteDispatched(true);
    }
  }, [headlineComplete, subtitle1Complete, subtitle2Complete, textTypeStarted, heroCompleteDispatched]);
  return /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-center justify-center py-2 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsx(
      ElectricBorder,
      {
        color: "#39FF14",
        speed: 1,
        chaos: 0.5,
        thickness: 3,
        style: { borderRadius: "80%" },
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/avatar.webp",
            alt: "Portrait of Vasileios Politeiadis",
            className: "w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto rounded-full object-cover",
            loading: "eager",
            fetchPriority: "high"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { id: "about-hero-content", className: "opacity-0 transition-opacity duration-1000", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight font-orbitron font-bold mb-3 text-center", children: [
        /* @__PURE__ */ jsx("span", { className: "block text-center", children: /* @__PURE__ */ jsx(
          DecryptedText,
          {
            text: "Vasileios Politeiadis",
            speed: 80,
            maxIterations: 20,
            sequential: true,
            revealDirection: "start",
            characters: "01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}[]|\\:;'<>?,./~`",
            className: "text-matrix-white text-glow text-center",
            encryptedClassName: "text-primary/40",
            animateOn: "view",
            onComplete: () => {
              clientLogger.animation("AboutHero", "headline decryption completed");
              setHeadlineComplete(true);
            }
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-center sm:gap-2 mt-2 text-base sm:text-lg lg:text-xl xl:text-2xl text-center", children: [
          /* @__PURE__ */ jsx(
            DecryptedText,
            {
              text: "QA Automation Engineer",
              speed: 80,
              maxIterations: 20,
              sequential: true,
              revealDirection: "center",
              characters: "01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}[]|\\:;'<>?,./~`",
              className: "text-digital-emerald text-center",
              encryptedClassName: "text-digital-emerald/40",
              animateOn: "view",
              onComplete: () => {
                clientLogger.animation("AboutHero", "first subtitle text completed");
                setSubtitle1Complete(true);
              }
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline text-digital-emerald", children: "·" }),
          /* @__PURE__ */ jsx(
            DecryptedText,
            {
              text: "Full-Stack Developer",
              speed: 80,
              maxIterations: 20,
              sequential: true,
              revealDirection: "center",
              characters: "01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}[]|\\:;'<>?,./~`",
              animateOn: "view",
              className: "text-digital-emerald text-center",
              encryptedClassName: "text-digital-emerald/40",
              onComplete: () => {
                clientLogger.animation("AboutHero", "both subtitle texts decryption completed");
                setSubtitle2Complete(true);
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-4 max-w-3xl mx-auto text-center min-h-[2.5rem] flex items-center justify-center", children: startTextType ? /* @__PURE__ */ jsx(
        TextType,
        {
          text: quotes,
          typingSpeed: 45,
          pauseDuration: 1500,
          deletingSpeed: 25,
          loop: true,
          showCursor: true,
          cursorCharacter: "|",
          cursorClassName: "text-primary text-glow",
          cursorBlinkDuration: 0.8,
          className: "text-xs sm:text-sm lg:text-base xl:text-lg font-orbitron text-foreground/90 leading-relaxed tracking-wide",
          startOnVisible: false,
          onStart: handleTextTypeStart,
          onSentenceComplete: (_, index) => {
            clientLogger.animation("AboutHero", `quote ${index + 1} completed`);
          }
        }
      ) : (
        // Placeholder to maintain consistent height and prevent layout shift
        /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm lg:text-base xl:text-lg font-orbitron text-foreground/30 leading-relaxed tracking-wide opacity-0", children: "Debugging reality." })
      ) })
    ] })
  ] });
}

const $$Astro = createAstro("https://vpoliteiadis.com");
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  const aboutStructuredData = {
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Person",
      "name": "Vasileios Politeiadis",
      "jobTitle": "Senior QA Automation Specialist & Full-Stack Developer",
      "description": "Expert in European Commission projects, Java automation frameworks, React/Next.js development, and AI-powered solutions. Specializing in end-to-end QA processes and modern web applications.",
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
      "hasOccupation": [
        {
          "@type": "Occupation",
          "name": "Senior QA Automation Specialist",
          "occupationLocation": {
            "@type": "Place",
            "name": "European Commission - DG DIGIT"
          },
          "description": "Leading test automation in quality assurance teams for European Commission projects"
        },
        {
          "@type": "Occupation",
          "name": "Full-Stack Developer",
          "description": "End-to-end development of modern web applications using React, Next.js, and Supabase"
        }
      ]
    }
  };
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "About Vasileios Politeiadis - Senior QA Automation Specialist & Full-Stack Developer", "description": "Vasileios Politeiadis is a Senior QA Automation Specialist at European Commission DG DIGIT and Full-Stack Developer specializing in Java automation frameworks, React/Next.js applications, and AI-powered solutions. View complete professional background, skills, and experience.", "currentPath": "/about", "bgSlug": "about-bg", "bgEager": true, "bgOpacityClass": "opacity-70 md:opacity-80", "bgOverlayClass": "from-black/20 via-black/10 to-black/25", "keywords": [
    "Vasileios Politeiadis",
    "QA Automation Specialist",
    "QA Automation Engineer",
    "Full-Stack Developer",
    "European Commission Projects",
    "Java Selenium Testing",
    "Playwright Testing",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "AI Automation",
    "Professional Portfolio",
    "Online CV"
  ], "structuredData": aboutStructuredData, "data-astro-cid-kh7btl4r": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative isolate z-10 min-h-[25vh] flex items-center justify-center pt-8 md:pt-10 lg:pt-12" role="banner" aria-labelledby="hero-heading" data-testid="page-about" data-astro-cid-kh7btl4r> <div class="w-full" data-astro-cid-kh7btl4r> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-astro-cid-kh7btl4r> <h1 id="hero-heading" class="sr-only" data-astro-cid-kh7btl4r>Vasileios Politeiadis - Senior QA Automation Specialist & Full-Stack Developer</h1> ${renderComponent($$result2, "AboutHero", AboutHero, { "quotes": [
    "Certified bug hunter.",
    "Debugging reality.",
    "I break code professionally.",
    "Automating workflows, amplifying humans.",
    "Partnering with AI to outpace time.",
    "The best way to predict the future is to invent it.",
    "Human creativity, artificial brains.",
    "The computer was born to solve problems that did not exist before.",
    "Engineering the future, accelerated by AI.",
    "Writing tests that test the limits.",
    "Any sufficiently advanced technology is indistinguishable from magic.",
    "I write code that watches your code.",
    "Imagination is more important than knowledge.",
    "The future is already here \u2014 it's just not evenly distributed.",
    "If you don't believe me or don't get it, I don't have time to try to convince you."
  ], "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/AboutHero.tsx", "client:component-export": "default", "data-astro-cid-kh7btl4r": true })} </div> </div> </section>  <section class="relative z-10 pt-4 md:pt-6 pb-16" role="main" aria-labelledby="professional-summary-heading" data-testid="about-main-content" data-astro-cid-kh7btl4r> <div class="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 md:space-y-10" data-astro-cid-kh7btl4r> <!-- Professional Summary --> ${renderComponent($$result2, "Card", Card, { "className": "border-neon-lime/20 bg-matrix-black/60 backdrop-blur-md animate-reveal-up-delayed-1 opacity-0", "data-astro-cid-kh7btl4r": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardHeader", CardHeader, { "data-astro-cid-kh7btl4r": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "CardTitle", CardTitle, { "id": "professional-summary-heading", "className": "text-2xl font-orbitron font-bold text-neon-lime text-shadow-neon flex items-center gap-3", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "AwardIcon", AwardIcon, { "size": "lg", "className": "text-neon-lime", "aria-label": "Professional identity icon", "data-astro-cid-kh7btl4r": true })}
Professional Summary
` })} ` })} ${renderComponent($$result3, "CardContent", CardContent, { "data-astro-cid-kh7btl4r": true }, { "default": ($$result4) => renderTemplate` <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6" data-astro-cid-kh7btl4r> ${renderComponent($$result4, "Card", Card, { "className": "border-digital-emerald/20 bg-cyber-gray/20 hover:bg-cyber-gray/30 hover:border-digital-emerald/40 transition-all duration-300 hover:-translate-y-1 animate-stagger-fade-delayed-1 opacity-0", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "CardContent", CardContent, { "className": "p-4", "data-astro-cid-kh7btl4r": true }, { "default": ($$result6) => renderTemplate` <h2 class="font-orbitron font-bold text-digital-emerald mb-2 text-shadow-emerald text-lg" data-astro-cid-kh7btl4r>🤖 QA Automation Specialist</h2> <p class="text-sm text-matrix-white/80 mb-3 flex-grow" data-astro-cid-kh7btl4r>Leading test automation in quality assurance for European Commission projects with end-to-end QA processes.</p> <div class="flex flex-wrap gap-2 mt-auto" data-astro-cid-kh7btl4r> ${renderComponent($$result6, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result7) => renderTemplate`Java` })} ${renderComponent($$result6, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result7) => renderTemplate`Selenium` })} ${renderComponent($$result6, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result7) => renderTemplate`Playwright` })} </div> ` })} ` })} ${renderComponent($$result4, "Card", Card, { "className": "border-digital-emerald/20 bg-cyber-gray/20 hover:bg-cyber-gray/30 hover:border-digital-emerald/40 transition-all duration-300 hover:-translate-y-1 animate-stagger-fade-delayed-2 opacity-0", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "CardContent", CardContent, { "className": "p-4", "data-astro-cid-kh7btl4r": true }, { "default": ($$result6) => renderTemplate` <h2 class="font-orbitron font-bold text-digital-emerald mb-2 text-shadow-emerald text-lg" data-astro-cid-kh7btl4r>💻 Full-Stack Developer</h2> <p class="text-sm text-matrix-white/80 mb-3 flex-grow" data-astro-cid-kh7btl4r>Building modern web applications with React, Next.js, TypeScript, and Supabase. Scalable solutions and cloud deployment.</p> <div class="flex flex-wrap gap-2 mt-auto" data-astro-cid-kh7btl4r> ${renderComponent($$result6, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result7) => renderTemplate`React` })} ${renderComponent($$result6, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result7) => renderTemplate`Next.js` })} ${renderComponent($$result6, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result7) => renderTemplate`Supabase` })} </div> ` })} ` })} ${renderComponent($$result4, "Card", Card, { "className": "border-digital-emerald/20 bg-cyber-gray/20 hover:bg-cyber-gray/30 hover:border-digital-emerald/40 transition-all duration-300 hover:-translate-y-1 animate-stagger-fade-delayed-3 opacity-0", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "CardContent", CardContent, { "className": "p-4", "data-astro-cid-kh7btl4r": true }, { "default": ($$result6) => renderTemplate` <h2 class="font-orbitron font-bold text-digital-emerald mb-2 text-shadow-emerald text-lg" data-astro-cid-kh7btl4r>🔧 AI-Powered Solutions</h2> <p class="text-sm text-matrix-white/80 mb-3 flex-grow" data-astro-cid-kh7btl4r>Developing AI tools and automation workflows for streamlined processes and smarter digital solutions.</p> <div class="flex flex-wrap gap-2 mt-auto" data-astro-cid-kh7btl4r> ${renderComponent($$result6, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result7) => renderTemplate`AI Automation` })} ${renderComponent($$result6, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result7) => renderTemplate`Productivity` })} ${renderComponent($$result6, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result7) => renderTemplate`Innovation` })} </div> ` })} ` })} </div> ` })} ` })} <!-- Two Column Layout --> <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-10" data-astro-cid-kh7btl4r> <!-- Professional Timeline --> ${renderComponent($$result2, "Card", Card, { "className": "border-neon-lime/20 bg-matrix-black/60 backdrop-blur-md animate-reveal-up-delayed-2 opacity-0", "data-astro-cid-kh7btl4r": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardHeader", CardHeader, { "data-astro-cid-kh7btl4r": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "CardTitle", CardTitle, { "className": "text-2xl font-orbitron font-bold text-neon-lime text-shadow-neon flex items-center gap-3", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate` <svg class="w-6 h-6 text-neon-lime" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-astro-cid-kh7btl4r> <circle cx="12" cy="12" r="10" data-astro-cid-kh7btl4r></circle> <polyline points="12,6 12,12 16,14" data-astro-cid-kh7btl4r></polyline> </svg>
Professional Timeline
` })} ` })} ${renderComponent($$result3, "CardContent", CardContent, { "data-astro-cid-kh7btl4r": true }, { "default": ($$result4) => renderTemplate` <div class="relative" data-astro-cid-kh7btl4r> <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-neon-lime/20" data-astro-cid-kh7btl4r></div> <div class="space-y-8" data-astro-cid-kh7btl4r> <div class="relative flex items-start" data-astro-cid-kh7btl4r> <div class="absolute left-2 top-2 w-4 h-4 bg-neon-lime rounded-full border-2 border-matrix-black" data-astro-cid-kh7btl4r></div> <div class="ml-12" data-astro-cid-kh7btl4r> <div class="flex items-center gap-2 mb-3" data-astro-cid-kh7btl4r> <span class="text-sm text-matrix-white/60" data-astro-cid-kh7btl4r>2024 - Present</span> ${renderComponent($$result4, "Badge", Badge, { "className": "bg-neon-lime/10 text-neon-lime border-neon-lime/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate`Current` })} </div> <h3 class="font-orbitron font-bold text-neon-lime mb-2 text-shadow-neon text-lg" data-astro-cid-kh7btl4r>Senior QA Automation Specialist</h3> <p class="text-digital-emerald text-base mb-3" data-astro-cid-kh7btl4r>European Commission - DG DIGIT</p> <p class="text-matrix-white/80 text-base leading-relaxed" data-astro-cid-kh7btl4r>
Leading test automation in quality assurance teams for European Commission projects, specializing in custom Java-based automation frameworksusing Selenium WebDriver.
</p> </div> </div> <div class="relative flex items-start" data-astro-cid-kh7btl4r> <div class="absolute left-2 top-2 w-4 h-4 bg-digital-emerald rounded-full border-2 border-matrix-black" data-astro-cid-kh7btl4r></div> <div class="ml-12" data-astro-cid-kh7btl4r> <span class="text-sm text-matrix-white/60" data-astro-cid-kh7btl4r>2022 - Present</span> <h3 class="font-orbitron font-bold text-digital-emerald mb-2 text-shadow-emerald text-lg" data-astro-cid-kh7btl4r>Full-Stack Developer - QA Lead</h3> <p class="text-neon-lime text-base mb-3" data-astro-cid-kh7btl4r>Upiria (Freelance)</p> <p class="text-matrix-white/80 text-base leading-relaxed" data-astro-cid-kh7btl4r>
Full-stack development and leading QA processes for Upiria startup, delivering scalable solutions with fast delivery cycles and high quality using modern web technologies.
</p> </div> </div> <div class="relative flex items-start" data-astro-cid-kh7btl4r> <div class="absolute left-2 top-2 w-4 h-4 bg-digital-emerald rounded-full border-2 border-matrix-black" data-astro-cid-kh7btl4r></div> <div class="ml-12" data-astro-cid-kh7btl4r> <span class="text-sm text-matrix-white/60" data-astro-cid-kh7btl4r>2018 - 2021</span> <h3 class="font-orbitron font-bold text-digital-emerald mb-2 text-shadow-emerald text-lg" data-astro-cid-kh7btl4r>Junior QA Automation Engineer</h3> <p class="text-neon-lime text-base mb-3" data-astro-cid-kh7btl4r>SWORD - European Commission Projects</p> <p class="text-matrix-white/80 text-base leading-relaxed" data-astro-cid-kh7btl4r>
Quality assurance and testing automation for European Commission projects, establishing foundational testing practices and automation workflows using Java and Selenium.
</p> </div> </div> <div class="relative flex items-start" data-astro-cid-kh7btl4r> <div class="absolute left-2 top-2 w-4 h-4 bg-digital-emerald rounded-full border-2 border-matrix-black" data-astro-cid-kh7btl4r></div> <div class="ml-12" data-astro-cid-kh7btl4r> <span class="text-sm text-matrix-white/60" data-astro-cid-kh7btl4r>2018</span> <h3 class="font-orbitron font-bold text-digital-emerald mb-2 text-shadow-emerald text-lg" data-astro-cid-kh7btl4r>Electrical Engineering and Computer Science</h3> <p class="text-neon-lime text-base mb-3" data-astro-cid-kh7btl4r>Aristotle University of Thessaloniki</p> <p class="text-matrix-white/80 text-base leading-relaxed" data-astro-cid-kh7btl4r>
Foundation in engineering principles and computer science fundamentals, providing the theoretical and practical knowledge for modern software development and QA automation.
</p> </div> </div> </div> </div> ` })} ` })} <!-- Right Column --> <div class="space-y-6 md:space-y-8" data-astro-cid-kh7btl4r> <!-- Skills --> ${renderComponent($$result2, "Card", Card, { "className": "border-neon-lime/20 bg-matrix-black/60 backdrop-blur-md animate-reveal-up-delayed-3 opacity-0", "data-astro-cid-kh7btl4r": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardHeader", CardHeader, { "data-astro-cid-kh7btl4r": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "CardTitle", CardTitle, { "className": "text-2xl font-orbitron font-bold text-neon-lime text-shadow-neon flex items-center gap-3", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "MonitorIcon", MonitorIcon, { "size": "lg", "className": "text-neon-lime", "aria-label": "Skills icon", "data-astro-cid-kh7btl4r": true })}
Skills
` })} ` })} ${renderComponent($$result3, "CardContent", CardContent, { "data-astro-cid-kh7btl4r": true }, { "default": ($$result4) => renderTemplate` <div class="space-y-6" data-astro-cid-kh7btl4r> <div data-astro-cid-kh7btl4r> <div class="flex items-center justify-between mb-3" data-astro-cid-kh7btl4r> <h3 class="font-orbitron font-bold text-matrix-white text-base" data-astro-cid-kh7btl4r>QA Automation and Testing</h3> </div> <div class="flex flex-wrap gap-2" data-astro-cid-kh7btl4r> ${renderComponent($$result4, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate`Java` })} ${renderComponent($$result4, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate`Selenium` })} ${renderComponent($$result4, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate`Playwright` })} ${renderComponent($$result4, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate`TypeScript` })} </div> </div> <div data-astro-cid-kh7btl4r> <div class="flex items-center justify-between mb-3" data-astro-cid-kh7btl4r> <h3 class="font-orbitron font-bold text-matrix-white text-base" data-astro-cid-kh7btl4r>Full-Stack Development</h3> </div> <div class="flex flex-wrap gap-2" data-astro-cid-kh7btl4r> ${renderComponent($$result4, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate`React` })} ${renderComponent($$result4, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate`Next.js` })} ${renderComponent($$result4, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate`Node.js` })} ${renderComponent($$result4, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate`Supabase` })} </div> </div> <div data-astro-cid-kh7btl4r> <div class="flex items-center justify-between mb-3" data-astro-cid-kh7btl4r> <h3 class="font-orbitron font-bold text-matrix-white text-base" data-astro-cid-kh7btl4r>Modern Web Technologies</h3> </div> <div class="flex flex-wrap gap-2" data-astro-cid-kh7btl4r> ${renderComponent($$result4, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate`Astro` })} ${renderComponent($$result4, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate`Tailwind CSS` })} ${renderComponent($$result4, "Badge", Badge, { "variant": "outline", "className": "bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate`TypeScript` })} </div> </div> </div> ` })} ` })} <!-- Education & Certificates --> ${renderComponent($$result2, "Card", Card, { "className": "border-neon-lime/20 bg-matrix-black/60 backdrop-blur-md animate-reveal-up-delayed-4 opacity-0", "data-astro-cid-kh7btl4r": true }, { "default": ($$result3) => renderTemplate`  ${renderComponent($$result3, "CardHeader", CardHeader, { "data-astro-cid-kh7btl4r": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "CardTitle", CardTitle, { "className": "text-2xl font-orbitron font-bold text-neon-lime text-shadow-neon flex items-center gap-3", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "GraduationIcon", GraduationIcon, { "size": "lg", "className": "text-neon-lime", "aria-label": "Education icon", "data-astro-cid-kh7btl4r": true })}
Education
` })} ` })} ${renderComponent($$result3, "CardContent", CardContent, { "data-astro-cid-kh7btl4r": true }, { "default": ($$result4) => renderTemplate` <h3 class="font-orbitron font-bold text-matrix-white text-lg" data-astro-cid-kh7btl4r>Electrical Engineering and Computer Science</h3> <p class="text-digital-emerald text-base" data-astro-cid-kh7btl4r>Aristotle University of Thessaloniki</p> <p class="text-sm text-matrix-white/70 mt-1" data-astro-cid-kh7btl4r>Graduated 2018</p> <p class="text-sm text-matrix-white/80 mt-2" data-astro-cid-kh7btl4r>
Thesis: Automated test engine for RESTful Web Services -<br data-astro-cid-kh7btl4r>
Foundation in engineering principles and computer science fundamentals for modern software development
</p> ` })}  <div class="border-t border-matrix-white/20 mx-6" data-astro-cid-kh7btl4r></div>  ${renderComponent($$result3, "CardHeader", CardHeader, { "className": "pt-6", "data-astro-cid-kh7btl4r": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "CardTitle", CardTitle, { "className": "text-2xl font-orbitron font-bold text-neon-lime text-shadow-neon flex items-center gap-3", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "AwardIcon", AwardIcon, { "size": "lg", "className": "text-neon-lime", "aria-label": "Certificates icon", "data-astro-cid-kh7btl4r": true })}
Professional Certifications
` })} ` })} ${renderComponent($$result3, "CardContent", CardContent, { "data-astro-cid-kh7btl4r": true }, { "default": ($$result4) => renderTemplate` <h3 class="font-orbitron font-bold text-matrix-white text-lg" data-astro-cid-kh7btl4r>Certified Tester Foundation Level (CTFL)</h3> <p class="text-digital-emerald text-base" data-astro-cid-kh7btl4r>ISTQB® - International Software Testing Qualifications Board</p> <p class="text-sm text-matrix-white/70 mt-1" data-astro-cid-kh7btl4r>Issued October 2018</p> <p class="text-sm text-matrix-white/80 mt-2" data-astro-cid-kh7btl4r>
Foundation level certification in software testing principles and practices, validating expertise in QA methodologies
</p> ` })} ` })} <!-- Hobbies --> ${renderComponent($$result2, "Card", Card, { "className": "border-cyan-400/20 bg-matrix-black/60 backdrop-blur-md animate-reveal-up-delayed-5 opacity-0", "data-astro-cid-kh7btl4r": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardHeader", CardHeader, { "data-astro-cid-kh7btl4r": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "CardTitle", CardTitle, { "className": "text-2xl font-orbitron font-bold text-cyan-400 text-shadow-cyan flex items-center gap-3", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "PaletteIcon", PaletteIcon, { "size": "lg", "className": "text-cyan-400", "aria-label": "Hobbies icon", "data-astro-cid-kh7btl4r": true })}
Hobbies
` })} ` })} ${renderComponent($$result3, "CardContent", CardContent, { "data-astro-cid-kh7btl4r": true }, { "default": ($$result4) => renderTemplate` <div class="flex items-start gap-4" data-astro-cid-kh7btl4r> <div class="creative-avatar-orb flex-shrink-0" data-astro-cid-kh7btl4r> ${renderComponent($$result4, "Image", $$Image, { "src": arteImaginariAvatar, "alt": "Arte Imaginari AI creative avatar - Vasileios Politeiadis AI art portfolio", "class": "w-16 h-16 rounded-full object-cover", "widths": [64], "sizes": "64px", "format": "webp", "loading": "lazy", "data-astro-cid-kh7btl4r": true })} </div> <div class="flex-1" data-astro-cid-kh7btl4r> <h3 class="font-orbitron font-bold text-cyan-400 mb-2 text-shadow-cyan text-lg" data-astro-cid-kh7btl4r>
AI-Artist
</h3> <p class="text-matrix-white/80 mb-4 text-sm leading-relaxed" data-astro-cid-kh7btl4r>
AI-driven image and video projects using Midjourney, Kling AI, and other generative tools. Creating digital art, fashion designs, and creative content for various clients and personal projects.
</p> <div class="flex items-center gap-3" data-astro-cid-kh7btl4r> ${renderComponent($$result4, "Button", Button, { "asChild": true, "variant": "outline", "className": "border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/60", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate` <a href="/creative" aria-label="View AI creative portfolio and digital art projects" data-astro-cid-kh7btl4r> <span data-astro-cid-kh7btl4r>View Portfolio</span> <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-kh7btl4r> <path d="M9 18L15 12L9 6" data-astro-cid-kh7btl4r></path> </svg> </a> ` })} ${renderComponent($$result4, "Button", Button, { "asChild": true, "variant": "outline", "className": "border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/60", "data-astro-cid-kh7btl4r": true }, { "default": ($$result5) => renderTemplate` <a href="https://instagram.com/arte.imaginari" target="_blank" rel="noopener noreferrer" aria-label="Follow @arte.imaginari on Instagram for AI art and creative content" data-astro-cid-kh7btl4r> <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-kh7btl4r> <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" data-astro-cid-kh7btl4r></path> </svg> <span data-astro-cid-kh7btl4r>Follow</span> </a> ` })} </div> </div> </div> ` })} ` })} </div> </div> </div> </section> ` })}  ${renderScript($$result, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/about.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/about.astro", void 0);

const $$file = "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$About,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
