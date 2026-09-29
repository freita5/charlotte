import { site, whatsappLink } from "./site";

/**
 * Cardápio da Charlotte.
 *
 * Duas fontes, e a diferença importa:
 *
 * - Itens COM `d` (id do prato) estão no iFood. A foto vem do CDN do iFood
 *   de propósito: trocar a foto lá já reflete aqui. O botão abre o item
 *   exato, porque `prato=` leva direto ao prato.
 * - Itens SEM `d` são só do balcão — a loja vende, o iFood não lista. O
 *   botão vira "Consultar disponibilidade" e abre o WhatsApp perguntando
 *   pelo item, que é o jeito certo de vender o que tem estoque próprio.
 *
 * O cardápio do iFood é
 * https://www.ifood.com.br/delivery/campos-dos-goytacazes-rj/charlotte-parque-santo-amaro/b86f5ccc-56df-418a-aa3d-5f2ef62b70bb
 * e muda com frequência: conferir antes de mexer nos preços.
 */

/** As fotos moram no CDN do iFood, em `pratos/{catalog}/{arquivo}`. Nem todo
 *  item usa o catálogo da loja: as bebidas de marca vêm de outro. */
const CATALOG = "b86f5ccc-56df-418a-aa3d-5f2ef62b70bb";
const DRINKS_CATALOG = "820af392-002c-47b1-bfae-d7ef31743c7f";
const CDN = "https://static.ifood-static.com.br/image/upload/t_high/pratos";

export const categories = [
	{ id: "todos", label: "Tudo" },
	{ id: "torta", label: "Tortas no pote" },
	{ id: "fatia", label: "Fatias de torta" },
	{ id: "gelado", label: "Bolo gelado" },
	{ id: "dose", label: "Dose extra" },
	{ id: "bolo", label: "Bolo inglês" },
	{ id: "cookie", label: "Cookies" },
	{ id: "cafe", label: "Cafés" },
	{ id: "salgado", label: "Salgados" },
	{ id: "sobremesa", label: "Sobremesas" },
	{ id: "presente", label: "Presentes" },
	{ id: "bebida", label: "Bebidas" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export interface IProduct {
	slug: string;
	/** nome como o iFood mostra */
	ifoodName: string;
	/** mesmo nome, sem o "Tp " do iFood */
	name: string;
	description: string;
	price: number;
	serves?: string;
	tags?: string[];
	category: Exclude<CategoryId, "todos">;
	image?: string;
	/** id do prato no iFood. Ausente = só no balcão. */
	dish?: string;
}

type Row = {
	/** categoria */
	g: Exclude<CategoryId, "todos">;
	/** nome no iFood */
	n: string;
	/** preço em reais */
	p: number;
	/** id do prato — ausente quando o item é só do balcão */
	d?: string;
	/** arquivo da foto no CDN */
	i?: string;
	/** `b` = a foto vive no catálogo de bebidas */
	c?: "b";
	/** descrição */
	x?: string;
	/** "Serve 2 pessoas" */
	s?: string;
	/** etiquetas: sem lactose, vegetariano… */
	t?: string[];
};

const ROWS: Row[] = [
	// ------------------------------------------------- tortas no pote (220 ml)
	{ g: "torta", n: "Tp Ninho com Chocolate", p: 20, d: "a714579a-f23b-47b3-835a-85631621f9cd", i: "202203240255_QJ14_i.jpg", s: "Serve 1 pessoa" },
	{ g: "torta", n: "Tp Dulce Chocolate", p: 20, d: "6b2cf2e2-bbb2-4ab2-95d3-200383435ba9", i: "202401311306_MBXQ_i.jpg" },
	{ g: "torta", n: "Tp Ninho com Chocolate e Morango", p: 23, d: "3ad92a06-b523-444e-9a53-46e054095437", i: "202203240033_U5P3_i.jpg" },
	{ g: "torta", n: "Tp Ninho com Nutella", p: 25, d: "6e4817e3-aeae-4a41-8325-7177a8dc500d", i: "202203240058_5621_i.jpg", x: "Torta no pote Ninho com Nutella.", s: "Serve 1 pessoa" },
	{ g: "torta", n: "Tp Abacaxi com Ninho", p: 22, d: "627656aa-576f-4d52-b3be-f2861b108b78", i: "202203232352_D52V_i.jpg", x: "Creme de Ninho com pedaços de doce de abacaxi caramelizados artesanalmente, intercalado com uma massa de baunilha molhadinha." },
	{ g: "torta", n: "Tp Ninho com Frutas Vermelhas", p: 20, d: "851ca918-4af3-45a3-921f-1ce493b52e23", i: "202203240109_WGM0_i.jpg", x: "Massa de baunilha molhadinha, creme de Ninho e geleia de frutas vermelhas caseira.", s: "Serve 1 pessoa" },
	{ g: "torta", n: "Tp Meio Amargo com Frutas Vermelhas", p: 20, d: "d19b4501-39d7-4274-bf36-4ef4221495d0", i: "202203240104_06GX_i.jpg", x: "Creme de chocolate meio amargo intercalado com massa de chocolate molhadinha, geleia caseira de frutas vermelhas e mousse de baunilha.", s: "Serve 1 pessoa" },
	{ g: "torta", n: "Tp Blend de Chocolates", p: 20, d: "3c40ff20-dc98-4b97-a2bb-c817d1741786", i: "202203240002_868B_i.jpg", x: "Creme de chocolate ao leite intercalado com massa de cacau molhadinha, creme de chocolate meio amargo e finalizado com mousse meio amargo." },
	{ g: "torta", n: "Tp Diamante Negro com Laka", p: 22, d: "bd2705ef-0ec8-4f79-a59d-ad43d4f1e375", i: "202203240021_20M2_i.jpg", x: "Creme de chocolate ao leite intercalado com massa de chocolate molhadinha, mousse de baunilha e pedaços de diamante negro e Laka.", s: "Serve 1 pessoa" },
	{ g: "torta", n: "Tp Red Velvet c/ Geleia de Morango", p: 20, d: "27366f2f-c21d-4ebe-903f-c7a507d1e756", i: "202203240111_H3LY_i.jpg", x: "Massa de Red Velvet intercalada com creme de Ninho, creme Red Velvet Original (a base de cream cheese) e geleia de morango.", s: "Serve 1 pessoa" },
	{ g: "torta", n: "Tp Nozes com doce de leite", p: 20, d: "f9afd58b-232e-407f-a7a0-ec2a78dc1af7", i: "202203240102_1G55_i.jpg", x: "Massa de nozes molhadinha intercalada com nosso creme de nozes e um doce de leite suave.", s: "Serve 1 pessoa" },
	// o iFood repete "Tp Ninho com Nutella" com outro id. Mantemos uma vez.
	{ g: "torta", n: "Tp Ninho com Morango", p: 23, i: "202203240053_Y8V1_i.jpg", x: "Creme de Ninho intercalado com uma massa fofinha e molhadinha de baunilha, mousse de baunilha e morangos frescos." },
	{ g: "torta", n: "Tp Meio Amargo", p: 20, i: "202203240016_U25Y_i.jpg", x: "Creme de chocolate meio amargo intercalado com massa de cacau molhadinha e pedaços de chocolate meio amargo." },

	// ---------------------------------------------------------- fatias de torta
	{ g: "fatia", n: "Cheesecake", p: 27, d: "843ad0df-b1f4-4c26-8249-b5adbe3869df", i: "202303111239_CAP4_i.jpg", x: "Nossa clássica cheesecake com geleia artesanal de frutas vermelhas." },
	{ g: "fatia", n: "Fatia de Ninho com Chocolate", p: 27, d: "39c153ba-3932-429d-9003-69a30946cf00", i: "202203240245_41N4_i.jpg", x: "Fatia de torta recheada com creme de Ninho e cobertura de chocolate." },
	{ g: "fatia", n: "Fatia Ninho com Nutella", p: 30, d: "99037b6e-dd5d-4798-8fa6-a946acce2c88", i: "202212042126_B8RY_i.jpg" },
	{ g: "fatia", n: "Fatia Kinder Bueno", p: 36, d: "218f1b51-b7c3-4905-ad56-01a90553514e", i: "202203240137_OT2N_i.jpg" },
	{ g: "fatia", n: "Fatia Kinder Ovo", p: 41, d: "f0ab5166-44ce-42da-b03f-77315ac0baac", i: "202203191835_5MBX_i.jpg", x: "Massa de chocolate molhadinha com recheio de Ninho cremoso, pedaços de Kinder chocolate, finalizada com creme de chocolate e meio Kinder Ovo." },
	{ g: "fatia", n: "Fatia Galak", p: 28, d: "e524ea28-a256-452f-89b9-533564d5f94a", i: "202210201359_NHVJ_i.jpg", x: "Massa de baunilha molhadinha recheada com ganache de galak, coberta com chantilly de creme de leite fresco e finalizada com lascas de chocolate branco." },
	{ g: "fatia", n: "Fatia Floresta Negra", p: 30, d: "8a8ed7e4-d9db-4b10-9bb3-76cce0ef1697", i: "202303251713_7NM0_i.jpg", x: "Massa de chocolate bem molhadinha intercalada com Chantilly de Ninho e pedaços de cereja. Finalizada com lascas de chocolate." },
	{ g: "fatia", n: "Torta de Maracujá (fatia)", p: 30, i: "202405241524_7Q0U_i.jpg", x: "Torta feita com massa branca bem molhadinha intercalada com ganache de maracujá e creme de nata." },
	{ g: "fatia", n: "Fatia de Abacaxi com Coco", p: 30, i: "202203240131_157J_i.jpg", x: "Massa de baunilha molhadinha, com recheio cremoso de coco e doce artesanal de abacaxi." },
	{ g: "fatia", n: "Fatia de Ovomaltine", p: 30, i: "202303111250_64L2_i.jpg", x: "Massa de chocolate molhadinha com recheio cremoso e crocante de Ovomaltine.", s: "Serve 2 pessoas" },
	{ g: "fatia", n: "Fatia Suflair", p: 30, i: "202303111250_KM52_i.jpg", x: "Massa de cacau molhadinha intercalada com Mousse de Chocolate Suflair e finalizada com ganache de chocolate." },

	// ------------------------------------------------------------- bolo gelado
	{ g: "gelado", n: "Bolo Gelado de Coco", p: 15, d: "0b05fd1f-0dbb-42c7-81a6-fea38eeb0090", i: "202405222138_5DH2_i.jpg", x: "O tradicional bolo de coco, feito com uma massa bem molhadinha com calda de coco e recheio cremoso de coco. Empanado no coco ralado." },

	// -------------------------------------------------------------- dose extra
	{ g: "dose", n: "Cone de Kinder Bueno", p: 20, d: "77fe93a3-997a-4902-8862-1fa41dfcc888", i: "202203240224_X0MU_i.jpg" },
	{ g: "dose", n: "Cremoso de Uva Verde", p: 29, d: "753e8a8a-75e4-4157-af9e-5eccd27ef38d", i: "202508081825_M0XA_.jpeg", x: "Creme de Ninho, uvas verdes, creme nuvem e finalizado com Ganache ao leite." },
	{ g: "dose", n: "Bombom de Morango", p: 19, d: "793b0ff3-48a7-400a-8f2e-cd8768074f12", i: "202407181353_A5EF_i.jpg", s: "Serve 1 pessoa" },
	{ g: "dose", n: "Waffer de Nutella com Chocolate Ao Leite", p: 22, d: "5c51206b-ec52-4b1e-adbc-a2f8f83f062e", i: "202203240238_6211_i.jpg" },
	{ g: "dose", n: "Waffer de Nutella com Chocolate Branco", p: 22, d: "b680dade-a2dd-467c-90b5-f86b7251a014", i: "202203240241_8206_i.jpg" },
	{ g: "dose", n: "Pudim", p: 16, d: "8d879467-d447-4317-a80f-306359062f86", i: "202203240221_P1GN_i.jpg", x: "Pudim tradicional de leite condensado.", s: "Serve 1 pessoa" },
	{ g: "dose", n: "Brigadeiro ao Leite", p: 7.5, d: "9db34b58-96bb-455a-b1c8-02fec84a8936", i: "202208171259_6MES_i.jpg" },
	{ g: "dose", n: "Brigadeiro de Ninho", p: 6.5, d: "2e1aff32-4e8f-4dcf-b2f8-562281028c6f", i: "202208171307_VES1_i.jpg", x: "Peso: 25g" },
	{ g: "dose", n: "Cone Meio Amargo", p: 18, i: "202203240225_537F_i.jpg", x: "Casquinha de sorvete banhada com chocolate 50% cacau, recheio meio amargo e massa de chocolate molhadinha." },

	// ------------------------------------------------------------- bolo inglês
	{ g: "bolo", n: "Bolo Inglês Ninho com Chocolate", p: 46, d: "e41f53ec-453e-45a0-b005-cde9060c7537", i: "202407280106_WHR4_i.jpg", x: "O nosso bolo inglês é feito com uma massa fina de chocolate super molhadinha, coberto com creme de Ninho, creme de chocolate e finalizado com raspas de chocolate.", s: "Serve 3 pessoas" },

	// ----------------------------------------------------------------- cookies
	{ g: "cookie", n: "Cookie Red Velvet", p: 26, d: "36fbb85b-1324-47d5-b664-abb413cd1046", i: "202305251725_G5PM_i.jpg", x: "Cookie Red recheado com geleia de morango e brigadeiro de Cream cheese. Esquente 30 segundos antes de comer." },
	{ g: "cookie", n: "Cookie Lótus", p: 26, d: "132b5cdd-c938-42fb-b29d-07f01a31d059", i: "202308092142_8246_i.jpg", x: "Cookie recheado com chocolate e doce de leite, finalizado com biscoito importado Lotus. Esquente 30 segundos antes de comer." },

	// ------------------------------------------------------------------- cafés
	{ g: "cafe", n: "Cappuccino Cremoso", p: 20, d: "938cbfb8-5bc2-4056-82ff-b628c884b9f0", x: "Nosso cappuccino especial da casa, cremoso, com um toque de canela, chocolate e já vem adoçado. É a bebida mais pedida da loja." },
	{ g: "cafe", n: "Cappuccino Italiano", p: 20, d: "668b9e3b-0a0b-4f2a-8df7-aa8859024fd9", i: "202508071044_12U0_i.jpg", x: "O clássico cappuccino italiano, preparado com leite vaporizado, dose de expresso e crema do leite." },
	{ g: "cafe", n: "Latte Baunilha", p: 20, d: "9fce8eb7-432c-4d09-9f85-a599eac475dc", i: "202508081416_6Q2W_i.jpg", x: "Bastante leite vaporizado com baunilha, dose de expresso e crema do leite. Para quem gosta de mais leite do que café." },
	{ g: "cafe", n: "Expresso Duplo", p: 12, d: "686d32ce-8c41-4ad5-a12f-8f0057847c66", x: "Dose dupla (90 ml) de café especial extraído no método expresso.", t: ["sem lactose", "sem açúcar"] },
	{ g: "cafe", n: "Chocolate Quente 200ml", p: 19, d: "f286b0fd-4796-4386-ba8f-862dd4138cb5", i: "202605201518_U763_i.jpg", x: "Nosso chocolate quente especial, bem cremoso, doce na medida certa, entre o chocolate ao leite e o meio amargo, feito com chocolate nobre." },

	// ---------------------------------------------------------------- salgados
	{ g: "salgado", n: "Pão de Queijo 6 unidades", p: 18.9, d: "fc29ca96-142d-439f-9b9f-2bc85215e223", i: "202509111634_PPV3_i.jpg", x: "Pão de queijo mineiro, com pedacinhos de queijo meia cura na massa.", s: "Serve 2 pessoas" },
	{ g: "salgado", n: "Quiche 4 queijos", p: 18.9, i: "202206151525_4T7Q_i.jpg", x: "Quiche individual de quatro queijos.", t: ["vegetariano"] },
	{ g: "salgado", n: "Quiche de Alho Poró", p: 17.5, i: "202206151526_530A_i.jpg", s: "Serve 1 pessoa", t: ["vegetariano"] },
	{ g: "salgado", n: "Quiche Abacaxi com Gorgonzola", p: 17.5, x: "Quiche individual." },

	// ------------------------------------------------------------- sobremesas
	{ g: "sobremesa", n: "Mini Sobremesa - Matilda", p: 54, i: "202507251350_3NV7_i.jpg" },
	{ g: "sobremesa", n: "Baby Cake - Ninho com Chocolate", p: 77, i: "202506120649_11MO_.jpeg", x: "Bolo de chocolate bem molhadinho intercalado com recheio cremoso de Ninho e brigadeiro, finalizado com mini brigadeiros ao leite. Vai em caixa presenteável.", s: "Serve 4 pessoas" },
	{ g: "sobremesa", n: "Baby Cake Chocolate Intenso", p: 77, i: "202507251307_N54U_i.jpg" },
	{ g: "sobremesa", n: "Baby Cake Kinder Cake", p: 90, i: "202507251320_EXT0_i.jpg" },
	{ g: "sobremesa", n: "Baby Cake Diamante Negro", p: 83.5, i: "202507251315_876B_i.jpg" },
	{ g: "sobremesa", n: "Baby Cake Ninho com Chocolate e Morango", p: 83.5, i: "202507251320_I653_i.jpg" },
	{ g: "sobremesa", n: "Baby Cake Ninho com Nutella", p: 83.5, i: "202507251324_L142_i.jpg" },
	{ g: "sobremesa", n: "Doce no Tabuleiro - Dulce Chocolate", p: 167, i: "202507251642_HCCL_i.jpg", x: "Massa de chocolate bem molhadinha intercalada com mousse bem levinho de doce de leite e uma ganache de chocolate ao leite, finalizada com lascas rústicas de chocolate meio amargo.", s: "Serve até 8 pessoas" },
	{ g: "sobremesa", n: "Doce no Tabuleiro - Abacaxi com Ninho e Suspiros", p: 180, i: "202507251643_K6QU_i.jpg", x: "Creme de Ninho intercalado com massa de baunilha bem molhadinha, doce de abacaxi artesanal e finalizado com suspiros de baunilha.", s: "Serve até 8 pessoas" },

	// -------------------------------------------------------- monte seu presente
	{ g: "presente", n: "Cartão Premium para Presente", p: 8.5, d: "7030b115-d741-4a7a-9e71-f2d1f533dd22", i: "202410142245_XG8B_i.jpg" },
	{ g: "presente", n: "Sacola Térmica Pequena", p: 4, d: "89e04127-46bc-4285-9b16-a1edbe243d56", i: "202606112258_7F55_i.jpg", x: "Sacola térmica reutilizável, ideal para até 3 itens pequenos (torta no pote, bolo gelado, cone…)." },
	{ g: "presente", n: "Sacola Térmica Grande", p: 6, d: "5a60a5f8-8184-40df-973d-cd4ce0ea6c86", i: "202606112301_3HEN_i.jpg", x: "Ideal para acomodar de 4 a 10 itens. Escolha certa para itens maiores como fatia de torta, bolo inglês e baby cake. Reutilizável." },
	{ g: "presente", n: "Sacola Premium P", p: 8.5, d: "ffe460eb-b9ab-4d40-8493-d031fafbc9c8", i: "202502211248_FF17_i.jpg", x: "Sacola de papel personalizada, ideal para itens pequenos (torta no pote, cone e/ou bolo gelado)." },
	{ g: "presente", n: "Sacola Premium Média", p: 10, d: "4ddad440-c783-48f3-af4b-87ba3554804b", x: "Sacola média, ideal para embalar de 3 a 5 itens pequenos e médios (fatia de torta, torta no pote, bombom, bolo inglês…)." },
	{ g: "presente", n: "Sacola Premium G", p: 16, d: "02c91dcf-cc2f-479e-a384-5dc538c8d246", i: "202502211253_F5OQ_i.jpg", x: "Sacola de papel personalizada, ideal para até 10 itens pequenos (tortas no pote, cone, bolo gelado…) ou 2 itens grandes (fatia de torta, bolo inglês, baby cake)." },

	// ---------------------------------------------------------------- bebidas
	{ g: "bebida", n: "Água mineral Natural 500ml", p: 7, d: "1066fc4d-17d7-400f-a017-f2ae92556820", i: "202507251950_XN3A_i.jpg" },
	{ g: "bebida", n: "Água Mineral com Gás 500 ml", p: 8, d: "606923a5-4f93-48c3-b6a9-02ef46fc9c32", i: "202405211957_7HN8_i.jpg" },
	{ g: "bebida", n: "Refrigerante Coca Cola Zero Lata 350ml", p: 9, d: "1fd0d1b6-582c-476a-9ad5-cf0a441d6260", i: "202604221111_k871ci851uh.png", c: "b" },
	{ g: "bebida", n: "Coca-Cola Lata 350ml", p: 9, d: "f0431e47-8108-4fbb-89a7-ca23f6025b0e", i: "202606091854_zzinscz4snf.png", c: "b" },
	{ g: "bebida", n: "Suco Del Valle Pêssego 290ml", p: 9, d: "63fe39bb-a33a-4f22-b250-2d064c3b9f4d", i: "202210190044_7zmojnc8w7d.jpg", c: "b", x: "Lata 290 ml." },
	{ g: "bebida", n: "Suco Néctar Del Valle Uva 290ml", p: 9, d: "c1dc5cfb-2038-4dda-8afb-0e3b9939724c", i: "202604221112_8bn59tj7wyn.png", c: "b" },
	{ g: "bebida", n: "Guaraná Zero", p: 9, d: "fa001063-61e9-4a7b-bbaa-2d5400b0fd55" },
];

/** Item que o iFood não lista: aparece como "consultar no balcão". */
const SO_BALCAO = "consultar no balcão";

const slugify = (value: string) =>
	value
		.normalize("NFD")
		.replace(/\p{Diacritic}/gu, "")
		.replace(/^Tp /, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");

export const products: IProduct[] = ROWS.map((row) => ({
	slug: slugify(row.n),
	name: row.n.replace(/^Tp /, ""),
	ifoodName: row.n,
	description: row.x ?? "",
	price: row.p,
	serves: row.s,
	tags: row.d ? row.t : [SO_BALCAO, ...(row.t ?? [])],
	category: row.g,
	dish: row.d,
	image: row.i
		? `${CDN}/${row.c === "b" ? DRINKS_CATALOG : CATALOG}/${row.i}`
		: undefined,
}));

export const MINIMUM_ORDER = 25;

/** Índice por slug: o carrinho guarda só o slug e a quantidade, e precisa
 *  voltar ao produto para montar a linha. */
const BY_SLUG = new Map(products.map((product) => [product.slug, product]));

export const findProduct = (slug: string) => BY_SLUG.get(slug);

export const formatPrice = (value: number) =>
	`R$ ${value.toFixed(2).replace(".", ",")}`;

/** Rótulo pequeno do card: "Serve 2 pessoas", o nome da categoria… */
export const productTag = (product: IProduct) =>
	product.serves ??
	({
		torta: "220 ml",
		fatia: "Fatia",
		gelado: "Bolo gelado",
		dose: "Dose extra",
		bolo: "Bolo inglês",
		cookie: "Cookie",
		cafe: "Café",
		salgado: "Salgado",
		sobremesa: "Sobremesa",
		presente: "Presente",
		bebida: "Bebida",
	})[product.category];

/** Abre o item certo do cardápio do iFood. */
const ifoodLink = (product: IProduct) =>
	`${site.links.ifood}?prato=${product.dish}`;

/**
 * Para onde vai o botão do card. No iFood, pro item exato. Fora dele, pro
 * WhatsApp perguntando pelo item — o balcão responde se tem.
 */
export const productLink = (product: IProduct) =>
	product.dish
		? {
				href: ifoodLink(product),
				short: "iFood ↗",
				label: "Ver no iFood ↗",
				note: `Ver ${product.name} no iFood`,
			}
		: {
				href: whatsappLink(
					`Olá! Gostaria de saber se vocês têm ${product.ifoodName} disponível.`,
				),
				short: "Consultar ↗",
				label: "Consultar disponibilidade",
				note: `Consultar ${product.name} no WhatsApp`,
			};

const fold = (value: string) =>
	value
		.normalize("NFD")
		.replace(/\p{Diacritic}/gu, "")
		.toLowerCase();

/** Filtra por categoria e por texto (ignora acento e caixa). */
export const filterProducts = (
	category: CategoryId,
	term: string,
): IProduct[] => {
	const needle = fold(term.trim());

	return products.filter((product) => {
		if (category !== "todos" && product.category !== category) return false;
		if (!needle) return true;
		return fold(`${product.ifoodName} ${product.description}`).includes(needle);
	});
};

/**
 * Mensagem de pedido para o WhatsApp: um produto por linha, com a
 * quantidade na frente. Sem preço — o valor fecha no balcão, porque
 * entrega e frete mudam a conta.
 */
export const orderMessage = (lines: { product: IProduct; qty: number }[]) =>
	[
		"Olá! Quero fazer um pedido na Charlotte:",
		"",
		...lines.map(({ product, qty }) => `${qty}x ${product.ifoodName}`),
	].join("\n");
