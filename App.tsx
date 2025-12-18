
import React, { useState, useEffect, Suspense } from 'react';
import { AppView } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MarsExplorer from './components/MarsExplorer';
import SpaceXTimeline from './components/SpaceXTimeline';
import IssTracker from './components/IssTracker';
import CosmicAssistant from './components/CosmicAssistant';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderView = () => {
    switch (activeView) {
      case AppView.DASHBOARD: return <Dashboard />;
      case AppView.MARS_ROVER: return <MarsExplorer />;
      case AppView.SPACEX: return <SpaceXTimeline />;
      case AppView.ISS_TRACKER: return <IssTracker />;
      case AppView.AI_ASSISTANT: return <CosmicAssistant />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-black text-slate-100 selection:bg-blue-500/30">
      {/* Navigation Layer */}
      <Sidebar 
        activeView={activeView} 
        onViewChange={(v) => {
          setActiveView(v);
          if (window.innerWidth < 1024) setIsSidebarOpen(false);
        }} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Cinematic Top Bar */}
        <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-md border-b border-white/5 px-6 lg:px-10 py-5 flex items-center justify-between">
           <div className="flex items-center gap-6">
              {!isSidebarOpen && (
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
              )}
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-0.5">Stellar Explorer</span>
                <h1 className="text-xl font-space font-bold tracking-tight text-white flex items-center gap-2">
                  {activeView.replace('_', ' ')}
                  <span className="text-blue-500 text-sm font-normal opacity-50 font-sans">+</span>
                </h1>
              </div>
           </div>
           
           <div className="hidden sm:flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Orbital Sync</span>
                <span className="text-xs text-green-500 font-medium">99.8% Uplink</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              </div>
           </div>
        </header>

        {/* View Container */}
        <div className="flex-1 relative">
          <ErrorBoundary>
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 animate-pulse font-bold">Syncing Telemetry...</p>
                </div>
              </div>
            }>
              <div className="max-w-[1600px] mx-auto w-full">
                {renderView()}
              </div>
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>

      {/* Decorative Blur Elements */}
      <div className="fixed -bottom-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed -top-32 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
    </div>
  );
};

export default App;
