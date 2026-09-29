import type { Variants } from "motion/react";
import { EASE } from "./sharedVariants";

export const headerContentVariants: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

export const headerItemVariants: Variants = {
	hidden: { opacity: 0, y: -14 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const mobileMenuVariants: Variants = {
	hidden: { clipPath: "inset(0 0 100% 0)" },
	visible: {
		clipPath: "inset(0 0 0% 0)",
		transition: { duration: 0.6, ease: EASE },
	},
	exit: {
		clipPath: "inset(0 0 100% 0)",
		transition: { duration: 0.45, ease: EASE },
	},
};
