import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { subscribeNewsletter } from "../lib/firebase";

// Hero no longer owns its own video — the global one in App.tsx shows through
export const Hero = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await subscribeNewsletter(email);
      setSubmitStatus("success");
      setEmail("");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* No local video — global background from App.tsx shows through */}
      <div className="relative z-10 container-custom text-center px-4 pt-32 pb-20">
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

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            We Don't Just Shoot <span className="accent-text">Videos</span>
            <br />
            — We Grow Your <span className="accent-text">Business</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 mb-12">
            Content. <span className="accent-text">Creativity.</span> Consistency.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="flex w-full gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="glass-input flex-1 px-5 py-4 rounded-xl"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="primary-button px-6 py-4 rounded-xl flex items-center gap-2 whitespace-nowrap"
              >
                {isSubmitting ? "Sending..." : (<>Boost My Business <ArrowRight size={18} /></>)}
              </button>
            </form>
          </div>

          {submitStatus !== "idle" && (
            <p className={`mt-4 text-sm ${submitStatus === "success" ? "text-green-400" : "text-red-400"}`}>
              {submitStatus === "success" ? "You're in! We'll be in touch soon." : "Something went wrong. Please try again."}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};
