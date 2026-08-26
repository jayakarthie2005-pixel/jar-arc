import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Owner, Spice Garden Restaurant',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    content: "Jar Arc transformed our social media presence. Our restaurant went from 500 followers to over 15,000 in just 3 months. The reels they create are absolutely stunning and bring customers through our doors every day.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    role: 'Founder, FitZone Gym',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: "Working with Jar Arc has been a game-changer for my fitness business. Their content strategy and video quality helped us triple our membership in 6 months. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: 'Ananya Reddy',
    role: 'CEO, StyleHouse Boutique',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    content: "The team at Jar Arc understands fashion and knows how to showcase products beautifully. Our online sales increased by 250% after they took over our Instagram. They're not just video makers—they're growth partners.",
    rating: 5,
  },
];

// ── Fallback avatar when image fails to load ──────────────────────────────────
const Avatar = ({ name, image }: { name: string; image: string }) => {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (failed || !image) {
    return (
      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={name}
      className="w-14 h-14 rounded-full object-cover flex-shrink-0"
      onError={() => setFailed(true)}
    />
  );
};

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrentIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[currentIndex];

  return (
    <section className="section-padding relative overflow-hidden">
      <div ref={ref} className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm text-white/40 uppercase tracking-widest">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            What Our <span className="accent-text">Clients</span> Say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card p-8 md:p-12 relative">
            <Quote className="absolute top-8 right-8 w-16 h-16 text-white/5" />

            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-8 italic">
                "{t.content}"
              </p>

              <div className="flex items-center gap-4">
                <Avatar name={t.name} image={t.image} />
                <div>
                  <h4 className="font-semibold text-lg">{t.name}</h4>
                  <p className="text-white/50">{t.role}</p>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-end gap-3 mt-8">
              <button onClick={prev} className="glass-button p-3 rounded-xl" aria-label="Previous">
                <ChevronLeft size={20} />
              </button>
              <button onClick={next} className="glass-button p-3 rounded-xl" aria-label="Next">
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
