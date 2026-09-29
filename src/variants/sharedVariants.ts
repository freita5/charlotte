import type { Variants } from "motion/react";

/** Curva usada em tudo que se move aqui. Sem easing de "pulo". */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Cascata: pai escalona os filhos. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
	hidden: {},
	visible: { transition: { staggerChildren, delayChildren } },
});

/** Entra de baixo, sobe. O reveal padrão do site. */
export const rise: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Transição de rota, usada pelo <AnimatePresence mode="wait"> em App.tsx */
export const pageVariants: Variants = {
	hidden: { opacity: 0, y: 18 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.55, ease: EASE },
	},
	exit: {
		opacity: 0,
		y: -12,
		transition: { duration: 0.3, ease: "easeIn" },
	},
};
