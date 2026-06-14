'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: "Dois-je réserver à l'avance ?",
    answer: "Il est fortement recommandé de réserver à l'avance, surtout pour les dîners de fin de semaine, afin de vous garantir une table et un service de qualité."
  },
  {
    question: "Proposez-vous des options végétariennes ?",
    answer: "Oui, notre menu comprend plusieurs plats végétariens élaborés avec le même soin et la même exigence que nos plats traditionnels."
  },
  {
    question: "Est-il possible de privatiser le restaurant pour un événement ?",
    answer: "Absolument. Nous offrons la possibilité de privatiser tout ou partie de notre établissement pour vos événements privés (anniversaires, mariages, repas d'affaires). Merci de nous contacter directement pour un devis personnalisé."
  },
  {
    question: "Puis-je venir avec des enfants ?",
    answer: "Bien sûr, Les enfants sont les bienvenus. Nous pouvons adapter certains plats pour les plus petits."
  },
  {
    question: "Disposez-vous d'un parking ?",
    answer: "Un parking public se trouve à proximité immédiate du restaurant pour faciliter votre stationnement à Alger Centre."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-brand-green relative overflow-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-50px" }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-white/80 font-medium tracking-widest uppercase text-sm mb-4 block">Foire Aux Questions</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-medium leading-tight mb-6">Vos questions, <br />nos réponses.</h2>
          </motion.div>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/15 overflow-hidden hover:bg-white/15 transition-all duration-300"
            >
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full text-left px-6 py-6 md:px-8 md:py-7 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-white/20 group cursor-pointer"
              >
                <span className="font-medium text-lg text-white pr-8">{faq.question}</span>
                <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'bg-white text-brand-green' : 'bg-white/10 text-white group-hover:bg-white/25'}`}>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 md:px-8 md:pb-7 text-white/90 text-lg font-light leading-relaxed border-t border-white/10 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
        >
            <p className="text-white/80 mb-6">Vous avez une autre question ?</p>
            <a href="/reservation" className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-green font-medium tracking-wide hover:bg-brand-light transition-all duration-200 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95">
                Contactez-nous
            </a>
        </motion.div>
      </div>
    </section>
  );
}
