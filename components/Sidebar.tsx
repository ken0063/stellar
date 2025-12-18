
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppView } from '../types';

interface SidebarProps {
  activeView: AppView;
  onViewChange: (view: AppView) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, isOpen, setIsOpen }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'Horizon', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: AppView.MARS_ROVER, label: 'Mars Expedition', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' },
    { id: AppView.SPACEX, label: 'Launch Pad', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: AppView.ISS_TRACKER, label: 'Station Sync', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
    { id: AppView.AI_ASSISTANT, label: 'Astro Core', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.9-.4-2.593-1.003l-.547-.547z' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          <motion.aside 
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed lg:static inset-y-0 left-0 w-80 bg-black border-r border-white/5 flex flex-col z-[60]"
          >
            <div className="px-10 py-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-space text-2xl font-bold tracking-tighter">INST<br/>INCT</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-500 hover:text-white p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
              <div className="px-6 mb-6">
                 <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Operations</span>
              </div>
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 group ${
                    activeView === item.id 
                      ? 'bg-white/5 text-white' 
                      : 'text-slate-500 hover:bg-white/[0.03] hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <svg className={`w-5 h-5 transition-colors ${activeView === item.id ? 'text-blue-500' : 'text-slate-700 group-hover:text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon}></path>
                    </svg>
                    <span className="font-space font-medium text-sm">{item.label}</span>
                  </div>
                  {activeView === item.id && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="w-1 h-1 rounded-full bg-blue-500"
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            <div className="p-8 space-y-4">
              <div className="px-2">
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">
                  <span>Deep Space Link</span>
                  <span className="text-green-500">Online</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     animate={{ x: ["-100%", "100%"] }}
                     transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                     className="h-full w-2/3 bg-blue-500 rounded-full"
                   />
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 bg-white text-black font-space font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-between"
              >
                <span>Get Involved</span>
                <span className="text-xl leading-none font-normal">+</span>
              </motion.button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
