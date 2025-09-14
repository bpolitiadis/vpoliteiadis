"use client";

import { useState, useEffect } from 'react';
import DecryptedText from './DecryptedText';
import TextType from './TextType';
import clientLogger from '../lib/logger-client';

interface HeroAnimationControllerProps {
  quotes: string[];
}

export default function HeroAnimationController({ quotes }: HeroAnimationControllerProps) {
  const [headlineComplete, setHeadlineComplete] = useState(false);
  const [startTextType, setStartTextType] = useState(false);

  // When headline completes, start TextType
  useEffect(() => {
    if (headlineComplete) {
      setStartTextType(true);
    }
  }, [headlineComplete]);

  return (
    <>
      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight font-orbitron font-bold mb-6 text-center">
        <span className="block text-center">
          <DecryptedText 
            text="Full-Stack Developer"
            speed={80}
            maxIterations={20}
            sequential={true}
            revealDirection="start"
            characters="01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}[]|\:;'<>?,./~`"
            className="text-matrix-white text-glow text-center"
            encryptedClassName="text-primary/40"
            animateOn="view"
            onComplete={() => {
              clientLogger.animation('HeroAnimation', 'Main headline decryption completed');
              setHeadlineComplete(true);
            }}
          />
        </span>
        
        {/* Static Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:gap-2 mt-2 text-lg sm:text-xl lg:text-2xl xl:text-3xl text-center">
          <DecryptedText 
            text="QA Automation Engineer"
            speed={80}
            maxIterations={20}
            sequential={true}
            revealDirection="center"
            characters="01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}[]|\:;'<>?,./~`"
            className="text-digital-emerald text-center"
            encryptedClassName="text-digital-emerald/40"
            animateOn="view"
            onComplete={() => {
              clientLogger.animation('HeroAnimation', 'First subtitle text completed');
            }}
          />
          <span className="hidden sm:inline text-digital-emerald">·</span>
          <DecryptedText 
            text="AI Powered Solutions"
            speed={80}
            maxIterations={20}
            sequential={true}
            revealDirection="center"
            characters="01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}[]|\:;'<>?,./~`"
            animateOn="view"
            className="text-digital-emerald text-center"
            encryptedClassName="text-digital-emerald/40"
            onComplete={() => {
              clientLogger.animation('HeroAnimation', 'Both subtitle texts decryption completed');
            }}
          />
        </div>
      </h1>

      {/* Dynamic Subtitle with TextType */}
      {startTextType && (
        <div className="mb-8 max-w-4xl mx-auto text-center">
          <TextType 
            text={quotes}
            typingSpeed={45}
            pauseDuration={1500}
            deletingSpeed={25}
            loop={true}
            showCursor={true}
            cursorCharacter="|"
            cursorClassName="text-primary text-glow"
            cursorBlinkDuration={0.8}
            className="text-base sm:text-md lg:text-lg xl:text-xl font-orbitron text-foreground/90 leading-relaxed tracking-wide"
            startOnVisible={false}
            onSentenceComplete={(_, index) => {
              // After first quote completes, trigger CTA animation
              if (index === 0) {
                setTimeout(() => {
                  const cta = document.getElementById('hero-cta');
                  if (cta) {
                    cta.style.opacity = '1';
                    cta.style.transform = 'translateY(0)';
                    clientLogger.animation('HeroAnimation', 'CTA buttons revealed after first quote');
                  }
                }, 1000);
              }
            }}
          />
        </div>
      )}
    </>
  );
}
