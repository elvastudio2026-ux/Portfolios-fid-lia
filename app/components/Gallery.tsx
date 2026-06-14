'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

// Using the provided Cloudinary collection IDs
const GALLERY_ITEMS = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/dyw9qoe1j/image/fetch/f_auto,q_auto,w_800,h_1000,c_fill/https://images.unsplash.com/photo-1559339352-11d035aa65de',
    title: 'Ambiance Soirée',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-2',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/dyw9qoe1j/image/fetch/f_auto,q_auto,w_1200,h_800,c_fill/https://images.unsplash.com/photo-1476224203421-9ac39bcb3327',
    title: 'Plat Signature',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    aspect: 'aspect-[3/2]'
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/dyw9qoe1j/image/upload/f_auto,q_auto,w_800,h_800,c_fill/v1/cld-sample-4',
    title: 'Art Culinaire',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    aspect: 'aspect-square'
  },
  {
    id: 4,
    url: 'https://res.cloudinary.com/dyw9qoe1j/image/fetch/f_auto,q_auto,w_1000,h_600,c_fill/https://images.unsplash.com/photo-1511690656952-34342bb7c2f2',
    title: 'Détails Déco',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 5,
    url: 'https://res.cloudinary.com/dyw9qoe1j/image/fetch/f_auto,q_auto,w_600,h_800,c_fill/https://images.unsplash.com/photo-1552566626-52f8b828add9',
    title: 'Cocktail Maison',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 6,
    url: 'https://res.cloudinary.com/dyw9qoe1j/image/upload/f_auto,q_auto,w_800,h_1000,c_fill/v1/samples/food/spices',
    title: 'Nos Spécialités',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-2',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 7,
    url: 'https://res.cloudinary.com/dyw9qoe1j/image/upload/f_auto,q_auto,w_1200,h_800,c_fill/v1/samples/food/dessert',
    title: 'Chef en Action',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    aspect: 'aspect-[3/2]'
  }
];

export default function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  
  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setSelectedImageIndex((selectedImageIndex + 1) % GALLERY_ITEMS.length);
      if (e.key === 'ArrowLeft') setSelectedImageIndex((selectedImageIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImageIndex]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-7xl mx-auto px-6 auto-rows-min">
        {GALLERY_ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className={`relative group cursor-pointer overflow-hidden rounded-3xl bg-brand-light transform-gpu border border-black/5 ${item.colSpan} ${item.rowSpan} ${item.aspect}`}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={item.url}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              referrerPolicy="no-referrer"
              unoptimized
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Elegant overlay overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
               <h3 className="text-white font-medium text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
               <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <Maximize2 className="w-5 h-5 text-white" />
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-8 right-8 z-[210] w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>
            
            <button 
              onClick={showPrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[210] w-14 h-14 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md group"
            >
              <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={showNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[210] w-14 h-14 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md group"
            >
              <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </button>

            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-6xl aspect-[4/3] md:aspect-[16/9] mx-4 md:mx-20 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
               <Image
                 src={GALLERY_ITEMS[selectedImageIndex].url}
                 alt={GALLERY_ITEMS[selectedImageIndex].title}
                 fill
                 className="object-contain"
                 referrerPolicy="no-referrer"
                 unoptimized
                 sizes="100vw"
               />
            </motion.div>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium tracking-widest uppercase">
               {selectedImageIndex + 1} / {GALLERY_ITEMS.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
