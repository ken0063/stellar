"use client";

import { useSpaceXLaunches } from "@/hooks/use-space-data";
import { MissionCard } from "./MissionCard";
import { useState } from "react";

export function MissionExplorer() {
	const [limit, setLimit] = useState(10);
	const { data: launches, isLoading, error } = useSpaceXLaunches(limit);

	return (
		<div className="space-y-8">
			<div className="flex justify-between items-center">
				<h3 className="text-xl font-bold">Past Missions</h3>
				<div className="flex items-center gap-2">
					<span className="text-sm text-white/40">Showing</span>
					<select 
						value={limit} 
						onChange={(e) => setLimit(Number(e.target.value))}
						className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-white/40"
					>
						<option value={10}>10</option>
						<option value={20}>20</option>
						<option value={50}>50</option>
					</select>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{isLoading ? (
					Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className="h-40 bg-white/5 rounded-3xl animate-pulse" />
					))
				) : error ? (
					<div className="col-span-full py-20 text-center text-white/40">
						Failed to recover mission data. SpaceX servers might be offline.
					</div>
				) : (
					launches?.map((launch) => (
						<MissionCard key={launch.id} launch={launch} />
					))
				)}
			</div>

			{launches && launches.length === limit && (
				<div className="flex justify-center pt-8">
					<button 
						onClick={() => setLimit(prev => prev + 10)}
						className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full text-sm font-bold transition-all border border-white/10"
					>
						Load More Missions
					</button>
				</div>
			)}
		</div>
	);
}
