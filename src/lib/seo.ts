import type { Metadata } from "next";

export function getSEOMetadata(title: string, description: string, image?: string): Metadata {
	const siteName = "Stellar Explorer";
	const fullTitle = `${title} | ${siteName}`;
	
	return {
		title: fullTitle,
		description,
		openGraph: {
			title: fullTitle,
			description,
			siteName,
			images: image ? [{ url: image }] : [],
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: fullTitle,
			description,
			images: image ? [image] : [],
		},
	};
}
