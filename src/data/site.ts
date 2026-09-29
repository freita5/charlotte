const WHATSAPP = "5522997484545";
const TIMEZONE = "America/Sao_Paulo";

export const instagram = "https://www.instagram.com/charlottecakeshop";
export const instagramHandle = "@charlottecakeshop";

type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface OpeningHour {
	days: string;
	/** como aparece no site */
	time: string;
	week: readonly Weekday[];
	/** janela de balcão em minutos desde a meia-noite. Ausente = não atende. */
	open?: { from: number; to: number };
}

const h = (hours: number, minutes = 0) => hours * 60 + minutes;

const hours: readonly OpeningHour[] = [
	{ days: "Segunda", time: "13h às 18h15", week: [1], open: { from: h(13), to: h(18, 15) } },
	{ days: "Terça a sábado", time: "9h15 às 20h", week: [2, 3, 4, 5, 6], open: { from: h(9, 15), to: h(20) } },
	{ days: "Domingo", time: "12h45 às 18h", week: [0], open: { from: h(12, 45), to: h(18) } },
];

export const site = {
	name: "Charlotte",
	city: "Campos dos Goytacazes, RJ",
	phoneLabel: "(22) 99748-4545",
	address: {
		street: "Av. Dr. Nilo Peçanha, 67",
		district: "Parque Santo Amaro",
		city: "Campos dos Goytacazes",
		state: "RJ",
		zip: "28030-035",
	},
	hours,
	links: {
		ifood:
			"https://www.ifood.com.br/delivery/campos-dos-goytacazes-rj/charlotte-parque-santo-amaro/b86f5ccc-56df-418a-aa3d-5f2ef62b70bb",
		whatsapp: `https://wa.me/${WHATSAPP}`,
		instagram,
	},
} as const;

export const navLinks = [
	{ label: "Cardápio", to: "/produtos" },
	{ label: "Encomendas", to: "/encomendas" },
	{ label: "Onde estamos", to: "/localizacao" },
] as const;

const WEEKDAY_INDEX: Record<string, Weekday> = {
	Sun: 0,
	Mon: 1,
	Tue: 2,
	Wed: 3,
	Thu: 4,
	Fri: 5,
	Sat: 6,
};

/** O balcão está aberto agora? Avalia no fuso da loja, não no do visitante. */
export const isOpenNow = (date: Date = new Date()): boolean => {
	const parts = Object.fromEntries(
		new Intl.DateTimeFormat("en-US", {
			timeZone: TIMEZONE,
			weekday: "short",
			hour: "2-digit",
			minute: "2-digit",
			hourCycle: "h23",
		})
			.formatToParts(date)
			.map((part) => [part.type, part.value]),
	);

	const today = hours.find((slot) =>
		slot.week.includes(WEEKDAY_INDEX[parts.weekday as string]),
	);

	if (!today?.open) return false;

	const minutes = Number(parts.hour) * 60 + Number(parts.minute);
	return minutes >= today.open.from && minutes < today.open.to;
};

/** 930 → "15h30". Sem dois-pontos, igual ao formato que a loja usa. */
const hhmm = (minutes: number) =>
	`${Math.floor(minutes / 60)}h${minutes % 60 || ""}`;

/** Os horários numa linha só, para cabeçalhos. Vem da mesma lista, senão
 *  um dia muda num lugar e não no outro. */
export const hoursLine = hours
	.map((slot) =>
		slot.open ? `${slot.days} ${hhmm(slot.open.from)}–${hhmm(slot.open.to)}` : slot.days,
	)
	.join(" · ");

/** Abre a conversa no WhatsApp com um texto pronto. */
export const whatsappLink = (message: string) =>
	`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
