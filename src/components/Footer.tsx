import { Link } from "react-router-dom";
import OpenBadge from "./OpenBadge";
import { motion } from "motion/react";
import { navLinks, site } from "../data/site";
import { footerElementVariants, footerVariants } from "../variants";

const orderLinks = [
	{ label: "WhatsApp", href: site.links.whatsapp },
	{ label: "iFood", href: site.links.ifood },
	{ label: "Instagram", href: site.links.instagram },
];

export default function Footer() {
	return (
		<footer className="grain relative isolate overflow-hidden bg-cocoa-900 text-paper">
			<div className="grain-layer opacity-[0.08]" />

			<motion.div
				variants={footerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.15 }}
				className="relative shell pt-20 pb-8 sm:pt-24"
			>
				<div className="grid gap-12 lg:grid-cols-12">
					<motion.div variants={footerElementVariants} className="lg:col-span-5">
						<p className="tag text-paper/50">Fale com a gente no WhatsApp</p>
						<p className="mt-6 max-w-sm text-lg leading-relaxed text-paper/85">
							Encomenda sob medida pede 48h de antecedência. Para festa,
							evento ou presente, manda mensagem antes que o balcão feche.
						</p>
						<a
							href={site.links.whatsapp}
							target="_blank"
							rel="noreferrer"
							className="poster mt-8 block text-4xl transition-colors duration-300 hover:text-chrltt-300 sm:text-5xl"
						>
							{site.phoneLabel}
						</a>
					</motion.div>

					<motion.div variants={footerElementVariants} className="lg:col-span-3">
						<p className="tag text-paper/50">Navegação</p>
						<ul className="mt-6 space-y-3">
							{navLinks.map((link) => (
								<li key={link.to}>
									<Link to={link.to} className="rule text-paper/85 hover:text-paper">
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</motion.div>

					<motion.div variants={footerElementVariants} className="lg:col-span-2">
						<p className="tag text-paper/50">Pedir</p>
						<ul className="mt-6 space-y-3">
							{orderLinks.map((link) => (
								<li key={link.href}>
									<a
										href={link.href}
										target="_blank"
										rel="noreferrer"
										className="rule text-paper/85 hover:text-paper"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</motion.div>

					<motion.div variants={footerElementVariants} className="lg:col-span-2">
						<p className="tag text-paper/50">Balcão</p>
						<address className="mt-6 space-y-1 not-italic text-paper/85">
							<p>{site.address.street}</p>
							<p>{site.address.district}</p>
							<p>
								{site.address.city}/{site.address.state}
							</p>
							<p className="text-paper/50">{site.address.zip}</p>
						</address>

						<dl className="mt-8 space-y-2 text-sm text-paper/70">
							{site.hours.map((hour) => (
								<div key={hour.days} className="flex justify-between gap-4">
									<dt className="text-paper/50">{hour.days}</dt>
									<dd>{hour.time}</dd>
								</div>
							))}
						</dl>
					</motion.div>
				</div>

				<div className="mt-20 flex flex-col gap-4 border-t border-paper/15 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
					<p>
						© {new Date().getFullYear()} {site.name} Cake Shop · {site.city}
					</p>
					<OpenBadge className="text-paper/70" />
				</div>
			</motion.div>

			<motion.p
				aria-hidden="true"
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
				className="poster pointer-events-none -mb-[0.13em] w-full select-none whitespace-nowrap text-center text-[14.2vw] text-paper/[0.09]"
			>
				Charlotte
			</motion.p>
		</footer>
	);
}
