import type { Variants } from "motion/react";
import { EASE } from "./sharedVariants";

export const footerVariants: Variants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: EASE, staggerChildren: 0.1 },
	},
};

export const footerElementVariants: Variants = {
	hidden: { opacity: 0, y: 22 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
