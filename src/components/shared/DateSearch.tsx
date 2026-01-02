"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DateSearch() {
	const [date, setDate] = useState("");
	const router = useRouter();

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (date) {
			// In a real app, we might navigate to /apod/[date]
			// For this MVP, we can just reload the home with a query param
			router.push(`/?date=${date}`);
		}
	};

	return (
		<form onSubmit={handleSearch} className="flex gap-2">
			<input
				type="date"
				max={new Date().toISOString().split("T")[0]}
				value={date}
				onChange={(e) => setDate(e.target.value)}
				className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-white/40"
			/>
			<button
				type="submit"
				className="px-6 py-2 bg-white text-black rounded-xl text-sm font-bold hover:bg-white/90 transition-all"
			>
				Explore Date
			</button>
		</form>
	);
}
