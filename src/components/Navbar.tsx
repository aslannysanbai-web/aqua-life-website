import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lang: string) => {
    gsap.to('.navbar-item', {
      opacity: 0.5,
      duration: 0.2,
      onComplete: () => {
        i18n.changeLanguage(lang);
        gsap.to('.navbar-item', { opacity: 1, duration: 0.3 });
      },
    });
  };

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      setIsMobileMenuOpen(true);
      gsap.from('.mobile-menu', {
        x: -300,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    } else {
      gsap.to('.mobile-menu', {
        x: -300,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => setIsMobileMenuOpen(false),
      });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: t('nav.home'), id: 'hero' },
    { label: t('nav.about'), id: 'about' },
    { label: t('nav.products'), id: 'products' },
    { label: t('nav.services'), id: 'why' },
    { label: t('nav.contact'), id: 'contact' },
  ];

  return (
    <>
      <nav
        className={`navbar-item fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-effect' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-aqua to-blue-400 rounded-full group-hover:shadow-glow transition-all duration-300"></div>
            <span className="text-xl font-bold tracking-widest group-hover:text-aqua transition-colors">AQUA LIFE</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="navbar-item text-sm font-medium tracking-wider hover:text-aqua transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-aqua group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* Language Switcher & CTA */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="hidden md:flex items-center space-x-2 text-xs tracking-widest font-bold">
              {['KZ', 'RU', 'EN'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang.toLowerCase())}
                  className={`navbar-item px-2 py-1 transition-all duration-300 ${
                    i18n.language === lang.toLowerCase()
                      ? 'text-aqua'
                      : 'text-gray-400 hover:text-aqua'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <button className="hidden md:block btn-primary text-xs md:text-sm">
              {t('nav.orderNow')}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-aqua hover:text-aqua-light transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu fixed top-16 left-0 right-0 bg-dark-secondary glass-effect md:hidden z-40">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left py-2 text-sm font-medium tracking-wider hover:text-aqua transition-colors"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 border-t border-aqua/20">
              <p className="text-xs text-gray-400 mb-3 tracking-widest">LANGUAGE</p>
              <div className="flex space-x-3">
                {['KZ', 'RU', 'EN'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang.toLowerCase())}
                    className={`text-xs font-bold px-3 py-2 rounded transition-all ${
                      i18n.language === lang.toLowerCase()
                        ? 'bg-aqua text-dark-bg'
                        : 'border border-aqua/30 text-aqua/70 hover:text-aqua'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full btn-primary text-sm mt-4">
              {t('nav.orderNow')}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
