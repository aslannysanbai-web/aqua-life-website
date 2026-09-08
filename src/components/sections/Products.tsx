import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const products = t('products.products', { returnObjects: true }) as any[];

  useEffect(() => {
    // Animate product cards
    gsap.utils.toArray('.product-card').forEach((element: any, index: number) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.1,
      });
    });
  }, []);

  return (
    <section id="products" className="section-container bg-dark-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="section-title mb-4">{t('products.title')}</h2>
          <p className="section-subtitle text-center mx-auto">{t('products.subtitle')}</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product: any, index: number) => (
            <div
              key={index}
              className="product-card group relative overflow-hidden rounded-2xl bg-gradient-to-b from-dark-secondary to-dark-tertiary border border-aqua/20 hover:border-aqua/50 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-aqua/10 to-transparent"></div>

              {/* Content */}
              <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
                {/* Product visual */}
                <div className="h-32 md:h-40 mb-6 flex items-center justify-center">
                  <div className="relative group/bottle">
                    <div className="w-16 h-32 md:w-20 md:h-40 bg-gradient-to-b from-aqua/40 to-blue-500/20 rounded-full blur-xl group-hover/bottle:blur-2xl transition-all"></div>
                    <div className="absolute inset-0 text-5xl md:text-6xl group-hover/bottle:scale-110 transition-transform">💧</div>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-xs md:text-sm text-gray-400 mb-4">{product.size}</p>
                  <p className="text-sm text-gray-400 mb-6 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-aqua">{product.price}</span>
                    <button className="btn-primary text-xs px-3 py-2">{t('products.order')}</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-dark-secondary border border-aqua/30 rounded-2xl p-8 max-w-md w-full glass-effect"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-aqua transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <div className="h-40 flex items-center justify-center mb-4">
                <div className="text-6xl">💧</div>
              </div>
              <p className="text-gray-400 mb-4">{selectedProduct.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">{selectedProduct.size}</span>
                <span className="text-2xl font-bold text-aqua">{selectedProduct.price}</span>
              </div>
            </div>

            <div className="space-y-3">
              <input
                type="number"
                defaultValue="1"
                min="1"
                className="w-full bg-dark-tertiary border border-aqua/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-aqua focus:outline-none"
                placeholder="Quantity"
              />
              <button className="w-full btn-primary">{t('products.order')}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
