import { useState } from "react";
import type { IProduct } from "../data/products";

/**
 * Foto do produto, servida do CDN do iFood. Quando o asset não carrega
 * (alguns itens do cardápio não têm foto), o card vira bloco tipográfico em
 * vez de buraco branco.
 *
 * O texto do bloco se mede pelo próprio container (`cqw`), e não por um
 * tamanho fixo: o mesmo fallback aparece num card 4:5 e num quadradinho de
 * 80px, e um `text-2xl` fixo estourava no segundo.
 */
export default function ProductImage({
	product,
	className = "",
}: {
	product: IProduct;
	className?: string;
}) {
	const [failed, setFailed] = useState(false);

	if (!product.image || failed) {
		return (
			<div
				aria-label={product.name}
				role="img"
				className={`@container grid place-items-center overflow-hidden bg-chrltt-500 p-2 text-paper ${className}`}
			>
				<p className="poster w-full text-center text-[clamp(0.6rem,6.5cqw,1.75rem)] leading-[0.92] text-balance">
					{product.name}
				</p>
			</div>
		);
	}

	return (
		<img
			src={product.image}
			alt={product.name}
			loading="lazy"
			onError={() => setFailed(true)}
			className={className}
		/>
	);
}
