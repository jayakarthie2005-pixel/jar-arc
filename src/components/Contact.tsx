import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle, MessageCircle, AlertCircle, Send } from 'lucide-react';
import { submitContactForm } from '../lib/firebase';
import { sendContactEmail, isEmailJSConfigured } from '../lib/email';

// ── Config ────────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER   = import.meta.env.VITE_WHATSAPP_NUMBER   || '917339603985';
const TELEGRAM_USERNAME = import.meta.env.VITE_TELEGRAM_USERNAME || 'jararc_enquiries_bot';
const TELEGRAM_DISPLAY  = import.meta.env.VITE_TELEGRAM_DISPLAY  || 'Jar Arc Enquiries';
const API_URL           = import.meta.env.VITE_API_URL           || '';

// ── Telegram icon ─────────────────────────────────────────────────────────────
const TelegramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

interface FormData {
  name: string; phone: string; email: string; businessName: string; message: string;
}
type Status = 'idle' | 'submitting' | 'success' | 'error';

const buildWhatsAppUrl = (data: FormData) => {
  const text = `Hello Jar Arc,\n\nNew enquiry from the website:\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nBusiness: ${data.businessName}\n\nMessage:\n${data.message}\n\nPlease contact me regarding this enquiry.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState<FormData>({ name:'', phone:'', email:'', businessName:'', message:'' });
  const [status, setStatus]       = useState<Status>('idle');
  const [errorMsg, setErrorMsg]   = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setErrorMsg('');

    try {
      // ── 1. Send to Telegram via backend (primary) ──
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || 'Failed to send enquiry.');
      }

      // ── 2. Background: save to Firestore (non-blocking) ──
      submitContactForm({
        name: formData.name,
        phone: formData.phone,
        businessName: formData.businessName,
        message: formData.message,
      }).catch((fe) => console.warn('Firestore (non-fatal):', fe));

      // ── 3. Background: send via EmailJS (non-blocking) ──
      if (isEmailJSConfigured()) {
        sendContactEmail(formData).catch((ee) => console.warn('EmailJS (non-fatal):', ee));
      }

      // ── 4. Show success ──
      setStatus('success');
      setFormData({ name:'', phone:'', email:'', businessName:'', message:'' });

    } catch (err) {
      console.error('Contact form error:', err);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Unable to send enquiry. Please try again.'
      );
      setStatus('error');
    } finally {
      // Loading state always ends
    }
  };

  const waUrl = buildWhatsAppUrl(formData);

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
      <div ref={ref} className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ── Left info ── */}
          <motion.div initial={{ opacity:0, x:-50 }} animate={isInView?{opacity:1,x:0}:{}} transition={{ duration:0.8 }}>
            <span className="text-sm text-white/40 uppercase tracking-widest">Contact</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Let's Start <span className="accent-text">Growing</span>
            </h2>
            <p className="text-lg text-white/60 mb-12 leading-relaxed">
              Ready to transform your business with powerful video content? Fill the form and we'll get back to you on Telegram and WhatsApp.
            </p>

            <div className="space-y-6">
              <a href="tel:+917339603985" className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-white/10 transition-colors"><Phone size={20} /></div>
                <span>+91 7339603985</span>
              </a>

              <a href="mailto:jar.arcworks@gmail.com" className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-white/10 transition-colors"><Mail size={20} /></div>
                <span>jar.arcworks@gmail.com</span>
              </a>

              <a href={`https://t.me/${TELEGRAM_USERNAME}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <TelegramIcon size={20} />
                </div>
                <span>{TELEGRAM_DISPLAY}</span>
              </a>

              <div className="flex items-center gap-4 text-white/70">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center"><MapPin size={20} /></div>
                <span>Chennai, India</span>
              </div>
            </div>
          </motion.div>

          {/* ── Right form / states ── */}
          <motion.div initial={{ opacity:0, x:50 }} animate={isInView?{opacity:1,x:0}:{}} transition={{ duration:0.8, delay:0.2 }}>

            {/* SUCCESS */}
            {status === 'success' && (
              <div className="glass-card p-12 text-center">
                <CheckCircle size={64} className="mx-auto mb-6 text-green-400" />
                <h3 className="text-2xl font-bold mb-4">✓ Enquiry Sent Successfully</h3>
                <p className="text-white/60 mb-6">Your message has been sent to Jar Arc. We'll get back to you shortly!</p>
                <div className="space-y-3">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 transition-all text-white">
                    <MessageCircle size={18} /> Also Send via WhatsApp
                  </a>
                  <button onClick={() => setStatus('idle')} className="glass-button px-6 py-3 rounded-xl text-sm w-full">Send Another Enquiry</button>
                </div>
              </div>
            )}

            {/* FORM */}
            {(status === 'idle' || status === 'submitting' || status === 'error') && (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
                {[
                  { id:'name',         label:'Your Name *',      type:'text',  placeholder:'John Doe' },
                  { id:'phone',        label:'Phone Number *',   type:'tel',   placeholder:'+91 98765 43210' },
                  { id:'email',        label:'Email Address *',  type:'email', placeholder:'you@example.com' },
                  { id:'businessName', label:'Business Name *',  type:'text',  placeholder:'Your Business Name' },
                ].map(f => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-sm text-white/60 mb-2">{f.label}</label>
                    <input type={f.type} id={f.id} name={f.id}
                      value={formData[f.id as keyof FormData]} onChange={handleChange}
                      required disabled={status==='submitting'}
                      className="glass-input w-full px-4 py-3 rounded-xl" placeholder={f.placeholder} />
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="block text-sm text-white/60 mb-2">Message *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange}
                    required rows={4} disabled={status==='submitting'}
                    className="glass-input w-full px-4 py-3 rounded-xl resize-none"
                    placeholder="Tell us about your project..." />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle size={16}/> {errorMsg || 'Unable to send enquiry. Please try again.'}
                  </p>
                )}

                <button type="submit" disabled={status==='submitting'}
                  className="primary-button w-full py-4 rounded-xl flex items-center justify-center gap-2 text-lg disabled:opacity-60 disabled:cursor-not-allowed">
                  {status === 'submitting' ? (
                    <><span className="animate-spin inline-block w-5 h-5 border-2 border-black/30 border-t-black rounded-full" /> Processing...</>
                  ) : (
                    <>Send Enquiry <Send size={20} /></>
                  )}
                </button>

                <p className="text-white/30 text-xs text-center">Your enquiry will be sent to Jar Arc via Telegram. You can also follow up on WhatsApp.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
