import Reveal from "../components/Reveal";
import { hoursLine, site } from "../data/site";
import { useCart } from "../cart/useCart";

const faq = [
	{
		question: "Como faço para pedir?",
		answer:
			"Monte sua sacola aqui no site e mande pelo WhatsApp — a lista vai com os produtos e as quantidades já escritas. Ou, se preferir, feche o pedido no iFood, que resolve entrega e pagamento.",
	},
	{
		question: "Qual é o pedido mínimo?",
		answer:
			"R$ 25,00. A sacola avisa quanto falta para bater o mínimo antes de você enviar.",
	},
	{
		question: "Vocês entregam?",
		answer:
			"Entrega própria em Campos e região. Para cidades vizinhas, o iFood calcula o frete e o prazo.",
	},
	{
		question: "Com quanto de antecedência devo pedir?",
		answer:
			"Para torta no pote, biscoitinho e doses, 48 horas resolvem. Para datas grandes e encomendas sob medida, uma semana.",
	},
	{
		question: "Dá para pedir sem lactose ou sem glúten?",
		answer:
			"Dá. Trocamos a massa por uma opção sem glúten e montamos os recheios sem lactose, em produção separada. Só avise com antecedência.",
	},
	{
		question: "Como faço para pagar?",
		answer:
			"No Pix (a gente manda a chave no WhatsApp), no cartão na entrega ou na retirada, ou pelo próprio iFood.",
	},
];

export default function Orders() {
	const { openCart } = useCart();

	return (
		<section className="bg-paper pt-[calc(var(--header-h)+2rem)] pb-24 sm:pb-32">
			<div className="shell">
				<Reveal>
					<h1 className="poster text-[clamp(3rem,11vw,9rem)]">Encomendas</h1>
				</Reveal>

				<Reveal
					delay={0.05}
					className="mt-10 flex flex-col gap-6 border-t border-cocoa-900/20 pt-8 lg:flex-row lg:items-end lg:justify-between"
				>
					<p className="max-w-2xl text-lg leading-relaxed text-cocoa-700">
						Monte a sacola no cardápio e mande pelo WhatsApp, ou feche tudo
						dentro do iFood. As duas rotas chegam na mesma cozinha.
					</p>
					<p className="tag shrink-0 text-cocoa-500">{hoursLine}</p>
				</Reveal>

				<div className="mt-16">
					<Reveal y={18}>
						<button
							type="button"
							onClick={openCart}
							className="group relative flex w-full flex-col gap-4 overflow-hidden border-b border-cocoa-900/15 py-8 pr-6 text-left sm:flex-row sm:items-end sm:justify-between sm:py-10 sm:pr-8"
						>
							<span
								aria-hidden="true"
								className="absolute inset-0 origin-left scale-x-0 bg-chrltt-500 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
							/>
							<span className="relative flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-8">
								<span className="tag w-24 shrink-0 pl-6 text-chrltt-600 transition-colors duration-500 group-hover:text-paper/70">
									WhatsApp
								</span>
								<span className="poster text-4xl transition-colors duration-500 group-hover:text-paper sm:text-6xl">
									Monte seu pedido
								</span>
							</span>
							<span className="tag relative flex items-center gap-3 text-cocoa-900 transition-colors duration-500 group-hover:text-paper">
								Abrir a sacola
								<span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
									→
								</span>
							</span>
						</button>
					</Reveal>

					<Reveal y={18}>
						<a
							href={site.links.ifood}
							target="_blank"
							rel="noreferrer"
							className="group relative flex flex-col gap-4 border-b border-cocoa-900/15 py-8 pr-6 sm:flex-row sm:items-end sm:justify-between sm:py-10 sm:pr-8"
						>
							<span
								aria-hidden="true"
								className="absolute inset-0 origin-left scale-x-0 bg-chrltt-500 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
							/>
							<span className="relative flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-8">
								<span className="tag w-24 shrink-0 pl-6 text-chrltt-600 transition-colors duration-500 group-hover:text-paper/70">
									iFood
								</span>
								<span className="poster text-4xl transition-colors duration-500 group-hover:text-paper sm:text-6xl">
									Peça pelo app
								</span>
							</span>

							<span className="relative flex flex-col gap-4 sm:max-w-xs sm:items-end">
								<span className="text-sm leading-relaxed text-cocoa-500 transition-colors duration-500 group-hover:text-paper/80 sm:text-right">
									Entrega e pagamento resolvidos dentro do app. Suporta
									clientes novos e o Pix na entrega.
								</span>
								<span className="tag flex items-center gap-3 text-cocoa-900 transition-colors duration-500 group-hover:text-paper">
									Abrir o iFood
									<span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
										→
									</span>
								</span>
							</span>
						</a>
					</Reveal>
				</div>

				<div className="mt-28 grid gap-12 lg:grid-cols-12 lg:gap-14">
					<div className="lg:col-span-4">
						<Reveal>
							<h2 className="poster text-[clamp(2rem,4.5vw,3.5rem)]">
								Dúvidas
							</h2>
						</Reveal>
					</div>

					<div className="lg:col-span-8">
						<div className="border-t border-cocoa-900/20">
							{faq.map((item) => (
								<details
									key={item.question}
									className="group border-b border-cocoa-900/20"
								>
									<summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-xl font-semibold transition-colors duration-300 hover:text-chrltt-600 sm:text-2xl">
										{item.question}
										<span
											aria-hidden="true"
											className="relative grid h-4 w-4 shrink-0 place-items-center"
										>
											<span className="absolute h-px w-4 bg-current" />
											<span className="absolute h-4 w-px bg-current transition-transform duration-300 group-open:rotate-90" />
										</span>
									</summary>
									<p className="max-w-2xl pb-7 text-sm leading-relaxed text-cocoa-500 sm:text-base">
										{item.answer}
									</p>
								</details>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
