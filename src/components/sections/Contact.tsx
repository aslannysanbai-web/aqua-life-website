import React from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t } = useTranslation();

  React.useEffect(() => {
    gsap.utils.toArray('.contact-card').forEach((element: any, index: number) => {
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

  const contactItems = [
    {
      icon: Phone,
      label: t('contact.phone'),
      value: t('contact.phoneValue'),
      href: 'tel:+77001234567',
    },
    {
      icon: Mail,
      label: t('contact.email'),
      value: t('contact.emailValue'),
      href: 'mailto:info@aqualife.kz',
    },
    {
      icon: MapPin,
      label: t('contact.address'),
      value: t('contact.addressValue'),
      href: '#',
    },
    {
      icon: Clock,
      label: t('contact.hours'),
      value: t('contact.hoursValue'),
      href: '#',
    },
  ];

  return (
    <section id="contact" className="section-container bg-gradient-to-b from-dark-bg to-dark-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="section-title mb-4 text-transparent bg-clip-text bg-gradient-to-r from-aqua to-blue-400">
            {t('contact.title')}
          </h2>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.href}
                className="contact-card glass-effect rounded-2xl border border-aqua/20 p-8 md:p-10 hover:border-aqua/50 hover:bg-aqua/5 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="w-16 h-16 md:w-20 md:h-20 mb-6 rounded-full bg-gradient-to-br from-aqua/20 to-blue-400/10 flex items-center justify-center group-hover:bg-aqua/30 transition-all">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-aqua" />
                </div>

                {/* Content */}
                <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-aqua transition-colors">
                  {item.label}
                </h3>
                <p className="text-gray-400 text-sm md:text-base break-all">{item.value}</p>

                {/* Arrow */}
                <div className="mt-4 text-aqua opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </a>
            );
          })}
        </div>

        {/* Social Media */}
        <div className="mt-16 md:mt-24 text-center">
          <h3 className="text-xl font-bold mb-8 text-gray-300">Follow us on social media</h3>
          <div className="flex justify-center gap-6">
            {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((social, index) => (
              <a
                key={index}
                href="#"
                className="w-12 h-12 rounded-full border-2 border-aqua/30 text-aqua hover:bg-aqua hover:text-dark-bg hover:border-aqua transition-all flex items-center justify-center font-bold text-sm"
              >
                {social.charAt(0)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
