"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useIssLocation } from "@/hooks/use-space-data";

export default function IssTracker() {
	const svgRef = useRef<SVGSVGElement>(null);
	const { data: location, isLoading } = useIssLocation();

	useEffect(() => {
		if (!svgRef.current || !location) return;

		const width = 800;
		const height = 450;
		const svg = d3.select(svgRef.current);
		svg.selectAll("*").remove();

		const projection = d3.geoEquirectangular()
			.scale(width / (2 * Math.PI))
			.translate([width / 2, height / 2]);

		const path = d3.geoPath().projection(projection);

		// Draw map
		d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(() => {
			// const countries = (data.objects.countries as any);
            // // This is a simplified version for demonstration
			svg.append("path")
				.attr("d", path({ type: "Sphere" }))
				.attr("fill", "#0a0a0a")
				.attr("stroke", "#ffffff20");

			// ISS Marker
			const [x, y] = projection([parseFloat(location.longitude), parseFloat(location.latitude)]) || [0, 0];

			svg.append("circle")
				.attr("cx", x)
				.attr("cy", y)
				.attr("r", 5)
				.attr("fill", "#60a5fa")
				.attr("class", "animate-pulse")
				.style("filter", "drop-shadow(0 0 8px #60a5fa)");

			svg.append("text")
				.attr("x", x + 10)
				.attr("y", y + 4)
				.attr("fill", "white")
				.attr("font-size", "10px")
				.attr("font-weight", "bold")
				.text("ISS");
		});

	}, [location]);

	if (isLoading) return <div className="w-full h-[450px] bg-white/5 rounded-3xl animate-pulse" />;

	return (
		<div className="space-y-6">
			<div className="bg-white/5 p-8 rounded-3xl border border-white/10 overflow-hidden">
				<svg
					ref={svgRef}
					viewBox="0 0 800 450"
					className="w-full h-auto"
				/>
			</div>
			
			<div className="grid grid-cols-2 gap-4">
				<div className="p-4 bg-white/5 rounded-2xl border border-white/10">
					<span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">Latitude</span>
					<span className="text-xl font-mono">{location?.latitude}°</span>
				</div>
				<div className="p-4 bg-white/5 rounded-2xl border border-white/10">
					<span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">Longitude</span>
					<span className="text-xl font-mono">{location?.longitude}°</span>
				</div>
			</div>
		</div>
	);
}
