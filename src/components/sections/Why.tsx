import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Droplets, Zap, Shield, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Why = () => {
  const { t } = useTranslation();
  const features = t('why.features', { returnObjects: true }) as any[];

  useEffect(() => {
    gsap.utils.toArray('.feature-card').forEach((element: any, index: number) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: index * 0.15,
      });
    });
  }, []);

  const icons = [Droplets, Zap, Shield, Leaf];

  return (
    <section id="why" className="section-container bg-gradient-to-b from-dark-bg to-dark-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="section-title mb-4 text-transparent bg-clip-text bg-gradient-to-r from-aqua to-blue-400">
            {t('why.title')}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {features.map((feature: any, index: number) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="feature-card group relative overflow-hidden rounded-2xl bg-dark-secondary border border-aqua/20 p-8 md:p-10 hover:border-aqua/50 transition-all duration-300"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-aqua/10 to-transparent"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 md:w-20 md:h-20 mb-6 rounded-full bg-gradient-to-br from-aqua/20 to-blue-400/10 flex items-center justify-center group-hover:bg-aqua/30 transition-all">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-aqua" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-aqua transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">{feature.description}</p>
                </div>

                {/* Animated line */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-aqua to-transparent w-0 group-hover:w-full transition-all duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Why;
