"use client";

import { Suspense, use } from "react";
import dynamic from "next/dynamic";
import { nasaService } from "@/infrastructure/api/nasa-service";
import { ApodHero } from "@/components/shared/ApodHero";
import { PageLayout } from "@/components/shared/PageLayout";
import { Star } from "lucide-react";
import type { ApodData } from "@/domain/models/space-data";

const FavoritesGallery = dynamic(() => import("@/components/shared/FavoritesGallery").then(mod => mod.FavoritesGallery), { 
	ssr: false,
	loading: () => <div className="h-40 w-full animate-pulse bg-white/5 rounded-2xl" />
});

function ApodContent({ apodPromise }: { apodPromise: Promise<ApodData> }) {
	const data = use(apodPromise);
	return <ApodHero data={data} />;
}

export default function ApodPage({
	searchParams,
}: {
	searchParams: Promise<{ date?: string }>;
}) {
	const params = use(searchParams);
	const apodPromise = nasaService.getApod(params.date);

	return (
		<PageLayout>
			<section className="pt-20 pb-16">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
					<div className="max-w-4xl space-y-8">
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
							<Star size={12} fill="currentColor" />
							Celestial Day
						</div>
						
						<h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] uppercase italic">
							Astronomy Picture <br />
							<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400">
								Of The Day
							</span>
						</h1>
						
						<p className="text-white/50 text-xl md:text-2xl max-w-2xl leading-relaxed font-light">
							Explore the universe through a new cosmic wonder captured by NASA&apos;s telescopes every single day.
						</p>
					</div>
					{/* <div className="w-full md:w-auto pb-2">
						<DateSearch />
					</div> */}
				</div>
			</section>

			<Suspense fallback={
				<div className="w-full h-[80vh] min-h-[600px] bg-white/5 rounded-4xl animate-pulse flex items-center justify-center text-white/20 border border-white/10">
					Loading Cosmic Data...
				</div>
			}>
				<ApodContent apodPromise={apodPromise} />
			</Suspense>

			<div className="mt-24">
				<FavoritesGallery />
			</div>

			<section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-24 pb-24">
				<div className="md:col-span-2 p-10 bg-white/3 backdrop-blur-xl rounded-[2.5rem] border border-white/10 group overflow-hidden relative">
					<div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] group-hover:bg-blue-600/10 transition-all duration-700" />
					<h3 className="text-2xl font-black uppercase italic mb-4">SpaceX Mission Monitor</h3>
					<p className="text-white/40 mb-8 leading-relaxed">Track the latest Starlink deployments and Dragon vessel dockings in real-time with our live mission manifest.</p>
					<a href="/missions" className="inline-flex px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
						View Launch Manifest →
					</a>
				</div>
				<div className="p-10 bg-white/3 backdrop-blur-xl rounded-[2.5rem] border border-white/10 hover:border-white/20 transition-all duration-500 group relative overflow-hidden">
					<div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-600/5 blur-[60px] group-hover:bg-purple-600/10 transition-all duration-700" />
					<h3 className="text-2xl font-black uppercase italic mb-4">Station Log</h3>
					<p className="text-white/40 italic leading-relaxed text-sm mb-8">
						&quot;The ISS has been continuously occupied for over 23 years, serving as a unique laboratory for breakthroughs...&quot;
					</p>
					<a href="/iss" className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors">
						Live Satellite Feed →
					</a>
				</div>
			</section>
		</PageLayout>
	);
}
