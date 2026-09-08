import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Animate stats when in view
    gsap.utils.toArray('.stat-item').forEach((element: any) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          once: true,
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
      });
    });

    // Animate numbers
    gsap.utils.toArray('.stat-number').forEach((element: any) => {
      const target = parseInt(element.getAttribute('data-target')) || 0;
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          once: true,
        },
        textContent: target,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
      });
    });
  }, []);

  const stats = t('about.stats', { returnObjects: true }) as any[];

  return (
    <section id="about" className="section-container bg-gradient-to-b from-dark-bg to-dark-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-16 md:mb-24">
          <h2 className="section-title">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aqua to-blue-400">
              {t('about.title')}
            </span>
          </h2>
          <p className="text-2xl md:text-3xl font-light text-gray-300 mt-4 tracking-wide">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Description */}
        <p className="section-subtitle mb-20 md:mb-32 text-gray-400 leading-relaxed">
          {t('about.description')}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat: any, index: number) => (
            <div
              key={index}
              className="stat-item glass-effect rounded-2xl p-6 md:p-8 border-l-2 border-aqua hover:border-aqua-light hover:bg-aqua/5 transition-all duration-300"
            >
              <div className="stat-number text-4xl md:text-5xl font-black text-aqua mb-2" data-target="0">
                0
              </div>
              <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
