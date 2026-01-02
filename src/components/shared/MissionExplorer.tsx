"use client";

import { useInfiniteSpaceXLaunches } from "@/hooks/use-space-data";
import { MissionCard } from "./MissionCard";
import { useEffect, useRef } from "react";

export function MissionExplorer() {
	const { 
		data, 
		fetchNextPage, 
		hasNextPage, 
		isFetchingNextPage, 
		isLoading, 
		error 
	} = useInfiniteSpaceXLaunches();

	const observerTarget = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasNextPage) {
					fetchNextPage();
				}
			},
			{ threshold: 1.0 }
		);

		if (observerTarget.current) {
			observer.observe(observerTarget.current);
		}

		return () => observer.disconnect();
	}, [fetchNextPage, hasNextPage]);

	const launches = data?.pages.flatMap((page) => page.docs) || [];

	return (
		<div className="space-y-8">
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
					launches.map((launch) => (
						<MissionCard key={launch.id} launch={launch} />
					))
				)}
			</div>

			{/* Loading indicator for next page */}
			{(isFetchingNextPage || hasNextPage) && (
				<div ref={observerTarget} className="flex justify-center py-8">
					{isFetchingNextPage && (
						<div className="flex gap-2 items-center text-white/40 text-sm">
							<div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0s" }} />
							<div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0.2s" }} />
							<div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0.4s" }} />
						</div>
					)}
				</div>
			)}
			
			{!hasNextPage && launches.length > 0 && (
				<div className="text-center py-8 text-white/20 text-sm">
					End of mission log
				</div>
			)}
		</div>
	);
}
