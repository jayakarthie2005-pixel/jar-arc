import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Video, Film, Instagram, Megaphone } from 'lucide-react';

const services = [
  {
    icon: Video,
    title: 'Video Shooting',
    description: 'Professional business video production with cinematic quality that tells your brand story.',
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    icon: Film,
    title: 'Editing (Reels/Shorts)',
    description: 'Dynamic, scroll-stopping edits optimized for maximum engagement on social platforms.',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: Instagram,
    title: 'Instagram Posting',
    description: 'Strategic content scheduling and posting to maintain consistency and grow your following.',
    gradient: 'from-pink-500/20 to-orange-500/20',
  },
  {
    icon: Megaphone,
    title: 'Promotion Campaigns',
    description: 'Targeted campaigns that amplify your reach and bring qualified leads to your business.',
    gradient: 'from-orange-500/20 to-yellow-500/20',
  },
];

export const WhatWeDo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm text-white/40 uppercase tracking-widest">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Everything You Need to{' '}
            <span className="accent-text">Grow</span>
          </h2>
          <p className="text-lg text-white/60">
            From concept to conversion, we provide end-to-end content solutions that drive real business results.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-8 text-center group cursor-pointer"
            >
              {/* Icon */}
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <service.icon size={28} className="text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
