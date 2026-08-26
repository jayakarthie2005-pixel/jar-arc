import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '917339603985';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi! I would like to know more about Jar Arc services.'
);

export const WhatsAppButton = () => {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-50 animate-pulse-slow" />
        
        {/* Button */}
        <div className="relative w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
          <MessageCircle size={28} className="text-white" />
        </div>
      </div>
    </motion.a>
  );
};