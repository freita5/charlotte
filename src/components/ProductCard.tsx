import { motion, useReducedMotion } from "motion/react";
import {
	formatPrice,
	productLink,
	productTag,
	type IProduct,
} from "../data/products";
import ProductImage from "./ProductImage";
import QuantityStepper from "./QuantityStepper";
import { productVariants } from "../variants";

interface Props {
	product: IProduct;
	/** cascade reveal by position in the grid */
	index?: number;
	/** animate position when the menu is filtered */
	layout?: boolean;
}

export default function ProductCard({
	product,
	index = 0,
	layout = false,
}: Props) {
	const reduce = useReducedMotion();
	const link = productLink(product);

	return (
		<motion.article
			layout={layout}
			variants={productVariants(index * 0.05, Boolean(reduce))}
			initial="hidden"
			whileInView="visible"
			exit="exit"
			viewport={{ once: true, amount: 0.15 }}
			className="group flex flex-col border border-cocoa-900/15 bg-paper-2/40 transition-colors duration-500 hover:border-cocoa-900/40"
		>
			<a
				href={link.href}
				target="_blank"
				rel="noreferrer"
				aria-label={link.note}
				className="overflow-hidden"
			>
				<ProductImage
					product={product}
					className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
				/>
			</a>

			<div className="flex grow flex-col p-5 sm:p-6">
				<p className="tag text-cocoa-500">{productTag(product)}</p>

				<h3 className="mt-3 font-serif text-2xl leading-tight font-bold text-cocoa-900 sm:text-[1.75rem]">
					{product.name}
				</h3>

				{product.description && (
					<p className="mt-3 text-sm leading-relaxed text-cocoa-500">
						{product.description}
					</p>
				)}

				{product.tags && product.tags.length > 0 && (
					<ul className="mt-3 flex flex-wrap gap-1.5">
						{product.tags.map((tag) => (
							<li
								key={tag}
								className="rounded-full border border-cocoa-900/20 px-2.5 py-1 text-[0.6875rem] tracking-wide text-cocoa-500"
							>
								{tag}
							</li>
						))}
					</ul>
				)}

				<p className="mt-auto pt-6 text-2xl font-bold text-cocoa-900">
					{formatPrice(product.price)}
				</p>

				<div className="mt-5 flex flex-col gap-2">
					<QuantityStepper product={product} withLabel />
					<a
						href={link.href}
						target="_blank"
						rel="noreferrer"
						className="tag border border-cocoa-900/20 px-3 py-3 text-center transition-colors duration-300 hover:border-cocoa-900"
					>
						{link.label}
					</a>
				</div>
			</div>
		</motion.article>
	);
}
