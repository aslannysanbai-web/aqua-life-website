import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const { t } = useTranslation();
  const testimonials = t('testimonials.testimonials', { returnObjects: true }) as any[];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    gsap.from('.testimonial-card', {
      scrollTrigger: {
        trigger: '.testimonial-card',
        start: 'top 80%',
        once: true,
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
    });
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="section-container bg-gradient-to-b from-dark-bg to-dark-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="section-title mb-4 text-transparent bg-clip-text bg-gradient-to-r from-aqua to-blue-400">
            {t('testimonials.title')}
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative max-w-2xl mx-auto">
          {/* Testimonial card */}
          <div className="testimonial-card glass-effect rounded-2xl p-8 md:p-12 border border-aqua/20">
            {/* Rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} size={20} className="text-aqua fill-aqua" />
              ))}
            </div>

            {/* Review */}
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              "{testimonials[currentIndex].review}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-aqua to-blue-400 flex items-center justify-center text-dark-bg font-bold text-lg">
                {testimonials[currentIndex].name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-white">{testimonials[currentIndex].name}</p>
                <p className="text-sm text-gray-400">AQUA LIFE Customer</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border-2 border-aqua text-aqua hover:bg-aqua hover:text-dark-bg transition-all flex items-center justify-center"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-aqua w-8' : 'bg-aqua/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border-2 border-aqua text-aqua hover:bg-aqua hover:text-dark-bg transition-all flex items-center justify-center"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
