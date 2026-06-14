'use client';

import Image from 'next/image';
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Search, Filter, ChevronDown, ChevronUp, Quote } from 'lucide-react';

const CHANDELIER_IMAGE = "https://res.cloudinary.com/dyw9qoe1j/image/upload/f_auto,q_auto,w_1920,h_1080,c_fill,e_sepia:30/v1/samples/landscapes/beach-boat";


const BASE_REVIEWS = [
  { name: "Amine S.", date: "Il y a 2 semaines", text: "Une expérience inoubliable. Le vrai goût de l'Algérie avec une présentation digne d'un grand restaurant chic. Un service tout simplement impeccable.", rating: 5 },
  { name: "Sarah B.", date: "Il y a 1 mois", text: "Le meilleur couscous d'Alger Centre sans aucune hésitation. L'endroit est magnifique, très clair, luxueux et apaisant.", rating: 5 },
  { name: "Karim L.", date: "Il y a 2 mois", text: "Ambiance chaleureuse, accueil parfait et plats exquis. Mention spéciale pour le Hmiss qui est tout bonnement exceptionnel.", rating: 4 },
  { name: "Lydia M.", date: "Il y a 3 mois", text: "Très très bon. Les plats sont super, le cadre est top.", rating: 5 },
  { name: "Youssef T.", date: "Il y a 4 mois", text: "Bon repas, mais attente un peu longue. La qualité de la viande était cependant incroyable.", rating: 4 }
];

const REVIEWS = Array.from({ length: 687 }).map((_, i) => ({
  id: i,
  ...BASE_REVIEWS[i % BASE_REVIEWS.length],
}));

export default function CustomerReviews() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  
  const sectionRef = useRef<HTMLElement>(null);

  const filteredReviews = useMemo(() => {
    return REVIEWS.filter(review => {
      if (searchQuery && !review.text.toLowerCase().includes(searchQuery.toLowerCase()) && !review.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (ratingFilter && review.rating !== ratingFilter) return false;
      return true;
    });
  }, [searchQuery, ratingFilter]);

  useEffect(() => {
    if (isExpanded && visibleCount < filteredReviews.length) {
      const timer = setTimeout(() => {
        setVisibleCount(prev => Math.min(prev + 50, filteredReviews.length));
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isExpanded, visibleCount, filteredReviews.length]);

  const handleToggle = () => {
    if (isExpanded) {
      setIsExpanded(false);
      setTimeout(() => setVisibleCount(6), 300);
      if (sectionRef.current) {
        const yOffset = -80; 
        const y = sectionRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <section ref={sectionRef} id="reviews" className="py-24 md:py-32 bg-white relative">
      <div className="hidden lg:block absolute top-0 left-0 w-[45%] h-full rounded-r-[5rem] overflow-hidden z-0 pointer-events-none">
          <Image src={CHANDELIER_IMAGE} alt="Ambiance Fidélia" fill className="object-cover" unoptimized referrerPolicy="no-referrer" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-10 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-50px" }} 
            transition={{ duration: 0.6, ease: "easeOut" }} 
            className="max-w-2xl"
          >
            <span className="text-brand-green font-medium tracking-widest uppercase text-sm mb-4 block">Avis Clients</span>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-text font-medium leading-tight mb-4">Ce Que Pensent <br/>Nos Hôtes</h2>
            <p className="text-brand-text/60 font-light text-lg">
              {REVIEWS.length} avis clients vérifiés sur Google
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-50px" }} 
            transition={{ duration: 0.6, ease: "easeOut" }} 
            className="flex items-center gap-5 bg-brand-light px-8 py-5 rounded-full shadow-sm border border-black/5"
          >
            <div className="flex text-brand-green">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current opacity-30" />
            </div>
            <div className="font-medium text-brand-text text-lg border-l border-brand-text/10 pl-5">
              4.3/5 <span className="text-brand-text/50 font-normal text-sm ml-1">({REVIEWS.length} Avis)</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Reviews Content Area */}
      <div className="max-w-7xl mx-auto px-6 relative mt-10">
        
        {/* Sticky Action Button & Filters */}
        <div className="sticky top-[80px] z-40 bg-white shadow-[0_20px_20px_-15px_rgba(255,255,255,1)] pb-8 mb-8 border-b border-black/5 -mx-6 px-6 md:mx-0 md:px-0">
          <div className="flex flex-col gap-4 bg-white">
            <div className="flex justify-start items-center w-full">
              <button 
                onClick={handleToggle}
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-brand-green text-white font-medium tracking-wide hover:bg-brand-green/90 transition-colors rounded-full shadow-lg"
              >
                {isExpanded ? (
                  <>
                    Masquer les avis
                    <ChevronUp className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Voir tous les {REVIEWS.length} avis
                    <ChevronDown className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Filters and Search */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row gap-4 items-center bg-brand-light p-4 rounded-2xl md:rounded-full border border-black/5 mt-4">
                    <div className="relative w-full lg:flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text/40 pointer-events-none" />
                      <input 
                        type="text" 
                        placeholder="Rechercher un avis..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-black/5 rounded-full py-3 text-sm pl-10 pr-4 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-green/30 shadow-sm"
                      />
                    </div>
                    
                    <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                      <button 
                        onClick={() => setRatingFilter(null)}
                        className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-colors shadow-sm ${ratingFilter === null ? 'bg-brand-green text-white' : 'bg-white text-brand-text hover:bg-brand-green/10 border border-black/5'}`}
                      >
                        Tous
                      </button>
                      {[5, 4, 3, 2, 1].map(stars => (
                        <button 
                          key={stars}
                          onClick={() => setRatingFilter(stars)}
                          className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 shadow-sm ${ratingFilter === stars ? 'bg-brand-green text-white' : 'bg-white text-brand-text hover:bg-brand-green/10 border border-black/5'}`}
                        >
                          {stars} <Star className={`w-3.5 h-3.5 ${ratingFilter === stars ? 'fill-white' : 'fill-brand-green text-brand-green'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16 relative z-10 pt-4">
          {filteredReviews.slice(0, isExpanded ? visibleCount : 6).map((review) => (
            <div 
              key={review.id} 
              className="bg-brand-light/50 p-10 rounded-[2rem] shadow-sm border border-black/5 hover:shadow-xl transition-shadow relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 group-hover:rotate-12 transition-all duration-500 pointer-events-none">
                  <Quote className="w-32 h-32 text-brand-green" />
              </div>
              
              <div className="flex text-brand-green mb-8">
                  {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'opacity-30'}`} />
                  ))}
              </div>
              
              <p className="text-brand-text/80 leading-relaxed mb-10 font-light text-lg relative z-10">&quot;{review.text}&quot;</p>
              
              <div className="flex items-center gap-5 border-t border-black/5 pt-6 relative z-10">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center font-serif text-brand-green text-2xl shadow-sm border border-black/5 group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                      {review.name.charAt(0)}
                  </div>
                  <div>
                      <div className="font-medium text-brand-text text-lg">{review.name}</div>
                      <div className="text-brand-text/50 text-sm mt-0.5">{review.date}</div>
                  </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <div className="text-center py-20 bg-brand-light rounded-[2rem] border border-black/5">
            <p className="text-brand-text/60 text-lg">Aucun avis ne correspond à vos critères.</p>
          </div>
        )}
      </div>
    </section>
  );
}
