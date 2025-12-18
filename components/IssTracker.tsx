
import React, { useState, useEffect, useRef } from 'react';
import { ISSPosition } from '../types';
import { issService } from '../services/issService';

const IssTracker: React.FC = () => {
  const [pos, setPos] = useState<ISSPosition | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPos = async () => {
      try {
        const data = await issService.getCurrentPosition();
        setPos(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPos();
    const interval = setInterval(fetchPos, 5000);
    return () => clearInterval(interval);
  }, []);

  // Simple coordinate projection for a 2D map
  const getCoordinates = (lat: number, lng: number) => {
    const x = ((lng + 180) * 100) / 360;
    const y = ((90 - lat) * 100) / 180;
    return { x, y };
  };

  const coords = pos ? getCoordinates(pos.latitude, pos.longitude) : { x: 50, y: 50 };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="relative w-full aspect-[2/1] bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden">
             {/* Simple World Map Background Placeholder */}
             <div 
               className="absolute inset-0 opacity-20" 
               style={{ 
                 backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg)',
                 backgroundSize: 'cover',
                 filter: 'invert(1)'
               }}
             ></div>
             
             {/* Latitude/Longitude grid */}
             <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 pointer-events-none opacity-10">
               {[...Array(72)].map((_, i) => (
                 <div key={i} className="border-[0.5px] border-slate-500"></div>
               ))}
             </div>

             {/* ISS Marker */}
             <div 
               className="absolute w-8 h-8 -ml-4 -mt-4 transition-all duration-1000 ease-linear"
               style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
             >
                <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-ping"></div>
                <div className="relative bg-white p-1 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z" />
                  </svg>
                </div>
             </div>
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border-slate-800">
             <h3 className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-4">Live Telemetry</h3>
             <div className="space-y-4">
                <div>
                   <p className="text-slate-400 text-xs">Latitude</p>
                   <p className="text-xl font-mono font-bold">{pos?.latitude.toFixed(4) || '---'}</p>
                </div>
                <div>
                   <p className="text-slate-400 text-xs">Longitude</p>
                   <p className="text-xl font-mono font-bold">{pos?.longitude.toFixed(4) || '---'}</p>
                </div>
                <div>
                   <p className="text-slate-400 text-xs">Altitude</p>
                   <p className="text-xl font-mono font-bold">{pos?.altitude.toFixed(2) || '---'} km</p>
                </div>
                <div>
                   <p className="text-slate-400 text-xs">Velocity</p>
                   <p className="text-xl font-mono font-bold">{pos?.velocity.toFixed(0) || '---'} km/h</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssTracker;
