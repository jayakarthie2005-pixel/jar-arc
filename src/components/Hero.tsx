import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '917339603985';

export const Hero = () => {
  const [idea, setIdea] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    const message = encodeURIComponent(
      `Hi! I would like to know more about Jar Arc services.\n\nMy idea/business: ${idea.trim()}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    setIdea("");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* No local video — global background from App.tsx shows through */}
      <div className="relative z-10 container-custom text-center px-5 pt-24 pb-16 md:pt-32 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8">
            <Play size={14} className="text-white/60" />
            <span className="text-sm text-white/80">Creative Promotion Agency</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            We Don't Just Shoot <span className="accent-text">Videos</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>— We Grow Your <span className="accent-text">Business</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-white/70 mb-8 md:mb-12">
            Content. <span className="accent-text">Creativity.</span> Consistency.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto px-2 sm:px-0">
            <form onSubmit={handleSubmit} className="flex w-full gap-2 sm:gap-3">
              <input
                type="text"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Enter your idea or business"
                className="glass-input flex-1 px-5 py-4 rounded-xl"
                required
              />
              <button
                type="submit"
                className="primary-button px-6 py-4 rounded-xl flex items-center gap-2 whitespace-nowrap"
              >
                Boost My Business <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
