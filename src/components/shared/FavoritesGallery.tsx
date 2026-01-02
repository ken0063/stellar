"use client";

import { useFavorites } from "@/hooks/use-favorites";
import Image from "next/image";

export function FavoritesGallery() {
	const { favorites } = useFavorites();

	if (favorites.length === 0) return null;

	return (
		<section className="space-y-6 pt-12">
			<div className="flex justify-between items-center">
				<h3 className="text-2xl font-bold tracking-tight">Your Space Collection</h3>
				<span className="text-xs font-bold text-white/40 uppercase tracking-widest">
					{favorites.length} Saved Items
				</span>
			</div>
			
			<div className="flex gap-6 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
				{favorites.map((item) => (
					<div 
						key={item.id} 
						className="relative shrink-0 w-64 h-40 rounded-2xl overflow-hidden border border-white/10 group cursor-pointer"
					>
						<Image
							src={item.url}
							alt={item.title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-110"
						/>
						<div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
						<div className="absolute bottom-4 left-4 right-4">
							<span className="text-[8px] font-bold uppercase tracking-widest text-white/60 mb-1 block">
								{item.type}
							</span>
							<h4 className="text-sm font-semibold text-white/90 truncate">
								{item.title}
							</h4>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
