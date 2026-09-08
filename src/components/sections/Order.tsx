import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Order = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    product: '',
    quantity: '1',
    address: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const products = t('products.products', { returnObjects: true }) as any[];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.phone || !formData.product || !formData.address) {
      alert('Please fill in all required fields');
      return;
    }

    // Animate submission
    gsap.to('.order-form', {
      opacity: 0,
      y: -20,
      duration: 0.4,
      onComplete: () => {
        setSubmitted(true);
        gsap.from('.success-message', {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'back.out',
        });
      },
    });
  };

  return (
    <section id="order" className="section-container bg-dark-bg">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-title mb-4 text-transparent bg-clip-text bg-gradient-to-r from-aqua to-blue-400">
            {t('order.title')}
          </h2>
        </div>

        {/* Form or Success Message */}
        {!submitted ? (
          <form className="order-form glass-effect rounded-2xl border border-aqua/20 p-8 md:p-12" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold tracking-widest text-gray-300 mb-2">
                  {t('order.form.name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-dark-tertiary border border-aqua/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-aqua focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold tracking-widest text-gray-300 mb-2">
                  {t('order.form.phone')} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-dark-tertiary border border-aqua/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-aqua focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Product */}
              <div>
                <label className="block text-sm font-bold tracking-widest text-gray-300 mb-2">
                  {t('order.form.product')} *
                </label>
                <select
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full bg-dark-tertiary border border-aqua/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-aqua focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select a product</option>
                  {products.map((product: any, index: number) => (
                    <option key={index} value={product.name}>
                      {product.name} - {product.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-bold tracking-widest text-gray-300 mb-2">
                  {t('order.form.quantity')} *
                </label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full bg-dark-tertiary border border-aqua/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-aqua focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold tracking-widest text-gray-300 mb-2">
                  {t('order.form.address')} *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-dark-tertiary border border-aqua/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-aqua focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold tracking-widest text-gray-300 mb-2">
                  {t('order.form.message')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-dark-tertiary border border-aqua/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-aqua focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full btn-primary mt-8">
              {t('order.form.submit')}
            </button>
          </form>
        ) : (
          <div className="success-message text-center">
            <div className="inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-aqua to-blue-400 rounded-full flex items-center justify-center text-4xl animate-pulse">
                ✓
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">{t('order.form.success')}</h3>
            <p className="text-gray-400 mb-8 text-lg">
              We'll contact you within 24 hours to confirm your order.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', phone: '', product: '', quantity: '1', address: '', message: '' });
              }}
              className="btn-secondary"
            >
              Order Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Order;
