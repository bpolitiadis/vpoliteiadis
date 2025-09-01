"use client";

import { useState, useEffect } from 'react';
// Note: Image import removed as it's not available in React components
import avatarSrc from '../assets/images/avatar.webp';
import ElectricBorder from './ElectricBorder';
import DecryptedText from './DecryptedText';
import TextType from './TextType';

interface AboutHeroProps {
  quotes: string[];
}

export default function AboutHero({ quotes }: AboutHeroProps) {
  const [headlineComplete, setHeadlineComplete] = useState(false);
  const [startTextType, setStartTextType] = useState(false);

  // When headline completes, start TextType
  useEffect(() => {
    if (headlineComplete) {
      setStartTextType(true);
    }
  }, [headlineComplete]);

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
            src={avatarSrc.src}
            alt="Portrait of Vasileios Politeiadis"
            className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto rounded-full object-cover"
            loading="eager"
            fetchPriority="high"
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
                console.log('🎯 About page headline decryption completed');
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
                console.log('🎯 About page first subtitle text completed');
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
                console.log('🎯 About page both subtitle texts decryption completed');
              }}
            />
          </div>
        </h1>

        {/* Dynamic Subtitle with TextType */}
        {startTextType && (
          <div className="mb-4 max-w-3xl mx-auto text-center">
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
              onSentenceComplete={(_, index) => {
                console.log(`✅ About page quote ${index + 1} completed`);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
