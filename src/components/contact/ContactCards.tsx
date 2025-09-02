import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LinkedInIcon, InstagramIcon, GitHubIcon } from '@/components/icons/Icon';

function RowContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex items-start space-x-4">{children}</div>;
}

export function ServiceRow({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) {
  return (
    <RowContainer>
      <div className="w-8 h-8 bg-neon-lime/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
        {icon}
      </div>
      <div>
        <h3 className="font-orbitron font-bold text-neon-lime mb-1">{title}</h3>
        <p className="text-neon-lime/60 text-sm">{description}</p>
      </div>
    </RowContainer>
  );
}

export function ContactRow({ icon, label, href, className = '', titleClassName = 'text-neon-lime/90' }: { icon: React.ReactNode; label: string; href: string; className?: string; titleClassName?: string; }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 bg-neon-lime/20 rounded-lg flex items-center justify-center" aria-hidden="true">
        {icon}
      </div>
      <div>
        <h3 className={`font-orbitron font-bold ${titleClassName}`}>{label}</h3>
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={`${className} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-blue/60 rounded`}
        >
          {href.replace('mailto:', '')}
          {href.startsWith('http') && <span className="sr-only">(opens in new tab)</span>}
        </a>
      </div>
    </div>
  );
}

export default function ContactCards() {
  return (
    <div className="space-y-8 h-full">
      {/* Services */}
      <Card className="border border-secondary/40 bg-card/40 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-orbitron font-bold text-secondary flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label="Services">💼</span>
            Services
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ServiceRow icon={<span className="text-lg" role="img" aria-label="QA Automation">🤖</span>} title="QA Automation" description="Java, Selenium, Playwright testing for European Commission projects" />
          <RowContainer>
            <div className="w-8 h-8 bg-digital-emerald/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
              <span className="text-lg" role="img" aria-label="Full-Stack Development">💻</span>
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-digital-emerald mb-1">Full-Stack Development</h3>
              <p className="text-digital-emerald/60 text-sm">React, Next.js, Node.js applications and product development</p>
            </div>
          </RowContainer>
          <RowContainer>
            <div className="w-8 h-8 bg-neon-lime/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
              <span className="text-lg" role="img" aria-label="Creative Commissions">🎨</span>
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-neon-lime mb-1">Creative Commissions</h3>
              <p className="text-neon-lime/60 text-sm">AI-generated art, album covers, event posters, fashion designs</p>
            </div>
          </RowContainer>
        </CardContent>
      </Card>

      {/* Get In Touch */}
      <Card className="border border-primary/30 bg-card/40 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-orbitron font-bold text-primary flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label="Get in touch">📞</span>
            Get In Touch
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ContactRow
            icon={<span className="text-xl" role="img" aria-label="Email">✉️</span>}
            label="Email"
            href="mailto:b.politiadis@gmail.com"
            className="text-neon-lime hover:text-cyan-blue transition-all duration-300"
            titleClassName="text-neon-lime/90"
          />
          <ContactRow
            icon={<LinkedInIcon size="sm" className="text-digital-emerald" />}
            label="LinkedIn"
            href="https://linkedin.com/in/vpoliteiadis"
            className="text-digital-emerald hover:text-cyan-blue transition-all duration-300"
            titleClassName="text-digital-emerald/90"
          />
          <ContactRow
            icon={<InstagramIcon size="sm" className="text-neon-lime" />}
            label="Instagram"
            href="https://instagram.com/arte.imaginari"
            className="text-neon-lime hover:text-cyan-blue transition-all duration-300"
            titleClassName="text-neon-lime/90"
          />
          <ContactRow
            icon={<GitHubIcon size="sm" className="text-digital-emerald" />}
            label="GitHub"
            href="https://github.com/bpolitiadis"
            className="text-digital-emerald hover:text-cyan-blue transition-all duration-300"
            titleClassName="text-digital-emerald/90"
          />
        </CardContent>
      </Card>
    </div>
  );
}


