import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { WhatWeDo } from "./components/WhatWeDo";
import { HowItWorks } from "./components/HowItWorks";
import { Portfolio } from "./components/Portfolio";
import { Results } from "./components/Results";
import { Testimonials } from "./components/Testimonials";
import { Services } from "./components/Services";
import { Contact } from "./components/Contact";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { Footer } from "./components/Footer";

// Single global video URL used by App + Hero hook
export const GLOBAL_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260404_050931_6b868bbb-85a4-498d-921e-e815d5a55906.mp4";

function App() {
  return (
    <div className="min-h-screen text-white relative">

      {/* ── SINGLE GLOBAL VIDEO BACKGROUND ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/og-image.jpg"
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
        src={GLOBAL_VIDEO_URL}
      />
      {/* Cinematic dark overlay — sits between video and content */}
      <div className="fixed inset-0 bg-black/55 -z-10" />

      {/* ── CONTENT ── */}
      <Navbar />

      <main>
        <Hero />
        <About />
        <WhatWeDo />
        <HowItWorks />
        <Portfolio />
        <Results />
        <Testimonials />
        <Services />
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
