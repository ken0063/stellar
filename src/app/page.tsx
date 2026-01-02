"use client";

import { ArrowRight, Star, Map, Camera } from "lucide-react";
import Link from "next/link";
import { PageLayout } from "@/components/shared/PageLayout";

export default function LandingPage() {
	return (
		<PageLayout>
			{/* Hero Section */}
			<section className="pt-12 sm:pt-20 pb-20 sm:pb-32">
				<div className="max-w-4xl space-y-6 sm:space-y-8">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
						<Star size={12} fill="currentColor" />
						Next-Gen Space Exploration
					</div>
					
					<h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none sm:leading-[0.9] uppercase italic">
						Discover the <br />
						<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">
							Infinite Cosmos
						</span>
					</h1>
					
					<p className="text-white/50 text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed font-light">
						Journey through the stars with real-time NASA data, live satellite tracking, and high-definition imagery from across the solar system.
					</p>
					
					<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6 sm:pt-8">
						<Link 
							href="/apod" 
							className="px-8 sm:px-10 py-4 sm:py-5 bg-white text-black rounded-2xl font-black uppercase text-xs sm:text-sm flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
						>
							Start Exploring <ArrowRight size={18} />
						</Link>
						<Link 
							href="/missions" 
							className="px-8 sm:px-10 py-4 sm:py-5 bg-white/5 border border-white/10 rounded-2xl font-black uppercase text-xs sm:text-sm flex items-center justify-center hover:bg-white/10 transition-all backdrop-blur-md"
						>
							View Missions
						</Link>
					</div>
				</div>
			</section>

			{/* Feature Cards Grid */}
			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-24">
				<FeatureCard 
					title="Celestial Day"
					description="NASA's Astronomy Picture of the Day. A new cosmic wonder every 24 hours."
					href="/apod"
					icon={<Camera size={24} />}
					color="blue"
				/>
				<FeatureCard 
					title="Red Planet"
					description="Browse thousands of raw images from curiosity, opportunity, and spirit."
					href="/mars"
					icon={<Map size={24} />}
					color="orange"
				/>
				<FeatureCard 
					title="Orbit Watch"
					description="Track the International Space Station in real-time as it circles the globe."
					href="/iss"
					icon={<Rocket size={24} />}
					color="purple"
				/>
				<FeatureCard 
					title="Launch Log"
					description="Complete SpaceX mission history and upcoming launch manifest."
					href="/missions"
					icon={<Star size={24} />}
					color="pink"
				/>
			</section>
		</PageLayout>
	);
}

function FeatureCard({ title, description, href, icon, color }: { 
	title: string, 
	description: string, 
	href: string, 
	icon: React.ReactNode,
	color: 'blue' | 'orange' | 'purple' | 'pink'
}) {
	const colors = {
		blue: 'group-hover:text-blue-400 border-blue-500/0 group-hover:border-blue-500/20 bg-blue-500/10',
		orange: 'group-hover:text-orange-400 border-orange-500/0 group-hover:border-orange-500/20 bg-orange-500/10',
		purple: 'group-hover:text-purple-400 border-purple-500/0 group-hover:border-purple-500/20 bg-purple-500/10',
		pink: 'group-hover:text-pink-400 border-pink-500/0 group-hover:border-pink-500/20 bg-pink-500/10',
	};

	return (
		<Link href={href} className="group p-8 bg-white/3 backdrop-blur-xl rounded-4xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between h-[320px] relative overflow-hidden">
			{/* Background Glow */}
			<div className={`absolute -top-10 -right-10 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${colors[color].split(' ')[2]}`} />
			
			<div>
				<div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 transition-all duration-500 ${colors[color]}`}>
					{icon}
				</div>
				<h3 className="text-2xl font-black uppercase italic mt-8 group-hover:tracking-wider transition-all duration-500 tracking-tight">
					{title}
				</h3>
				<p className="text-white/40 text-sm mt-4 leading-relaxed font-medium">
					{description}
				</p>
			</div>
			
			<div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">
				Dive Deep <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
			</div>
		</Link>
	);
}

import { Rocket } from "lucide-react";
