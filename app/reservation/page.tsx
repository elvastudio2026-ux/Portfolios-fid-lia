'use client';

import { motion } from 'motion/react';
import { ChevronLeft, Calendar, Clock, Users, User, Phone, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Toaster, toast } from 'sonner';

export default function ReservationPage() {
  const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Demande de réservation envoyée ! Nous vous contacterons sous peu pour confirmer.");
  };

  return (
    <main className="min-h-screen bg-brand-white text-brand-text font-sans selection:bg-brand-green/20">
      <Toaster position="top-center" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/5 py-4">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 text-brand-text/70 hover:text-brand-green transition-colors group">
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-medium text-sm tracking-wide uppercase">Retour</span>
              </Link>
              <Link href="/" className="font-serif text-3xl text-brand-green font-semibold tracking-wide cursor-pointer hover:opacity-80 transition-opacity">
                  Le Fidélia
              </Link>
              <div className="w-16"></div> {/* Spacer to center logo */}
          </div>
      </nav>

      <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: customEase }}
                className="text-brand-green font-medium tracking-widest uppercase text-sm mb-4 block"
            >
                Réservation
            </motion.span>
            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: customEase }}
                className="font-serif text-4xl md:text-5xl text-brand-text mb-6 font-medium leading-tight"
            >
                Réserver votre table
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: customEase }}
                className="text-brand-text/70 text-lg font-light leading-relaxed max-w-xl mx-auto"
            >
                Vivez une expérience gastronomique inoubliable au cœur d&apos;Alger Centre. Remplissez le formulaire ci-dessous pour réserver.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: customEase }}
            className="bg-brand-light/50 p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-black/5"
          >
            <form className="space-y-8" onSubmit={handleSubmit}>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-3">
                  <label htmlFor="name" className="text-sm font-medium tracking-wide uppercase text-brand-text/80 flex items-center gap-2">
                    <User className="w-4 h-4 text-brand-green" /> Nom Complet
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    placeholder="Votre nom" 
                    className="w-full bg-white border border-black/5 rounded-2xl py-4 px-5 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-green/30 transition-shadow shadow-sm"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-3">
                  <label htmlFor="phone" className="text-sm font-medium tracking-wide uppercase text-brand-text/80 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand-green" /> Téléphone
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    required
                    placeholder="+213 XX XX XX XX" 
                    className="w-full bg-white border border-black/5 rounded-2xl py-4 px-5 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-green/30 transition-shadow shadow-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-3">
                <label htmlFor="email" className="text-sm font-medium tracking-wide uppercase text-brand-text/80 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-green" /> Email (Optionnel)
                </label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="votre@email.com" 
                  className="w-full bg-white border border-black/5 rounded-2xl py-4 px-5 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-green/30 transition-shadow shadow-sm"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Date */}
                <div className="space-y-3">
                  <label htmlFor="date" className="text-sm font-medium tracking-wide uppercase text-brand-text/80 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-green" /> Date
                  </label>
                  <input 
                    type="date" 
                    id="date" 
                    required
                    className="w-full bg-white border border-black/5 rounded-2xl py-4 px-5 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-green/30 transition-shadow shadow-sm"
                  />
                </div>

                {/* Time */}
                <div className="space-y-3">
                  <label htmlFor="time" className="text-sm font-medium tracking-wide uppercase text-brand-text/80 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-green" /> Heure
                  </label>
                  <input 
                    type="time" 
                    id="time" 
                    required
                    className="w-full bg-white border border-black/5 rounded-2xl py-4 px-5 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-green/30 transition-shadow shadow-sm"
                  />
                </div>

                {/* Guests */}
                <div className="space-y-3">
                  <label htmlFor="guests" className="text-sm font-medium tracking-wide uppercase text-brand-text/80 flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-green" /> Couverts
                  </label>
                  <select 
                    id="guests" 
                    required
                    className="w-full bg-white border border-black/5 rounded-2xl py-4 px-5 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-green/30 transition-shadow shadow-sm appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, "+ de 8"].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'personne' : 'personnes'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-3">
                <label htmlFor="requests" className="text-sm font-medium tracking-wide uppercase text-brand-text/80 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-brand-green" /> Demandes Spéciales
                </label>
                <textarea 
                  id="requests" 
                  rows={4}
                  placeholder="Allergies, anniversaires, préférences..." 
                  className="w-full bg-white border border-black/5 rounded-2xl py-4 px-5 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-green/30 transition-shadow shadow-sm resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full inline-flex justify-center items-center gap-3 px-10 py-5 bg-brand-green text-white font-medium text-lg tracking-wide hover:bg-brand-green/90 transition-all duration-200 rounded-full shadow-lg hover:shadow-xl active:scale-95"
                >
                  Confirmer la Réservation
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
