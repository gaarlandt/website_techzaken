import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Cpu, Layers, Activity, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Noise Overlay Component ---
const NoiseOverlay = () => (
  <svg className="noise-overlay" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

// --- Navbar Component ---
const Navbar = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl rounded-full z-50 transition-all duration-500 flex items-center justify-between px-6 py-4 
        ${isScrolled ? 'glass-nav text-foreground' : 'bg-transparent text-foreground'}`}
      >
        <div className="font-outfit font-bold text-xl tracking-tight z-50 text-primary">TechZaken</div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
          <a href="#features" className="hover:-translate-y-[1px] transition-transform">Diensten</a>
        </div>

        {/* Deskstop CTA */}
        <a href="mailto:info@techzaken.nl" className={`hidden md:inline-flex btn-magnetic px-6 py-2.5 text-sm font-medium
          ${isScrolled ? 'bg-primary text-background hover:bg-primary/90' : 'bg-primary text-background hover:bg-primary/90'}`}>
          Contact
        </a>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center transition-opacity duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center space-y-8 text-foreground text-2xl font-plus">
          <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Diensten</a>
          <a href="mailto:info@techzaken.nl" className="mt-8 px-8 py-4 bg-primary text-background rounded-full text-lg">Contact</a>
        </div>
      </div>
    </>
  );
};

// --- Hero Component ---
const Hero = () => {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.hero-text-1',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    )
      .fromTo('.hero-btn-group',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      );
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full min-h-[90dvh] flex items-center justify-center overflow-hidden pt-32 pb-24 px-6 md:px-16 lg:px-24 bg-background">
      {/* Organic Forestry Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2600&auto=format&fit=crop"
          alt="Mist in a forest"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl text-center w-full">
        <h1 className="hero-text-1 font-plus font-bold text-6xl md:text-8xl lg:text-9xl text-foreground tracking-tight mb-12">
          Tech<span className="text-primary">Zaken</span>
        </h1>

        <div className="hero-btn-group flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
          <a href="#features" className="btn-magnetic w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary text-foreground px-8 py-4 text-lg font-medium shadow-sm border border-primary/10">
            Diensten
          </a>
          <a href="mailto:info@techzaken.nl" className="btn-magnetic w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-background px-8 py-4 text-lg font-medium shadow-lg shadow-primary/20">
            Contact
          </a>
        </div>
      </div>
    </section>
  );
};

// --- Features Component ---
const Features = () => {
  // Card 1 Shuffler
  const [shufflerCards, setShufflerCards] = useState([
    { id: 1, title: 'Automatisering', color: 'bg-primary' },
    { id: 2, title: 'Slimme Assistentie', color: 'bg-foreground' },
    { id: 3, title: 'Data Inzichten', color: 'bg-accent text-foreground' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShufflerCards(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Card 2 Typewriter
  const [typedText, setTypedText] = useState("");
  const fullText = "Initialiseer proces... Analyseer vereisten... Tech stack geselecteerd. Klaar voor ontwikkeling.";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        setTimeout(() => { i = 0; setTypedText(""); }, 2000);
      }
    }, 50);
    return () => clearInterval(typing);
  }, []);

  // Card 3 Scheduler
  const cursorRef = useRef(null);
  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, defaults: { ease: 'power2.inOut' } });
    tl.set(cursorRef.current, { x: 0, y: 0, opacity: 0 })
      .to(cursorRef.current, { opacity: 1, duration: 0.3 })
      .to(cursorRef.current, { x: 80, y: 40, duration: 1 })
      .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
      .to('.day-target', { backgroundColor: '#d4a373', color: '#ffffff', duration: 0.2 }, "-=0.1")
      .to(cursorRef.current, { x: 180, y: 120, duration: 1 })
      .to(cursorRef.current, { opacity: 0, duration: 0.3 })
      .to('.day-target', { backgroundColor: 'transparent', color: 'inherit', duration: 0.2, delay: 0.5 });
  }, []);

  return (
    <section id="features" className="py-24 px-6 md:px-16 lg:px-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-data text-primary uppercase tracking-widest mb-4">Value Proposition</h2>
        <h3 className="text-4xl md:text-5xl font-plus font-bold text-foreground mb-16 max-w-2xl">
          Technologie moet voor u werken, niet andersom.
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Diagnostic Shuffler */}
          <div className="bg-white border border-primary/10 rounded-4xl p-8 shadow-sm h-[400px] flex flex-col hover:-translate-y-2 transition-transform duration-500">
            <div className="mb-auto">
              <Activity className="text-primary mb-4" size={32} />
              <h4 className="text-2xl font-plus font-bold text-foreground">AI & Automatisering</h4>
              <p className="text-foreground/70 mt-2">Hoe kan AI u helpen in het dagelijks leven of zakelijk? Ontdek efficiëntie.</p>
            </div>
            <div className="relative h-40 w-full flex justify-center mt-6 perspective-[1000px]">
              {shufflerCards.map((card, i) => (
                <div
                  key={card.id}
                  className={`absolute w-full max-w-[200px] h-24 ${card.color} rounded-2xl flex items-center justify-center text-background font-plus font-medium text-sm transition-all duration-700`}
                  style={{
                    transform: `translateY(${i * 15}px) scale(${1 - i * 0.05})`,
                    zIndex: 10 - i,
                    opacity: 1 - i * 0.2,
                    transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)'
                  }}
                >
                  <span className={card.color.includes('text-foreground') ? 'text-foreground' : ''}>{card.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Telemetry Typewriter */}
          <div className="bg-foreground border border-foreground rounded-4xl p-8 shadow-sm h-[400px] flex flex-col hover:-translate-y-2 transition-transform duration-500 text-background">
            <div className="mb-auto">
              <Cpu className="text-accent mb-4" size={32} />
              <h4 className="text-2xl font-plus font-bold">Concept Realisatie</h4>
              <p className="text-background/70 mt-2">Wilt u een tool of proces bouwen maar weet u niet waar te beginnen? Wij wel.</p>
            </div>
            <div className="bg-foreground border border-primary/30 rounded-2xl p-4 mt-6 h-32 relative overflow-hidden font-data text-xs leading-relaxed">
              <div className="flex items-center gap-2 mb-2 text-accent">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                Live Terminal Feed
              </div>
              <p className="text-background/90">{typedText}<span className="inline-block w-2.5 h-3 bg-accent ml-1 animate-pulse"></span></p>
            </div>
          </div>

          {/* Cursor Protocol Scheduler */}
          <div className="bg-white border border-primary/10 rounded-4xl p-8 shadow-sm h-[400px] flex flex-col hover:-translate-y-2 transition-transform duration-500 overflow-hidden relative">
            <div className="mb-auto z-10 relative">
              <Layers className="text-primary mb-4" size={32} />
              <h4 className="text-2xl font-plus font-bold text-foreground">Tech Stack Selectie</h4>
              <p className="text-foreground/70 mt-2">Bouwt u een startup? Wij kiezen de juiste fundering. Ideation tot Launch.</p>
            </div>

            <div className="mt-8 relative z-0">
              <div className="grid grid-cols-4 gap-2 mb-4 font-data text-xs text-foreground/40 text-center">
                <div>Ideation</div><div className="day-target rounded-lg py-1 transition-colors">Stack</div><div>MVP</div><div>Launch</div>
              </div>
              <div className="w-full h-[1px] bg-foreground/10 mb-2"></div>
              <div className="w-3/4 h-[1px] bg-foreground/10 mb-2"></div>
              <div className="w-1/2 h-[1px] bg-foreground/10"></div>

              <div ref={cursorRef} className="absolute top-0 left-0 w-6 h-6 z-20 pointer-events-none drop-shadow-md">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.5 3.25L10.5 20.75L13.5 13.5L20.75 10.5L5.5 3.25Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="absolute right-0 bottom-[-20px] bg-primary text-background text-xs font-data px-4 py-2 rounded-full shadow-lg">
                Implementatie
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Main App ---
function App() {
  return (
    <div className="bg-background selection:bg-primary selection:text-background min-h-screen">
      <NoiseOverlay />
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
    </div>
  );
}

export default App;
