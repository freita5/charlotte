import type { Variants } from "motion/react";
import { EASE } from "./sharedVariants";

export const heroContainerVariants: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

export const heroItemVariants: Variants = {
	hidden: { opacity: 0, y: 34 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};
