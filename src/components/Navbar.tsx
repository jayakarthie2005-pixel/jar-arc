import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// Auth removed completely — Navbar takes no props
const navLinks = [
  { name: 'About',     href: '#about' },
  { name: 'Services',  href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contact',   href: '#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'}`}
      >
        <div className="container-custom px-4">
          <div className={`glass rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'bg-black/60' : ''}`}>

            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight">
                Jar <span className="accent-text">Arc</span>
              </span>
            </a>

            {/* Desktop nav — centred */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-white transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* CTA — desktop */}
            <a
              href="#contact"
              className="hidden md:inline-flex glass-button px-4 py-2 rounded-xl text-sm"
            >
              Get Started
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-24 z-40 px-4 md:hidden"
          >
            <div className="glass rounded-2xl p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg text-white/70 hover:text-white transition-colors py-2"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10">
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="glass-button block w-full px-4 py-3 rounded-xl text-sm text-center"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
