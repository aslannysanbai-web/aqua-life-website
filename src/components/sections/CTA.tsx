import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Animate headline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 80%',
        once: true,
      },
    });

    tl.from('.cta-headline', {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.2,
    }).from(
      '.cta-button',
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      },
      0.6
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Floating particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.5 + 0.5,
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 7, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(0, 217, 255, ${0.3 * Math.sin(Date.now() / 1000 + p.x)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <section className="cta-section relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-tertiary to-dark-secondary"></div>

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0"></canvas>

      {/* Glow effects */}
      <div className="absolute top-1/3 -left-1/3 w-96 h-96 bg-aqua/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 md:px-8">
        {/* Headline */}
        <h2 className="cta-headline text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-8">
          <span className="block text-white">{t('cta.headline1')}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-aqua to-blue-400">
            {t('cta.headline2')}
          </span>
        </h2>

        {/* CTA Button */}
        <button className="cta-button btn-primary text-lg md:text-xl px-10 md:px-16 py-4 md:py-6">
          {t('cta.button')}
        </button>
      </div>
    </section>
  );
};

export default CTA;
