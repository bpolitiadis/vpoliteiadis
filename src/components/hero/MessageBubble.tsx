'use client';

import { useState, useEffect } from 'react';
import TextType from '../TextType';
import clientLogger from '../../lib/logger-client';

type MessageBubbleProps = {
  onComplete?: () => void;
};

export default function MessageBubble({ onComplete }: MessageBubbleProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [displayText, setDisplayText] = useState('');
  const [showAccessGranted, setShowAccessGranted] = useState(false);
  
  const messages = [
    'Access granted.',
    'Hello, I am Vasilis.',
    'I break your code professionally.',
    'I like to build things.',
    'I automate boring workflows with AI.', 
    'Welcome to my website.',
  ];

  clientLogger.animation('MessageBubble', `rendered, currentStep: ${currentStep}, displayText: ${displayText}`);

  // Typing animation for each step
  useEffect(() => {
    clientLogger.animation('MessageBubble', `useEffect triggered, currentStep: ${currentStep}`);
    const message = messages[currentStep - 1];
    let index = 0;
    
    // Reset display text for new step
    setDisplayText('');
    
    const typeTimer = setInterval(() => {
      if (index < message.length) {
        setDisplayText(message.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeTimer as any);
        
        // Special handling for "Access granted" - show then hide
        if (currentStep === 1) {
          clientLogger.animation('MessageBubble', 'Showing Access Granted');
          setShowAccessGranted(true);
          setTimeout(() => {
            setShowAccessGranted(false);
            setCurrentStep(2); // Move to next message
          }, 1500); // Reduced from 2000ms to 1500ms
        } else {
          // Move to next step after a delay
          if (currentStep < messages.length) {
            setTimeout(() => {
              setCurrentStep(prev => prev + 1);
            }, 800); // Reduced from 1000ms to 800ms
          } else {
            // All messages complete, trigger navigation buttons
            setTimeout(() => {
              onComplete?.();
              // Also set data attribute for Astro script to detect
              const element = document.querySelector('[data-testid="message-bubble"]');
              if (element) {
                element.setAttribute('data-complete', 'true');
                clientLogger.animation('MessageBubble', 'sequence completed');
              }
            }, 800); // Reduced from 1000ms to 800ms
          }
        }
      }
    }, 30); // Slightly faster typing speed

    return () => clearInterval(typeTimer as any);
  }, [currentStep, onComplete]);

  return (
    <div
      className="relative max-w-lg"
      data-testid="message-bubble"
      role="dialog"
      aria-live="polite"
      aria-label="Welcome message"
    >
      {/* Main chat bubble with thin border and glassmorphism */}
      <div className="relative rounded-tl-none rounded-tr-[22px] rounded-br-[22px] rounded-bl-[22px] bg-black/30 backdrop-blur-lg border border-[#39FF14]/60 chat-bubble-glitch animate-reveal-up">
        <div className="p-6 md:p-8">
          <div className="space-y-3">
            {/* Show "Access granted" with typewriter animation */}
            {showAccessGranted && (
              <TextType
                text="Access granted."
                className="text-[#39FF14] font-orbitron text-lg font-bold text-shadow-neon"
                typingSpeed={35}
                pauseDuration={1000}
                deletingSpeed={25}
                loop={false}
                showCursor={true}
                cursorCharacter="|"
                cursorClassName="text-[#39FF14]"
                cursorBlinkDuration={0.8}
              />
            )}
            
            {/* Show main messages as they appear */}
            {currentStep >= 2 && (
              <p className="text-[#39FF14] font-orbitron text-lg font-bold text-shadow-neon">
                {currentStep === 2 ? displayText : messages[1]}
              </p>
            )}
            
            {currentStep >= 3 && (
              <p className="text-[#E8FFE8] text-base leading-relaxed">
                {currentStep === 3 ? displayText : messages[2]}
              </p>
            )}
            
            {currentStep >= 4 && (
              <p className="text-[#E8FFE8] text-base leading-relaxed">
                {currentStep === 4 ? displayText : messages[3]}
              </p>
            )}
            
            {currentStep >= 5 && (
              <p className="text-[#E8FFE8] text-base leading-relaxed">
                {currentStep === 5 ? displayText : messages[4]}
              </p>
            )}
            
            {currentStep >= 6 && (
              <p className="text-[#39FF14] font-orbitron text-lg font-bold text-shadow-neon">
                {currentStep === 6 ? displayText : messages[5]}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}