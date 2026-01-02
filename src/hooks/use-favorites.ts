"use client";

import { useFavoritesStore } from "@/store/favorites-store";

export function useFavorites() {
	const { favorites, addFavorite, removeFavorite, toggleFavorite } =
		useFavoritesStore();

	return {
		favorites,
		addFavorite,
		removeFavorite,
		toggleFavorite,
	};
}
