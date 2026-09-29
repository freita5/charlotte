import type { Variants } from "motion/react";
import { EASE } from "./sharedVariants";

/** Reveal por card. O índice entra como argumento para o grid aparecer em
 *  cascata, e não tudo de uma vez. */
export const productVariants = (delay = 0, reduce = false): Variants =>
	reduce
		? { hidden: { opacity: 1 }, visible: { opacity: 1 }, exit: { opacity: 1 } }
		: {
				hidden: { opacity: 0, y: 30, scale: 0.985 },
				visible: {
					opacity: 1,
					y: 0,
					scale: 1,
					transition: { duration: 0.7, ease: EASE, delay },
				},
				exit: {
					opacity: 0,
					y: -8,
					scale: 0.98,
					transition: { duration: 0.25, ease: "easeIn" },
				},
			};
