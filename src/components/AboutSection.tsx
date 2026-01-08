import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface AboutSectionProps {
  profileImageSrc: string;
}

// Work experience data
const workExperience = [
  {
    period: "2024 — PRESENT",
    title: "Senior QA Automation Specialist",
    company: "VASS",
    companyUrl: "https://vasscompany.com/greece/en/",
    description: "Leading test automation in quality assurance teams for European Commission projects in DG DIGIT, specializing in custom Java-based automation frameworks using Selenium WebDriver.",
    skills: ["Java", "Selenium", "Custom EU Frameworks"],
    isCurrent: true,
  },
  {
    period: "2022 — 2024",
    title: "Full-Stack Developer - QA Lead",
    company: "Upiria",
    companyUrl: "https://www.upiria.com",
    description: "Full-stack development and leading QA processes for Upiria startup, delivering scalable solutions with fast delivery cycles and high quality using modern web technologies.",
    skills: ["React", "PHP", "Playwright", "MySQL", "AWS"],
    isCurrent: false,
  },
  {
    period: "2018 — 2021",
    title: "Junior QA Automation Engineer",
    company: "SWORD",
    companyUrl: "https://www.sword-group.com/greece/",
    description: "Quality assurance and testing automation for European Commission projects, establishing foundational testing practices and automation workflows using Java and Selenium.",
    skills: ["Java", "Selenium", "User Acceptance Testing"],
    isCurrent: false,
  },
];

// Education data
const education = [
  {
    period: "2018",
    degree: "Electrical Engineering and Computer Science",
    institution: "AUTh",
    institutionUrl: "https://www.auth.gr/en",
    description: "Foundation in engineering principles and computer science fundamentals, providing the theoretical and practical knowledge for modern software development and QA automation.",
    thesis: "Automated test engine for RESTful Web Services",
  },
];

// Certifications data
const certifications = [
  {
    period: "2018",
    title: "Certified Tester Foundation Level",
    issuer: "ISTQB",
    issuerUrl: "https://www.istqb.org/",
    description: "Foundation level certification in software testing principles and practices, validating expertise in QA methodologies.",
  },
];

const AboutSection: React.FC<AboutSectionProps> = ({ profileImageSrc }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Trigger animations when section comes into view
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll(
              ".animate-reveal-up, .animate-stagger-fade"
            );
            animatedElements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate");
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="whoami"
      className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-matrix-black overflow-visible"
      role="region"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Section Headline */}
        <h2
          id="about-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-neon-lime text-shadow-neon text-center mb-12 md:mb-16 animate-reveal-up opacity-0"
        >
          Who am I?
        </h2>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left Column - Profile Image (Sticky) */}
          <div className="flex items-start justify-center lg:justify-start animate-reveal-up-delayed-1 opacity-0 pt-8 md:pt-12 lg:sticky lg:top-20 lg:self-start lg:h-fit">
            <div className="relative w-full max-w-xs lg:max-w-sm">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={profileImageSrc}
                  alt="Vasileios Politeiadis - Senior QA Automation Specialist & Full-Stack Developer"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 md:space-y-6">
            {/* Introduction Paragraph */}
            <div className="animate-reveal-up-delayed-2 opacity-0">
              <p className="text-sm md:text-base text-matrix-white/90 leading-relaxed mb-6">
                I'm a QA automation specialist and full-stack developer with 7+ years of experience building reliable software. I've worked on everything from enterprise-level European Commission projects to fast-moving startups, where I learned to take products from concept to production. As a freelancer, I've designed and built websites and applications for clients across various industries. This mix of corporate, startup, and freelance work has taught me that quality and reliability matter regardless of the environment.
              </p>
            </div>

            {/* Work Experience Section */}
            <Card className="border-0 bg-matrix-black/60 backdrop-blur-md animate-reveal-up-delayed-3 opacity-0">
              <CardHeader className="pb-2 px-0">
                <CardTitle className="text-xl md:text-2xl font-orbitron font-bold text-neon-lime" style={{ textShadow: '0 0 8px rgba(57, 255, 20, 0.5)' }}>
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-0">
                <div className="space-y-6 md:space-y-8">
                  {workExperience.map((job, index) => (
                    <div key={index} className="flex flex-col md:grid md:grid-cols-[140px_1fr] gap-3 md:gap-6">
                      {/* Year - on top for mobile, left for desktop */}
                      <div className="flex-shrink-0 md:flex-shrink-0">
                        <span 
                          className="text-sm md:text-sm font-semibold font-mono tracking-wide block"
                          style={{ 
                            color: job.isCurrent ? '#39FF14' : '#00B86B'
                          }}
                        >
                          {job.period}
                        </span>
                      </div>

                      {/* Content - full width on mobile */}
                      <div className="space-y-2 flex-1">
                        {/* Title · Company */}
                        <div className="flex flex-wrap items-center gap-1.5 md:gap-1">
                          <h3 
                            className="font-orbitron font-bold text-base md:text-lg"
                            style={{ 
                              color: job.isCurrent ? '#39FF14' : '#00B86B'
                            }}
                          >
                            {job.title}
                          </h3>
                          <span 
                            className="hidden md:inline mx-1"
                            style={{ 
                              color: job.isCurrent ? '#39FF14' : '#00B86B'
                            }}
                          >·</span>
                          {job.companyUrl ? (
                            <a
                              href={job.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-orbitron font-bold text-base md:text-lg hover:opacity-80 transition-opacity inline-flex items-center gap-1 break-words"
                              style={{ 
                                color: job.isCurrent ? '#39FF14' : '#00B86B'
                              }}
                            >
                              {job.company}
                              <span className="text-xs">↗</span>
                            </a>
                          ) : (
                            <span 
                              className="font-orbitron font-bold text-base md:text-lg break-words"
                              style={{ 
                                color: job.isCurrent ? '#39FF14' : '#00B86B'
                              }}
                            >
                              {job.company}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-sm md:text-sm text-matrix-white/80 leading-relaxed">
                          {job.description}
                        </p>

                        {/* Skills Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {job.skills.map((skill, skillIndex) => (
                            <Badge
                              key={skillIndex}
                              variant="outline"
                              className="bg-digital-emerald/10 text-digital-emerald border-digital-emerald/30 hover:border-digital-emerald/50 transition-colors text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education Section */}
            <Card className="border-0 bg-matrix-black/60 backdrop-blur-md animate-reveal-up-delayed-4 opacity-0">
              <CardHeader className="pb-3 px-0">
                <CardTitle className="text-xl md:text-2xl font-orbitron font-bold text-neon-lime" style={{ textShadow: '0 0 8px rgba(57, 255, 20, 0.5)' }}>
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-0">
                <div className="space-y-6 md:space-y-8">
                  {education.map((edu, index) => (
                    <div key={index} className="flex flex-col md:grid md:grid-cols-[140px_1fr] gap-3 md:gap-6">
                      {/* Year - on top for mobile, left for desktop */}
                      <div className="flex-shrink-0 md:flex-shrink-0">
                        <span className="text-sm md:text-sm font-semibold text-digital-emerald font-mono tracking-wide block">
                          {edu.period}
                        </span>
                      </div>

                      {/* Content - full width on mobile */}
                      <div className="space-y-2 flex-1">
                        {/* Degree · Institution */}
                        <div className="flex flex-wrap items-center gap-1.5 md:gap-1">
                          <h3 className="font-orbitron font-bold text-base md:text-lg text-digital-emerald">
                            {edu.degree}
                          </h3>
                          <span className="hidden md:inline text-digital-emerald">·</span>
                          {edu.institutionUrl ? (
                            <a
                              href={edu.institutionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-base md:text-lg text-digital-emerald font-orbitron font-bold hover:opacity-80 transition-opacity inline-flex items-center gap-1 break-words"
                            >
                              {edu.institution}
                              <span className="text-xs">↗</span>
                            </a>
                          ) : (
                            <span className="text-base md:text-lg text-digital-emerald font-orbitron font-bold break-words">
                              {edu.institution}
                            </span>
                          )}
                        </div>

                        {/* Thesis */}
                        {edu.thesis && (
                          <p className="text-xs md:text-sm text-matrix-white/70 italic">
                            Thesis: {edu.thesis}
                          </p>
                        )}

                        {/* Description */}
                        <p className="text-sm md:text-sm text-matrix-white/80 leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications Section */}
            <Card className="border-0 bg-matrix-black/60 backdrop-blur-md animate-reveal-up-delayed-5 opacity-0">
              <CardHeader className="pb-3 px-0">
                <CardTitle className="text-xl md:text-2xl font-orbitron font-bold text-neon-lime" style={{ textShadow: '0 0 8px rgba(57, 255, 20, 0.5)' }}>
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-0">
                <div className="space-y-6 md:space-y-8">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex flex-col md:grid md:grid-cols-[140px_1fr] gap-3 md:gap-6">
                      {/* Year - on top for mobile, left for desktop */}
                      <div className="flex-shrink-0 md:flex-shrink-0">
                        <span className="text-sm md:text-sm font-semibold text-digital-emerald font-mono tracking-wide block">
                          {cert.period}
                        </span>
                      </div>

                      {/* Content - full width on mobile */}
                      <div className="space-y-2 flex-1">
                        {/* Title · Issuer */}
                        <div className="flex flex-wrap items-center gap-1.5 md:gap-1">
                          <h3 className="font-orbitron font-bold text-base md:text-lg text-digital-emerald">
                            {cert.title}
                          </h3>
                          <span className="hidden md:inline text-digital-emerald">·</span>
                          {cert.issuerUrl ? (
                            <a
                              href={cert.issuerUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-base md:text-lg text-digital-emerald font-orbitron font-bold hover:opacity-80 transition-opacity inline-flex items-center gap-1 break-words"
                            >
                              {cert.issuer}
                              <span className="text-xs">↗</span>
                            </a>
                          ) : (
                            <span className="text-base md:text-lg text-digital-emerald font-orbitron font-bold break-words">
                              {cert.issuer}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-sm md:text-sm text-matrix-white/80 leading-relaxed">
                          {cert.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
