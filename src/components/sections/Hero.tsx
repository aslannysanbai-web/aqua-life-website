import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero entrance animation
    const tl = gsap.timeline();

    tl.from('.hero-bg', {
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    })
      .from(
        '.hero-headline',
        {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.2,
        },
        0.2
      )
      .from(
        '.hero-subtitle',
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power2.out',
        },
        0.8
      )
      .from(
        '.hero-cta',
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.2,
        },
        1.2
      );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particles for water effect
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
    }> = [];

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const createParticles = () => {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 100,
          y: mouseY + (Math.random() - 0.5) * 100,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create particles occasionally
      if (Math.random() > 0.95) {
        createParticles();
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.01;
        p.vy += 0.1; // Gravity

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle
        ctx.fillStyle = `rgba(0, 217, 255, ${p.life * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="hero-bg absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-secondary to-dark-tertiary"></div>

      {/* Canvas for water effect */}
      <canvas ref={canvasRef} className="absolute inset-0"></canvas>

      {/* Glow elements */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-aqua/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
        {/* Headline */}
        <div className="mb-6 md:mb-8">
          <h1 className="hero-headline text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none">
            <span className="block text-white">{t('hero.headline1')}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-aqua to-blue-400">
              {t('hero.headline2')}
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="hero-subtitle text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
          {t('hero.subtitle')}
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
          <button className="w-full sm:w-auto btn-primary">{t('hero.cta1')}</button>
          <button className="w-full sm:w-auto btn-secondary">{t('hero.cta2')}</button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-aqua rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-aqua rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
