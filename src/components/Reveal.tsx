import { useReducedMotion } from "motion/react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import type { Variants } from "motion/react";
import { EASE } from "../variants";

interface Props {
	children: ReactNode;
	className?: string;
	delay?: number;
	/** quanto sobe, em px */
	y?: number;
}

const build = (reduce: boolean, y: number, delay: number): Variants =>
	reduce
		? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
		: {
				hidden: { opacity: 0, y },
				visible: {
					opacity: 1,
					y: 0,
					transition: { duration: 0.8, ease: EASE, delay },
				},
			};

/** Reveal na entrada da viewport. Uma vez só, e fora do caminho de quem
 *  pediu menos movimento no sistema. */
export default function Reveal({
	children,
	className,
	delay = 0,
	y = 26,
}: Props) {
	const reduce = useReducedMotion();

	return (
		<motion.div
			className={className}
			variants={build(Boolean(reduce), y, delay)}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
		>
			{children}
		</motion.div>
	);
}
