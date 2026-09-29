import { motion, useReducedMotion } from "motion/react";
import {
	formatPrice,
	productLink,
	productTag,
	type IProduct,
} from "../data/products";
import ProductImage from "./ProductImage";
import QuantityStepper from "./QuantityStepper";
import { rise } from "../variants";

/**
 * Linha de cardápio — o formato de menu impresso, não o card do grid.
 * Usada na home, onde a lista completa aparece agrupada por categoria.
 */
export default function MenuRow({ product }: { product: IProduct }) {
	const reduce = useReducedMotion();
	const link = productLink(product);

	return (
		<motion.li
			variants={reduce ? undefined : rise}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			className="group relative flex gap-4 border-t border-cocoa-900/15 py-5 sm:gap-5"
		>
			<a
				href={link.href}
				target="_blank"
				rel="noreferrer"
				aria-label={link.note}
				className="h-20 w-20 shrink-0 overflow-hidden bg-chrltt-500 sm:h-24 sm:w-24"
			>
				<ProductImage
					product={product}
					className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
				/>
			</a>

			<div className="flex min-w-0 grow flex-col">
				<div className="flex items-baseline justify-between gap-4">
					<p className="tag text-cocoa-400">{productTag(product)}</p>
					<p className="font-display shrink-0 text-xl text-cocoa-900">
						{formatPrice(product.price)}
					</p>
				</div>

				<h3 className="mt-1 font-serif text-lg leading-snug font-bold text-cocoa-900 sm:text-xl">
					{product.name}
				</h3>

				{product.description && (
					<p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-cocoa-500">
						{product.description}
					</p>
				)}

				<div className="mt-auto flex items-center gap-2 pt-3">
					<QuantityStepper product={product} size="sm" />
					<a
						href={link.href}
						target="_blank"
						rel="noreferrer"
						className="tag border border-cocoa-900/20 px-3 py-3 text-cocoa-500 transition-colors duration-300 hover:border-cocoa-900 hover:text-cocoa-900"
					>
						{link.short}
					</a>
				</div>
			</div>
		</motion.li>
	);
}
