import { create } from "zustand";

interface MarsFilterState {
	rover: string;
	sol: number;
	camera: string | undefined;
}

interface MarsFilterStore {
	filters: MarsFilterState;
	setRover: (rover: string) => void;
	setSol: (sol: number) => void;
	setCamera: (camera: string | undefined) => void;
	setFilters: (filters: MarsFilterState) => void;
}

export const useMarsFilterStore = create<MarsFilterStore>((set) => ({
	filters: {
		rover: "curiosity",
		sol: 1000,
		camera: undefined,
	},
	setRover: (rover) =>
		set((state) => ({
			filters: { ...state.filters, rover },
		})),
	setSol: (sol) =>
		set((state) => ({
			filters: { ...state.filters, sol },
		})),
	setCamera: (camera) =>
		set((state) => ({
			filters: { ...state.filters, camera },
		})),
	setFilters: (filters) => set({ filters }),
}));
