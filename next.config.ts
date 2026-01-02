import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		turbopack: {
			root: process.cwd(),
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "apod.nasa.gov",
			},
			{
				protocol: "https",
				hostname: "mars.nasa.gov",
			},
			{
				protocol: "https",
				hostname: "images-assets.nasa.gov",
			},
			{
				protocol: "https",
				hostname: "images.spacexdata.com",
			},
			{
				protocol: "https",
				hostname: "live.staticflickr.com",
			},
			{
				protocol: "https",
				hostname: "farm*.staticflickr.com",
			},
			{
				protocol: "https",
				hostname: "images2.imgbox.com",
			},
			{
				protocol: "https",
				hostname: "img.youtube.com",
			},
		],
	},
};

export default nextConfig;
