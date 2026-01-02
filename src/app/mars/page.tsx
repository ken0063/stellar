"use client";

import { MarsRoverExplorer } from "@/components/shared/MarsRoverExplorer";
import { PageLayout } from "@/components/shared/PageLayout";
import { Star } from "lucide-react";

export default function MarsPage() {
	return (
		<PageLayout>
			<section className="pt-12 sm:pt-20 pb-20 sm:pb-32">
				<div className="max-w-4xl space-y-6 sm:space-y-8">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400">
						<Star size={12} fill="currentColor" />
						Planetary Exploration
					</div>
					
					<h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-none sm:leading-[0.9] uppercase italic">
						The <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-red-400 to-amber-400">Red Planet</span> Discovery
					</h1>
					
					<p className="text-white/50 text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed font-light">
						Browse through thousands of high-resolution images captured by NASA&apos;s Mars rovers: Curiosity, Opportunity, and Spirit.
					</p>
				</div>
			</section>

			<section className="pb-24">
				<MarsRoverExplorer />
			</section>
		</PageLayout>
	);
}
