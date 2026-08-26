import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, Palette, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Lightbulb,
    title: 'Strategy',
    subtitle: 'Marketing Planning',
    description: "We analyze your business, audience, and competitors to create a content strategy that drives real results. From content calendars to campaign planning, we've got you covered.",
    features: [
      'Market & Competitor Analysis',
      'Content Calendar Development',
      'Campaign Strategy',
      'Growth Roadmap',
    ],
    gradient: 'from-blue-500/10 via-purple-500/10 to-pink-500/10',
  },
  {
    icon: Palette,
    title: 'Content Creation',
    subtitle: 'Video + Editing',
    description: 'From concept to final cut, we produce high-quality video content that captures attention and drives engagement. Every frame is crafted with your brand in mind.',
    features: [
      'Professional Video Production',
      'Reels & Shorts Editing',
      'Motion Graphics',
      'Brand-Aligned Aesthetics',
    ],
    gradient: 'from-pink-500/10 via-orange-500/10 to-yellow-500/10',
  },
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm text-white/40 uppercase tracking-widest">Services</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Our <span className="accent-text">Expertise</span>
          </h2>
          <p className="text-lg text-white/60">
            Comprehensive services designed to elevate your brand and accelerate growth.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-card p-8 md:p-10 relative overflow-hidden group"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-6">
                  <service.icon size={32} className="text-white/80" />
                </div>

                {/* Title */}
                <span className="text-sm text-white/40 uppercase tracking-widest">{service.subtitle}</span>
                <h3 className="text-3xl font-bold mt-2 mb-4">{service.title}</h3>

                {/* Description */}
                <p className="text-white/60 mb-8 leading-relaxed">{service.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-white font-medium group/link"
                >
                  Learn More
                  <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
