import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FavoriteItem {
	type: string;
	id: string;
	url: string;
	title: string;
}

interface FavoritesStore {
	favorites: FavoriteItem[];
	addFavorite: (item: FavoriteItem) => void;
	removeFavorite: (id: string) => void;
	toggleFavorite: (item: FavoriteItem) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
	persist(
		(set) => ({
			favorites: [],
			addFavorite: (item) =>
				set((state) => ({
					favorites: [...state.favorites, item],
				})),
			removeFavorite: (id) =>
				set((state) => ({
					favorites: state.favorites.filter((f) => f.id !== id),
				})),
			toggleFavorite: (item) =>
				set((state) => {
					const isFavorite = state.favorites.some((f) => f.id === item.id);
					if (isFavorite) {
						return {
							favorites: state.favorites.filter((f) => f.id !== item.id),
						};
					}
					return {
						favorites: [...state.favorites, item],
					};
				}),
		}),
		{
			name: "stellar_favorites",
		}
	)
);
