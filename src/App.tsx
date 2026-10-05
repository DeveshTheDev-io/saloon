import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// CONSTANTS & ASSETS
// ==========================================

// Hero & Section 2 backgrounds from the modern 3D design
const HERO_IMAGE = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85';
const SECTION2_IMAGE = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85';

// Real salon/beauty home service images (replacing tooth/dental images)
const SECTION3_IMG1 = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1280&q=85'; // Hair salon / styling
const SECTION3_IMG2 = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1280&q=85'; // Facial spa / skincare
const SECTION3_BG = 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1280&q=85';   // Glowing skin / bridal makeover

const featureBars = ['Luxury Home Salon', 'Female Exclusivity', 'All Over Gwalior'];

const servicesHighlight = [
  { name: 'Bridal\nMakeup', num: '01', active: true, tag: 'Signature' },
  { name: 'Party\nMakeup', num: '02', active: false, tag: 'Glamour' },
  { name: 'Hair Spa &\nHairstyles', num: '03', active: false, tag: 'Trending' },
  { name: 'Facial &\nClean Up', num: null, active: false, tag: 'Glow' },
];

export interface ServiceItem {
  id: string;
  name: string;
  category: 'Makeup & Hair' | 'Skin & Facial' | 'Spa & Massage' | 'Waxing & Grooming';
  description: string;
  popular?: boolean;
}

const ALL_SERVICES_DATA: ServiceItem[] = [
  { id: 'bridal-makeup', name: 'Bridal makeup', category: 'Makeup & Hair', description: 'Complete traditional & HD bridal makeover with high-end cosmetics.', popular: true },
  { id: 'party-makeup', name: 'Party makeup', category: 'Makeup & Hair', description: 'Glamorous, long-wearing makeup tailored for wedding guests & events.', popular: true },
  { id: 'hairstyles', name: 'Hairstyles', category: 'Makeup & Hair', description: 'Designer buns, soft waves, braids, and customized event styling.', popular: true },
  { id: 'waxing', name: 'Waxing', category: 'Waxing & Grooming', description: 'Hygienic, smooth full body & arms/legs waxing with gentle soothing care.' },
  { id: 'facial', name: 'Facial', category: 'Skin & Facial', description: 'Deep cleansing, gentle exfoliation & skin brightening facial glow.', popular: true },
  { id: 'manicure-pedicure', name: 'Manicure pedicure', category: 'Spa & Massage', description: 'Relaxing hand & foot spa with cuticle grooming and soothing massage.' },
  { id: 'hair-spa', name: 'Hair spa', category: 'Spa & Massage', description: 'Intensive nourishing hair therapy for silky, frizz-free, healthy hair.', popular: true },
  { id: 'head-massage', name: 'Head massage', category: 'Spa & Massage', description: 'Stress-relieving warm herbal oil head massage and relaxation.' },
  { id: 'haircut', name: 'Haircut', category: 'Makeup & Hair', description: 'Precision styling, layers, feather cuts & customized hair trimming.' },
  { id: 'threading', name: 'Threading', category: 'Waxing & Grooming', description: 'Flawless eyebrow shaping, upper lip, forehead, and chin threading.' },
  { id: 'clean-up', name: 'Clean up', category: 'Skin & Facial', description: 'Instant refresh for clogged pores, blackheads removal & skin polish.' },
  { id: 'body-polishing', name: 'Body polishing', category: 'Spa & Massage', description: 'Exfoliating full-body glow therapy leaving skin deeply radiant & soft.' },
  { id: 'body-massage', name: 'Body massage', category: 'Spa & Massage', description: 'Full body restorative relaxing massage strictly for females at home.' },
  { id: 'de-tan-pack', name: 'De-tan pack', category: 'Skin & Facial', description: 'Effective tan removal herbal pack restoring natural skin tone.' },
  { id: 'bleach', name: 'Bleach', category: 'Skin & Facial', description: 'Skin-safe golden/oxy bleach for instant glow and facial hair blending.' },
  { id: 'root-touch-up', name: 'Root touch up', category: 'Makeup & Hair', description: 'Seamless grey root coverage and professional hair color application.' },
  { id: 'bikini-wax', name: 'Bikini wax', category: 'Waxing & Grooming', description: 'Utmost hygienic, private and painless premium strip/stripless wax.' },
  { id: 'face-wax', name: 'Face wax', category: 'Waxing & Grooming', description: 'Delicate facial wax for smooth upper lips, sideburns & peach fuzz.' },
  { id: 'highlights', name: 'Highlights', category: 'Makeup & Hair', description: 'Custom blonde, caramel or burgundy hair streaks for dimension.' },
];

const ALL_SERVICES_NAMES = ALL_SERVICES_DATA.map((s) => s.name);

export interface PackageItem {
  id: string;
  name: string;
  festivalType: 'Ganesh Chaturthi' | 'Karwa Chauth';
  offerBadge: string;
  badgeTone: 'gold' | 'rose';
  price: number;
  originalPrice: number;
  savingsText: string;
  items: string[];
  description: string;
  popular?: boolean;
}

export const LATEST_PACKAGES_DATA: PackageItem[] = [
  {
    id: 'pkg-hydra-rica-1999',
    name: 'Hydra Boost Facial & Rica Wax Special',
    festivalType: 'Ganesh Chaturthi',
    offerBadge: 'Ganesh Chaturthi Offer • 10% Off',
    badgeTone: 'gold',
    price: 1999,
    originalPrice: 2499,
    savingsText: 'Save ₹500 (10% Off Special)',
    items: [
      'Hydra boost facial',
      'Rica wax -- full arms, full legs, underarms',
      'Root to touch up',
      'Eyebrows & upper lips',
    ],
    description: 'Deep hydration facial paired with premium gentle Rica waxing, root hair touch-up, and threading.',
    popular: true,
  },
  {
    id: 'pkg-korean-rica-1999',
    name: 'Korean Glass Facial & Hair Colour Package',
    festivalType: 'Ganesh Chaturthi',
    offerBadge: 'Ganesh Chaturthi Offer • 10% Off',
    badgeTone: 'gold',
    price: 1999,
    originalPrice: 2499,
    savingsText: 'Save ₹500 (10% Off Special)',
    items: [
      'Korean glass facial',
      'Rica wax -- full arms, full legs, underarms',
      'Hair colour application',
      'Eyebrows, upper lips & forehead',
    ],
    description: 'Trending Korean glass skin therapy with gentle Rica waxing, full hair colour and clean brow grooming.',
    popular: true,
  },
  {
    id: 'pkg-kc-raga-999',
    name: 'Karwa Chauth Raaga Radiance Combo',
    festivalType: 'Karwa Chauth',
    offerBadge: 'Karwa Chauth Offer',
    badgeTone: 'rose',
    price: 999,
    originalPrice: 1599,
    savingsText: 'Just RS 999 • Festive Combo',
    items: [
      'Raaga facial',
      'Honey wax -- full arms, full legs, underarms',
      'Eyebrow & upper lips',
      'De-tan pack included (FREE)',
    ],
    description: 'Festive Raaga glow facial combined with honey body waxing, complimentary de-tan treatment & threading.',
    popular: true,
  },
  {
    id: 'pkg-kc-korean-999',
    name: 'Karwa Chauth Korean Glass Facial Combo',
    festivalType: 'Karwa Chauth',
    offerBadge: 'Karwa Chauth Offer',
    badgeTone: 'rose',
    price: 999,
    originalPrice: 1699,
    savingsText: 'Just RS 999 • Festive Combo',
    items: [
      'Korean glass facial',
      'Honey wax -- full arms, full legs, underarms',
      'Eyebrow & upper lips',
      'De-tan pack included (FREE)',
    ],
    description: 'Instant luminous crystal glow facial with full honey waxing, herbal de-tan pack & shaping.',
    popular: true,
  },
  {
    id: 'pkg-kc-hydra-999',
    name: 'Karwa Chauth Hydra Facial Combo',
    festivalType: 'Karwa Chauth',
    offerBadge: 'Karwa Chauth Offer',
    badgeTone: 'rose',
    price: 999,
    originalPrice: 1699,
    savingsText: 'Just RS 999 • Festive Combo',
    items: [
      'Hydra facial',
      'Honey wax -- full arms, full legs, underarms',
      'Eyebrow & upper lips',
      'De-tan pack included (FREE)',
    ],
    description: 'Deep moisture-infusion Hydra facial plus complete smooth honey waxing and de-tan glow therapy.',
    popular: true,
  },
];

const LOCATIONS = [
  'City Centre',
  'Morar',
  'Lashkar',
  'Hardaul Garden DB City',
  'All over Gwalior',
];

const CONTACT_INFO = {
  name: 'Chinki Hankare',
  businessName: 'Glow Mitra',
  fullName: 'Glow Mitra - Luxury Home Salon by Chinki Hankare',
  address: 'Hardaul garden DB City, Gwalior, MP',
  phone: '9617162619',
  whatsapp: '9617162619',
};

// ==========================================
// CUSTOM HOOKS
// ==========================================

interface CardPosition {
  x: number;
  y: number;
  sw: number;
  sh: number;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isMobile;
}

function useMaskPositions(
  containerRef: React.RefObject<HTMLElement | null>,
  cardRefs: React.RefObject<(HTMLElement | null)[]>
) {
  const [positions, setPositions] = useState<CardPosition[]>([]);
  const prevPositionsRef = useRef<CardPosition[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animFrame: number;

    const compute = () => {
      const cRect = container.getBoundingClientRect();
      const currentCards = cardRefs.current || [];
      const newPos: CardPosition[] = currentCards.map((card) => {
        if (!card) {
          return { x: 0, y: 0, sw: Math.round(cRect.width), sh: Math.round(cRect.height) };
        }
        const cardRect = card.getBoundingClientRect();
        return {
          x: Math.round(cardRect.left - cRect.left),
          y: Math.round(cardRect.top - cRect.top),
          sw: Math.round(cRect.width),
          sh: Math.round(cRect.height),
        };
      });

      const isSame =
        prevPositionsRef.current.length === newPos.length &&
        prevPositionsRef.current.every(
          (p, idx) =>
            Math.abs(p.x - newPos[idx].x) < 2 &&
            Math.abs(p.y - newPos[idx].y) < 2 &&
            Math.abs(p.sw - newPos[idx].sw) < 2 &&
            Math.abs(p.sh - newPos[idx].sh) < 2
        );

      if (!isSame) {
        prevPositionsRef.current = newPos;
        setPositions(newPos);
      }
    };

    const scheduledCompute = () => {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(compute);
    };

    scheduledCompute();
    const observer = new ResizeObserver(() => scheduledCompute());
    observer.observe(container);
    window.addEventListener('resize', scheduledCompute);

    return () => {
      cancelAnimationFrame(animFrame);
      observer.disconnect();
      window.removeEventListener('resize', scheduledCompute);
    };
  }, [containerRef, cardRefs]);

  return positions;
}

function useImageNaturalSize(src: string, defaultW = 1280, defaultH = 853) {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: defaultW,
    height: defaultH,
  });

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        setSize({ width: img.naturalWidth, height: img.naturalHeight });
      }
    };
  }, [src, defaultW, defaultH]);

  return size;
}

function useStaggeredReveal(count: number, threshold = 0.15) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getAnimStyle = (index: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
  });

  return { containerRef, getAnimStyle };
}

// ==========================================
// MASKED CARD COMPONENT
// ==========================================

interface MaskedCardProps {
  key?: React.Key;
  bgImage: string;
  position?: CardPosition;
  imageNaturalWidth?: number;
  imageNaturalHeight?: number;
  focalX?: number;
  focalY?: number;
  className?: string;
  children?: React.ReactNode;
  cardRef?: (el: HTMLElement | null) => void;
  style?: React.CSSProperties;
}

function MaskedCard({
  bgImage,
  position,
  imageNaturalWidth = 1280,
  imageNaturalHeight = 853,
  focalX = 0.5,
  focalY = 0.5,
  className = '',
  children,
  cardRef,
  style = {},
}: MaskedCardProps) {
  let maskStyle: React.CSSProperties = {};

  if (position && position.sh > 0 && position.sw > 0) {
    const natW = imageNaturalWidth > 0 ? imageNaturalWidth : 1280;
    const natH = imageNaturalHeight > 0 ? imageNaturalHeight : 853;

    // Full cover scale: guarantees the image covers 100% of container width (sw) and height (sh)
    // on all full-screen desktop screens (1080p, 1440p, 4K, ultrawide) and mobile devices.
    const scale = Math.max(position.sw / natW, position.sh / natH);
    const renderedWidth = Math.ceil(natW * scale);
    const renderedHeight = Math.ceil(natH * scale);

    const overflowX = renderedWidth > position.sw ? renderedWidth - position.sw : 0;
    const overflowY = renderedHeight > position.sh ? renderedHeight - position.sh : 0;

    const offsetX = Math.round(overflowX * focalX);
    const offsetY = Math.round(overflowY * focalY);

    maskStyle = {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: `${renderedWidth}px ${renderedHeight}px`,
      backgroundPosition: `-${position.x + offsetX}px -${position.y + offsetY}px`,
      backgroundRepeat: 'no-repeat',
    };
  }

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...maskStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ==========================================
// SPLASH SCREEN COMPONENT
// ==========================================

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let start: number | null = null;
    const duration = 750;
    let rafId: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const val = Math.floor(progress * 100);
      setCount(val);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setExiting(true);
        setTimeout(() => {
          onCompleteRef.current();
        }, 200);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleSkip = () => {
    setExiting(true);
    onCompleteRef.current();
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[100] bg-white flex items-end justify-start transition-opacity duration-300 cursor-pointer ${
        exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-7xl md:text-9xl font-bold tabular-nums p-6 md:p-10 leading-none text-black tracking-tight select-none">
        {count}
      </div>
    </div>
  );
}

// ==========================================
// NAVBAR COMPONENT
// ==========================================

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenServices: () => void;
}

function Navbar({ onOpenBooking, onOpenServices }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'Latest Packages (Festive)', action: () => scrollTo('latest-packages') },
    { label: 'All 19 Services', action: () => scrollTo('all-services') },
    { label: 'Bridal & Party', action: () => scrollTo('gallery') },
    { label: 'Home Visits', action: () => scrollTo('home-services') },
    { label: 'Book via WhatsApp', action: () => scrollTo('whatsapp-booking') },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 md:px-6 py-2.5 md:py-3.5 bg-white/85 backdrop-blur-md border-b border-black/10">
        {/* Logo Left */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col cursor-pointer select-none"
        >
          <span className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none text-black">
            Glow
          </span>
          <span className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none text-black -mt-1 md:-mt-1.5">
            Mitra
          </span>
          <span className="text-[8px] md:text-[9px] font-semibold leading-none mt-1.5 md:mt-2 text-neutral-800 tracking-wider uppercase">
            Luxury Home Salon • All Over Gwalior
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-3 lg:gap-5">
          <button
            onClick={() => scrollTo('latest-packages')}
            className="px-4 py-2 rounded-full border border-amber-500/50 bg-amber-50 text-amber-950 text-xs lg:text-sm font-bold hover:bg-amber-100 transition-colors duration-200 cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>Latest Packages</span>
            <span className="text-[10px] uppercase tracking-wide bg-rose-600 text-white font-extrabold px-1.5 py-0.5 rounded-full">
              Offers
            </span>
          </button>
          <button
            onClick={() => scrollTo('all-services')}
            className="px-4 py-2 bg-white rounded-full border border-black/20 text-xs lg:text-sm font-semibold hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
          >
            All Services Menu
          </button>
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="text-xs lg:text-sm font-semibold text-black hover:text-neutral-600 transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Call: +91 {CONTACT_INFO.phone}
          </a>
          <button
            onClick={() => scrollTo('whatsapp-booking')}
            className="px-5 py-2.5 bg-black text-white rounded-full text-xs lg:text-sm font-semibold hover:bg-neutral-800 transition-colors duration-200 shadow-sm cursor-pointer flex items-center gap-2"
          >
            <span>Book on WhatsApp</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          className="md:hidden w-10 h-10 flex items-center justify-center relative z-50 cursor-pointer"
        >
          <span
            className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              isMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col justify-between min-h-full py-16 px-6 sm:px-8 gap-4 overflow-y-auto">
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <button
                  key={link.label}
                  onClick={() => {
                    setIsMenuOpen(false);
                    link.action();
                  }}
                  style={{
                    transitionDelay: isMenuOpen ? `${100 + i * 40}ms` : '0ms',
                  }}
                  className={`text-left text-xl sm:text-2xl font-bold text-black hover:text-neutral-500 transition-all duration-300 py-2 cursor-pointer ${
                    isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div
              style={{ transitionDelay: isMenuOpen ? '350ms' : '0ms' }}
              className={`pt-4 border-t border-neutral-200 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="text-sm font-semibold text-black mb-1">
                Glow Mitra • Chinki Hankare
              </div>
              <div className="text-xs text-neutral-600 mb-4">
                Hardaul garden DB City • +91 {CONTACT_INFO.phone}
              </div>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollTo('whatsapp-booking');
                }}
                className="w-full px-6 py-3.5 bg-black rounded-full text-white text-sm font-semibold hover:bg-neutral-800 transition-colors duration-200 cursor-pointer shadow-md"
              >
                Book on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ==========================================
// ALL SERVICES CATALOG MODAL (WITH PROMINENT CLOSE)
// ==========================================

function ServicesCatalogModal({
  isOpen,
  onClose,
  onSelectService,
  onSelectPackage,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceName: string) => void;
  onSelectPackage: (packageId: string) => void;
}) {
  const [modalTab, setModalTab] = useState<'packages' | 'services'>('packages');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] border border-black/15 overflow-hidden">
        {/* Sticky Header with PROMINENT CLOSE BUTTON */}
        <div className="flex items-center justify-between px-5 md:px-7 py-4 border-b border-black/10 bg-stone-50 shrink-0">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500">
              Glow Mitra Home Salon Menu
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-black leading-tight">
              Services & Festive Packages
            </h3>
          </div>
          {/* Very visible and easy to click close button */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black text-white hover:bg-neutral-800 text-xs font-bold transition-all shadow-md cursor-pointer"
            aria-label="Close popup"
          >
            <span>Close</span>
            <span className="text-sm font-extrabold leading-none">✕</span>
          </button>
        </div>

        {/* Tab switch between Festive Packages and All Services */}
        <div className="flex items-center gap-2 px-5 md:px-7 py-3 border-b border-black/10 bg-stone-100/70 shrink-0">
          <button
            onClick={() => setModalTab('packages')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              modalTab === 'packages'
                ? 'bg-black text-white shadow-sm'
                : 'bg-white text-black border border-black/10 hover:bg-stone-200'
            }`}
          >
            <span>🎁 Latest Packages (5)</span>
            <span className="text-[9px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full font-extrabold">Offers</span>
          </button>
          <button
            onClick={() => setModalTab('services')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              modalTab === 'services'
                ? 'bg-black text-white shadow-sm'
                : 'bg-white text-black border border-black/10 hover:bg-stone-200'
            }`}
          >
            All 19 Services
          </button>
        </div>

        {/* Scrollable list */}
        <div className="p-5 md:p-7 overflow-y-auto space-y-3">
          {modalTab === 'packages' ? (
            <div className="space-y-3">
              <p className="text-xs text-neutral-600 mb-2">
                Special festive packages for Ganesh Chaturthi (10% Off) & Karwa Chauth (₹999). Click any package to select it and start booking!
              </p>
              {LATEST_PACKAGES_DATA.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => {
                    onSelectPackage(pkg.id);
                    onClose();
                  }}
                  className="p-4 rounded-xl border border-black/10 bg-stone-50 hover:bg-black hover:text-white transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 group-hover:bg-neutral-800 group-hover:text-rose-300">
                        {pkg.offerBadge}
                      </span>
                      <span className="text-[11px] text-neutral-500 group-hover:text-neutral-300 line-through">
                        ₹{pkg.originalPrice}
                      </span>
                      <span className="text-xs font-black text-emerald-700 group-hover:text-emerald-300">
                        ₹{pkg.price}
                      </span>
                    </div>
                    <div className="text-sm font-bold capitalize mt-0.5">{pkg.name}</div>
                    <div className="text-[11px] text-neutral-600 group-hover:text-neutral-300 mt-1">
                      {pkg.items.join(' • ')}
                    </div>
                  </div>
                  <button className="px-3.5 py-1.5 rounded-full bg-black text-white group-hover:bg-white group-hover:text-black text-xs font-bold shrink-0 self-start sm:self-center transition-colors">
                    Book Package →
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-xs text-neutral-600 mb-4">
                Click any service to select it for your in-home appointment by Chinki Hankare across all over Gwalior.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ALL_SERVICES_DATA.map((s, idx) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      onSelectService(s.name);
                      onClose();
                    }}
                    className="p-3.5 rounded-xl border border-black/10 bg-stone-50 hover:bg-black hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-neutral-500 group-hover:text-neutral-300">
                          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>
                        {s.popular && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 group-hover:bg-neutral-700 group-hover:text-white font-semibold">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-bold capitalize mt-0.5">{s.name}</div>
                      <div className="text-[11px] text-neutral-500 group-hover:text-neutral-300 line-clamp-1">
                        {s.description}
                      </div>
                    </div>
                    <span className="text-xs font-bold underline group-hover:text-white shrink-0 ml-2">
                      Select
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Footer with secondary close button */}
        <div className="px-5 py-3 border-t border-black/10 bg-stone-50 flex items-center justify-between shrink-0">
          <span className="text-xs text-neutral-500">Only for females • Chinki Hankare</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-neutral-200 hover:bg-neutral-300 text-black text-xs font-bold cursor-pointer transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  // Selected latest packages state (empty by default - customer adds by themselves)
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [activePackageFilter, setActivePackageFilter] = useState<'All' | 'Ganesh Chaturthi' | 'Karwa Chauth'>('All');

  // WhatsApp interactive booking state (empty by default - customer adds by themselves)
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientLocation, setClientLocation] = useState('City Centre');
  const [clientAddress, setClientAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Morning (9 AM - 12 PM)');
  const [clientNotes, setClientNotes] = useState('');

  // Category filter state for landing page services section
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const isMobile = useIsMobile();

  // Section 1 Masking & Stagger
  const section1Ref = useRef<HTMLElement | null>(null);
  const s1CardsRef = useRef<(HTMLElement | null)[]>([]);
  const s1Positions = useMaskPositions(section1Ref, s1CardsRef);
  const s1NaturalSize = useImageNaturalSize(HERO_IMAGE, 1280, 853);
  const s1Reveal = useStaggeredReveal(4, 0.15);

  // Section 2 Masking & Stagger
  const section2Ref = useRef<HTMLElement | null>(null);
  const s2CardsRef = useRef<(HTMLElement | null)[]>([]);
  const s2Positions = useMaskPositions(section2Ref, s2CardsRef);
  const s2NaturalSize = useImageNaturalSize(SECTION2_IMAGE, 1280, 853);
  const s2Reveal = useStaggeredReveal(4, 0.15);

  // Section 3 Stagger
  const s3Reveal = useStaggeredReveal(4, 0.15);

  const focal1 = isMobile ? 0.7 : 0.8;
  const focal2 = isMobile ? 0.65 : 0.8;

  // Toggle package
  const togglePackage = (pkgId: string) => {
    setSelectedPackages((prev) =>
      prev.includes(pkgId) ? prev.filter((id) => id !== pkgId) : [...prev, pkgId]
    );
  };

  const handleSelectPackageAndBook = (pkgId: string) => {
    if (!selectedPackages.includes(pkgId)) {
      setSelectedPackages((prev) => [...prev, pkgId]);
    }
    const bookingEl = document.getElementById('whatsapp-booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle service in the booking selector
  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleSelectFromAnywhere = (serviceName: string) => {
    if (!selectedServices.includes(serviceName)) {
      setSelectedServices((prev) => [...prev, serviceName]);
    }
    const bookingEl = document.getElementById('whatsapp-booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate Prewritten WhatsApp Message with Festive Packages & Services
  const generateWhatsAppMessage = () => {
    const chosenPkgs = LATEST_PACKAGES_DATA.filter((p) =>
      selectedPackages.includes(p.id)
    );

    let packagesText = '';
    if (chosenPkgs.length > 0) {
      packagesText = chosenPkgs
        .map(
          (p) =>
            `🎁 *${p.name}* (Just RS -- ${p.price.toLocaleString('en-IN')})\n   Offer: ${p.offerBadge}\n   Included Items:\n${p.items
              .map((it) => `     ✓ ${it}`)
              .join('\n')}`
        )
        .join('\n\n');
    }

    const servicesList =
      selectedServices.length > 0
        ? selectedServices.map((s) => `  • ${s}`).join('\n')
        : '';

    const locationText =
      clientLocation === 'All over Gwalior'
        ? `All over Gwalior${clientAddress ? ` (${clientAddress})` : ''}`
        : `${clientLocation}${clientAddress ? ` (${clientAddress})` : ''}`;

    const totalPackagePrice = chosenPkgs.reduce((sum, p) => sum + p.price, 0);

    return `🌸 *GLOW MITRA - LUXURY HOME SALON APPOINTMENT* 🌸\n(Exclusively for Females • Chinki Hankare)\n\n👤 *Client Name:* ${clientName || 'Not specified'}\n📱 *Contact:* ${clientPhone || 'WhatsApp Client'}\n📍 *Location:* ${locationText}\n\n${
      packagesText
        ? `🎉 *SELECTED FESTIVE PACKAGE(S) (${chosenPkgs.length}):*\n${packagesText}\n\n`
        : ''
    }${
      servicesList
        ? `💅 *SELECTED A-LA-CARTE SERVICES (${selectedServices.length}):*\n${servicesList}\n\n`
        : !packagesText
        ? '💅 *Selected Services:* (None selected yet - select services/packages above to add)\n\n'
        : ''
    }${
      totalPackagePrice > 0
        ? `💰 *Package Subtotal:* Just RS -- ${totalPackagePrice.toLocaleString('en-IN')}\n\n`
        : ''
    }📅 *Preferred Date:* ${preferredDate || 'Earliest available'}\n⏰ *Preferred Time:* ${preferredSlot}\n${
      clientNotes ? `📝 *Notes/Requirements:* ${clientNotes}\n` : ''
    }\nHello Chinki, please confirm my home salon booking appointment with Glow Mitra. Thank you!`;
  };

  const handleSendWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const msg = generateWhatsAppMessage();
    const url = `https://wa.me/91${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(msg)}`;
    try {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      window.location.href = url;
    }
  };

  // Filtered packages
  const filteredPackages =
    activePackageFilter === 'All'
      ? LATEST_PACKAGES_DATA
      : LATEST_PACKAGES_DATA.filter((p) => p.festivalType === activePackageFilter);

  // Filtered services for the landing page grid
  const filteredServices =
    activeCategory === 'All'
      ? ALL_SERVICES_DATA
      : ALL_SERVICES_DATA.filter((s) => s.category === activeCategory);

  return (
    <div className="bg-white text-black min-h-screen">
      {/* 1. Splash Screen */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* 2. Fixed Navbar */}
      <Navbar
        onOpenBooking={() => {
          const el = document.getElementById('whatsapp-booking');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenServices={() => setIsCatalogOpen(true)}
      />

      {/* 3. Section 1 - Hero */}
      <section
        id="hero"
        ref={(el) => {
          section1Ref.current = el;
          s1Reveal.containerRef.current = el;
        }}
        className="min-h-[640px] sm:min-h-[700px] md:h-screen w-full overflow-hidden flex flex-col pt-18 sm:pt-20 md:pt-24 px-2.5 sm:px-4 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
      >
        {/* 3 Feature Bars */}
        {featureBars.map((bar, i) => (
          <MaskedCard
            key={bar}
            cardRef={(el) => {
              s1CardsRef.current[i] = el;
            }}
            bgImage={HERO_IMAGE}
            position={s1Positions[i]}
            imageNaturalWidth={s1NaturalSize.width}
            imageNaturalHeight={s1NaturalSize.height}
            focalX={focal1}
            focalY={0.35}
            className="w-full h-11 sm:h-14 md:h-20 shrink-0 rounded-xl md:rounded-2xl overflow-hidden relative shadow-xs"
            style={s1Reveal.getAnimStyle(i)}
          >
            <span className="flex items-center justify-center h-full text-black text-sm sm:text-base md:text-3xl font-extrabold text-center relative z-10 px-3">
              {bar}
            </span>
          </MaskedCard>
        ))}

        {/* Main Hero Card (Card index 3) */}
        <MaskedCard
          cardRef={(el) => {
            s1CardsRef.current[3] = el;
          }}
          bgImage={HERO_IMAGE}
          position={s1Positions[3]}
          imageNaturalWidth={s1NaturalSize.width}
          imageNaturalHeight={s1NaturalSize.height}
          focalX={focal1}
          focalY={0.35}
          className="w-full flex-1 min-h-[360px] sm:min-h-[400px] md:min-h-0 rounded-xl md:rounded-2xl overflow-hidden relative shadow-sm"
          style={s1Reveal.getAnimStyle(3)}
        >
          {/* Top-left text */}
          <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 md:top-7 md:left-7 text-black text-[11px] sm:text-xs md:text-sm font-bold leading-tight sm:leading-4 md:leading-5 max-w-[220px] sm:max-w-[280px] md:max-w-[340px] z-10 bg-white/80 md:bg-white/70 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-black/5">
            Professional doorstep salon &amp; beauty care
            <br />
            in City Centre, Morar, Lashkar &amp; All Gwalior
          </div>

          {/* Bottom-left block */}
          <div className="absolute bottom-4 left-3.5 sm:bottom-6 sm:left-5 md:bottom-8 md:left-4 z-10">
            <span className="text-black text-[11px] sm:text-xs md:text-sm font-bold mb-1 md:mb-2 bg-white/85 backdrop-blur-xs px-2.5 py-1 rounded-md inline-block shadow-xs border border-black/5">
              Chinki Hankare • Hardaul Garden DB City
            </span>
            <h1 className="text-black text-[clamp(2.5rem,8vw,9.5rem)] font-black leading-[0.84] tracking-tight drop-shadow-xs">
              Glow
              <br />
              Mitra
            </h1>
            <p className="text-black text-[10px] sm:text-[11px] md:text-xs font-extrabold tracking-wider uppercase mt-1 md:mt-2 bg-white/70 backdrop-blur-xs inline-block px-2 py-0.5 rounded">
              Luxury Home Salon &amp; Beauty Services in Gwalior
            </p>
          </div>

          {/* Bottom-right CTA button */}
          <div
            onClick={() => {
              const el = document.getElementById('whatsapp-booking');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="absolute bottom-4 right-3.5 sm:bottom-6 sm:right-5 md:bottom-8 md:right-8 z-10 cursor-pointer"
          >
            <div className="px-4 py-2.5 sm:px-5 sm:py-3 bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg transition-all flex items-center gap-2 border border-white/20 hover:scale-105 active:scale-95">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All Over Gwalior • Book on WhatsApp →</span>
            </div>
          </div>
        </MaskedCard>
      </section>

      {/* 4. Section 2 - Smile / Beauty Gallery */}
      <section
        id="gallery"
        ref={(el) => {
          section2Ref.current = el;
          s2Reveal.containerRef.current = el;
        }}
        className="min-h-screen md:h-screen w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-2.5 sm:px-4 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
      >
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 grid-rows-[auto_auto_auto_auto] md:grid-rows-[1fr_1fr_0.8fr] gap-1.5 md:gap-2">
          {/* Card 0 - Top Left ("Beauty Gallery") */}
          <MaskedCard
            cardRef={(el) => {
              s2CardsRef.current[0] = el;
            }}
            bgImage={SECTION2_IMAGE}
            position={s2Positions[0]}
            imageNaturalWidth={s2NaturalSize.width}
            imageNaturalHeight={s2NaturalSize.height}
            focalX={focal2}
            focalY={0.4}
            className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[140px] sm:min-h-[160px] md:min-h-0"
            style={s2Reveal.getAnimStyle(0)}
          >
            <h2 className="absolute top-4 left-4 sm:left-5 md:top-6 md:left-7 text-black text-xl sm:text-2xl md:text-3xl font-black z-10 drop-shadow-xs">
              Beauty &amp; Bridal Gallery
            </h2>
            <p className="absolute bottom-4 left-4 sm:left-5 md:bottom-6 md:left-7 text-black text-xs md:text-sm font-bold z-10 bg-white/85 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-black/5 shadow-xs">
              Glow Mitra bridal makeover &amp; hairstyles in Gwalior
            </p>
          </MaskedCard>

          {/* Card 1 - Top Right (spans 2 rows on desktop) */}
          <MaskedCard
            cardRef={(el) => {
              s2CardsRef.current[1] = el;
            }}
            bgImage={SECTION2_IMAGE}
            position={s2Positions[1]}
            imageNaturalWidth={s2NaturalSize.width}
            imageNaturalHeight={s2NaturalSize.height}
            focalX={focal2}
            focalY={0.4}
            className="md:row-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[180px] sm:min-h-[200px] md:min-h-0"
            style={s2Reveal.getAnimStyle(1)}
          >
            <div className="absolute bottom-16 left-4 sm:left-5 md:bottom-20 md:left-7 text-white text-xs md:text-sm font-semibold leading-4 md:leading-5 z-10 bg-black/60 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white/10 shadow-sm">
              If you want a gorgeous makeover,
              <br />
              call us to ask about home packages.
            </div>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="absolute bottom-4 right-4 md:bottom-6 md:right-6 px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-5 bg-white rounded-full text-black text-sm sm:text-base md:text-xl font-bold z-10 hover:scale-105 transition-transform inline-block cursor-pointer shadow-lg border border-black/10"
            >
              Call Us
            </a>
          </MaskedCard>

          {/* Card 2 - Bottom Left ("Bridal & Party Makeover") */}
          <MaskedCard
            cardRef={(el) => {
              s2CardsRef.current[2] = el;
            }}
            bgImage={SECTION2_IMAGE}
            position={s2Positions[2]}
            imageNaturalWidth={s2NaturalSize.width}
            imageNaturalHeight={s2NaturalSize.height}
            focalX={focal2}
            focalY={0.4}
            className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[140px] sm:min-h-[160px] md:min-h-0"
            style={s2Reveal.getAnimStyle(2)}
          >
            <h2 className="absolute top-4 left-4 sm:left-5 md:top-6 md:left-7 text-black text-[clamp(2.2rem,6vw,5.5rem)] font-black leading-[0.9] z-10 drop-shadow-xs">
              Bridal &amp;
              <br />
              Party Makeover
            </h2>
            <div className="absolute bottom-4 left-4 sm:left-5 md:bottom-6 md:left-7 z-10">
              <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider bg-white/85 backdrop-blur-xs text-black px-2.5 py-1 rounded-md shadow-xs border border-black/5">
                All Over Gwalior Home Service
              </span>
            </div>
          </MaskedCard>

          {/* Card 3 - Bottom Full Width (Services Highlights - PARTY MAKEUP HIGH CONTRAST FIX) */}
          <MaskedCard
            cardRef={(el) => {
              s2CardsRef.current[3] = el;
            }}
            bgImage={SECTION2_IMAGE}
            position={s2Positions[3]}
            imageNaturalWidth={s2NaturalSize.width}
            imageNaturalHeight={s2NaturalSize.height}
            focalX={focal2}
            focalY={0.4}
            className="col-span-1 md:col-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[260px] md:min-h-0"
            style={s2Reveal.getAnimStyle(3)}
          >
            <div className="absolute inset-0 z-10 grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-2 p-2 md:p-3">
              {servicesHighlight.map((svc) => {
                const cleanName = svc.name.replace('\n', ' ');
                const isSelected = selectedServices.some(
                  (s) => s.toLowerCase() === cleanName.toLowerCase()
                );
                return (
                  <div
                    key={svc.name}
                    onClick={() => handleSelectFromAnywhere(cleanName)}
                    className={`rounded-xl md:rounded-2xl p-2.5 sm:p-3 md:p-4 lg:p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:scale-[1.02] shadow-sm ${
                      isSelected
                        ? 'bg-black text-white hover:bg-neutral-900 border border-black shadow-md ring-2 ring-black'
                        : 'bg-white/95 hover:bg-white text-black border border-black/15 backdrop-blur-md hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] md:text-xs font-extrabold uppercase tracking-wider ${
                          isSelected ? 'text-neutral-400' : 'text-neutral-600'
                        }`}
                      >
                        {svc.tag}
                      </span>
                      {svc.num && (
                        <span
                          className={`text-[10px] md:text-xs font-mono font-bold ${
                            isSelected ? 'text-neutral-400' : 'text-neutral-500'
                          }`}
                        >
                          {svc.num}
                        </span>
                      )}
                    </div>

                    {/* Sharp, high-contrast dark black font for Party Makeup and all service cards */}
                    <h3
                      className={`text-base sm:text-lg md:text-xl lg:text-2xl font-black leading-[1.1] whitespace-pre-line my-1.5 ${
                        isSelected ? 'text-white' : 'text-black'
                      }`}
                    >
                      {svc.name}
                    </h3>

                    <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-black/10">
                      <span
                        className={`text-[10px] sm:text-xs font-bold underline ${
                          isSelected ? 'text-emerald-300' : 'text-neutral-800'
                        }`}
                      >
                        {isSelected ? '✓ Selected in Booking' : 'Book Service →'}
                      </span>
                      <div
                        className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold shadow-xs ${
                          isSelected
                            ? 'bg-white text-black'
                            : 'bg-black text-white'
                        }`}
                      >
                        {isSelected ? '✓' : '+'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </MaskedCard>
        </div>
      </section>

      {/* 5. Section 3 - Home Service & Beauty Care (DENTAL TOOTH IMAGES REMOVED & REPLACED WITH BEAUTY/SALON ASSETS) */}
      <section
        id="home-services"
        ref={s3Reveal.containerRef}
        className="min-h-screen md:h-screen w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-2.5 sm:px-4 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
      >
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2">
          {/* Left Column */}
          <div className="flex flex-col gap-1.5 md:gap-2">
            {/* 1. Heading Card */}
            <div
              style={s3Reveal.getAnimStyle(0)}
              className="rounded-xl md:rounded-2xl bg-stone-50 p-4 sm:p-5 md:p-7 flex flex-col justify-between flex-[1.2] min-h-[160px] sm:min-h-[180px] md:min-h-0 border border-black/5"
            >
              <h2 className="text-[clamp(2.4rem,7vw,6.5rem)] font-bold leading-[0.95] text-black">
                Home
                <br />
                Salon
              </h2>
              <p className="text-xs md:text-sm font-semibold text-black">
                Doorstep Beauty Care in City Centre, Morar, Lashkar &amp; All Gwalior
              </p>
            </div>

            {/* 2. Two Image Cards (Real Salon & Facial Skincare photos) */}
            <div
              style={s3Reveal.getAnimStyle(1)}
              className="flex gap-1.5 md:gap-2 flex-1 min-h-[130px] sm:min-h-[140px] md:min-h-0"
            >
              <div className="flex-1 rounded-xl md:rounded-2xl overflow-hidden relative group">
                <img
                  src={SECTION3_IMG1}
                  alt="Professional hair spa and styling at home"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                  Hair Spa &amp; Styling
                </span>
              </div>
              <div className="flex-1 rounded-xl md:rounded-2xl overflow-hidden relative group">
                <img
                  src={SECTION3_IMG2}
                  alt="Facial skincare and glow therapy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                  Facial &amp; Skincare
                </span>
              </div>
            </div>

            {/* 3. Consultation Card */}
            <div
              style={s3Reveal.getAnimStyle(2)}
              className="rounded-xl md:rounded-2xl bg-zinc-200 p-4 sm:p-5 md:p-7 flex items-end justify-between flex-[0.8] min-h-[140px] sm:min-h-[160px] md:min-h-0"
            >
              <div>
                <p className="text-xs md:text-sm font-semibold text-black mb-1 sm:mb-2 md:mb-3">
                  Glow Mitra Consultation
                </p>
                <h3 className="text-lg sm:text-xl md:text-3xl font-bold text-black leading-tight sm:leading-6 md:leading-8">
                  Home Salon
                  <br />
                  &amp; Makeover
                  <br />
                  in Gwalior
                </h3>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('whatsapp-booking');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-5 bg-white rounded-full text-black text-sm sm:text-base md:text-xl font-bold hover:scale-105 transition-transform cursor-pointer shadow-md"
              >
                Book Online
              </button>
            </div>
          </div>

          {/* Right Column: Single tall image card with luxury glowing model */}
          <div
            style={s3Reveal.getAnimStyle(3)}
            className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[320px] sm:min-h-[350px] md:min-h-0"
          >
            <img
              src={SECTION3_BG}
              alt="Radiant female beauty client"
              className="w-full h-full object-cover"
            />

            {/* Overlay container */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-5 md:left-5 md:right-5 flex gap-1.5 md:gap-2">
              {/* Overlay Card 1 (white, left) */}
              <div
                onClick={() => {
                  const el = document.getElementById('all-services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 bg-white rounded-xl md:rounded-2xl p-2.5 sm:p-4 md:p-5 flex flex-col justify-between min-h-[130px] sm:min-h-[140px] md:h-52 cursor-pointer hover:bg-neutral-50 transition-colors shadow-lg"
              >
                <h4 className="text-sm sm:text-base md:text-2xl font-bold text-black leading-tight sm:leading-5 md:leading-7">
                  The Process
                  <br />
                  of In-Home
                  <br />
                  Care
                </h4>
                <div className="self-end w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 rounded-full border border-black flex items-center justify-center mt-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="rotate-[-45deg] sm:w-[14px] sm:h-[14px]"
                  >
                    <path
                      d="M1 7h12m0 0L8 2m5 5L8 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Overlay Card 2 (glass, right) */}
              <div
                onClick={() => {
                  const el = document.getElementById('whatsapp-booking');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 bg-white/20 backdrop-blur-xl rounded-xl md:rounded-2xl p-2.5 sm:p-4 md:p-5 flex flex-col justify-between min-h-[130px] sm:min-h-[140px] md:h-52 cursor-pointer hover:bg-white/30 transition-colors shadow-lg"
              >
                <h4 className="text-sm sm:text-base md:text-2xl font-bold text-white leading-tight sm:leading-5 md:leading-7">
                  Caring
                  <br />
                  for Skin &amp;
                  <br />
                  Hair Health
                </h4>
                <div className="self-end w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 rounded-full border border-white flex items-center justify-center text-white mt-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="rotate-[-45deg] sm:w-[14px] sm:h-[14px]"
                  >
                    <path
                      d="M1 7h12m0 0L8 2m5 5L8 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          NEW SECTION: LATEST PACKAGES & FESTIVE OFFERS
          Ganesh Chaturthi (10% Off) & Karwa Chauth (₹999 Deals)
          ======================================================== */}
      <section id="latest-packages" className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-stone-100/90 via-amber-50/25 to-stone-50 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 text-white text-xs font-bold uppercase tracking-wider mb-3.5 shadow-sm">
                <span>🎉 Special Festive Doorstep Offers</span>
                <span>•</span>
                <span>Exclusively for Females</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-black tracking-tight leading-tight">
                Latest Packages &amp;
                <br />
                Festive Home Combos
              </h2>
              <p className="text-neutral-700 text-sm md:text-base mt-2 font-medium">
                Ganesh Chaturthi 10% Off Specials &amp; Karwa Chauth ₹999 Home Service Packages in Gwalior
              </p>
            </div>
            <div className="max-w-md bg-white/90 backdrop-blur-sm p-4 md:p-5 rounded-2xl border border-black/10 shadow-xs">
              <p className="text-xs md:text-sm text-neutral-700 leading-relaxed">
                ✨ <strong>Doorstep salon luxury by Chinki Hankare:</strong> Select any package below to instantly populate your customized WhatsApp booking message with all included services.
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {(['All', 'Ganesh Chaturthi', 'Karwa Chauth'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActivePackageFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activePackageFilter === cat
                    ? 'bg-black text-white shadow-md'
                    : 'bg-white border border-black/15 text-black hover:bg-neutral-100'
                }`}
              >
                <span>{cat === 'All' ? 'All Packages (5)' : `${cat} Offers`}</span>
                {cat === 'Ganesh Chaturthi' && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-200 text-amber-900 font-extrabold">
                    10% Off
                  </span>
                )}
                {cat === 'Karwa Chauth' && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-200 text-rose-900 font-extrabold">
                    Just ₹999
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Grid of Packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filteredPackages.map((pkg) => {
              const isSelected = selectedPackages.includes(pkg.id);
              const isGanesh = pkg.festivalType === 'Ganesh Chaturthi';

              return (
                <div
                  key={pkg.id}
                  className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
                    isSelected
                      ? 'bg-white border-black ring-2 ring-black shadow-xl scale-[1.01]'
                      : 'bg-white/95 border-black/15 hover:border-black/35 hover:shadow-lg'
                  }`}
                >
                  {/* Top Badge Strip */}
                  <div
                    className={`px-5 py-2.5 flex items-center justify-between text-xs font-bold ${
                      isGanesh
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
                        : 'bg-gradient-to-r from-rose-600 to-pink-600 text-white'
                    }`}
                  >
                    <span>{pkg.offerBadge}</span>
                    <span className="text-[10px] uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-full backdrop-blur-xs">
                      {pkg.savingsText}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Price row */}
                      <div className="flex items-baseline justify-between mb-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl md:text-4xl font-black text-black">
                            ₹{pkg.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-sm font-semibold text-neutral-400 line-through">
                            ₹{pkg.originalPrice}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-stone-100 text-neutral-800 border border-black/5">
                          Doorstep Salon
                        </span>
                      </div>

                      {/* Package Name */}
                      <h3 className="text-lg md:text-xl font-extrabold text-black leading-snug mb-2">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                        {pkg.description}
                      </p>

                      {/* Included Items List */}
                      <div className="space-y-2 py-3 border-t border-b border-black/10 bg-stone-50/70 -mx-5 px-5 md:-mx-6 md:px-6 mb-4">
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-neutral-500 block">
                          Included in this package:
                        </span>
                        <ul className="space-y-1.5">
                          {pkg.items.map((item, idx) => (
                            <li key={idx} className="text-xs font-semibold text-neutral-800 flex items-start gap-2">
                              <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                                ✓
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <button
                        onClick={() => togglePackage(pkg.id)}
                        className={`flex-1 py-3 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-black text-white hover:bg-neutral-800 shadow-md'
                            : 'bg-stone-100 hover:bg-stone-200 text-black border border-black/10'
                        }`}
                      >
                        <span>{isSelected ? '✓ Selected in Booking' : '+ Select Package'}</span>
                      </button>

                      <button
                        onClick={() => handleSelectPackageAndBook(pkg.id)}
                        className="py-3 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all cursor-pointer shrink-0 shadow-sm flex items-center justify-center gap-1"
                        title="Book via WhatsApp now"
                      >
                        <span>Book on WhatsApp →</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Notice Banner below packages */}
          <div className="mt-8 p-4 md:p-6 bg-white rounded-2xl border border-black/15 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
                {selectedPackages.length}
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold text-black">
                  {selectedPackages.length > 0
                    ? `${selectedPackages.length} Special Package(s) Selected for Home Visit`
                    : 'No package selected yet'}
                </h4>
                <p className="text-xs text-neutral-600">
                  {selectedPackages.length > 0
                    ? LATEST_PACKAGES_DATA.filter((p) => selectedPackages.includes(p.id))
                        .map((p) => `${p.name} (₹${p.price})`)
                        .join(' • ')
                    : 'Click "+ Select Package" on any card above to auto-populate your booking details.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('whatsapp-booking');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-black text-white text-xs md:text-sm font-bold rounded-full hover:bg-neutral-800 transition-colors shadow-md shrink-0 cursor-pointer"
            >
              Continue to WhatsApp Booking ↓
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. SECTION 4 - ALL 19 SERVICES SHOWCASED ON LANDING PAGE
          ======================================================== */}
      <section id="all-services" className="py-16 md:py-24 px-4 md:px-8 bg-stone-50 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-wider mb-3">
                <span>Exclusively for Women</span>
                <span>•</span>
                <span>City Centre, Morar, Lashkar & DB City</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-tight">
                All Salon & Makeover
                <br />
                Services in Gwalior
              </h2>
            </div>
            <p className="text-sm md:text-base text-neutral-600 max-w-md font-normal leading-relaxed">
              Every service is delivered safely with sanitized tools, disposable kits, and premium cosmetic brands right at your residence. Tap any service to select it for your WhatsApp booking.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {['All', 'Makeup & Hair', 'Skin & Facial', 'Spa & Massage', 'Waxing & Grooming'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-black text-white shadow-md'
                    : 'bg-white border border-black/15 text-black hover:bg-neutral-100'
                }`}
              >
                {cat} {cat === 'All' ? `(${ALL_SERVICES_DATA.length})` : ''}
              </button>
            ))}
          </div>

          {/* All 19 Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {filteredServices.map((svc, idx) => {
              const isSelected = selectedServices.includes(svc.name);
              return (
                <div
                  key={svc.id}
                  onClick={() => toggleService(svc.name)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[170px] relative group ${
                    isSelected
                      ? 'bg-black text-white border-black shadow-xl ring-2 ring-black scale-[1.01]'
                      : 'bg-white text-black border-black/10 hover:border-black/30 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-xs font-bold ${
                          isSelected ? 'text-neutral-400' : 'text-neutral-400'
                        }`}
                      >
                        #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-stone-100 text-neutral-700'
                        }`}
                      >
                        {svc.category}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold leading-snug capitalize mb-1.5">
                      {svc.name}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed line-clamp-2 ${
                        isSelected ? 'text-neutral-300' : 'text-neutral-600'
                      }`}
                    >
                      {svc.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold flex items-center gap-1.5 ${
                        isSelected ? 'text-emerald-400' : 'text-neutral-500'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          Selected in Booking
                        </>
                      ) : (
                        <span>+ Tap to Select</span>
                      )}
                    </span>
                    <span
                      className={`text-xs font-bold underline ${
                        isSelected ? 'text-white' : 'text-black group-hover:translate-x-0.5 transition-transform'
                      }`}
                    >
                      {isSelected ? 'Remove' : 'Select'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Notice Banner below all services */}
          <div className="mt-8 p-4 md:p-6 bg-white rounded-2xl border border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center font-bold text-sm text-black">
                {selectedServices.length}
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold text-black">
                  {selectedServices.length} Services Selected for Home Appointment
                </h4>
                <p className="text-xs text-neutral-600">
                  {selectedServices.length > 0
                    ? selectedServices.slice(0, 3).join(', ') + (selectedServices.length > 3 ? ` + ${selectedServices.length - 3} more` : '')
                    : 'Click any service card above to add it to your appointment.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('whatsapp-booking');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-black text-white text-xs md:text-sm font-bold rounded-full hover:bg-neutral-800 transition-colors shadow-md shrink-0 cursor-pointer"
            >
              Continue to WhatsApp Booking ↓
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. SECTION 5 - DEDICATED WHATSAPP APPOINTMENT BOOKING
          ======================================================== */}
      <section id="whatsapp-booking" className="py-16 md:py-24 px-4 md:px-8 bg-white border-t border-black/10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              Fast WhatsApp Booking (9617162619)
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight mb-3">
              Book Home Appointment with Glow Mitra
            </h2>
            <p className="text-sm md:text-base text-neutral-600">
              Customize your booking details below. A pre-written formatted message will be created automatically and opened directly in your WhatsApp to send to <strong>Chinki Hankare (Glow Mitra)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
            {/* Left Form (7 Cols) */}
            <form onSubmit={handleSendWhatsApp} className="lg:col-span-7 space-y-5 md:space-y-6 bg-stone-50 p-4 sm:p-6 md:p-8 rounded-2xl border border-black/10 shadow-sm">
              {/* 1. Client Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anjali Sharma"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 sm:px-4 py-3 bg-white border border-black/15 rounded-xl text-base md:text-sm font-medium focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                    Your Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 98260XXXXX"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3.5 sm:px-4 py-3 bg-white border border-black/15 rounded-xl text-base md:text-sm font-medium focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              {/* 2. Location in Gwalior */}
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                  Select Booking Location in Gwalior *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
                  {LOCATIONS.map((loc, idx) => (
                    <button
                      type="button"
                      key={loc}
                      onClick={() => setClientLocation(loc)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                        idx === LOCATIONS.length - 1 ? 'col-span-2 sm:col-span-1' : ''
                      } ${
                        clientLocation === loc
                          ? 'bg-black text-white border-black shadow'
                          : 'bg-white text-black border-black/15 hover:bg-neutral-100'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Detailed Address / Landmark */}
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                  House / Flat No., Landmark & Area
                </label>
                <input
                  type="text"
                  placeholder="e.g. Flat 302, Royal Residency, Morar / DB City"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-3 bg-white border border-black/15 rounded-xl text-base md:text-sm font-medium focus:outline-none focus:border-black transition-colors"
                />
              </div>

              {/* 4. Special Festive Packages Selection */}
              <div className="p-3.5 sm:p-4 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent rounded-2xl border border-amber-600/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2.5 gap-1">
                  <label className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                    <span>🎁 Special Festive Packages ({selectedPackages.length} selected)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-rose-700">
                      Ganesh (10% Off) • Karwa Chauth (₹999)
                    </span>
                    {selectedPackages.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setSelectedPackages([])}
                        className="text-[11px] font-bold text-neutral-600 hover:text-red-600 underline cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  {LATEST_PACKAGES_DATA.map((pkg) => {
                    const active = selectedPackages.includes(pkg.id);
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => togglePackage(pkg.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                          active
                            ? 'bg-black text-white border-black shadow-md'
                            : 'bg-white text-black border-black/15 hover:bg-stone-100'
                        }`}
                      >
                        <div className="flex items-start sm:items-center gap-2.5 flex-1 min-w-0">
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 sm:mt-0 ${
                              active ? 'bg-emerald-400 text-black' : 'border border-black/30'
                            }`}
                          >
                            {active ? '✓' : ''}
                          </span>
                          <div className="min-w-0">
                            <div className="font-bold flex flex-wrap items-center gap-1.5">
                              <span>{pkg.name}</span>
                              <span
                                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                                  active
                                    ? 'bg-white/20 text-white'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {pkg.offerBadge}
                              </span>
                            </div>
                            <div
                              className={`text-[11px] mt-0.5 truncate ${
                                active ? 'text-neutral-300' : 'text-neutral-600'
                              }`}
                            >
                              {pkg.items.join(' • ')}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <span className="text-[11px] line-through text-neutral-400">
                            ₹{pkg.originalPrice}
                          </span>
                          <span
                            className={`font-black text-sm ${
                              active ? 'text-emerald-300' : 'text-emerald-700'
                            }`}
                          >
                            ₹{pkg.price}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 5. Multi-Select A-la-carte Services chips */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-black uppercase tracking-wider">
                    Add A-la-carte Services ({selectedServices.length} selected)
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-neutral-500">Tap to toggle</span>
                    {selectedServices.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setSelectedServices([])}
                        className="text-[11px] font-bold text-neutral-600 hover:text-red-600 underline cursor-pointer"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto p-2.5 bg-white rounded-xl border border-black/15">
                  {ALL_SERVICES_NAMES.map((sName) => {
                    const active = selectedServices.includes(sName);
                    return (
                      <button
                        type="button"
                        key={sName}
                        onClick={() => toggleService(sName)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          active
                            ? 'bg-black text-white shadow-xs'
                            : 'bg-stone-100 text-neutral-700 hover:bg-stone-200'
                        }`}
                      >
                        {active ? '✓ ' : '+ '}
                        {sName}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 6. Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 sm:px-4 py-3 bg-white border border-black/15 rounded-xl text-base md:text-sm font-medium focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full px-3.5 sm:px-4 py-3 bg-white border border-black/15 rounded-xl text-base md:text-sm font-medium focus:outline-none focus:border-black transition-colors"
                  >
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                    <option value="Anytime / Urgent">Anytime / Urgent slot</option>
                  </select>
                </div>
              </div>

              {/* 7. Notes */}
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                  Special Instructions or Event Timing (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wedding function at 6 PM, sensitive skin, etc."
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-3 bg-white border border-black/15 rounded-xl text-base md:text-sm font-medium focus:outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                {/* Inline WhatsApp SVG */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.395A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.063c-1.637 0-3.155-.472-4.437-1.286l-.318-.202-2.973.832.842-2.898-.22-.338A8.026 8.026 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8.063-8 8.063z" />
                </svg>
                <span>Send Booking on WhatsApp (9617162619)</span>
              </button>
            </form>

            {/* Right Live WhatsApp Preview (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                    Live WhatsApp Message Preview
                  </span>
                </div>
                <p className="text-xs text-emerald-800">
                  This exact pre-written text will open in WhatsApp on your phone or web browser:
                </p>
              </div>

              {/* WhatsApp Chat Card */}
              <div className="bg-[#EFEAE2] p-3 sm:p-4 rounded-2xl border border-black/10 shadow-inner flex flex-col gap-2">
                <div className="flex items-center gap-3 p-2 bg-[#075E54] text-white rounded-xl shadow-xs">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                    CH
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">Chinki Hankare (Glow Mitra)</div>
                    <div className="text-[10px] text-emerald-100 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
                      Online • Morar, Lashkar, City Centre, Gwalior
                    </div>
                  </div>
                </div>

                {/* Speech Bubble with word break and overflow protection */}
                <div className="bg-white p-3.5 sm:p-4 rounded-2xl rounded-tr-none shadow-sm text-xs font-mono whitespace-pre-wrap break-words overflow-x-auto text-neutral-800 leading-relaxed border border-black/5 max-h-[460px] overflow-y-auto">
                  {generateWhatsAppMessage()}
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-neutral-500">Auto-formatted with your selected packages &amp; services</span>
                </div>
              </div>

              {/* Direct Call / Inquiry Box */}
              <div className="p-4 sm:p-5 bg-stone-100 rounded-2xl border border-black/10 flex flex-col gap-2">
                <h4 className="text-sm font-bold text-black">Prefer to call directly?</h4>
                <p className="text-xs text-neutral-600">
                  Speak directly with beautician Chinki Hankare for immediate consultation or customized packages:
                </p>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="mt-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-black/20 text-black font-bold text-sm hover:bg-black hover:text-white transition-all shadow-xs"
                >
                  <span>📞 Call Now: +91 {CONTACT_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. SECTION 6 - COMPREHENSIVE LUXURY FOOTER
          ======================================================== */}
      <footer className="bg-black text-white pt-16 pb-12 px-4 md:px-8 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 pb-12 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-2xl font-black uppercase tracking-tight leading-none text-white">
                Glow Mitra
              </span>
              <span className="text-xs font-semibold text-neutral-400 mt-1 uppercase tracking-widest">
                By Chinki Hankare • Home Salon
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Exclusive female in-home salon, bridal makeup, hairstyles, facials, and beauty care service in Gwalior. Exceptional hygienic care brought safely to your doorstep.
            </p>
            <div className="inline-block px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-[11px] text-neutral-300 font-medium">
              Only for Female Clients
            </div>
          </div>

          {/* Service Locations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Booking Locations
            </h4>
            <ul className="text-xs text-neutral-400 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>City Centre, Gwalior</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Morar, Gwalior</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Lashkar, Gwalior</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Hardaul Garden DB City</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>All Over Gwalior (Home Visits)</span>
              </li>
            </ul>
          </div>

          {/* Quick Services Menu */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Popular Services &amp; Packages
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-neutral-400">
              <span className="text-amber-300 font-semibold hover:text-white cursor-pointer" onClick={() => {
                const el = document.getElementById('latest-packages');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>🎁 Festive Packages</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleSelectFromAnywhere('Bridal makeup')}>Bridal Makeup</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleSelectFromAnywhere('Party makeup')}>Party Makeup</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleSelectFromAnywhere('Hairstyles')}>Hairstyles</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleSelectFromAnywhere('Hair spa')}>Hair Spa</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleSelectFromAnywhere('Facial')}>Facial</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleSelectFromAnywhere('Clean up')}>Clean Up</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleSelectFromAnywhere('Waxing')}>Waxing</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleSelectFromAnywhere('Manicure pedicure')}>Mani-Pedi</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleSelectFromAnywhere('Highlights')}>Highlights</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleSelectFromAnywhere('Body polishing')}>Body Polishing</span>
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Contact & Bookings
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              <strong>Beautician:</strong> Chinki Hankare
              <br />
              <strong>Address:</strong> Hardaul garden DB City, Gwalior
              <br />
              <strong>Mobile:</strong> +91 {CONTACT_INFO.phone}
              <br />
              <strong>WhatsApp:</strong> +91 {CONTACT_INFO.whatsapp}
              <br />
              <strong>Hours:</strong> Mon - Sun, 8:00 AM - 8:00 PM
            </p>

            <a
              href={`https://wa.me/91${CONTACT_INFO.whatsapp}?text=${encodeURIComponent('Hi Chinki, I want to book an appointment for beauty home service in Gwalior.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-neutral-500 text-xs gap-4">
          <p>© {new Date().getFullYear()} Glow Mitra • Beauty Home Service by Chinki Hankare. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <span>Only for female clients</span>
            <span>•</span>
            <span>Serving all over Gwalior</span>
          </p>
        </div>
      </footer>

      {/* 9. Floating Quick WhatsApp & Call Bar (Instant Booking Access on all devices) */}
      <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2">
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-black border border-black/20 shadow-xl flex items-center justify-center text-sm sm:text-base hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title={`Call Beautician Chinki Hankare: +91 ${CONTACT_INFO.phone}`}
          aria-label="Direct Phone Call"
        >
          📞
        </a>
        <button
          onClick={() => {
            const el = document.getElementById('whatsapp-booking');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-200 animate-pulse"></span>
          <span>Book on WhatsApp</span>
        </button>
      </div>

      {/* 10. All Services & Packages Catalog Modal (with explicit close) */}
      <ServicesCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onSelectService={(svcName) => {
          handleSelectFromAnywhere(svcName);
        }}
        onSelectPackage={(pkgId) => {
          handleSelectPackageAndBook(pkgId);
        }}
      />
    </div>
  );
}
