import type { IProduct } from "../data/products";
import { useCart } from "../cart/useCart";

interface Props {
	product: IProduct;
	/** `md` nos cards, `sm` nas linhas de menu e na sacola */
	size?: "sm" | "md";
	/** escreve "Adicionar" / "N na sacola" no meio em vez do número */
	withLabel?: boolean;
}

/** Controle de quantidade. Usado no card, na linha do menu e na sacola —
 *  mesmo comportamento e mesmo tamanho nos três lugares. */
export default function QuantityStepper({
	product,
	size = "md",
	withLabel = false,
}: Props) {
	const { qtyOf, increment, setQty } = useCart();
	const qty = qtyOf(product.slug);
	const inCart = qty > 0;

	const button = size === "md" ? "h-11 w-11" : "h-9 w-9";
	const box = withLabel ? "grow justify-between" : "";

	return (
		<div
			className={`inline-flex items-center border transition-colors duration-300 ${
				inCart
					? "border-chrltt-500 bg-chrltt-500 text-paper"
					: "border-cocoa-900/20"
			} ${box}`}
		>
			<button
				type="button"
				onClick={() => setQty(product.slug, qty - 1)}
				disabled={!inCart}
				aria-label={`Diminuir ${product.name}`}
				className={`grid ${button} place-items-center text-lg leading-none transition-colors duration-200 enabled:hover:bg-cocoa-900 enabled:hover:text-paper disabled:opacity-30`}
			>
				−
			</button>

			{withLabel ? (
				<span className="text-sm font-semibold">
					{inCart ? `${qty} na sacola` : "Adicionar"}
				</span>
			) : (
				<span className="w-7 text-center text-sm font-semibold tabular-nums">
					{qty}
				</span>
			)}

			<button
				type="button"
				onClick={() => increment(product.slug)}
				aria-label={`Adicionar ${product.name}`}
				className={`grid ${button} place-items-center text-lg leading-none transition-colors duration-200 hover:bg-cocoa-900 hover:text-paper`}
			>
				+
			</button>
		</div>
	);
}
