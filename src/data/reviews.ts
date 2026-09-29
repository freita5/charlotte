/**
 * Depoimentos reais, copiados do Google via Restaurant Guru.
 *
 * Fonte: https://restaurantguru.com.br/Charlotte-Cake-Shop-Campos/reviews?bylang=1
 * Coletado em: 28/09/2026. A página traz 30 avaliações, 19 delas com 5
 * estrelas. Todas as de cá são 5 estrelas de verdade — a nota vem do
 * atributo `data-score` de cada avaliação, não foi escolhida por sentimento.
 *
 * Três cuidados que valem para qualquer futura troca aqui:
 *
 * 1. `score` é 5 para todas. Uma avaliação 5 estrelas pode ainda ser uma
 *    reclamação (tem uma na fonte que acusa o balcão de pedir avaliação em
 *    troca de desconto). Se for incluir, leia o texto, não só a nota.
 * 2. O texto é do cliente e não muda. Cortar pela metade ou reescrever
 *    quebra a confiança de quem abrir o link.
 * 3. A data vem como "X meses atrás" na origem. Já convertida para mês/ano
 *    aqui para não envelhecer — se trocar, reconverta.
 *
 * A contagem é do Google (mostrada como "Google / 318" na fonte) e vale para
 * a página inteira, não só para estas.
 *
 * `tilt` e `paper` não são dado da fonte: são escolha de design. O `tilt` em
 * graus dá a volta do papel na parede; o `paper` escolhe a cor do adesivo.
 */

export interface Review {
	/** nome como aparece no Google */
	author: string;
	/** fala do cliente, literal */
	quote: string;
	/** quando publicada, para não envelhecer */
	date: string;
	/** sempre 5 nesta lista */
	score: 5;
	/** quanto a nota gira na parede, em graus */
	tilt: number;
	/** índice da paleta de adesivo */
	paper: number;
}

export const reviews: readonly Review[] = [
	{
		author: "Maylon Souza",
		quote:
			"Fazia tempo que não via algo tão bom em Campos. Serviço rápido, bolo gostoso e preço bom. Recomendo demais.",
		date: "fev/2026",
		score: 5,
		tilt: -2.2,
		paper: 0,
	},
	{
		author: "Gilmar Duarte",
		quote: "Muito chique. Ótimo quiche, pães de queijo e café.",
		date: "dez/2025",
		score: 5,
		tilt: 1.8,
		paper: 1,
	},
	{
		author: "Karine Andrade Almeida Sorio",
		quote:
			"Que ambiente maravilhoso! Ótimo atendimento, ambiente estiloso, acolhedor e moderno. Foi uma parada rápida para um lanchinho super gostoso. Quero voltar!",
		date: "dez/2025",
		score: 5,
		tilt: -1.2,
		paper: 2,
	},
	{
		author: "Sanny Cortes Elias",
		quote: "O bombom de morango da Charlotte é o melhor que existe.",
		date: "2025",
		score: 5,
		tilt: 2.4,
		paper: 3,
	},
	{
		author: "Mônica Manhães Ribeiro",
		quote:
			"Perfeito. Decoração, atendimento, qualidade dos produtos e o café mais maravilhoso q já provei.",
		date: "mar/2026",
		score: 5,
		tilt: -1.9,
		paper: 4,
	},
	{
		author: "Maxy Rangel",
		quote:
			"Simplesmente o melhor lugar para tomar um bom café, muitas variedades de bebidas quentes e geladas, bolos, pães e kiche deliciosos. Vale mto a pena, excepcional.",
		date: "out/2025",
		score: 5,
		tilt: 1.4,
		paper: 5,
	},
	{
		author: "Guilherme Azeredo",
		quote:
			"Bom atendimento e produtos de qualidade, ambiente agradavel para tomor um café bem feito pela barista.",
		date: "dez/2025",
		score: 5,
		tilt: -2.6,
		paper: 3,
	},
	{
		author: "Leticia Souza",
		quote: "Doces e salgados maravilhosos, vale a pena a experiência!",
		date: "2025",
		score: 5,
		tilt: 2.1,
		paper: 0,
	},
	{
		author: "Marcelle Cortes Barbosa Cortes",
		quote:
			"Lugar aconchegante, climatizados,ambiente perfeito para relaxar com as amigas parabéns",
		date: "2025",
		score: 5,
		tilt: -1.5,
		paper: 2,
	},
	{
		author: "Jimmy Barreto",
		quote: "Excelente atendimento e ótimas opções de tortas e sobremesas",
		date: "abr/2026",
		score: 5,
		tilt: 1.7,
		paper: 5,
	},
	{
		author: "Luana Tomaz",
		quote: "A melhor da cidade!!!",
		date: "2025",
		score: 5,
		tilt: -2.0,
		paper: 1,
	},
	{
		author: "Anne Castellar",
		quote: "Bolos de alta qualidade, deliciosos e atendimento excelente!",
		date: "mar/2026",
		score: 5,
		tilt: 1.6,
		paper: 4,
	},
];

/** Quantas avaliações o Google tem da loja, e onde ver todas. */
export const reviewStats = {
	source: "Google",
	total: 318,
} as const;
