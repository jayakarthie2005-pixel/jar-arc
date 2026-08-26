import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Camera, Scissors, Send, Rocket } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Camera,
    title: 'Shoot',
    description: 'We capture your brand story with professional equipment and creative direction.',
  },
  {
    step: '02',
    icon: Scissors,
    title: 'Edit',
    description: 'Transform raw footage into engaging, scroll-stopping content that converts.',
  },
  {
    step: '03',
    icon: Send,
    title: 'Post',
    description: 'Strategic publishing across platforms at optimal times for maximum reach.',
  },
  {
    step: '04',
    icon: Rocket,
    title: 'Grow',
    description: 'Watch your audience, engagement, and customer base expand consistently.',
  },
];

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Animated Background Line */}
      <div className="absolute left-1/2 top-48 bottom-32 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-sm text-white/40 uppercase tracking-widest">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Your Path to <span className="accent-text">Growth</span>
          </h2>
          <p className="text-lg text-white/60">
            A simple, proven process that takes your business from invisible to irresistible.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/20 to-transparent" />
              )}

              <div className="glass-card p-8 text-center relative z-10">
                {/* Step Number */}
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-7xl font-bold text-white/5">
                  {step.step}
                </span>

                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full glass flex items-center justify-center relative">
                  <step.icon size={32} className="text-white/80" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/60">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
