"use client";

import { useFavorites } from "@/hooks/use-favorites";
import type { FavoriteItem } from "@/domain/models/space-data";

interface FavoriteButtonProps {
	item: FavoriteItem;
}

export function FavoriteButton({ item }: FavoriteButtonProps) {
	const { favorites, toggleFavorite } = useFavorites();
	
	const isFavorited = favorites.some((f) => f.id === item.id);

	return (
		<button
			onClick={() => toggleFavorite(item)}
			className={`p-3 rounded-full backdrop-blur-md border transition-all ${
				isFavorited 
					? "bg-red-500 border-red-400 text-white scale-110" 
					: "bg-white/10 border-white/20 text-white/60 hover:bg-white/20 hover:text-white"
			}`}
			title={isFavorited ? "Remove from Favorites" : "Save to Favorites"}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill={isFavorited ? "currentColor" : "none"}
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
			</svg>
		</button>
	);
}
