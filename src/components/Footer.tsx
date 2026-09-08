import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

const Footer = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <footer className="bg-dark-secondary border-t border-aqua/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-aqua to-blue-400 rounded-full"></div>
              <h3 className="text-xl font-bold tracking-widest">AQUA LIFE</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{t('footer.slogan')}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-bold tracking-widest text-aqua mb-4">{t('footer.navigation')}</h4>
            <ul className="space-y-2">
              {[
                { label: t('nav.home'), id: 'hero' },
                { label: t('nav.about'), id: 'about' },
                { label: t('nav.products'), id: 'products' },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-gray-400 hover:text-aqua transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-bold tracking-widest text-aqua mb-4">{t('footer.products')}</h4>
            <ul className="space-y-2">
              {['0.5L', '1L', '5L', '19L'].map((size) => (
                <li key={size}>
                  <a href="#" className="text-sm text-gray-400 hover:text-aqua transition-colors">
                    AQUA LIFE {size}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold tracking-widest text-aqua mb-4">{t('footer.contact')}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-400 hover:text-aqua transition-colors cursor-pointer">
                <Phone size={16} />
                <span>{t('contact.phoneValue')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400 hover:text-aqua transition-colors cursor-pointer">
                <Mail size={16} />
                <span>{t('contact.emailValue')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400 hover:text-aqua transition-colors cursor-pointer">
                <MapPin size={16} />
                <span>{t('contact.addressValue')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-aqua/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Language Switcher */}
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              {['KZ', 'RU', 'EN'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang.toLowerCase())}
                  className={`text-xs font-bold px-2 py-1 transition-all ${
                    i18n.language === lang.toLowerCase()
                      ? 'text-aqua'
                      : 'text-gray-400 hover:text-aqua'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-xs text-gray-500 text-center md:text-right">{t('footer.copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
