
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MarsPhoto } from '../types';
import { nasaService } from '../services/nasaService';

const MarsExplorer: React.FC = () => {
  const [photos, setPhotos] = useState<MarsPhoto[]>([]);
  const [rover, setRover] = useState('curiosity');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    nasaService.getMarsPhotos(rover)
      .then(setPhotos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [rover]);

  return (
    <div className="px-6 lg:px-12 py-12 space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/5 pb-12"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 border border-white/10 rounded-lg flex items-center justify-center bg-white/5">
                <span className="text-[10px] font-bold">ME</span>
             </div>
             <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold">Rover Telemetry Grid</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-space font-bold">Mars Expedition</h2>
          <p className="text-slate-400 font-light max-w-xl">
             Browsing high-resolution surface imagery captured by NASA's autonomous explorers on the red planet.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/5">
          {['curiosity', 'opportunity', 'spirit'].map((r) => (
            <button
              key={r}
              onClick={() => setRover(r)}
              className={`px-6 py-3 rounded-xl transition-all font-space font-bold text-sm ${
                rover === r 
                  ? 'bg-white text-black shadow-xl' 
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-white/[0.03] rounded-3xl animate-pulse"></div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="grid"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {photos.map((photo) => (
              <motion.div 
                key={photo.id} 
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 }
                }}
                whileHover={{ y: -5 }}
                className="group relative rounded-3xl overflow-hidden border border-white/5 aspect-square transition-all hover:shadow-2xl"
              >
                <img src={photo.img_src} alt={photo.camera.full_name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-1">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                     <p className="text-xs font-space font-bold tracking-widest uppercase">{photo.camera.name}</p>
                  </div>
                  <p className="text-sm text-slate-300 font-light">{photo.earth_date}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && photos.length === 0 && (
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="text-center py-24 glass-panel rounded-[3rem]"
         >
            <p className="text-slate-500 font-space uppercase tracking-widest">No visual data returned for this sector</p>
         </motion.div>
      )}
    </div>
  );
};

export default MarsExplorer;
