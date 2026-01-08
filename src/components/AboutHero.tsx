"use client";

import { useState, useEffect } from 'react';
import ElectricBorder from './ElectricBorder';
import DecryptedText from './DecryptedText';
import TextType from './TextType';
import clientLogger from '../lib/logger-client';
import avatarImage from '../assets/images/avatar.webp';

interface AboutHeroProps {
  quotes: string[];
}

export default function AboutHero({ quotes }: AboutHeroProps) {
  const [headlineComplete, setHeadlineComplete] = useState(false);
  const [startTextType, setStartTextType] = useState(false);
  const [subtitle1Complete, setSubtitle1Complete] = useState(false);
  const [subtitle2Complete, setSubtitle2Complete] = useState(false);
  const [textTypeStarted, setTextTypeStarted] = useState(false);
  const [heroCompleteDispatched, setHeroCompleteDispatched] = useState(false);

  // When headline completes, start TextType
  useEffect(() => {
    if (headlineComplete) {
      setStartTextType(true);
    }
  }, [headlineComplete]);

  // Dispatch event when TextType actually starts (not just when component mounts)
  const handleTextTypeStart = () => {
    setTextTypeStarted(true);
    const event = new CustomEvent('textTypeStarted', {
      detail: { timestamp: Date.now() }
    });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    if (!heroCompleteDispatched && headlineComplete && subtitle1Complete && subtitle2Complete && textTypeStarted) {
      clientLogger.animation('AboutHero', 'fully completed — dispatching aboutHeroComplete');
      const completeEvent = new CustomEvent('aboutHeroComplete', {
        detail: { timestamp: Date.now() }
      });
      window.dispatchEvent(completeEvent);
      setHeroCompleteDispatched(true);
    }
  }, [headlineComplete, subtitle1Complete, subtitle2Complete, textTypeStarted, heroCompleteDispatched]);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center py-2 text-center">
      
      {/* Avatar with Electric Border Effect */}
      <div className="mb-3">
        <ElectricBorder
          color="#39FF14"
          speed={1}
          chaos={0.5}
          thickness={3}
          style={{ borderRadius: '80%' }}
        >
          <img 
            src={avatarImage.src}
            alt="Portrait of Vasileios Politeiadis"
            className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto rounded-full object-cover"
            width={112}
            height={112}
            loading="eager"
            // @ts-expect-error - fetchpriority is valid HTML but not yet in React types
            fetchpriority="high"
            decoding="async"
          />
        </ElectricBorder>
      </div>

      {/* Hero Animation Controller - Manages headline, subtitle, and TextType sequence */}
      <div id="about-hero-content" className="opacity-0 transition-opacity duration-1000">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight font-orbitron font-bold mb-3 text-center">
          <span className="block text-center">
            <DecryptedText 
              text="Vasileios Politeiadis"
              speed={80}
              maxIterations={20}
              sequential={true}
              revealDirection="start"
              characters="01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}[]|\:;'<>?,./~`"
              className="text-matrix-white text-glow text-center"
              encryptedClassName="text-primary/40"
              animateOn="view"
              onComplete={() => {
                clientLogger.animation('AboutHero', 'headline decryption completed');
                setHeadlineComplete(true);
              }}
            />
          </span>
          
          {/* Static Subtitle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:gap-2 mt-2 text-base sm:text-lg lg:text-xl xl:text-2xl text-center">
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
                clientLogger.animation('AboutHero', 'first subtitle text completed');
                setSubtitle1Complete(true);
              }}
            />
            <span className="hidden sm:inline text-digital-emerald">·</span>
            <DecryptedText 
              text="Full-Stack Developer"
              speed={80}
              maxIterations={20}
              sequential={true}
              revealDirection="center"
              characters="01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}[]|\:;'<>?,./~`"
              animateOn="view"
              className="text-digital-emerald text-center"
              encryptedClassName="text-digital-emerald/40"
              onComplete={() => {
                clientLogger.animation('AboutHero', 'both subtitle texts decryption completed');
                setSubtitle2Complete(true);
              }}
            />
          </div>
        </h1>

        {/* Dynamic Subtitle with TextType - Always reserve space to prevent layout shift */}
        <div className="mb-4 max-w-3xl mx-auto text-center min-h-[2.5rem] flex items-center justify-center">
          {startTextType ? (
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
              className="text-xs sm:text-sm lg:text-base xl:text-lg font-orbitron text-foreground/90 leading-relaxed tracking-wide"
              startOnVisible={false}
              onStart={handleTextTypeStart}
              onSentenceComplete={(_, index) => {
                clientLogger.animation('AboutHero', `quote ${index + 1} completed`);
              }}
            />
          ) : (
            // Placeholder to maintain consistent height and prevent layout shift
            <div className="text-xs sm:text-sm lg:text-base xl:text-lg font-orbitron text-foreground/30 leading-relaxed tracking-wide opacity-0">
              Debugging reality.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
