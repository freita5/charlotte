import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Marquee from "../components/Marquee";
import MenuFilters from "../components/MenuFilters";
import MenuRow from "../components/MenuRow";
import OpenBadge from "../components/OpenBadge";
import Reviews from "../components/Reviews";
import {
	categories,
	filterProducts,
	type CategoryId,
} from "../data/products";
import { instagramHandle, site, whatsappLink } from "../data/site";
import { useCart } from "../cart/useCart";
import {
	heroContainerVariants,
	heroItemVariants,
	stagger,
} from "../variants";

/* Os três passos contam UMA história só: montar aqui, mandar, receber.
   O iFood aparece no fim do terceiro passo como rota alternativa — antes ele
   ocupava um passo inteiro e quebrava a sequência. */
const steps = [
	{
		title: "Escolha",
		text: "Some no cardápio e veja o total subindo na hora. Sem surpresa no fim.",
	},
	{
		title: "Mande",
		text: "Um clique abre o WhatsApp com os itens e as quantidades já escritos. Só falta conferir o endereço.",
	},
	{
		title: "Receba",
		text: "Entrega em Campos e região, ou retirada no balcão. Se preferir, o iFood resolve entrega e pagamento lá dentro.",
	},
];

/* O ticker alterna produto e motivo de comprar. Uma lista só de produtos
   passa batido: nomear o benefício no meio é o que segura o olhar. */
const ticker = [
	"Torta no pote",
	"Entrega em Campos",
	"Bolo gelado",
	"Feito à mão",
	"Fatia de torta",
	"Baby cake",
	"Bolo inglês",
	"Retirada no balcão",
	"Cookie",
	"Cappuccino",
	"Pão de queijo",
	"Brigadeiro",
	"Encomenda sob medida",
	"Parque Santo Amaro",
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

				<div className="relative shell flex grow flex-col justify-center gap-8 pt-[calc(var(--header-h)+2rem)] pb-12 sm:gap-10 lg:pb-16">
					<motion.div
						variants={heroContainerVariants}
						initial="hidden"
						animate="visible"
						className="relative flex flex-col gap-6"
					>

						{/* O teto e 9.4rem, nao um vw livre. A conta esta no `poster-hero`: a
						    linha mais longa, "CRIAM MEMORIAS", mede 8.013em e tem que caber no
						    container. Com o `shell` em 84rem menos 3.5rem de cada lado sobram
						    77rem, o que da 9.6rem — 9.4rem e o mesmo numero com folga.

						    O `min(10.4vw, 15vh)` cuida das telas menores, onde ainda ha largura
						    sobrando. Acima de 91rem de viewport o `shell` para de crescer, e so o
						    teto em rem segura a linha. */}
						<h1 className="poster-hero relative text-[clamp(2.1rem,min(10.4vw,15vh),9.4rem)]">
							Doces que
							<br />
							celebram e
							<br />
							criam memórias
						</h1>

						{/* O titulo fala da ocasiao, nao da loja. A linha de baixo diz o que sai da
							cozinha e onde a gente esta. Sem preco e sem explicar o mecanismo do
							pedido, que os botoes logo abaixo ja dizem. */}
						<p className="max-w-2xl text-base leading-relaxed text-paper/85 sm:text-lg">
							Salgado, doce e café da casa, no Parque Santo Amaro. Entrega em Campos
							e região.
						</p>
					</motion.div>

					<motion.div
						variants={heroContainerVariants}
						initial="hidden"
						animate="visible"
						className="flex flex-col gap-5"
					>
						{/* Nada de carrinho aqui. Quem chega pela primeira vez nao tem nada
						    na sacola, entao um botao de sacola abre um beco sem saida. A
						    sacola mora no cabecalho e so aparece junto dos produtos; aqui o
						    caminho primario vai direto ao balcao, que funciona mesmo sem
						    nenhum contexto previo. */}
						<div className="flex flex-wrap gap-3">
							<a
								href={whatsappLink("Olá! Vim pelo site e gostaria de fazer um pedido.")}
								target="_blank"
								rel="noreferrer"
								className="tag bg-paper px-6 py-4 text-chrltt-600 transition-colors duration-300 hover:bg-cocoa-900 hover:text-paper"
							>
								Pedir no WhatsApp
							</a>
							<a
								href="#cardapio"
								className="tag border border-paper/40 px-6 py-4 transition-colors duration-300 hover:bg-paper hover:text-chrltt-600"
							>
								Ver o cardápio
							</a>
						</div>

						<p className="text-sm text-paper/70">
							Prefere resolver pelo app?{" "}
							<a
								href={site.links.ifood}
								target="_blank"
								rel="noreferrer"
								className="rule text-paper"
							>
								Pedir no iFood ↗
							</a>
						</p>
					</motion.div>
				</div>
			</section>

			<Marquee items={ticker} />

			{/* ---------------------------------------------------------- cardápio */}
			{/* `id` porque o botão "Ver o cardápio" do hero aponta pra cá. */}
			<section
				id="cardapio"
				className="relative scroll-mt-20 bg-paper-2/60 py-24 sm:py-32"
			>
				<div className="shell">
					<div className="flex flex-wrap items-end justify-between gap-6">
						<Reveal>
							<h2 className="poster text-[clamp(2.5rem,7vw,5.5rem)]">
								O que sai
								<br />
								da cozinha
							</h2>
						</Reveal>

						<Reveal delay={0.05} className="flex flex-wrap gap-3">
							<button
								type="button"
								onClick={openCart}
								className="tag bg-chrltt-500 px-6 py-4 text-paper transition-colors duration-300 hover:bg-cocoa-900"
							>
								Montar meu pedido{count > 0 ? ` · ${count}` : ""}
							</button>
							<Link
								to="/produtos"
								className="tag border border-cocoa-900/25 px-6 py-4 transition-colors duration-300 hover:border-cocoa-900 hover:bg-cocoa-900 hover:text-paper"
							>
								Ver em cards
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

			<Reviews />

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
							Chamar no WhatsApp
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
							<p className="mt-3 max-w-md text-sm leading-relaxed text-cocoa-500">
								Balcão no Parque Santo Amaro, com entrega própria em Campos
								e região. Encomenda pronta a gente deixa separada com seu
								nome.
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
						<div className="flex items-baseline justify-between gap-4">
							<p className="tag text-cocoa-500">Horários</p>
							<OpenBadge className="text-cocoa-500" />
						</div>
						<dl className="mt-4 space-y-4">
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
