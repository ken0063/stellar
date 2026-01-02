"use client";

import { useMarsFilterStore } from "@/store/mars-store";
import { useMarsPhotos } from "@/hooks/use-space-data";
import { MarsPhotoCard } from "./MarsPhotoCard";

const ROVERS = ["curiosity", "opportunity", "spirit"];

export function MarsRoverExplorer() {
	const filters = useMarsFilterStore((state) => state.filters);
	const setFilters = useMarsFilterStore((state) => state.setFilters);
	const { data: photos, isLoading, error } = useMarsPhotos(filters.rover, filters.sol, filters.camera);

	return (
		<div className="space-y-8">
			{/* Filters */}
			<div className="flex flex-col sm:flex-row flex-wrap gap-6 p-4 sm:p-6 bg-white/5 rounded-2xl border border-white/10">
				<div className="space-y-3">
					<label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">Select Rover</label>
					<div className="flex flex-wrap gap-2">
						{ROVERS.map((rover) => (
							<button
								key={rover}
								onClick={() => setFilters({ ...filters, rover })}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
									filters.rover === rover 
										? "bg-white text-black" 
										: "bg-white/10 text-white/60 hover:bg-white/20"
								}`}
							>
								{rover.charAt(0).toUpperCase() + rover.slice(1)}
							</button>
						))}
					</div>
				</div>

				<div className="space-y-3">
					<label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">Martian Sol</label>
					<input
						type="number"
						value={filters.sol}
						onChange={(e) => setFilters({ ...filters, sol: parseInt(e.target.value) || 1000 })}
						className="px-4 py-2 bg-white/10 rounded-lg text-sm text-white border border-white/10 focus:outline-none focus:border-white/40 w-full sm:w-32"
					/>
				</div>
			</div>

			{/* Results */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{isLoading ? (
					Array.from({ length: 8 }).map((_, i) => (
						<div key={i} className="aspect-4/5 bg-white/5 rounded-2xl animate-pulse" />
					))
				) : error ? (
					<div className="col-span-full py-20 text-center text-white/40">
						Failed to detect Mars signals. Try another Sol.
					</div>
				) : photos && photos.length > 0 ? (
					photos.map((photo) => (
						<MarsPhotoCard key={photo.id} photo={photo} />
					))
				) : (
					<div className="col-span-full py-20 text-center text-white/40">
						No photos found for this rover and Sol.
					</div>
				)}
			</div>
		</div>
	);
}
