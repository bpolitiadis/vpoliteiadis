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
  const [accessGrantedComplete, setAccessGrantedComplete] = useState(false);
  const [accessGrantedText, setAccessGrantedText] = useState('');
  const [isDeletingAccessGranted, setIsDeletingAccessGranted] = useState(false);
  
  const messages = [
    'Access granted.',
    'Hello, I am Vasilis.',
    'I break your code professionally.',
    'I like to build things.',
    'I automate boring workflows with AI.', 
    'Welcome to my website.',
  ];

  clientLogger.animation('MessageBubble', `rendered, currentStep: ${currentStep}, displayText: ${displayText}`);

  // Custom typewriter effect for Access Granted
  useEffect(() => {
    if (currentStep !== 1 || !showAccessGranted) return;

    const accessGrantedMessage = 'Access granted.';
    let index = 0;
    let isDeleting = false;

    // Add initial delay before starting the typewriter effect
    const startDelay = setTimeout(() => {
      const typeTimer = setInterval(() => {
        if (!isDeleting) {
          // Typing phase
          if (index < accessGrantedMessage.length) {
            setAccessGrantedText(accessGrantedMessage.slice(0, index + 1));
            index++;
          } else {
            // Finished typing, wait then start deleting
            setTimeout(() => {
              setIsDeletingAccessGranted(true);
              isDeleting = true;
              index = accessGrantedMessage.length - 1;
            }, 1200); // Pause before deletion
          }
        } else {
          // Deleting phase
          if (index >= 0) {
            setAccessGrantedText(accessGrantedMessage.slice(0, index));
            index--;
          } else {
            // Finished deleting
            clearInterval(typeTimer as any);
            setAccessGrantedComplete(true);
            setTimeout(() => {
              setCurrentStep(2);
            }, 500);
          }
        }
      }, isDeleting ? 30 : 50); // Faster deletion than typing

      return () => clearInterval(typeTimer as any);
    }, 800); // Initial delay of 800ms

    return () => {
      clearTimeout(startDelay);
    };
  }, [currentStep, showAccessGranted]);

  // Typing animation for each step (starting from step 2)
  useEffect(() => {
    if (currentStep === 1) return; // Skip for Access Granted (handled by TextType)
    
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
        
        // Move to next step after a delay
        if (currentStep < messages.length) {
          setTimeout(() => {
            setCurrentStep(prev => prev + 1);
          }, 800);
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
          }, 800);
        }
      }
    }, 30);

    return () => clearInterval(typeTimer as any);
  }, [currentStep, onComplete]);

  // Show Access Granted typewriter effect on component mount
  useEffect(() => {
    if (currentStep === 1) {
      setShowAccessGranted(true);
    }
  }, [currentStep]);

  return (
    <div
      className="relative max-w-lg"
      data-testid="message-bubble"
      role="dialog"
      aria-live="polite"
      aria-label="Welcome message"
    >
      {/* Main chat bubble with thin border and glassmorphism */}
      <div className="relative rounded-tl-none rounded-tr-[22px] rounded-br-[22px] rounded-bl-[22px] bg-black/30 backdrop-blur-lg border border-[#39FF14]/60 chat-bubble-glitch">
        <div className="p-6 md:p-8">
          <div className="space-y-3">
            {/* Show "Access granted" with custom typewriter animation */}
            {showAccessGranted && !accessGrantedComplete && (
              <p className="text-[#39FF14] font-orbitron text-lg font-bold text-shadow-neon">
                {accessGrantedText}
                <span className="ml-1 animate-pulse">|</span>
              </p>
            )}
            
            {/* Show main messages as they appear */}
            {currentStep >= 2 && (
              <p className="text-[#39FF14] font-orbitron text-lg font-bold text-shadow-neon">
                {currentStep === 2 ? displayText : messages[1]}
              </p>
            )}
            
            {currentStep >= 3 && (
              <p className="text-[#B5B5B5] font-inter text-base leading-relaxed">
                {currentStep === 3 ? displayText : messages[2]}
              </p>
            )}
            
            {currentStep >= 4 && (
              <p className="text-[#B5B5B5] font-inter text-base leading-relaxed">
                {currentStep === 4 ? displayText : messages[3]}
              </p>
            )}
            
            {currentStep >= 5 && (
              <p className="text-[#B5B5B5] font-inter text-base leading-relaxed">
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