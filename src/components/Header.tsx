import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { navLinks, site } from "../data/site";
import { useCart } from "../cart/useCart";
import {
	headerContentVariants,
	headerItemVariants,
	mobileMenuVariants,
} from "../variants";

export default function Header() {
	const { pathname } = useLocation();
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const { count, openCart } = useCart();
	/** o hero da home é vermelho: o header começa transparente sobre ele */
	const onRed = pathname === "/" && !scrolled;

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<>
			<header
				className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
					onRed
						? "border-b border-paper/15 bg-transparent"
						: "border-b border-cocoa-900/10 bg-paper/90 backdrop-blur-xl"
				}`}
			>
				<motion.div
					variants={headerContentVariants}
					initial="hidden"
					animate="visible"
					className="shell grid h-[var(--header-h)] grid-cols-[auto_1fr] items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]"
				>
					<motion.div variants={headerItemVariants} className="col-start-1 row-start-1 justify-self-start">
						<Link
							to="/"
							aria-label="Charlotte — início"
							className="relative grid h-11 w-11 place-items-center lg:h-12 lg:w-12"
						>
							<img
								src="/images/logo.png"
								alt=""
								aria-hidden="true"
								className={`absolute h-11 w-11 transition-opacity duration-500 lg:h-12 lg:w-12 ${
									onRed ? "opacity-100" : "opacity-0"
								}`}
							/>
							<img
								src="/images/logo-red.png"
								alt=""
								aria-hidden="true"
								className={`absolute h-11 w-11 transition-opacity duration-500 lg:h-12 lg:w-12 ${
									onRed ? "opacity-0" : "opacity-100"
								}`}
							/>
						</Link>
					</motion.div>

					<motion.nav
						variants={headerItemVariants}
						aria-label="Navegação principal"
						className="col-start-2 row-start-1 hidden items-center gap-7 md:flex lg:gap-9"
					>
						{navLinks.map((link) => (
							<NavLink
								key={link.to}
								to={link.to}
								className={({ isActive }) =>
									`tag rule whitespace-nowrap transition-colors duration-300 ${
										onRed
											? "text-paper/70 hover:text-paper"
											: "text-cocoa-500 hover:text-cocoa-900"
									} ${isActive ? (onRed ? "text-paper" : "text-chrltt-500") : ""}`
								}
							>
								{link.label}
							</NavLink>
						))}
					</motion.nav>

					<motion.div
						variants={headerItemVariants}
						className="col-start-2 row-start-1 flex items-center justify-end gap-3 md:col-start-3"
					>
						<a
							href={site.links.whatsapp}
							target="_blank"
							rel="noreferrer"
							className={`tag hidden whitespace-nowrap px-5 py-3 transition-colors duration-300 lg:block ${
								onRed
									? "bg-paper text-chrltt-600 hover:bg-chrltt-500 hover:text-paper"
									: "bg-chrltt-500 text-paper hover:bg-cocoa-900"
							}`}
						>
							Pedir no WhatsApp
						</a>

						<button
							type="button"
							onClick={openCart}
							aria-label={`Abrir meu pedido (${count} ${count === 1 ? "item" : "itens"})`}
							className={`tag relative flex items-center gap-2 border px-4 py-2.5 transition-colors duration-300 ${
								onRed
									? "border-paper/40 text-paper hover:bg-paper hover:text-chrltt-600"
									: "border-cocoa-900/25 text-cocoa-900 hover:bg-cocoa-900 hover:text-paper"
							}`}
						>
							Pedido
							<span
								className={`grid h-5 min-w-5 place-items-center px-1 text-[0.625rem] font-bold tabular-nums transition-colors duration-300 ${
									count > 0
										? "bg-chrltt-500 text-paper"
										: onRed
											? "bg-paper/20 text-paper"
											: "bg-cocoa-900/10 text-cocoa-500"
								}`}
							>
								{count}
							</span>
						</button>

						<button
							type="button"
							onClick={() => setOpen((value) => !value)}
							aria-expanded={open}
							aria-label={open ? "Fechar menu" : "Abrir menu"}
							className={`relative grid h-9 w-9 place-items-center md:hidden ${
								onRed ? "text-paper" : "text-cocoa-900"
							}`}
						>
							<span className="flex w-6 flex-col gap-[6px]">
								<span
									className={`h-[2px] w-full bg-current transition-transform duration-300 ${
										open ? "translate-y-[4px] rotate-45" : ""
									}`}
								/>
								<span
									className={`h-[2px] w-full bg-current transition-transform duration-300 ${
										open ? "-translate-y-[4px] -rotate-45" : ""
									}`}
								/>
							</span>
						</button>
					</motion.div>
				</motion.div>
			</header>

			<AnimatePresence>
				{open && (
					<motion.div
						variants={mobileMenuVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						className="fixed inset-0 z-40 bg-chrltt-500 text-paper md:hidden"
					>
						<div className="grain-layer opacity-[0.1]" />
						<nav className="relative flex h-full flex-col justify-center gap-1 px-6 pt-20">
							{navLinks.map((link) => (
								<Link
									key={link.to}
									to={link.to}
									onClick={() => setOpen(false)}
									className="poster border-b border-paper/20 py-5 text-4xl"
								>
									{link.label}
								</Link>
							))}

							<a
								href={site.links.whatsapp}
								target="_blank"
								rel="noreferrer"
								onClick={() => setOpen(false)}
								className="tag mt-10 inline-block self-start bg-paper px-6 py-4 text-chrltt-600"
							>
								Pedir no WhatsApp
							</a>

							<a
								href={site.links.ifood}
								target="_blank"
								rel="noreferrer"
								onClick={() => setOpen(false)}
								className="tag mt-3 inline-block self-start border border-paper/40 px-6 py-4 text-paper"
							>
								Pedir no iFood ↗
							</a>

							<p className="mt-12 text-sm text-paper/70">
								{site.address.street} — {site.address.district}
							</p>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
