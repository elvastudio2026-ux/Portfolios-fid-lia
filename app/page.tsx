'use client';

import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { MapPin, Phone, Star, Instagram, Facebook, Clock, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import CustomerReviews from './components/CustomerReviews';
import FAQ from './components/FAQ';

const HERO_IMAGE = "https://lh3.googleusercontent.com/gps-cs-s/APNQkAE1h3xLomC4qPhZ7WWZVEXOaC85cFpgFIWiZZ2x6aZ2gNFqT7RIyhvJzqqVf-2fR_ayGfk99dRYPB4jK8DxOl_mmy8v9tEh5krUoHS22f7ZpGwODNjpmaRyVkrbP94-ju-AWZSbPdUBlaY=w408-h306-k-no";

const GALLERY_IMAGES = [
  HERO_IMAGE,
  HERO_IMAGE,
  HERO_IMAGE,
  HERO_IMAGE,
];

const MENU_ITEMS = [
  {
    category: "Entrées Signatures",
    items: [
      { name: "Bourek Annabi Premium", description: "Feuille de brick croustillante, viande de bœuf finement hachée, œuf coulant et persil frais", price: "900 DZD" },
      { name: "Hmiss Authentique", description: "Poivrons et tomates délicatement grillés au feu de bois, huile d'olive extra vierge de Kabylie", price: "700 DZD" }
    ]
  },
  {
    category: "Plats Traditionnels",
    items: [
      { name: "Couscous Royal Algérois", description: "Semoule fine travaillée à la main, légumes de saison, viande d'agneau fondante et poulet rôti", price: "2400 DZD" },
      { name: "Rechta Fait-Maison", description: "Nouilles artisanales exquises, poulet fermier, navets tendres, sauce blanche onctueuse à la cannelle", price: "1800 DZD" }
    ]
  },
  {
    category: "Spécialités Braisées",
    items: [
      { name: "Brochettes d'Agneau", description: "Marinade secrète aux épices douces, cuisson parfaite sur braise incandescente", price: "1500 DZD" },
      { name: "Daurade Royale Grillée", description: "Poisson frais du jour, farce d'herbes aromatiques, citron confit et huile d'olive", price: "2200 DZD" }
    ]
  },
  {
    category: "Douceurs & Infusions",
    items: [
      { name: "Makroud El Louz", description: "Amandes ultra-fondantes, subtil parfum d'eau de fleur d'oranger, enrobage sucre glace", price: "400 DZD" },
      { name: "Thé à la Menthe Fraîche", description: "Préparation traditionnelle, servi très chaud avec ses pignons de pin torréfiés", price: "350 DZD" }
    ]
  }
];

// GSAP-like custom ease
const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Elegant loading screen duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const aboutImageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % GALLERY_IMAGES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className={`min-h-screen bg-brand-white text-brand-text font-sans selection:bg-brand-green/20 ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
      
      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            className="fixed inset-0 z-[1000] bg-brand-light flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: customEase }}
              className="flex flex-col items-center"
            >
              <div className="font-serif text-5xl md:text-6xl text-brand-green font-semibold tracking-wide mb-8">
                Le Fidélia
              </div>
              <div className="w-32 h-[2px] bg-brand-green/20 relative overflow-hidden rounded-full">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.2, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 bg-brand-green w-1/2 rounded-full"
                />
              </div>
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-6 text-brand-green tracking-[0.3em] text-xs uppercase"
              >
                L&apos;art de la table
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-black/5 py-4' : 'bg-white/50 backdrop-blur-sm py-6 border-b-transparent'}`}>
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
              <div className="font-serif text-3xl text-brand-green font-semibold tracking-wide cursor-pointer hover:opacity-80 transition-opacity">
                  Le Fidélia
              </div>
              <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide text-brand-text/70 uppercase">
                  <a href="#about" className="hover:text-brand-green transition-colors relative group">
                    À Propos
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-green transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  <a href="#menu" className="hover:text-brand-green transition-colors relative group">
                    La Carte
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-green transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  <a href="#gallery" className="hover:text-brand-green transition-colors relative group">
                    Galerie
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-green transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  <a href="#contact" className="hover:text-brand-green transition-colors relative group">
                    Accès
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-green transition-all duration-300 group-hover:w-full"></span>
                  </a>
              </div>
              <a href="/reservation" className="bg-brand-green text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-brand-green/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 duration-200 transform-gpu">
                  Réserver
              </a>
          </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-brand-light transform-gpu">
          <motion.div style={{ y: heroY }} className="absolute inset-0 z-0 origin-top transform-gpu">
              <Image src={HERO_IMAGE} alt="Le Fidélia" fill className="object-cover object-center opacity-80" priority referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-white/80" />
          </motion.div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-16">
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: customEase }}
                  className="transform-gpu"
              >
                  <span className="text-brand-green font-medium tracking-[0.2em] uppercase text-sm mb-6 block overflow-hidden">
                      <motion.span 
                        initial={{ y: "100%" }} 
                        animate={{ y: 0 }} 
                        transition={{ duration: 0.6, delay: 0.1, ease: customEase }}
                        className="block transform-gpu"
                      >
                        Excellence &amp; Tradition
                      </motion.span>
                  </span>
                  <h1 className="font-serif text-6xl md:text-8xl text-brand-text mb-6 font-semibold tracking-tight leading-tight">
                      L&apos;art de la table <br />
                      <span className="text-brand-green italic font-light">algérienne.</span>
                  </h1>
              </motion.div>
              
              <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
                  className="text-xl md:text-2xl text-brand-text/70 font-light mb-12 max-w-2xl mx-auto leading-relaxed transform-gpu">
                  Une expérience gastronomique authentique au cœur d&apos;Alger Centre.
              </motion.p>
              
              <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: customEase }}
                  className="flex flex-col sm:flex-row gap-5 justify-center transform-gpu">
                  <a href="/reservation" className="inline-flex items-center justify-center px-10 py-4 bg-brand-green text-white font-medium tracking-wide hover:bg-brand-green/90 transition-all duration-200 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transform-gpu">
                      Réserver une Table
                  </a>
                  <a href="#menu" className="inline-flex items-center justify-center px-10 py-4 bg-white text-brand-green border border-brand-green/20 font-medium tracking-wide hover:bg-brand-light transition-all duration-200 rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 active:scale-95 transform-gpu">
                      Voir La Carte
                  </a>
              </motion.div>
          </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-light/50 rounded-l-[100px] -z-10" />
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center transform-gpu">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: customEase }} className="transform-gpu">
                  <span className="text-brand-green font-medium tracking-widest uppercase text-sm mb-5 block">Notre Histoire</span>
                  <h2 className="font-serif text-4xl md:text-5xl mb-8 text-brand-text leading-[1.2] font-medium">
                      Un Héritage Culinaire<br />
                      <span className="text-brand-green italic font-light">Sublimé.</span>
                  </h2>
                  <div className="space-y-6">
                      <p className="text-brand-text/70 leading-relaxed text-lg font-light">
                          Depuis des années, Le Fidélia s&apos;impose comme une adresse prestigieuse à Alger Centre. Notre philosophie est claire : prendre racine dans les traditions de nos grands-mères pour les élever avec une exigence gastronomique moderne.
                      </p>
                      <p className="text-brand-text/70 leading-relaxed text-lg font-light">
                          Notre salle lumineuse, luxueuse et épurée se veut le reflet de notre cuisine : authentique, élégante et chaleureuse. Redécouvrez la richesse de la gastronomie algérienne dans un cadre exceptionnel.
                      </p>
                  </div>
              </motion.div>
              
              <div className="relative">
                   <motion.div style={{ y: aboutImageY }} className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
                       <Image src={HERO_IMAGE} alt="Intérieur Le Fidélia" fill className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s] ease-out" referrerPolicy="no-referrer" />
                       <div className="absolute inset-0 bg-brand-green/0 group-hover:bg-brand-green/10 transition-colors duration-700" />
                   </motion.div>
                   <motion.div 
                      initial={{ opacity: 0, y: 40 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      viewport={{ once: true, margin: "-50px" }} 
                      transition={{ duration: 1, delay: 0.4, ease: customEase }} 
                      className="absolute -bottom-8 -left-8 bg-brand-white p-8 rounded-[2rem] shadow-xl border border-black/5 max-w-[320px] hidden sm:block hover:-translate-y-2 transition-transform duration-500 hover:shadow-2xl"
                   >
                       <Quote className="w-10 h-10 text-brand-green/40 mb-4" />
                       <p className="font-serif text-xl italic text-brand-text leading-relaxed">
                           &quot;L&apos;expression absolue et raffinée de la véritable saveur algérienne.&quot;
                       </p>
                   </motion.div>
              </div>
          </div>
      </section>

      {/* Menu / Carte Section */}
      <section id="menu" className="py-24 md:py-32 bg-brand-light">
          <div className="max-w-7xl mx-auto px-6">
              <div className="text-center max-w-2xl mx-auto mb-20 overflow-hidden">
                  <motion.span 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, ease: customEase }}
                      className="text-brand-green font-medium tracking-widest uppercase text-sm mb-4 block transform-gpu"
                  >
                      La Carte
                  </motion.span>
                  <motion.h2 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: 0.1, duration: 0.5, ease: customEase }}
                      className="font-serif text-4xl md:text-5xl text-brand-text mb-6 font-medium transform-gpu"
                  >
                      Excellence Culinaire
                  </motion.h2>
                  <motion.p 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: 0.2, duration: 0.5, ease: customEase }}
                      className="text-brand-text/70 text-lg font-light leading-relaxed transform-gpu"
                  >
                      Explorez notre sélection précise de plats signatures, élaborés avec passion à partir des meilleurs produits locaux algériens.
                  </motion.p>
              </div>

              <div className="grid lg:grid-cols-2 gap-x-16 gap-y-16">
                  {MENU_ITEMS.map((section, idx) => (
                      <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: idx * 0.1, ease: customEase }}
                      className="bg-brand-white p-10 md:p-14 rounded-[2rem] shadow-sm border border-black/5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group transform-gpu">
                          <h3 className="font-serif text-3xl text-brand-text mb-10 flex items-center gap-6 group-hover:text-brand-green transition-colors duration-500">
                              {section.category}
                              <div className="h-px bg-brand-green/20 flex-1 group-hover:bg-brand-green/50 transition-colors duration-500"></div>
                          </h3>
                          <div className="flex flex-col gap-10">
                              {section.items.map((item, itemIdx) => (
                                   <div key={itemIdx} className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6 relative z-10 group/item">
                                       <div className="flex-1">
                                           <h4 className="font-medium text-xl text-brand-text group-hover/item:text-brand-green transition-colors duration-300">{item.name}</h4>
                                           <p className="text-brand-text/60 text-base mt-2 font-light leading-relaxed group-hover/item:text-brand-text/80 transition-colors duration-300">{item.description}</p>
                                       </div>
                                       <div className="font-serif font-medium text-xl text-brand-green shrink-0 bg-brand-light px-4 py-1.5 rounded-full border border-transparent group-hover/item:border-brand-green/20 group-hover/item:bg-brand-white transition-all duration-300">
                                           {item.price}
                                       </div>
                                   </div>
                              ))}
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* Premium Autoplay Image Slider / Gallery */}
      <section id="gallery" className="py-24 md:py-32 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center mb-16 relative">
             <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: customEase }} className="text-brand-green font-medium tracking-widest uppercase text-sm mb-4 block">Notre Cadre</motion.span>
             <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1, ease: customEase }} className="font-serif text-4xl md:text-5xl text-brand-text mb-6 font-medium">Une Ambiance Lumineuse</motion.h2>
             <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: customEase }} className="text-brand-text/70 text-lg font-light max-w-2xl mx-auto">Découvrez l&apos;élégance de nos salles pensées pour votre confort absolu.</motion.p>
          </div>

          <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: customEase }}
              className="max-w-6xl mx-auto px-6 transform-gpu"
          >
              <div className="relative h-[400px] md:h-[600px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5 bg-brand-light group transform-gpu">
                  <AnimatePresence mode="wait">
                      <motion.div
                          key={currentSlide}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                          className="absolute inset-0 transform-gpu"
                      >
                          <Image src={GALLERY_IMAGES[currentSlide]} alt={`Gallerie ${currentSlide + 1}`} fill className="object-cover" referrerPolicy="no-referrer" />
                      </motion.div>
                  </AnimatePresence>
                  
                  {/* Slider Controls */}
                  <div className="absolute inset-x-0 bottom-8 flex justify-center z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 translate-y-4 md:group-hover:translate-y-0 transform-gpu">
                      <div className="flex items-center gap-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border border-black/5 transform-gpu">
                          <button onClick={prevSlide} className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-light text-brand-text hover:bg-brand-green hover:text-white transition-all shadow-sm duration-200 hover:scale-110 active:scale-95 transform-gpu">
                              <ChevronLeft className="w-5 h-5" />
                          </button>
                          <div className="text-sm font-medium tracking-[0.2em] text-brand-text uppercase w-16 text-center">
                              {currentSlide + 1} / {GALLERY_IMAGES.length}
                          </div>
                          <button onClick={nextSlide} className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-light text-brand-text hover:bg-brand-green hover:text-white transition-all shadow-sm duration-200 hover:scale-110 active:scale-95 transform-gpu">
                              <ChevronRight className="w-5 h-5" />
                          </button>
                      </div>
                  </div>
              </div>
          </motion.div>
      </section>

      {/* Testimonials */}
      <CustomerReviews />

      {/* Contact & Location */}
      <section id="contact" className="py-24 md:py-32 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: customEase }}>
                   <span className="text-brand-green font-medium tracking-widest uppercase text-sm mb-5 block">Informations Pratiques</span>
                   <h2 className="font-serif text-4xl md:text-5xl mb-14 text-brand-text leading-tight font-medium">
                      Nous sommes prêts à <br />vous accueillir.
                   </h2>
                   
                   <div className="space-y-10">
                       <motion.div whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className="flex items-start gap-6 transform-gpu">
                           <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-black/5 group cursor-pointer overflow-hidden relative active:scale-95 transition-transform duration-200">
                               <div className="absolute inset-0 bg-brand-green/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                               <MapPin className="w-7 h-7 text-brand-green group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 relative z-10" />
                           </div>
                           <div>
                               <h4 className="font-medium text-xl text-brand-text mb-2">Adresse</h4>
                               <p className="text-brand-text/60 font-light leading-relaxed text-lg">7 Rue de l&apos;Emir Abdelkrim El Khettabi<br />Alger Centre, Algérie</p>
                           </div>
                       </motion.div>

                       <motion.div whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className="flex items-start gap-6 transform-gpu">
                           <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-black/5 group cursor-pointer overflow-hidden relative active:scale-95 transition-transform duration-200">
                               <div className="absolute inset-0 bg-brand-green/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                               <Phone className="w-7 h-7 text-brand-green group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative z-10" />
                           </div>
                           <div>
                               <h4 className="font-medium text-xl text-brand-text mb-2">Réservations</h4>
                               <a href="tel:+213561765209" className="text-brand-text/60 font-light leading-relaxed text-lg hover:text-brand-green transition-colors">+213 561 76 52 09</a>
                           </div>
                       </motion.div>

                       <motion.div whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className="flex items-start gap-6 transform-gpu">
                           <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-black/5 group cursor-pointer overflow-hidden relative active:scale-95 transition-transform duration-200">
                               <div className="absolute inset-0 bg-brand-green/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                               <Clock className="w-7 h-7 text-brand-green group-hover:scale-110 transition-all duration-300 relative z-10" />
                           </div>
                           <div>
                               <h4 className="font-medium text-xl text-brand-text mb-2">Horaires d&apos;Ouverture</h4>
                               <p className="text-brand-text/60 font-light leading-relaxed text-lg">Ouvert tous les jours<br />Service Midi &amp; Soir</p>
                           </div>
                       </motion.div>
                   </div>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: customEase }}
              className="h-full min-h-[500px] md:min-h-[600px] bg-brand-light rounded-[3rem] overflow-hidden shadow-2xl border border-black/5 relative p-3 md:p-4 group">
                  <div className="absolute inset-3 md:inset-4 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-white z-10">
                      <iframe 
                        src="https://maps.google.com/maps?q=Le%20Fid%C3%A9lia,%207%20Rue%20de%20l'Emir%20Abdelkrim%20El%20Khettabi,%20Alger%20Centre&t=m&z=17&output=embed&iwloc=near"
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }}
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                        title="Google Maps Location Le Fidélia"
                      ></iframe>
                  </div>
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none w-full flex justify-center px-6">
                       <a href="https://www.google.com/maps/search/?api=1&query=Le%20Fid%C3%A9lia&query_place_id=ChIJ44G4WgCzjxIRxuABdJhnj8A" target="_blank" rel="noopener noreferrer" className="bg-white/95 backdrop-blur-md px-8 py-4 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-black/5 flex items-center gap-3 hover:scale-105 transition-transform duration-200 active:scale-95 pointer-events-auto text-brand-text hover:bg-brand-green hover:text-white group/btn">
                           <MapPin className="w-5 h-5 text-brand-green group-hover/btn:text-white transition-colors" />
                           <span className="font-medium tracking-wide">Itinéraire Google Maps</span>
                       </a>
                  </div>
              </motion.div>
          </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <footer className="bg-brand-light pt-24 pb-10 border-t border-black/5">
          <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20 text-center md:text-left">
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: customEase }}>
                      <div className="font-serif text-4xl font-semibold tracking-wide text-brand-green mb-6 cursor-pointer hover:opacity-80 transition-opacity">
                          Le Fidélia
                      </div>
                      <p className="text-brand-text/60 font-light max-w-sm text-lg leading-relaxed">
                          Gastronomie authentique algérienne.<br />Un voyage culinaire pour les sens.
                      </p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: customEase }} className="flex flex-col items-center md:items-end gap-6">
                      <div className="flex gap-4">
                          <a href="https://www.instagram.com/restaurant_le_fidelia/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-brand-text hover:bg-brand-green hover:text-white transition-all duration-300 shadow-sm border border-black/5 hover:-translate-y-1 hover:shadow-lg">
                              <Instagram className="w-6 h-6" />
                          </a>
                          <a href="https://www.facebook.com/LeFideliaAlger" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-brand-text hover:bg-brand-green hover:text-white transition-all duration-300 shadow-sm border border-black/5 hover:-translate-y-1 hover:shadow-lg">
                              <Facebook className="w-6 h-6" />
                          </a>
                      </div>
                      <a href="/reservation" className="text-brand-green font-medium relative group mt-2 text-lg active:scale-95 transition-transform duration-200 inline-block transform-gpu">
                        Réserver votre table en ligne &rarr;
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-green transition-all duration-300 group-hover:w-full"></span>
                      </a>
                  </motion.div>
              </div>
              
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} className="flex flex-col md:flex-row justify-between items-center gap-6 text-brand-text/40 text-sm font-light border-t border-black/5 pt-10">
                  <p>&copy; {new Date().getFullYear()} Le Fidélia. Tous droits réservés.</p>
                  <div className="flex gap-10">
                      <a href="#" className="hover:text-brand-text transition-colors">Mentions Légales</a>
                      <a href="#" className="hover:text-brand-text transition-colors">Politique de Confidentialité</a>
                  </div>
              </motion.div>
          </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/213561765209" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300 group"
        title="Chat with us on WhatsApp"
      >
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 group-hover:opacity-60 duration-[3s]"></div>
        <svg className="w-7 h-7 md:w-8 md:h-8 relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 21c-1.566 0-3.08-.42-4.41-1.215l-.316-.188-3.274.858.874-3.195-.205-.326A8.932 8.932 0 013 12c0-4.962 4.038-9 9.031-9 4.99 0 9.03 4.038 9.03 9 0 4.962-4.04 9-9.03 9zm6.182-6.52c-.34-.17-2.008-.99-2.318-1.104-.31-.114-.536-.17-.763.17-.227.34-.877 1.104-1.076 1.332-.199.227-.4.256-.74.086-2.007-1.003-3.268-2.072-4.02-3.376-.17-.291.173-.274.506-.941.114-.227.057-.426-.028-.596-.085-.17-.763-1.841-1.045-2.522-.275-.664-.555-.574-.763-.585-.198-.01-.425-.011-.652-.011-.227 0-.595.085-.907.426-.312.34-1.19 1.164-1.19 2.838 0 1.674 1.218 3.293 1.388 3.52.17.227 2.455 3.935 6.073 5.378.86.34 1.532.545 2.056.697.863.25 1.649.215 2.268.13.696-.096 2.008-.82 2.29-1.614.283-.794.283-1.474.199-1.614-.085-.142-.312-.227-.652-.397z" /></svg>
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-brand-text text-sm font-medium px-4 py-2 rounded-2xl shadow-xl border border-black/5 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 w-max translate-x-4 group-hover:translate-x-0 hidden md:block">
           Discuter sur WhatsApp
        </div>
      </a>
    </main>
  );
}
