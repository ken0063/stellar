
import React, { useState, useEffect } from 'react';
import { SpaceXLaunch } from '../types';
import { spaceXService } from '../services/spaceXService';

const SpaceXTimeline: React.FC = () => {
  const [launches, setLaunches] = useState<SpaceXLaunch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    spaceXService.getPastLaunches(20)
      .then(setLaunches)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-space font-bold">SpaceX Mission History</h2>
        <div className="px-4 py-1 rounded-full bg-slate-800 text-slate-400 text-sm border border-slate-700">
          Showing last 20 missions
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-800 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-800"></div>

          <div className="space-y-8">
            {launches.map((launch, idx) => (
              <div key={launch.flight_number} className="relative pl-16 group">
                {/* Connector Dot */}
                <div className="absolute left-[21px] top-6 w-3 h-3 rounded-full border-2 border-slate-900 bg-blue-500 group-hover:scale-150 transition-transform"></div>
                
                <div className="glass-panel p-6 rounded-2xl border-slate-800 group-hover:border-blue-500/50 transition-all flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 p-2 flex-shrink-0 border border-slate-700">
                    {launch.links.mission_patch_small ? (
                      <img src={launch.links.mission_patch_small} alt={launch.mission_name} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">N/A</div>
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-space font-bold">{launch.mission_name}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${launch.launch_success ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {launch.launch_success ? 'Success' : 'Failure'}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm line-clamp-1">{launch.details || "No mission description provided."}</p>
                    <div className="flex gap-4 text-xs font-semibold text-slate-500 uppercase tracking-widest mt-2">
                       <span>{new Date(launch.launch_date_utc).toLocaleDateString()}</span>
                       <span>•</span>
                       <span>Rocket: {launch.rocket.rocket_name}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {launch.links.article_link && (
                      <a href={launch.links.article_link} target="_blank" rel="noreferrer" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                      </a>
                    )}
                    {launch.links.video_link && (
                      <a href={launch.links.video_link} target="_blank" rel="noreferrer" className="p-2 bg-red-600/10 hover:bg-red-600/20 rounded-lg text-red-500 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaceXTimeline;
