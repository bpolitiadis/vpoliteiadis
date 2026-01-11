import React, { useEffect, useState, useRef } from 'react'

interface DecryptedTextProps {
  text: string
  speed?: number
  maxIterations?: number
  sequential?: boolean
  revealDirection?: 'start' | 'end' | 'center'
  useOriginalCharsOnly?: boolean
  characters?: string
  className?: string
  encryptedClassName?: string
  parentClassName?: string
  animateOn?: 'view' | 'hover'
  onComplete?: () => void
  revealedStyle?: React.CSSProperties
  /**
   * Whether to re-animate when scrolling back into view.
   * Default: false (one-time animation - recommended for section headings)
   * Set to true for hero sections or CTAs where re-animation adds value
   */
  reAnimateOnView?: boolean
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 15,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}[]|\\:";\'<>?,./~`',
  className = '',
  parentClassName = '',
  encryptedClassName = 'text-primary/60',
  animateOn = 'view',
  onComplete,
  revealedStyle,
  reAnimateOnView = false, // Default: one-time animation (better UX for section headings)
  ...props
}: DecryptedTextProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  
  // Generate initial scrambled text
  const generateScrambledText = (originalText: string, useOriginalOnly: boolean, charSet: string): string => {
    const availableChars = useOriginalOnly
      ? Array.from(new Set(originalText.split(''))).filter((char) => char !== ' ')
      : charSet.split('')
    
    return originalText
      .split('')
      .map((char) => {
        if (char === ' ') return ' '
        return availableChars[Math.floor(Math.random() * availableChars.length)]
      })
      .join('')
  }
  
  // Initialize with scrambled text for view animations, final text for hover animations
  const initialText = animateOn === 'view' 
    ? generateScrambledText(text, useOriginalCharsOnly, characters)
    : text
  
  const [displayText, setDisplayText] = useState<string>(initialText)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [isScrambling, setIsScrambling] = useState<boolean>(animateOn === 'view')
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set())
  const containerRef = useRef<HTMLSpanElement>(null)
  const hasAnimatedRef = useRef<boolean>(false)
  const intervalRef = useRef<number | undefined>(undefined)

  // Client-only mount guard to prevent hydration mismatches
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Animation effect - simplified and reliable
  useEffect(() => {
    if (!isAnimating) {
      // Clear any existing interval
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = undefined
      }
      return
    }

    setIsScrambling(true)

    const getNextIndex = (revealedSet: Set<number>): number => {
      const textLength = text.length
      switch (revealDirection) {
        case 'start':
          return revealedSet.size
        case 'end':
          return textLength - 1 - revealedSet.size
        case 'center': {
          const middle = Math.floor(textLength / 2)
          const offset = Math.floor(revealedSet.size / 2)
          const nextIndex =
            revealedSet.size % 2 === 0
              ? middle + offset
              : middle - offset - 1

          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
            return nextIndex
          }
          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i
          }
          return 0
        }
        default:
          return revealedSet.size
      }
    }

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
      : characters.split('')

    const shuffleText = (originalText: string, currentRevealed: Set<number>): string => {
      if (useOriginalCharsOnly) {
        const positions = originalText.split('').map((char, i) => ({
          char,
          isSpace: char === ' ',
          index: i,
          isRevealed: currentRevealed.has(i),
        }))

        const nonSpaceChars = positions
          .filter((p) => !p.isSpace && !p.isRevealed)
          .map((p) => p.char)

        for (let i = nonSpaceChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]]
        }

        let charIndex = 0
        return positions
          .map((p) => {
            if (p.isSpace) return ' '
            if (p.isRevealed) return originalText[p.index]
            return nonSpaceChars[charIndex++] || p.char
          })
          .join('')
      } else {
        return originalText
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (currentRevealed.has(i)) return originalText[i]
            return availableChars[Math.floor(Math.random() * availableChars.length)]
          })
          .join('')
      }
    }

    let currentIteration = 0

    intervalRef.current = window.setInterval(() => {
      setRevealedIndices((prevRevealed) => {
        if (sequential) {
          // Check if animation is already complete
          if (prevRevealed.size >= text.length) {
            return prevRevealed
          }

          // Reveal next character
          const nextIndex = getNextIndex(prevRevealed)
          const newRevealed = new Set(prevRevealed)
          newRevealed.add(nextIndex)
          setDisplayText(shuffleText(text, newRevealed))

          // Check if this was the last character
          if (newRevealed.size >= text.length) {
            // Animation complete - clear interval and set final state
            if (intervalRef.current) {
              window.clearInterval(intervalRef.current)
              intervalRef.current = undefined
            }
            setIsScrambling(false)
            setIsAnimating(false)
            setDisplayText(text)
            setTimeout(() => {
              onComplete?.()
            }, 200)
          }

          return newRevealed
        } else {
          // Non-sequential mode
          setDisplayText(shuffleText(text, prevRevealed))
          currentIteration++
          if (currentIteration >= maxIterations) {
            if (intervalRef.current) {
              window.clearInterval(intervalRef.current)
              intervalRef.current = undefined
            }
            setIsScrambling(false)
            setIsAnimating(false)
            setDisplayText(text)
            setTimeout(() => {
              onComplete?.()
            }, 200)
          }
          return prevRevealed
        }
      })
    }, speed)

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = undefined
      }
    }
  }, [
    isAnimating,
    text,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    characters,
    useOriginalCharsOnly,
    onComplete,
  ])

  // Simplified view-based animation trigger - IntersectionObserver only
  useEffect(() => {
    if (animateOn !== 'view' || !isMounted) return

    const currentRef = containerRef.current
    if (!currentRef) return

    const startAnimation = () => {
      // Prevent duplicate animations
      if (!reAnimateOnView && hasAnimatedRef.current) {
        return
      }

      // Generate initial scrambled text
      const availableChars = useOriginalCharsOnly
        ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
        : characters.split('')
      const scrambledText = text
        .split('')
        .map((char) => {
          if (char === ' ') return ' '
          return availableChars[Math.floor(Math.random() * availableChars.length)]
        })
        .join('')

      setDisplayText(scrambledText)
      setRevealedIndices(new Set())
      setIsScrambling(true)
      setIsAnimating(true)
      hasAnimatedRef.current = true
    }

    // Use IntersectionObserver - simple and reliable
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (reAnimateOnView || !hasAnimatedRef.current) {
              startAnimation()
            }
            if (!reAnimateOnView) {
              observer.unobserve(entry.target)
            }
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.15, // Trigger when 15% visible
      }
    )

    observer.observe(currentRef)

    // Check if element is already visible
    const rect = currentRef.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const triggerPoint = viewportHeight * 0.85

    if (rect.top < triggerPoint && rect.bottom > 0 && !hasAnimatedRef.current) {
      setTimeout(() => {
        if (!hasAnimatedRef.current) {
          startAnimation()
        }
      }, 100)
    }

    return () => {
      observer.disconnect()
    }
  }, [animateOn, reAnimateOnView, text, useOriginalCharsOnly, characters, isMounted])

  const hoverProps =
    animateOn === 'hover'
      ? {
          onMouseEnter: () => setIsAnimating(true),
          onMouseLeave: () => {
            setIsAnimating(false)
            setRevealedIndices(new Set())
            setDisplayText(text)
            setIsScrambling(false)
          },
        }
      : {}

  // Render static text during SSR to prevent hydration mismatch
  if (!isMounted) {
    return (
      <span
        className={`inline-block whitespace-pre-wrap ${parentClassName}`}
        suppressHydrationWarning
        {...props}
      >
        <span className="sr-only">{text}</span>
        <span aria-hidden="true" className={className}>
          {text}
        </span>
      </span>
    )
  }

  return (
    <span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      data-decrypted-text="true"
      {...hoverProps}
      {...props}
    >
      <span className="sr-only">{text}</span>

      <span aria-hidden="true" className="relative">
        {displayText.split('').map((char, index) => {
          // Character is revealed if it's in the revealed set
          const isRevealed = revealedIndices.has(index)
          // Animation is complete when all characters are revealed and animation stopped
          const isComplete = revealedIndices.size === text.length && !isScrambling
          const isRevealedOrDone = isRevealed || isComplete
          
          // Show final character if revealed, scrambled character otherwise
          // When animation hasn't started (isAnimating=false), show scrambled text
          const displayChar = isRevealedOrDone ? text[index] : char

          return (
            <span
              key={`${char}-${index}-${isRevealed}-${isAnimating}`}
              className={`${
                isRevealedOrDone 
                  ? `${className} transition-all duration-200` 
                  : `${encryptedClassName} animate-pulse transition-all duration-100`
              }`}
              style={{
                ...(isRevealedOrDone && revealedStyle ? revealedStyle : {}),
                ...(isRevealedOrDone && className.includes('text-glow') && !revealedStyle
                  ? { textShadow: '0 0 10px rgba(57, 255, 20, 0.8), 0 0 20px rgba(57, 255, 20, 0.4)' }
                  : {})
              }}
            >
              {displayChar}
            </span>
          )
        })}
      </span>
    </span>
  )
}
