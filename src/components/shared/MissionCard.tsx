"use client"

import Image from "next/image";
import type { SpaceXLaunch } from "@/domain/models/space-data";

interface MissionCardProps {
	launch: SpaceXLaunch;
}

export function MissionCard({ launch }: MissionCardProps) {
	return (
		<div className="flex gap-6 p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-white/20 transition-all">
			<div className="relative w-20 h-20 shrink-0 bg-white/5 rounded-2xl overflow-hidden p-2">
				{launch.links.patch.small ? (
					<Image
						src={launch.links.patch.small}
						alt={launch.name}
						fill
						className="object-contain p-2"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center text-2xl">🚀</div>
				)}
			</div>
			
			<div className="flex-1 space-y-2">
				<div className="flex justify-between items-start">
					<div>
						<span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
							Flight #{launch.flight_number}
						</span>
						<h4 className="text-xl font-bold text-white">{launch.name}</h4>
					</div>
					<span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
						launch.success 
							? "bg-green-500/10 text-green-500" 
							: "bg-red-500/10 text-red-500"
					}`}>
						{launch.success ? "Success" : "Failed"}
					</span>
				</div>
				
				<p className="text-sm text-white/60 line-clamp-2">
					{launch.details || "No mission description provided."}
				</p>
				
				<div className="flex gap-4 pt-2">
					<span className="text-[10px] text-white/40">
						{new Date(launch.date_utc).toLocaleDateString()}
					</span>
					{launch.links.article && (
						<a 
							href={launch.links.article} 
							target="_blank" 
							rel="noreferrer"
							className="text-[10px] text-blue-400 hover:underline"
						>
							Read Article
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
