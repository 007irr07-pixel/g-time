"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, CheckCircle, Loader2 } from "lucide-react";

interface PriceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PriceModal({ isOpen, onClose }: PriceModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setName("");
        setPhone("");
        setEmail("");
        setCity("");
        onClose();
      }, 2000);
    }, 1500);
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
                    className="text-accent-green mx-auto mb-4"
                  />
                  <h3 className="text-xl font-heading font-700 text-white mb-2">
                    Готово!
                  </h3>
                  <p className="text-silver text-sm">
                    Прайс-лист отправлен на вашу почту
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-heading font-700 text-white mb-2">
                      Скачать прайс-лист
                    </h3>
                    <p className="text-sm text-silver">
                      Оставьте контакты — мы отправим актуальный прайс
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm text-silver mb-1.5 block">
                        Имя <span className="text-accent-orange">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ваше имя"
                        required
                        className="w-full bg-graphite border border-border rounded-xl px-4 py-3 text-white placeholder:text-steel focus:border-accent-orange/50 focus:outline-none focus:ring-1 focus:ring-accent-orange/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-silver mb-1.5 block">
                        Телефон <span className="text-accent-orange">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 700 000 00 00"
                        required
                        className="w-full bg-graphite border border-border rounded-xl px-4 py-3 text-white placeholder:text-steel focus:border-accent-orange/50 focus:outline-none focus:ring-1 focus:ring-accent-orange/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-silver mb-1.5 block">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@company.kz"
                        className="w-full bg-graphite border border-border rounded-xl px-4 py-3 text-white placeholder:text-steel focus:border-accent-orange/50 focus:outline-none focus:ring-1 focus:ring-accent-orange/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-silver mb-1.5 block">
                        Город
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-graphite border border-border rounded-xl px-4 py-3 text-white focus:border-accent-orange/50 focus:outline-none focus:ring-1 focus:ring-accent-orange/30 transition-all appearance-none"
                      >
                        <option value="">Выберите город</option>
                        <option value="almaty">Алматы</option>
                        <option value="astana">Астана</option>
                        <option value="shymkent">Шымкент</option>
                        <option value="karaganda">Караганда</option>
                        <option value="aktau">Актау</option>
                        <option value="atyrau">Атырау</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={loading || !name || !phone}
                      className="w-full flex items-center justify-center gap-2 bg-accent-orange hover:bg-accent-orange-dark disabled:bg-steel disabled:cursor-not-allowed text-white font-semibold px-6 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] mt-2"
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
