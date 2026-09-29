import { useMemo, useState } from "react";
import { motion } from "motion/react";
import MenuFilters from "../components/MenuFilters";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import {
	MINIMUM_ORDER,
	filterProducts,
	formatPrice,
	type CategoryId,
} from "../data/products";
import { site } from "../data/site";
import { useCart } from "../cart/useCart";

export default function Products() {
	const [active, setActive] = useState<CategoryId>("todos");
	const [query, setQuery] = useState("");
	const { openCart, count, total } = useCart();

	const list = useMemo(() => filterProducts(active, query), [active, query]);

	return (
		<section className="bg-paper pt-[calc(var(--header-h)+2rem)] pb-24 sm:pb-32">
			<div className="shell">
				<Reveal>
					<div className="flex flex-wrap items-end justify-between gap-6">
						<h1 className="poster text-[clamp(3rem,11vw,9rem)]">Cardápio</h1>
						<p className="tag text-cocoa-500">
							{list.length} {list.length === 1 ? "produto" : "produtos"}
						</p>
					</div>
				</Reveal>

				<Reveal
					delay={0.05}
					className="mt-10 flex flex-col gap-6 border-t border-cocoa-900/20 pt-8 lg:flex-row lg:items-end lg:justify-between"
				>
					<p className="max-w-2xl text-lg leading-relaxed text-cocoa-700">
						O cardápio inteiro do iFood, com o preço que sai na sua tela.
						Monte sua sacola com o stepper e a lista vai pro WhatsApp. O link
						de cada item abre o prato certo lá dentro.
					</p>
					<button
						type="button"
						onClick={openCart}
						className="tag shrink-0 bg-chrltt-500 px-6 py-4 text-paper transition-colors duration-300 hover:bg-cocoa-900"
					>
						Ver sacola
						{count > 0 ? ` · ${count}` : ""}
						{total > 0 ? ` · ${formatPrice(total)}` : ""}
					</button>
				</Reveal>

				<MenuFilters
					value={active}
					query={query}
					count={list.length}
					onCategory={setActive}
					onQuery={setQuery}
				/>

				<motion.div
					layout
					className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
				>
					{list.map((product, index) => (
						<ProductCard
							key={product.slug}
							product={product}
							index={index % 4}
							layout
						/>
					))}
				</motion.div>

				{list.length === 0 && (
					<p className="mt-16 text-center text-cocoa-500">
						Nada encontrado. Tenta outra palavra ou{" "}
						<button
							type="button"
							onClick={() => {
								setQuery("");
								setActive("todos");
							}}
							className="rule text-chrltt-600"
						>
							ver o cardápio inteiro
						</button>
						.
					</p>
				)}

				<Reveal
					delay={0.05}
					className="mt-24 grid gap-8 border border-cocoa-900/20 p-8 sm:grid-cols-2 sm:p-12"
				>
					<div>
						<h2 className="poster text-3xl sm:text-4xl">
							Quer algo que não está na lista?
						</h2>
						<p className="mt-4 max-w-md text-cocoa-700">
							A gente monta torta no pote, mesa de doces, baby cake e caixa
							presente sob medida, a partir de {formatPrice(MINIMUM_ORDER)}.
							Conta o que você imaginou que a gente resolve.
						</p>
					</div>

					<div className="flex flex-wrap items-start gap-3 sm:justify-end">
						<a
							href={site.links.whatsapp}
							target="_blank"
							rel="noreferrer"
							className="tag bg-chrltt-500 px-6 py-4 text-paper transition-colors duration-300 hover:bg-cocoa-900"
						>
							Chamar no WhatsApp
						</a>
						<a
							href={site.links.ifood}
							target="_blank"
							rel="noreferrer"
							className="tag border border-cocoa-900/25 px-6 py-4 transition-colors duration-300 hover:border-cocoa-900"
						>
							Pedir no iFood ↗
						</a>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
