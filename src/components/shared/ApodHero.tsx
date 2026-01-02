"use client"

import Image from "next/image";
import dynamic from "next/dynamic";
import type { ApodData } from "@/domain/models/space-data";

const FavoriteButton = dynamic(() => import("./FavoriteButton").then(mod => mod.FavoriteButton), { 
	ssr: false,
	loading: () => <div className="p-3 rounded-full backdrop-blur-md border border-white/20 bg-white/10 w-[46px] h-[46px]" />
});

interface ApodHeroProps {
	data: ApodData;
}

export function ApodHero({ data }: ApodHeroProps) {
	return (
		<section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden rounded-3xl group">
			{data.media_type === "image" ? (
				<Image
					src={data.hdurl || data.url}
					alt={data.title}
					fill
					priority
					className="object-cover transition-transform duration-700 group-hover:scale-105"
					sizes="100vw"
				/>
			) : (
				<iframe
					title={data.title}
					src={data.url}
					className="w-full h-full border-none"
					allowFullScreen
				/>
			)}

			<div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10">
				<FavoriteButton
					item={{
						type: "apod",
						id: data.date,
						url: data.url,
						title: data.title,
					}}
				/>
			</div>

			<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 md:p-16">
				<div className="max-w-4xl space-y-4">
					<div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white">
						Astronomy Picture of the Day
					</div>
					<h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">
						{data.title}
					</h1>
					<p className="text-base sm:text-lg text-white/80 line-clamp-3 md:line-clamp-none max-w-2xl">
						{data.explanation}
					</p>
					<div className="flex items-center gap-4 pt-4 text-xs sm:text-sm text-white/60">
						<span>{data.date}</span>
						{data.copyright && (
							<>
								<span className="w-1 h-1 bg-white/40 rounded-full" />
								<span>© {data.copyright}</span>
							</>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
