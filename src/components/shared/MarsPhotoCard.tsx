"use client"

import Image from "next/image";
import type { MarsRoverPhoto } from "@/domain/models/space-data";
import { FavoriteButton } from "./FavoriteButton";

interface MarsPhotoCardProps {
	photo: MarsRoverPhoto;
}

export function MarsPhotoCard({ photo }: MarsPhotoCardProps) {
	return (
		<div className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 transition-all hover:border-white/30 hover:shadow-2xl hover:shadow-white/5">
			<div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
				<FavoriteButton
					item={{
						type: "mars",
						id: photo.id.toString(),
						url: photo.img_src,
						title: `${photo.rover.name} - ${photo.camera.full_name}`,
					}}
				/>
			</div>
			
			<div className="aspect-square relative overflow-hidden">
				<Image
					src={photo.img_src}
					alt={`Mars mission - ${photo.camera.full_name}`}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="object-cover transition-transform duration-500 group-hover:scale-110"
				/>
				<div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			</div>
			
			<div className="p-4 space-y-2">
				<div className="flex justify-between items-start">
					<span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
						{photo.rover.name}
					</span>
					<span className="text-[10px] text-white/40">{photo.earth_date}</span>
				</div>
				<h4 className="text-sm font-semibold text-white/90 line-clamp-1">
					{photo.camera.full_name}
				</h4>
				<div className="flex gap-2">
					<span className="text-[10px] px-2 py-0.5 bg-white/10 rounded-full text-white/60">
						Sol {photo.sol}
					</span>
				</div>
			</div>
		</div>
	);
}
