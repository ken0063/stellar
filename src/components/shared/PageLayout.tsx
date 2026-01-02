"use client";

import { Navbar } from "./Navbar";

interface PageLayoutProps {
	children: React.ReactNode;
	showNavbar?: boolean;
}

export function PageLayout({ children, showNavbar = true }: PageLayoutProps) {
	return (
		<main className="min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-x-hidden relative">
			{/* Ambient Background Elements */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
				<div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
				{showNavbar && <Navbar />}
				{children}
			</div>
			
			{/* Decorative Footer Element */}
			<div className="w-full h-1 bg-linear-to-r from-transparent via-white/10 to-transparent mt-24" />
		</main>
	);
}
