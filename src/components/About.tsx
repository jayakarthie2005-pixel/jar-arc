import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Target, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Creative Storytelling',
    description: 'We craft compelling narratives that resonate with your audience and drive action.',
  },
  {
    icon: Target,
    title: 'Strategic Approach',
    description: 'Every piece of content is designed with your business goals in mind.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Focused',
    description: "We measure success by your growth — reach, engagement, and customers.",
  },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      
      <div ref={ref} className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm text-white/40 uppercase tracking-widest">About Us</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
              We Turn <span className="accent-text">Stories</span> Into{' '}
              <span className="accent-text">Growth</span>
            </h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              Jar Arc is a creative promotion agency dedicated to helping businesses amplify their 
              presence through powerful video content. We don't just create videos — we create 
              experiences that connect with your audience and convert viewers into customers.
            </p>
            <p className="text-lg text-white/60 leading-relaxed">
              From shooting high-quality business videos to editing engaging reels and managing 
              your Instagram presence, we handle the entire content lifecycle so you can focus 
              on what you do best — running your business.
            </p>
          </motion.div>

          {/* Right Content - Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="glass-card p-6 flex gap-5"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl glass flex items-center justify-center">
                  <feature.icon size={24} className="text-white/80" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
