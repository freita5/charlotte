import { motion, useReducedMotion } from "motion/react";
import Reveal from "./Reveal";
import { reviewStats, reviews, type Review } from "../data/reviews";
import { site } from "../data/site";

/** Cores de adesivo de verdade, não as do site. A paleta da casa é vermelha
 *  sobre creme; um bloco de notas amarelado sobre esse fundo some. */
const PAPERS = [
	"bg-[#ffeaa0]", // amarelo
	"bg-[#ffc2d1]", // rosa
	"bg-[#b6e3f4]", // azul
	"bg-[#c8f0c0]", // verde
	"bg-[#ffd3a8]", // pêssego
	"bg-[#d9c7f2]", // lilás
] as const;

/** As cinco estrelas, em tinta escura: a cor da marca (`chrltt`) some em
 *  cima de papel amarelo e azul. */
function Stars() {
	return (
		<div className="flex gap-0.5 text-cocoa-700" aria-hidden="true">
			{Array.from({ length: 5 }, (_, index) => (
				<svg key={index} viewBox="0 0 20 19" className="h-3 w-3">
					<path
						fill="currentColor"
						d="M10 0l2.6 6.1 6.6.5-5 4.3 1.5 6.5L10 14l-5.7 3.4 1.5-6.5-5-4.3 6.6-.5z"
					/>
				</svg>
			))}
		</div>
	);
}

function Sticky({ review, index }: { review: Review; index: number }) {
	/* Cada adesivo entra com um atraso diferente, de baixo para cima, como
	   se alguém fosse colando um a um. O `reduce` corta a entrada: quem pede
	   menos movimento não deve ver papel voando na tela. */
	const reduce = useReducedMotion();

	return (
		<motion.li
			initial={reduce ? false : { opacity: 0, y: -40, rotate: review.tilt * 3 }}
			whileInView={{ opacity: 1, y: 0, rotate: review.tilt }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{
				duration: 0.7,
				delay: reduce ? 0 : (index % 4) * 0.09,
				ease: [0.16, 1, 0.3, 1],
			}}
			className="list-none"
		>
			{/* A volta é do `li`, que é quem o motion gira — pôr também aqui
			    somaria as duas e o papel viraria duas vezes o ângulo.

			    O `min-h` é o que deixa o papel perto de um quadrado em vez de
			    uma faixa: sem ele a citação curta de duas linhas encolhe a nota
			    e o mural vira uma parede de retângulos de alturas diferentes.
			    É piso, não altura fixa — a citação de 161 caracteres passa
			    dele sossegada. */}
			<figure
				className={`relative flex h-full min-h-[15rem] flex-col px-5 pt-7 pb-5 shadow-[3px_5px_0_0_rgba(42,23,11,0.13)] sm:min-h-[17rem] sm:px-6 sm:pt-8 sm:pb-6 lg:min-h-[19rem] xl:min-h-[17rem] ${PAPERS[review.paper]}`}
			>
				{/* A fita atravessa a ponta de cima e sobra para fora do papel.
				    É esse pedaço aparente que vende a ideia de que o papel foi
				    colado na parede, e não desenhado dentro da seção. A borda
	   					clara vem do fundo branco meio transparente, que aparece
				    tanto em cima do creme da parede quanto em cima de uma nota
				    amarela — um `multiply` sumiria na parede. */}
					<span
						aria-hidden="true"
						className="absolute -top-3.5 left-1/2 h-7 w-20 -translate-x-1/2 -rotate-2 bg-white/50 shadow-[0_1px_2px_rgba(42,23,11,0.18)]"
					/>
				<span className="sr-only">Avaliação 5 de 5 estrelas</span>

				<Stars />

				<blockquote className="mt-3 grow text-[0.9375rem] leading-snug text-cocoa-900">
					“{review.quote}”
				</blockquote>

				{/* Sem divisória: a nota é um bloco só, e a régua juntava uma
				    linha a mais num pedaço de papel de 300px. */}
				<figcaption className="mt-4 flex items-baseline justify-between gap-3">
					<cite className="text-sm not-italic">{review.author}</cite>
					<span className="tag shrink-0 text-cocoa-500">
						{review.date}
					</span>
				</figcaption>
			</figure>
		</motion.li>
	);
}

/**
 * Prova social como um mural de adesivos. Depoimentos de verdade, com nome e
 * data, e um link para o Google — quem lê precisa conferir lá fora, senão a
 * seção vale tanto quanto um número inventado.
 */
export default function Reviews() {
	const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
		`${site.name} Cake Shop, ${site.address.street}, ${site.address.city}`,
	)}`;

	return (
		<section className="relative bg-paper py-24 sm:py-32">
			<div className="shell">
				{/* Cabeçalho no mesmo formato das outras seções: título flush à
				    esquerda, apoio no canto oposto, alinhados pela base. */}
				<div className="flex flex-wrap items-end justify-between gap-6">
					<Reveal>
						<h2 className="poster text-[clamp(2.5rem,7vw,5.5rem)]">
							Quem já
							<br />
							provou
						</h2>
					</Reveal>

					<Reveal delay={0.05} className="max-w-sm">
						<p className="text-sm leading-relaxed text-cocoa-500">
							{reviewStats.total} avaliações no {reviewStats.source}. Todas
							inteiras e com nome — dá pra conferir.
						</p>
						<a
							href={maps}
							target="_blank"
							rel="noreferrer"
							className="tag rule mt-4 inline-block text-chrltt-600"
						>
							Ler todas no Google ↗
						</a>
					</Reveal>
				</div>

				{/* O `gap-y` é maior que o `gap-x` de propósito, e não por
				    estética: a volta do papel faz a caixa dele crescer em
				    W·sen(θ). Com a nota larga, o canto de baixo invade a nota
				    de baixo. Medido na grade de 3 colunas: 12px de sobreposição
				    em 1920 e 45px em 3840. O 4º breakpoint resolve pela raiz —
				    em 4K a nota tinha 1120px de largura, o que não é um adesivo
				    — e o `gap-y-16` cobre a sobra. */}
				<ul className="mt-16 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{reviews.map((review, index) => (
						<Sticky key={review.author} review={review} index={index} />
					))}
				</ul>
			</div>
		</section>
	);
}
