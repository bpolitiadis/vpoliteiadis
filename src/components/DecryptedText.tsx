import { useEffect, useState, useRef } from 'react'

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
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState<string>(text)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [isScrambling, setIsScrambling] = useState<boolean>(false)
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set())
  const [hasAnimated, setHasAnimated] = useState<boolean>(false)
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let interval: number | undefined
    let currentIteration = 0

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

    if (isAnimating) {
      setIsScrambling(true)
      interval = window.setInterval(() => {
        setRevealedIndices((prevRevealed) => {
          if (sequential) {
            if (prevRevealed.size < text.length) {
              const nextIndex = getNextIndex(prevRevealed)
              const newRevealed = new Set(prevRevealed)
              newRevealed.add(nextIndex)
              setDisplayText(shuffleText(text, newRevealed))
              return newRevealed
            } else {
              window.clearInterval(interval)
              setIsScrambling(false)
              setTimeout(() => {
                onComplete?.()
              }, 200)
              return prevRevealed
            }
          } else {
            setDisplayText(shuffleText(text, prevRevealed))
            currentIteration++
            if (currentIteration >= maxIterations) {
              window.clearInterval(interval)
              setIsScrambling(false)
              setDisplayText(text)
              setTimeout(() => {
                onComplete?.()
              }, 200)
            }
            return prevRevealed
          }
        })
      }, speed)
    }

    return () => {
      if (interval) window.clearInterval(interval)
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

  useEffect(() => {
    if (animateOn !== 'view') return

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsAnimating(true)
          setHasAnimated(true)
        }
      })
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const currentRef = containerRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [animateOn, hasAnimated])

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

  return (
    <span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      {...hoverProps}
      {...props}
    >
      <span className="sr-only">{text}</span>

      <span aria-hidden="true" className="relative">
        {displayText.split('').map((char, index) => {
          const isRevealedOrDone =
            revealedIndices.has(index) || !isScrambling || !isAnimating

          return (
            <span
              key={`${char}-${index}`}
              className={`${
                isRevealedOrDone 
                  ? `${className} transition-all duration-200` 
                  : `${encryptedClassName} animate-pulse transition-all duration-100`
              }`}
              style={{
                textShadow: isRevealedOrDone && className.includes('text-glow') 
                  ? '0 0 10px rgba(57, 255, 20, 0.8), 0 0 20px rgba(57, 255, 20, 0.4)' 
                  : undefined
              }}
            >
              {char}
            </span>
          )
        })}
      </span>
    </span>
  )
}
