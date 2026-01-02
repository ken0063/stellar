"use client";

import dynamic from "next/dynamic";
import { PageLayout } from "@/components/shared/PageLayout";
import { Star } from "lucide-react";

const IssTracker = dynamic(
	() => import("@/components/visualizations/IssTracker"),
	{ ssr: false }
);

export default function IssPage() {
	return (
		<PageLayout>
			<section className="pt-20 pb-32">
				<div className="max-w-4xl space-y-8">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">
						<Star size={12} fill="currentColor" />
						Orbit Watch
					</div>
					
					<h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] uppercase italic">
						International <br />
						<span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-blue-400 to-cyan-400">
							Space Station
						</span>
					</h1>
					
					<p className="text-white/50 text-xl md:text-2xl max-w-2xl leading-relaxed font-light">
						Tracking the ISS in real-time as it orbits Earth at approximately 28,000 km/h. Updated every 5 seconds.
					</p>
				</div>
			</section>

			<section className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-24">
				<div className="lg:col-span-2 space-y-6">
					<IssTracker />
				</div>
				
				<div className="space-y-8">
					<div className="p-10 bg-white/3 backdrop-blur-xl rounded-[2.5rem] border border-white/10 space-y-6">
						<h3 className="text-2xl font-black uppercase italic tracking-tight">Orbital Facts</h3>
						<ul className="space-y-4 text-sm">
							<li className="flex justify-between items-center border-b border-white/5 pb-4">
								<span className="font-bold text-white/40 uppercase tracking-widest text-[10px]">Altitude</span>
								<span className="font-medium">~420 km</span>
							</li>
							<li className="flex justify-between items-center border-b border-white/5 pb-4">
								<span className="font-bold text-white/40 uppercase tracking-widest text-[10px]">Orbital period</span>
								<span className="font-medium">92.9 min</span>
							</li>
							<li className="flex justify-between items-center border-b border-white/5 pb-4">
								<span className="font-bold text-white/40 uppercase tracking-widest text-[10px]">Orbits per day</span>
								<span className="font-medium">15.5</span>
							</li>
							<li className="flex justify-between items-center">
								<span className="font-bold text-white/40 uppercase tracking-widest text-[10px]">Launch date</span>
								<span className="font-medium text-xs">Nov 20, 1998</span>
							</li>
						</ul>
					</div>
					
					<div className="p-10 bg-blue-600/3 backdrop-blur-xl rounded-[2.5rem] border border-blue-500/20 space-y-6 group">
						<div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
							📡
						</div>
						<h3 className="text-2xl font-black uppercase italic tracking-tight">Station Visibility</h3>
						<p className="text-sm text-white/40 leading-relaxed">
							The ISS is often visible to the naked eye as a bright, fast-moving point of light.
						</p>
						<button className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors">
							Check Visibility Near Me →
						</button>
					</div>
				</div>
			</section>
		</PageLayout>
	);
}
