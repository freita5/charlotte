import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Marquee from "../components/Marquee";
import MenuFilters from "../components/MenuFilters";
import MenuRow from "../components/MenuRow";
import {
	categories,
	filterProducts,
	type CategoryId,
} from "../data/products";
import { instagramHandle, site } from "../data/site";
import { useCart } from "../cart/useCart";
import {
	heroContainerVariants,
	heroItemVariants,
	stagger,
} from "../variants";

const steps = [
	{
		title: "Escolha",
		text: "Monte sua sacola no cardápio. A gente mostra o total na hora, sem surpresa.",
	},
	{
		title: "Mande",
		text: "Um clique abre o WhatsApp com a lista e as quantidades já escritas.",
	},
	{
		title: "Receba",
		text: "Ou peça pelo iFood, com entrega e pagamento resolvidos lá dentro.",
	},
];

const ticker = [
	"Torta no pote",
	"Fatia de torta",
	"Bolo gelado",
	"Baby cake",
	"Bolo inglês",
	"Cookie",
	"Cappuccino",
	"Pão de queijo",
	"Brigadeiro",
	"Entrega em Campos",
];


export default function Home() {
	const { openCart, count } = useCart();
	const [filtro, setFiltro] = useState<CategoryId>("todos");
	const [busca, setBusca] = useState("");

	/* "Tudo" não é um grupo de verdade: quando está ativo mostramos os nove
	   grupos reais, cada um com seu título. */
	const lista = useMemo(() => filterProducts(filtro, busca), [filtro, busca]);

	const visivel = useMemo(
		() =>
			categories
				.filter((category) => category.id !== "todos")
				.map((category) => ({
					id: category.id,
					label: category.label,
					items: lista.filter((product) => product.category === category.id),
				}))
				.filter((group) => group.items.length > 0),
		[lista],
	);

	const total = lista.length;

	return (
		<>
			{/* ------------------------------------------------------------ hero */}
			<section className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-chrltt-500 text-paper">
				<div className="grain-layer opacity-[0.1]" />

				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 overflow-hidden"
				>
					<motion.div
						initial={{ scale: 1.12, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
						className="absolute inset-y-0 right-0 w-full sm:w-[72%] lg:w-[52%]"
					>
						<img
							src="/images/editorial/hero-panel.jpg"
							alt=""
							className="h-full w-full object-cover object-center"
							fetchPriority="high"
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-chrltt-500 via-chrltt-500/85 to-chrltt-500/45 sm:hidden" />
						<div className="absolute inset-0 hidden bg-gradient-to-r from-chrltt-500 via-chrltt-500/60 to-transparent sm:block lg:via-chrltt-500/25" />
					</motion.div>
				</div>

				<div className="relative shell flex grow flex-col justify-center gap-12 pt-[calc(var(--header-h)+2rem)] pb-16 lg:pb-20">
					<motion.div
						variants={heroContainerVariants}
						initial="hidden"
						animate="visible"
						className="relative flex-1"
					>

						<h1 className="poster-hero relative text-[clamp(3.25rem,15vw,34rem)]">
							Doces que
							<br />
							celebram e
							<br />
							criam memórias
						</h1>
					</motion.div>

					<motion.div
						variants={heroContainerVariants}
						initial="hidden"
						animate="visible"
						className="flex flex-wrap gap-3"
					>
						<button
							type="button"
							onClick={openCart}
							className="tag bg-paper px-6 py-4 text-chrltt-600 transition-colors duration-300 hover:bg-cocoa-900 hover:text-paper"
						>
							Minha sacola{count > 0 ? ` (${count})` : ""}
						</button>
						<a
							href={site.links.ifood}
							target="_blank"
							rel="noreferrer"
							className="tag border border-paper/40 px-6 py-4 transition-colors duration-300 hover:bg-paper hover:text-chrltt-600"
						>
							iFood ↗
						</a>
					</motion.div>
				</div>
			</section>

			<Marquee items={ticker} />

			{/* ---------------------------------------------------------- cardápio */}
			<section className="relative bg-paper-2/60 py-24 sm:py-32">
				<div className="shell">
					<div className="flex flex-wrap items-end justify-between gap-6">
						<Reveal>
							<h2 className="poster text-[clamp(2.5rem,7vw,5.5rem)]">
								O que a
								<br />
								gente faz
							</h2>
						</Reveal>
						<Reveal delay={0.05} className="max-w-sm">
							<p className="text-sm leading-relaxed text-cocoa-500">
								Tudo o que está no nosso iFood, com o preço que sai na sua
								tela. Monte a sacola aqui ou abra o item lá.
							</p>
						</Reveal>

						<Reveal delay={0.05} className="flex flex-wrap gap-3">
							<button
								type="button"
								onClick={openCart}
								className="tag bg-chrltt-500 px-6 py-4 text-paper transition-colors duration-300 hover:bg-cocoa-900"
							>
								Minha sacola{count > 0 ? ` (${count})` : ""}
							</button>
							<Link
								to="/produtos"
								className="tag border border-cocoa-900/25 px-6 py-4 transition-colors duration-300 hover:border-cocoa-900 hover:bg-cocoa-900 hover:text-paper"
							>
								Ver em grade
							</Link>
						</Reveal>
					</div>

					<MenuFilters
						value={filtro}
						query={busca}
						count={total}
						onCategory={setFiltro}
						onQuery={setBusca}
					/>

					<div className="mt-12 space-y-20">
						{visivel.map((group) => (
							<div key={group.id} id={group.id} className="scroll-mt-32">
								<div className="flex items-baseline justify-between gap-6">
									<h3 className="poster text-[clamp(1.75rem,4.5vw,3.25rem)]">
										{group.label}
									</h3>
									<span className="tag text-cocoa-400">
										{group.items.length} itens
									</span>
								</div>

								<ul className="mt-6 grid gap-x-10 gap-y-0 lg:grid-cols-2">
									{group.items.map((product) => (
										<MenuRow key={product.slug} product={product} />
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ---------------------------------------------------------- pedidos */}
			<section className="grain relative isolate bg-chrltt-500 py-24 text-paper sm:py-32">
				<div className="grain-layer opacity-[0.1]" />
				<div className="relative shell">
					<Reveal>
						<h2 className="poster max-w-[16ch] text-[clamp(2.5rem,7vw,5.5rem)]">
							Do cardápio até a sua mesa
						</h2>
					</Reveal>

					<motion.ul
						variants={stagger(0.1, 0.05)}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
						className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8"
					>
						{steps.map((step) => (
							<motion.li key={step.title} variants={heroItemVariants}>
								<h3 className="poster text-4xl">{step.title}</h3>
								<p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/75">
									{step.text}
								</p>
							</motion.li>
						))}
					</motion.ul>

					<Reveal delay={0.05} className="mt-16 flex flex-wrap gap-3">
						<button
							type="button"
							onClick={openCart}
							className="tag bg-paper px-6 py-4 text-chrltt-600 transition-colors duration-300 hover:bg-cocoa-900 hover:text-paper"
						>
							Montar meu pedido
						</button>
						<a
							href={site.links.ifood}
							target="_blank"
							rel="noreferrer"
							className="tag border border-paper/40 px-6 py-4 transition-colors duration-300 hover:bg-paper hover:text-chrltt-600"
						>
							Pedir no iFood ↗
						</a>
						<a
							href={site.links.whatsapp}
							target="_blank"
							rel="noreferrer"
							className="tag border border-paper/40 px-6 py-4 transition-colors duration-300 hover:bg-paper hover:text-chrltt-600"
						>
							Falar no WhatsApp
						</a>
						<a
							href={site.links.instagram}
							target="_blank"
							rel="noreferrer"
							aria-label={`Instagram da Charlotte: ${instagramHandle}`}
							className="tag border border-paper/40 px-6 py-4 transition-colors duration-300 hover:bg-paper hover:text-chrltt-600"
						>
							Instagram ↗
						</a>
					</Reveal>
				</div>
			</section>

			{/* --------------------------------------------------------- endereço */}
			<section className="relative bg-paper py-24 sm:py-32">
					<div className="shell grid gap-12 lg:grid-cols-12 lg:items-end">
					<Reveal className="lg:col-span-8">
						<p className="tag text-cocoa-500">Onde estamos</p>
						<address className="mt-6 not-italic">
							<p className="poster text-[clamp(2rem,5.5vw,4.25rem)]">
								Av. Dr. Nilo Peçanha, 67
							</p>
							<p className="mt-4 text-lg text-cocoa-700">
								{site.address.district} · {site.address.city}/
								{site.address.state} · {site.address.zip}
							</p>
						</address>

					<div className="mt-10 flex flex-wrap gap-3">
						<Link
							to="/localizacao"
							className="tag bg-cocoa-900 px-6 py-4 text-paper transition-colors duration-300 hover:bg-chrltt-500"
						>
							Ver no mapa
						</Link>
						<a
							href={site.links.whatsapp}
							target="_blank"
							rel="noreferrer"
							className="tag border border-cocoa-900/25 px-6 py-4 transition-colors duration-300 hover:border-cocoa-900"
						>
							{site.phoneLabel}
						</a>
					</div>
					</Reveal>

					<Reveal delay={0.1} className="lg:col-span-3 lg:col-start-10">
						<dl className="space-y-4">
							{site.hours.map((hour) => (
								<div
									key={hour.days}
									className="flex justify-between gap-4 border-b border-cocoa-900/15 pb-4"
								>
									<dt className="text-sm text-cocoa-500">{hour.days}</dt>
									<dd className="text-sm font-semibold">{hour.time}</dd>
								</div>
							))}
						</dl>
					</Reveal>
				</div>
			</section>
		</>
	);
}
