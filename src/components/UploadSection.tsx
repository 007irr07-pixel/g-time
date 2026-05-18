"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileSpreadsheet,
  FileText,
  Image as ImageIcon,
  X,
  Send,
  CheckCircle,
} from "lucide-react";
import dynamic from "next/dynamic";
import { formatPhoneNumber } from "@/utils/formatPhone";

const ScannerLive3D = dynamic(() => import("./LiveIlls").then(mod => mod.ScannerLive3D), { ssr: false });

interface UploadedFile {
  file: File;
  preview: string;
}

export default function UploadSection() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxSize: 20 * 1024 * 1024,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (type: string) => {
    if (type.includes("spreadsheet") || type.includes("excel"))
      return <FileSpreadsheet size={20} className="text-accent-cyan" />;
    if (type.includes("pdf"))
      return <FileText size={20} className="text-accent-blue" />;
    return <ImageIcon size={20} className="text-accent-cyan" />;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const handleSubmit = async () => {
    if (!name || !phone) return;
    setIsSubmitting(true);
    setIsError(false);
    try {
      const filesWithData = await Promise.all(
        files.map(async (f) => ({
          name: f.file.name,
          content: await toBase64(f.file)
        }))
      );

      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          files: filesWithData,
        }),
      });

      if (!res.ok) throw new Error("Ошибка сервера");
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFiles([]);
        setName("");
        setPhone("");
      }, 3000);
    } catch (e) {
      console.error("Submit error:", e);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-graphite via-surface/20 to-graphite" />
      <div className="absolute inset-0 steel-mesh opacity-15" />

      {/* Blueprint background shapes */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <pattern id="blueprint-grid-large" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="url(#blueprint-grid)" />
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#blueprint-grid-large)" />
          
          {/* Decorative technical drawing circles and lines */}
          <circle cx="20%" cy="30%" r="300" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
          <circle cx="20%" cy="30%" r="200" fill="none" stroke="white" strokeWidth="0.5" />
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="white" strokeWidth="0.5" />
          <line x1="20%" y1="0" x2="20%" y2="100%" stroke="white" strokeWidth="0.5" />

          <circle cx="85%" cy="70%" r="400" fill="none" stroke="white" strokeWidth="1" strokeDasharray="10,10" />
          <circle cx="85%" cy="70%" r="380" fill="none" stroke="white" strokeWidth="0.5" />
          <line x1="85%" y1="50%" x2="85%" y2="90%" stroke="white" strokeWidth="1" />
          <line x1="70%" y1="70%" x2="100%" y2="70%" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium text-accent-blue uppercase tracking-[0.2em]">
            Быстрый запрос
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-800 mt-4 mb-6">
            Хватит тратить время <span className="gradient-text-blue">на поиск.</span>
          </h2>
          <p className="text-silver text-lg max-w-2xl mx-auto">
            Скиньте смету — остальное мы берем на себя. Принимаем файлы в любом виде, даже рукописные списки. Рассчитаем стоимость за 30 минут.
          </p>
        </motion.div>

        {/* Upload card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-border">
            {/* Success state */}
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12"
                >
                  <CheckCircle
                    size={64}
                    className="text-accent-cyan mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-heading font-700 text-white mb-2">
                    Заявка отправлена!
                  </h3>
                  <p className="text-silver">
                    Наш менеджер свяжется с вами в ближайшее время
                  </p>
                </motion.div>
              ) : isError ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12"
                >
                  <X
                    size={64}
                    className="text-red-500 mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-heading font-700 text-white mb-2">
                    Ошибка отправки
                  </h3>
                  <p className="text-silver mb-6">
                    Произошла ошибка при отправке заявки. Пожалуйста, попробуйте снова или свяжитесь с нами напрямую.
                  </p>
                  <button
                    onClick={() => setIsError(false)}
                    className="bg-graphite border border-border text-white px-6 py-2 rounded-xl hover:bg-surface transition-colors"
                  >
                    Попробовать еще раз
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Drop zone */}
                  <div
                    {...getRootProps()}
                    className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 overflow-hidden ${
                      isDragActive
                        ? "border-accent-cyan bg-accent-cyan/10 scale-[1.02] shadow-[0_0_30px_rgba(93,176,229,0.2)]"
                        : "border-border hover:border-accent-blue/40 hover:bg-surface/50"
                    }`}
                  >
                    <input {...getInputProps()} />
                    
                    {/* 3D Scanner strictly on drag */}
                    {isDragActive && <ScannerLive3D />}

                    <motion.div
                      animate={isDragActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <Upload
                        size={40}
                        className={`mx-auto mb-4 transition-colors duration-300 ${
                          isDragActive ? "text-accent-cyan drop-shadow-[0_0_15px_rgba(93,176,229,1)]" : "text-steel"
                        }`}
                      />
                      <p className={`font-medium mb-1 transition-colors duration-300 ${isDragActive ? "text-accent-cyan" : "text-white"}`}>
                        {isDragActive
                          ? "Отпустите файлы для загрузки"
                          : "Перетащите файл или нажмите для выбора"}
                      </p>
                      <p className="text-sm text-steel">
                        Excel, PDF или фото • до 20 МБ
                      </p>
                    </motion.div>
                  </div>

                  {/* Uploaded files */}
                  <AnimatePresence>
                    {files.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 space-y-2 overflow-hidden"
                      >
                        {files.map((f, i) => (
                          <motion.div
                            key={f.file.name + i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="flex items-center justify-between bg-graphite rounded-xl px-4 py-3 border border-border"
                          >
                            <div className="flex items-center gap-3">
                              {getFileIcon(f.file.type)}
                              <div>
                                <p className="text-sm text-white font-medium truncate max-w-[250px]">
                                  {f.file.name}
                                </p>
                                <p className="text-xs text-steel">
                                  {(f.file.size / 1024).toFixed(0)} КБ
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFile(i)}
                              className="text-steel hover:text-accent-blue transition-colors p-1"
                            >
                              <X size={16} />
                            </button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Contact fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div>
                      <label className="text-sm text-silver mb-2 block">
                        Ваше имя
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Иван Петров"
                        className="w-full bg-graphite border border-border rounded-xl px-4 py-3 text-white placeholder:text-steel focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-silver mb-2 block">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="+7 XXX XXX XX XX"
                        className="w-full bg-graphite border border-border rounded-xl px-4 py-3 text-white placeholder:text-steel focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/30 transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={!name || !phone || isSubmitting}
                    className="w-full mt-6 flex items-center justify-center gap-2 bg-accent-blue hover:bg-accent-blue-dark disabled:bg-steel disabled:cursor-not-allowed text-white font-semibold px-6 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                       </svg>
                    ) : <Send size={18} />}
                    {isSubmitting ? "Отправка..." : "Отправить смету на расчет"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


