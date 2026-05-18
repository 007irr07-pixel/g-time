"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Download, Loader2, X } from "lucide-react";
import { formatPhoneNumber } from "@/utils/formatPhone";
import { useModal } from "./ModalContext";

export default function PriceModal() {
  const { priceModalOpen: isOpen, closePriceModal: onClose } = useModal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    setIsError(false);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, type: 'price' }),
      });

      if (!res.ok) throw new Error("Ошибка сервера");

      // Download the catalog
      const link = document.createElement('a');
      link.href = '/g-time-price.pdf';
      link.download = 'Прайс-лист G-TIME.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSuccess(true);
      if (typeof window !== 'undefined') {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({'event': 'ZayavkaMain'});
      }
      setTimeout(() => {
        setSuccess(false);
        setName("");
        setPhone("");
        onClose();
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-gunmetal border border-border rounded-3xl p-8 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-steel hover:text-white transition-colors p-1"
            >
              <X size={20} />
            </button>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle
                    size={56}
                    className="text-accent-cyan mx-auto mb-4"
                  />
                  <h3 className="text-xl font-heading font-700 text-white mb-2">
                    Готово!
                  </h3>
                  <p className="text-silver text-sm">
                    Каталог будет отправлен на ваш WhatsApp
                  </p>
                </motion.div>
              ) : isError ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <X
                    size={56}
                    className="text-red-500 mx-auto mb-4"
                  />
                  <h3 className="text-xl font-heading font-700 text-white mb-2">
                    Ошибка
                  </h3>
                  <p className="text-silver text-sm mb-6">
                    Не удалось отправить заявку.
                  </p>
                  <button
                    onClick={() => setIsError(false)}
                    className="bg-graphite border border-border text-white px-6 py-2 rounded-xl hover:bg-surface transition-colors text-sm"
                  >
                    Назад
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-heading font-700 text-white mb-2">
                      Скачать прайс-лист
                    </h3>
                    <p className="text-sm text-silver">
                      Оставьте ваши контакты — мы отправим каталог в WhatsApp
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm text-silver mb-1.5 block">
                        Имя <span className="text-accent-blue">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ваше имя"
                        required
                        className="w-full bg-graphite border border-border rounded-xl px-4 py-3 text-white placeholder:text-steel focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-silver mb-1.5 block">
                        Номер WhatsApp <span className="text-accent-blue">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                        placeholder="+7 700 000 00 00"
                        required
                        maxLength={16}
                        className="w-full bg-graphite border border-border rounded-xl px-4 py-3 text-white placeholder:text-steel focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/30 transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading || !name || !phone}
                      className="w-full flex items-center justify-center gap-2 bg-accent-blue hover:bg-accent-blue-dark disabled:bg-steel disabled:cursor-not-allowed text-white font-semibold px-6 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] mt-2"
                    >
                      {loading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : null}
                      {loading ? "Отправка..." : "Получить прайс-лист"}
                    </button>
                  </form>

                  <p className="text-xs text-steel text-center mt-4">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

