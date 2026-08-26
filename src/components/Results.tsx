import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Users, Eye, ShoppingCart } from 'lucide-react';

const results = [
  {
    icon: Eye,
    value: '10x',
    label: 'More Reach',
    description: 'Average increase in content visibility',
  },
  {
    icon: TrendingUp,
    value: '300%',
    label: 'More Engagement',
    description: 'Boost in likes, comments, and shares',
  },
  {
    icon: Users,
    value: '5x',
    label: 'More Followers',
    description: 'Growth in social media following',
  },
  {
    icon: ShoppingCart,
    value: '200%',
    label: 'More Customers',
    description: 'Increase in leads and conversions',
  },
];

export const Results = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm text-white/40 uppercase tracking-widest">Results</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Numbers That <span className="accent-text">Speak</span>
          </h2>
          <p className="text-lg text-white/60">
            Real results from real clients. Here's what you can expect when you work with us.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((result, index) => (
            <motion.div
              key={result.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-8 text-center"
            >
              {/* Icon */}
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl glass flex items-center justify-center">
                <result.icon size={28} className="text-white/80" />
              </div>

              {/* Value */}
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                className="text-5xl font-bold gradient-text block mb-2"
              >
                {result.value}
              </motion.span>

              {/* Label */}
              <h3 className="text-xl font-semibold mb-2">{result.label}</h3>
              <p className="text-white/50 text-sm">{result.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
