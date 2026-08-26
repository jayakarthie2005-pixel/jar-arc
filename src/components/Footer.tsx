import { motion } from 'framer-motion';
import { Instagram, Youtube, Twitter, ArrowUp } from 'lucide-react';

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com/jararc' },
  { name: 'YouTube', icon: Youtube, href: import.meta.env.VITE_YOUTUBE_URL || 'https://youtube.com/@jararc' },
  { name: 'X', icon: Twitter, href: import.meta.env.VITE_TWITTER_URL || 'https://x.com/jararc' },
];

const footerLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5">
      <div className="container-custom py-16 px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Jar <span className="accent-text">Arc</span>
            </h3>
            <p className="text-white/50 mb-6 max-w-xs">
              Creative promotion agency helping businesses grow through powerful video content.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-white/50">
              <li>
                <a href="tel:+917339603985" className="hover:text-white transition-colors">
                  +91 7339603985
                </a>
              </li>
              <li>
                <a href="mailto:jar.arcworks@gmail.com" className="hover:text-white transition-colors">
                  jar.arcworks@gmail.com
                </a>
              </li>
              <li>Chennai, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
          <p className="text-white/40 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Jar Arc. All rights reserved.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="glass-button p-3 rounded-xl"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
