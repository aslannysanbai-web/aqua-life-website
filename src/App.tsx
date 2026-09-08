import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Products from './components/sections/Products';
import Why from './components/sections/Why';
import Process from './components/sections/Process';
import Testimonials from './components/sections/Testimonials';
import Order from './components/sections/Order';
import Contact from './components/sections/Contact';
import CTA from './components/sections/CTA';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import './styles/globals.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { i18n } = useTranslation();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      ScrollTrigger.update();
    }

    gsap.ticker.add(raf);

    return () => {
      gsap.ticker.remove(raf);
      lenisInstance.destroy();
    };
  }, []);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('language', i18n.language);
  }, [i18n.language]);

  return (
    <div className="bg-dark-bg text-white overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Why />
      <Process />
      <Testimonials />
      <Order />
      <Contact />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
