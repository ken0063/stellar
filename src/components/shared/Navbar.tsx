"use client";

import Link from "next/link";
import { Rocket, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function Navbar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	// Prevent scroll when menu is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [isOpen]);

	const navItems = [
		{ name: "Apod", href: "/apod" },
		{ name: "Mars", href: "/mars" },
		{ name: "ISS", href: "/iss" },
		{ name: "Missions", href: "/missions" },
	];

	return (
		<header className="flex justify-between items-center py-8 md:py-10 relative z-50">
			<Link 
				href="/" 
				className="flex items-center gap-2 group cursor-pointer z-50"
				onClick={() => setIsOpen(false)}
			>
				<div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all">
					<Rocket size={20} className="text-white group-hover:rotate-12 transition-transform" />
				</div>
				<h2 className="text-2xl font-black tracking-tighter uppercase italic">Stellar</h2>
			</Link>
			
			{/* Desktop Nav */}
			<nav className="hidden md:flex gap-10 text-[13px] font-bold tracking-widest uppercase">
				{navItems.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className={`transition-colors hover:text-white ${
							pathname === item.href ? "text-white" : "text-white/40"
						}`}
					>
						{item.name}
					</Link>
				))}
			</nav>

			{/* Mobile Menu Toggle */}
			<button 
				className="md:hidden z-50 p-2 text-white/60 hover:text-white transition-colors"
				onClick={() => setIsOpen(!isOpen)}
				aria-label="Toggle Menu"
			>
				{isOpen ? <X size={28} /> : <Menu size={28} />}
			</button>

			{/* Mobile Nav Overlay */}
			<div className={`
				fixed inset-0 bg-black/95 backdrop-blur-xl z-40 transition-all duration-500 md:hidden
				flex flex-col items-center justify-center gap-8
				${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
			`}>
				{navItems.map((item, index) => (
					<Link
						key={item.href}
						href={item.href}
						onClick={() => setIsOpen(false)}
						className={`text-4xl font-black uppercase italic tracking-tighter transition-all duration-500 transform ${
							isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
						} ${
							pathname === item.href ? "text-white scale-110" : "text-white/30"
						}`}
						style={{ transitionDelay: `${index * 100}ms` }}
					>
						{item.name}
					</Link>
				))}
			</div>
		</header>
	);
}
