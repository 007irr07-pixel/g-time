"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";

const footerLinks = {
  products: [
    { label: "Трубный прокат", href: "#catalog" },
    { label: "Сортовой прокат", href: "#catalog" },
    { label: "Листовой прокат", href: "#catalog" },
    { label: "Фасонный прокат", href: "#catalog" },
    { label: "Арматура", href: "#catalog" },
  ],
  company: [
    { label: "О компании", href: "#b2b" },
    { label: "Сертификаты", href: "#b2b" },
    { label: "Логистика", href: "#b2b" },
    { label: "Вакансии", href: "#" },
  ],
  services: [
    { label: "Загрузить смету", href: "#" },
    { label: "Скачать прайс", href: "#" },
    { label: "Условия оплаты", href: "#b2b" },
  ],
};

export default function Footer() {
  return (
    <footer id="contacts" className="relative bg-surface border-t border-border">
      <div className="absolute inset-0 steel-mesh opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative -mt-16 mb-16 bg-gradient-to-r from-accent-blue to-accent-blue-dark rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-heading font-800 text-white mb-2">
              Нужен металлопрокат?
            </h3>
            <p className="text-white/80">
              Свяжитесь с нами — рассчитаем стоимость за 30 минут
            </p>
          </div>
          <a
            href="tel:+77478390605"
            className="relative z-10 flex items-center gap-2 bg-white text-accent-blue font-semibold px-8 py-4 rounded-xl hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <Phone size={18} />
            Позвонить
          </a>
        </motion.div>

        {/* Main footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image 
                src="/logo.png" 
                alt="G-Time Logo" 
                width={240}
                height={72}
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-silver leading-relaxed mb-6 max-w-xs">
              Национальный дистрибьютор металлопроката в Казахстане. Более 12 лет
              на рынке, 50 000 тонн на складе.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+77478390605"
                className="flex items-center gap-2 text-sm text-light-silver hover:text-white transition-colors"
              >
                <Phone size={14} className="text-accent-blue" />
                +7 747 839-06-05
              </a>
              <a
                href="mailto:info@g-time.kz"
                className="flex items-center gap-2 text-sm text-light-silver hover:text-white transition-colors"
              >
                <Mail size={14} className="text-accent-blue" />
                info@g-time.kz
              </a>
              <div className="flex items-start gap-2 text-sm text-light-silver">
                <MapPin size={14} className="text-accent-blue mt-0.5 shrink-0" />
                г. Алматы, пр. Райымбека 481
              </div>
              <div className="flex items-center gap-2 text-sm text-light-silver">
                <Clock size={14} className="text-accent-blue" />
                Пн-Сб: 08:00 — 18:00
              </div>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-heading font-700 text-white mb-4 text-sm uppercase tracking-wider">
              Продукция
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-silver hover:text-accent-blue transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-heading font-700 text-white mb-4 text-sm uppercase tracking-wider">
              Компания
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-silver hover:text-accent-blue transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h4 className="font-heading font-700 text-white mb-4 text-sm uppercase tracking-wider">
              Сервисы
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-1 text-sm text-silver hover:text-accent-blue transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-steel">
            © 2026 G-Time Construction. Все права защищены.
          </p>
          <div className="flex items-center gap-4 text-xs text-steel">
            <a href="#" className="hover:text-silver transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-silver transition-colors">
              Публичная оферта
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


