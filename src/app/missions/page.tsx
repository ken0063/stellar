"use client";

import { MissionExplorer } from "@/components/shared/MissionExplorer";
import { PageLayout } from "@/components/shared/PageLayout";
import { Star } from "lucide-react";
// import { useSpaceXLaunches } from "@/hooks/use-space-data";
// import Image from "next/image";

export default function MissionsPage() {
	// const { data: launches } = useSpaceXLaunches(1);
	// TEMP: Inject test video ID for verification
	// const latestLaunch = launches?.[0] ? {
	// 	...launches[0],
	// 	links: {
	// 		...launches[0].links,
	// 		youtube_id: launches[0].links.youtube_id || "921VbIMAi98" // Falcon Heavy Test Flight
	// 	}
	// } : undefined;

	return (
		<PageLayout>
			<section className="pt-20 pb-32">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
					<div className="space-y-8">
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-pink-400">
							<Star size={12} fill="currentColor" />
							Launch Log
						</div>
						
						<h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] uppercase italic">
							Reaching for the <br />
							<span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400">
								Stars
							</span>
						</h1>
						
						<p className="text-white/50 text-xl md:text-2xl max-w-2xl leading-relaxed font-light">
							Explore the complete history of SpaceX launches, from the early Falcon 1 missions to the revolutionary Starship development.
						</p>

						<div className="flex gap-4 pt-4">
							<div className="flex -space-x-4 overflow-hidden">
								<div className="inline-block h-10 w-10 rounded-full ring-2 ring-black bg-white/10" />
								<div className="inline-block h-10 w-10 rounded-full ring-2 ring-black bg-white/20" />
								<div className="inline-block h-10 w-10 rounded-full ring-2 ring-black bg-white/10" />
							</div>
							<div className="text-sm">
								<p className="font-bold text-white uppercase tracking-tighter italic">400+ Successful Launches</p>
								<p className="text-white/40 italic text-xs">Pushing the boundaries of multi-planetary life.</p>
							</div>
						</div>
					</div>
					
					{/* <div className="relative aspect-video rounded-4xl overflow-hidden bg-white/5 border border-white/10 group backdrop-blur-sm">
						{latestLaunch?.links.youtube_id && (
							<div className="absolute inset-0">
								<Image 
									src={`https://img.youtube.com/vi/${latestLaunch.links.youtube_id}/maxresdefault.jpg`}
									alt="Latest Mission"
									fill
									className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
								/>
							</div>
						)}
						<a 
							href={latestLaunch?.links.webcast || (latestLaunch?.links.youtube_id ? `https://www.youtube.com/watch?v=${latestLaunch.links.youtube_id}` : "#")}
							target="_blank"
							rel="noopener noreferrer" 
							className={`absolute inset-0 flex items-center justify-center ${(!latestLaunch?.links.webcast && !latestLaunch?.links.youtube_id) ? 'pointer-events-none opacity-50' : ''}`}
						>
							<div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform border border-white/10 cursor-pointer">
								<div className="w-0 h-0 border-t-12 border-t-transparent border-l-18 border-l-white border-b-12 border-b-transparent ml-1" />
							</div>
						</a>
						<div className="absolute bottom-8 left-8 text-[10px] font-black uppercase tracking-widest text-white/40">Watch Latest Mission Recap</div>
					</div> */}
				</div>
			</section>

			<section className="pb-24">
				<MissionExplorer />
			</section>
		</PageLayout>
	);
}
