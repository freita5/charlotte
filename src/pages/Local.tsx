import { motion } from "motion/react";
import Map from "../components/Map";
import Reveal from "../components/Reveal";
import OpenBadge from "../components/OpenBadge";
import { instagramHandle, site } from "../data/site";
import { localMapVariants, stagger } from "../variants";

const directions = [
	{
		title: "De carro",
		text: "Av. Dr. Nilo Peçanha, 67, no Parque Santo Amaro. Tem estacionamento na frente da loja.",
	},
	{
		title: "A pé",
		text: "Duas quadras da praça central, no coração do bairro. Difícil passar ali sem ver a vitrine.",
	},
	{
		title: "Retirada",
		text: "Manda seu pedido no WhatsApp antes e a gente deixa separado no balcão, com o seu nome na sacola.",
	},
];

export default function Local() {
	return (
		<section className="relative bg-paper pt-[calc(var(--header-h)+2rem)] pb-24 sm:pb-32">
			<div className="shell">
				<Reveal>
					<h1 className="poster text-[clamp(3rem,11vw,9rem)]">
						Onde estamos
					</h1>
					<p className="mt-6 max-w-2xl text-lg leading-relaxed text-cocoa-700">
						Balcão no Parque Santo Amaro, com entrega própria em Campos e
						região. Antes de vir, confere se a gente está aberto — os horários
						ficam aqui do lado.
					</p>
				</Reveal>

				<div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
					<div className="lg:col-span-5">
						<Reveal>
							<address className="not-italic">
								<p className="tag text-cocoa-500">Endereço</p>
								<p className="mt-4 text-3xl leading-tight font-semibold sm:text-4xl">
									{site.address.street}
								</p>
								<p className="mt-3 text-cocoa-700">
									{site.address.district} · {site.address.city}/
									{site.address.state}
								</p>
								<p className="text-cocoa-700">{site.address.zip}</p>
							</address>
						</Reveal>

						<Reveal delay={0.05}>
							<div className="mt-10 flex items-baseline justify-between gap-6 border-t border-cocoa-900/20 pt-4">
								<p className="tag text-cocoa-500">Horários do balcão</p>
								<OpenBadge className="text-cocoa-500" />
							</div>
							<dl>
								{site.hours.map((hour) => (
									<div
										key={hour.days}
										className="flex justify-between gap-6 border-b border-cocoa-900/20 py-4"
									>
										<dt className="text-cocoa-500">{hour.days}</dt>
										<dd className="font-semibold">{hour.time}</dd>
									</div>
								))}
							</dl>
						</Reveal>

						<Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
							<a
								href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
									`${site.name} Cake Shop, ${site.address.street}, ${site.address.city}`,
								)}`}
								target="_blank"
								rel="noreferrer"
								className="tag bg-chrltt-500 px-6 py-4 text-paper transition-colors duration-300 hover:bg-cocoa-900"
							>
								Abrir no Maps ↗
							</a>
							<a
								href={site.links.whatsapp}
								target="_blank"
								rel="noreferrer"
								className="tag border border-cocoa-900/25 px-6 py-4 transition-colors duration-300 hover:border-cocoa-900"
							>
								{site.phoneLabel}
							</a>
							<a
								href={site.links.instagram}
								target="_blank"
								rel="noreferrer"
								aria-label={`Instagram da Charlotte: ${instagramHandle}`}
								className="tag border border-cocoa-900/25 px-6 py-4 transition-colors duration-300 hover:border-cocoa-900"
							>
								Instagram ↗
							</a>
							</Reveal>
					</div>

					<motion.div
						variants={localMapVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.15 }}
						className="lg:col-span-7"
					>
						<Map />
					</motion.div>
				</div>

				<motion.ul
					variants={stagger(0.1)}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					className="mt-24 grid gap-10 border-t border-cocoa-900/20 pt-12 sm:grid-cols-3 sm:gap-8"
				>
					{directions.map((direction) => (
						<motion.li key={direction.title} variants={stagger()}>
							<h2 className="poster text-3xl">{direction.title}</h2>
							<p className="mt-3 max-w-xs text-sm leading-relaxed text-cocoa-500">
								{direction.text}
							</p>
						</motion.li>
					))}
				</motion.ul>
			</div>
		</section>
	);
}
