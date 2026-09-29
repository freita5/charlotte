import type { Variants } from "motion/react";
import { EASE } from "./sharedVariants";

export const localMapVariants: Variants = {
	hidden: { opacity: 0, scale: 0.98 },
	visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
};
