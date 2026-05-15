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
    <>
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
	
	
	<div className="whatsapp-widjet"><div className="whatsapp-widjet-circle"><div className="whatsapp-widjet-circle-left"><span></span></div><div className="whatsapp-widjet-circle-right"><span></span></div></div><a target="_blank" rel="nofollow noopener" href="https://wa.me/77478390605" className="whatsapp-widjet-icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.89639 0.507229C2.59515 0.664415 -0.00998593 3.41371 2.87769e-05 6.71868C0.00307803 7.72529 0.246092 8.6754 0.674781 9.5149L0.0165904 12.7098C-0.0190141 12.8827 0.136857 13.034 0.308541 12.9933L3.4392 12.2516C4.24351 12.6523 5.14693 12.8837 6.10305 12.8983C9.47723 12.9498 12.2907 10.2706 12.3959 6.89769C12.5086 3.28214 9.52458 0.334438 5.89639 0.507229ZM9.63193 10.132C8.71509 11.0488 7.49608 11.5537 6.19949 11.5537C5.44029 11.5537 4.71343 11.3834 4.03903 11.0475L3.60305 10.8303L1.68364 11.285L2.08766 9.32373L1.87287 8.90311C1.52277 8.21748 1.34526 7.47606 1.34526 6.69949C1.34526 5.40287 1.85018 4.18388 2.76702 3.26701C3.67566 2.35836 4.91456 1.84522 6.19958 1.84522C7.49617 1.84525 8.71513 2.35017 9.63196 3.26698C10.5488 4.18382 11.0537 5.40281 11.0538 6.6994C11.0537 7.98445 10.5406 9.22334 9.63193 10.132Z"></path><path d="M9.20802 8.04417L8.00718 7.69937C7.84931 7.65405 7.6793 7.69883 7.56426 7.81604L7.27061 8.11523C7.14678 8.24138 6.9589 8.28192 6.79501 8.21562C6.22696 7.98573 5.03201 6.92327 4.72684 6.39183C4.6388 6.23853 4.65336 6.04688 4.76146 5.907L5.01784 5.57532C5.11828 5.44537 5.13948 5.27085 5.07305 5.12063L4.56783 3.97796C4.44682 3.70428 4.09708 3.62461 3.8686 3.81785C3.53345 4.10131 3.13579 4.53206 3.08745 5.00927C3.00222 5.85062 3.36305 6.91122 4.72753 8.18474C6.30388 9.656 7.56621 9.85037 8.3881 9.65128C8.85428 9.53836 9.22682 9.0857 9.46195 8.71507C9.62224 8.46237 9.49567 8.12677 9.20802 8.04417Z"></path></svg></a></div>
	
	<div id="callback-wrapper-mediaguru"> <div className="callback-wrapper-mediaguru-btns"> <div className="callback-item whatsapp"> <a target="_blank" href="https://wa.me/77478390605" rel="noopener">Связаться <br />в WhatsApp</a> </div> <div className="callback-item callb"> <a className="roistat-phone2" href="tel:+77478390605">Позвонить <br />на номер</a> </div> </div> </div>

    </>
  );
}


