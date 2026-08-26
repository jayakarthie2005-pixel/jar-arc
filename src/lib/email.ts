import emailjs from '@emailjs/browser';

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE;
const AUTH_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTH_TEMPLATE;

// ✅ Helper — Contact.tsx uses this to skip EmailJS gracefully if not configured
export const isEmailJSConfigured = (): boolean => {
  return !!(
    PUBLIC_KEY &&
    PUBLIC_KEY !== 'placeholder' &&
    SERVICE_ID &&
    SERVICE_ID !== 'placeholder' &&
    CONTACT_TEMPLATE_ID &&
    CONTACT_TEMPLATE_ID !== 'placeholder'
  );
};

// ✅ Initialize only when properly configured
if (PUBLIC_KEY && PUBLIC_KEY !== 'placeholder') {
  emailjs.init(PUBLIC_KEY);
} else {
  console.warn('EmailJS not configured — email sending is disabled.');
}

// ✅ Contact Form Email
export const sendContactEmail = async (data: {
  name: string;
  phone: string;
  email: string;
  businessName: string;
  message: string;
}) => {
  if (!isEmailJSConfigured()) {
    console.warn('EmailJS not configured — skipping email send.');
    return;
  }

  return emailjs.send(SERVICE_ID, CONTACT_TEMPLATE_ID, {
    to_email: 'jar.arcworks@gmail.com',
    from_name: data.name,
    from_phone: data.phone,
    from_email: data.email,
    business_name: data.businessName,
    message: data.message,
  });
};

// ✅ Auth Notification Email
export const sendAuthNotification = async (data: {
  email: string;
  type: 'signup' | 'login';
}) => {
  if (
    !PUBLIC_KEY || PUBLIC_KEY === 'placeholder' ||
    !SERVICE_ID || SERVICE_ID === 'placeholder' ||
    !AUTH_TEMPLATE_ID || AUTH_TEMPLATE_ID === 'placeholder'
  ) {
    console.warn('EmailJS auth template not configured — skipping.');
    return;
  }

  return emailjs.send(SERVICE_ID, AUTH_TEMPLATE_ID, {
    to_email: 'jar.arcworks@gmail.com',
    user_email: data.email,
    action_type: data.type === 'signup' ? 'New Sign Up' : 'User Login',
    timestamp: new Date().toLocaleString(),
  });
};
