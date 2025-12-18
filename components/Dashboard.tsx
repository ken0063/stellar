
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { APODResponse } from '../types';
import { nasaService } from '../services/nasaService';

const Dashboard: React.FC = () => {
  const [apod, setApod] = useState<APODResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    nasaService.getAPOD()
      .then(setApod)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
         <motion.div 
           initial={{ width: 0 }}
           animate={{ width: 256 }}
           className="h-1 bg-white/10 rounded-full overflow-hidden"
         >
            <motion.div 
              animate={{ x: [-100, 400] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="h-full w-24 bg-blue-500 blur-sm"
            />
         </motion.div>
         <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold animate-pulse">Initializing Dashboard</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative min-h-[90vh] flex flex-col overflow-hidden px-6 lg:px-12 py-10"
    >
      {/* Hero Section - Cinematic Horizon Look */}
      <section className="relative flex-1 flex flex-col justify-end pb-12 lg:pb-24">
        {/* Background Layer: APOD or Horizon Gradient */}
        <div className="absolute inset-0 z-[-1] overflow-hidden rounded-[2rem] lg:rounded-[3rem] border border-white/5">
          {apod?.media_type === 'image' ? (
             <>
               <motion.img 
                 initial={{ scale: 1.1, opacity: 0 }}
                 animate={{ scale: 1, opacity: 0.5 }}
                 transition={{ duration: 2 }}
                 src={apod.url} 
                 alt={apod.title} 
                 className="w-full h-full object-cover grayscale brightness-50"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
               <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-black to-transparent"></div>
             </>
          ) : (
            <div className="w-full h-full bg-[#020617] relative">
               <div className="absolute inset-0 bg-gradient-to-t from-black via-blue-900/10 to-transparent"></div>
            </div>
          )}
          {/* Planetary Curve Overlay (Instinct Look) */}
          <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[250%] aspect-square rounded-full border-t-[1px] border-white/20 shadow-[0_-50px_100px_-50px_rgba(59,130,246,0.3)]"></div>
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full blur-[2px] shadow-[0_0_40px_10px_white]"
          />
        </div>

        <div className="max-w-4xl space-y-8 relative z-10">
           <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center bg-black/40 backdrop-blur-md">
                    <span className="text-[10px] font-bold">SX</span>
                 </div>
                 <div className="h-[1px] w-8 bg-white/20"></div>
                 <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold">Planetary Horizon Mission</span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-space font-bold leading-[1.1] tracking-tight text-white">
                 Building the future <br className="hidden lg:block"/>
                 of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">Cosmic exploration</span>
              </h2>
              <p className="text-lg lg:text-xl text-slate-400 max-w-2xl font-light leading-relaxed">
                 We are architecting the future of deep-space communications, 
                 enabling seamless data solutions for global and lunar applications.
              </p>
           </motion.div>

           <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-white text-black font-space font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center gap-8 group"
              >
                <span>Get Involved</span>
                <span className="text-2xl group-hover:translate-x-1 transition-transform">+</span>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-black/40 backdrop-blur-md border border-white/10 text-white font-space font-bold rounded-2xl transition-all flex items-center gap-4 group"
              >
                <span>Learn More</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </motion.button>
           </motion.div>
        </div>

        {/* Floating Moon Element (Bottom Right) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute bottom-10 right-10 lg:bottom-20 lg:right-20 pointer-events-none"
        >
           <div className="relative">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border border-white/10">
                 {/* Fixed broken image link with a reliable NASA Unsplash image */}
                 <img src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover grayscale brightness-125" alt="moon"/>
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 rounded-full border border-white/5"
              />
           </div>
        </motion.div>
      </section>

      {/* Mini Feature Grid (Bottom) */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-1 lg:gap-8 mt-12 border-t border-white/5 pt-12"
      >
          {[
            { label: 'Active Orbits', val: '2,491', sub: 'Monitoring verified entities' },
            { label: 'Mission Time', val: '43d 12h', sub: 'Since last system sync' },
            { label: 'Uplink Speed', val: '1.2 Gbps', sub: 'Low-latency deep space link' }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className="group p-6 rounded-2xl hover:bg-white/[0.02] transition-colors"
            >
               <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4 block group-hover:text-blue-500 transition-colors">
                 {stat.label}
               </span>
               <p className="text-3xl font-space font-bold mb-1">{stat.val}</p>
               <p className="text-xs text-slate-400 font-light">{stat.sub}</p>
            </motion.div>
          ))}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
