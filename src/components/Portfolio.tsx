import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Play, ExternalLink, X, Instagram } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface BaseItem {
  id: number;
  title: string;
  category: string;
}

interface ImageItem extends BaseItem {
  type: 'image';
  src: string;
}

interface VideoItem extends BaseItem {
  type: 'video';
  src: string;
}

interface InstagramItem extends BaseItem {
  type: 'instagram';
  instagramUrl: string;
  thumbnail: string;
}

type PortfolioItem = ImageItem | VideoItem | InstagramItem;

/* ------------------------------------------------------------------ */
/*  Portfolio data                                                     */
/* ------------------------------------------------------------------ */

const portfolioItems: PortfolioItem[] = [
  /* ── Row 1 ── */
  {
    id: 1,
    title: 'Restaurant Promo',
    category: 'Food & Beverage',
    type: 'instagram',
    instagramUrl: 'https://www.instagram.com/reel/DWggD80j10J/',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Fashion Brand Launch',
    category: 'Fashion',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Tech Startup Story',
    category: 'Technology',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
  },

  /* ── Row 2 ── */
  {
    id: 4,
    title: 'Fitness Campaign',
    category: 'Health & Wellness',
    type: 'instagram',
    instagramUrl: 'https://www.instagram.com/reel/DWy5GPiD3gC/',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'Real Estate Tour',
    category: 'Real Estate',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'Product Launch',
    category: 'E-commerce',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
  },

  /* ── Row 3 ── */
  {
    id: 7,
    title: 'Wedding Photography',
    category: 'Wedding',
    type: 'instagram',
    instagramUrl: 'https://www.instagram.com/p/DZFhwNqj3E5/',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
  },

  /* ── Future items (uncomment to enable) ──
  {
    id: 10,
    title: 'Gym Highlights',
    category: 'Gym',
    type: 'instagram',
    instagramUrl: 'https://www.instagram.com/reel/DWtRjCGD0Vl/',
  },
  {
    id: 11,
    title: 'Wedding Cinematic Reel',
    category: 'Wedding',
    type: 'instagram',
    instagramUrl: 'https://www.instagram.com/reel/DZSRMoGv7sQ/',
  },
  */
];

/* ------------------------------------------------------------------ */
/*  Instagram iframe — renders exactly ONE embed inside the modal      */
/* ------------------------------------------------------------------ */

function InstagramIframe({ url }: { url: string }) {
  const embedUrl = url.replace(/\/?$/, '/embed/');

  return (
    <div className="w-full max-w-[540px] mx-auto flex flex-col items-center">
      <iframe
        src={embedUrl}
        width="100%"
        height="600"
        className="rounded-lg border-0"
        scrolling="no"
        allowTransparency
        allow="encrypted-media"
        title="Instagram"
      />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
      >
        <ExternalLink size={14} />
        View on Instagram
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Portfolio card content (thumbnail / preview)                       */
/* ------------------------------------------------------------------ */

function CardContent({ item }: { item: PortfolioItem }) {
  if (item.type === 'image') {
    return (
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>
    );
  }

  if (item.type === 'video') {
    return (
      <div className="aspect-[4/3] overflow-hidden relative">
        <video
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
          onMouseLeave={(e) => {
            const v = e.target as HTMLVideoElement;
            v.pause();
          }}
        >
          <source src={item.src} />
        </video>
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
          <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
            <Play size={24} className="text-white ml-1" />
          </div>
        </div>
      </div>
    );
  }

  // Instagram type — background image + dark overlay + Watch Reel button
  return (
    <div className="aspect-[4/3] overflow-hidden relative">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
        <Instagram
          size={40}
          className="text-white/50 mb-3 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="glass-button px-5 py-2.5 rounded-xl text-sm font-medium pointer-events-none flex items-center gap-2">
          <Play size={14} className="fill-current" />
          Watch Reel
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Modal content — exactly ONE item rendered                          */
/* ------------------------------------------------------------------ */

function ModalContent({ item }: { item: PortfolioItem }) {
  if (item.type === 'image') {
    return (
      <img
        src={item.src}
        alt={item.title}
        className="max-h-[80vh] max-w-full object-contain rounded-lg"
      />
    );
  }

  if (item.type === 'video') {
    return (
      <video
        controls
        muted
        loop
        playsInline
        preload="metadata"
        className="max-h-[80vh] max-w-full rounded-lg"
      >
        <source src={item.src} />
      </video>
    );
  }

  // Instagram type — exactly ONE iframe, no duplicates
  return <InstagramIframe url={item.instagramUrl} />;
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  // Escape key closes modal
  useEffect(() => {
    if (!selectedItem) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedItem]);

  const openModal = (item: PortfolioItem) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden">
      <div ref={ref} className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm text-white/40 uppercase tracking-widest">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Our <span className="accent-text">Work</span>
          </h2>
          <p className="text-lg text-white/60">
            A showcase of brands we've helped grow through compelling video content.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => openModal(item)}
            >
              {/* Card content */}
              <CardContent item={item} />

              {/* Overlay on hover */}
              <motion.div
                initial={false}
                animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-6 pointer-events-none"
              >
                <span className="text-sm text-white/60 mb-1">{item.category}</span>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <div className="flex gap-3">
                  {item.type === 'video' && (
                    <div className="glass-button p-3 rounded-xl pointer-events-none">
                      <Play size={20} />
                    </div>
                  )}
                  {item.type === 'instagram' && (
                    <div className="glass-button px-4 py-2 rounded-xl text-sm pointer-events-none flex items-center gap-2">
                      <Play size={14} className="fill-current" />
                      <span>Watch Reel</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Always visible bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                <span className="text-sm text-white/60">{item.category}</span>
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Modal — renders exactly ONE item ── */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

          {/* Modal body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors rounded-full glass"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Content — exactly ONE of these renders */}
            <div className="flex justify-center w-full overflow-hidden">
              <ModalContent item={selectedItem} />
            </div>

            {/* Caption */}
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold">{selectedItem.title}</h3>
              <p className="text-white/50 text-sm">{selectedItem.category}</p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
