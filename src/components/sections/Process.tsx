import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
  const { t } = useTranslation();
  const steps = t('process.steps', { returnObjects: true }) as any[];

  useEffect(() => {
    gsap.utils.toArray('.process-step').forEach((element: any, index: number) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
        },
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        duration: 0.8,
        delay: index * 0.1,
      });
    });
  }, []);

  return (
    <section id="process" className="section-container bg-dark-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="section-title mb-4 text-transparent bg-clip-text bg-gradient-to-r from-aqua to-blue-400">
            {t('process.title')}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-aqua via-aqua to-transparent"></div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-20">
            {steps.map((step: any, index: number) => (
              <div key={index} className={`process-step flex md:flex-row gap-8 md:gap-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Content */}
                <div className={`flex-1 flex ${
                  index % 2 === 0 ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'
                }`}>
                  <div className="glass-effect rounded-2xl p-6 md:p-8 border border-aqua/20 max-w-md hover:border-aqua/50 transition-all">
                    <div className="text-4xl md:text-5xl font-black text-aqua mb-3">{step.number}</div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-400 text-sm md:text-base">{step.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-6 h-6 bg-aqua rounded-full border-4 border-dark-bg shadow-glow-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
