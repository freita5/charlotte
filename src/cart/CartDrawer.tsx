import { AnimatePresence, motion } from "motion/react";
import {
	MINIMUM_ORDER,
	formatPrice,
	orderMessage,
	productTag,
} from "../data/products";
import { site, whatsappLink } from "../data/site";
import ProductImage from "../components/ProductImage";
import QuantityStepper from "../components/QuantityStepper";
import { useCart } from "./useCart";

export default function CartDrawer() {
	const { lines, count, total, open, setQty, clear, closeCart } = useCart();

	const missing = Math.max(0, MINIMUM_ORDER - total);
	const ready = total >= MINIMUM_ORDER;

	return (
		<AnimatePresence>
			{open && (
				<>
					<motion.button
						type="button"
						aria-label="Fechar sacola"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={closeCart}
						className="fixed inset-0 z-[60] cursor-default bg-cocoa-900/50"
					/>

					<motion.aside
						role="dialog"
						aria-label="Sua sacola"
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
						className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-[30rem] flex-col bg-paper"
					>
						<header className="flex items-center justify-between gap-4 bg-chrltt-500 px-6 py-5 text-paper">
							<h2 className="poster text-2xl">Sua sacola</h2>
							<button
								type="button"
								onClick={closeCart}
								className="tag border border-paper/40 px-4 py-2 transition-colors duration-300 hover:bg-paper hover:text-chrltt-600"
							>
								Fechar
							</button>
						</header>

						{count === 0 ? (
							<div className="flex grow flex-col items-center justify-center gap-6 px-8 text-center">
								<p className="poster text-3xl">Vazia por enquanto</p>
								<p className="max-w-xs text-sm text-cocoa-500">
									Escolha alguns sabores no cardápio que a gente monta o seu
									pedido aqui e manda direto no WhatsApp.
								</p>
								<button
									type="button"
									onClick={closeCart}
									className="tag bg-cocoa-900 px-6 py-4 text-paper transition-colors duration-300 hover:bg-chrltt-600"
								>
									Ver o cardápio
								</button>
							</div>
						) : (
							<>
								<ul className="grow divide-y divide-cocoa-900/10 overflow-y-auto">
									{lines.map(({ product, qty }) => (
										<li key={product.slug} className="flex gap-4 px-6 py-5">
											<div className="h-20 w-20 shrink-0 overflow-hidden bg-chrltt-500">
												<ProductImage
													product={product}
													className="h-full w-full object-cover"
												/>
											</div>

											<div className="min-w-0 grow">
												<p className="text-sm font-semibold leading-snug">
													{product.name}
												</p>
												<p className="tag mt-1 text-cocoa-400">
													{productTag(product)}
												</p>
												<p className="mt-1 text-sm text-cocoa-500">
													{formatPrice(product.price * qty)}
												</p>

												<div className="mt-3 flex items-center gap-3">
													<QuantityStepper product={product} size="sm" />
													<button
														type="button"
														onClick={() => setQty(product.slug, 0)}
														className="tag text-cocoa-300 transition-colors duration-300 hover:text-chrltt-600"
													>
														Remover
													</button>
												</div>
											</div>
										</li>
									))}
								</ul>

								<footer className="border-t border-cocoa-900/15 px-6 py-6">
									<div className="flex items-baseline justify-between">
										<span className="tag text-cocoa-500">
											{count} {count === 1 ? "item" : "itens"}
										</span>
										<span className="text-3xl font-bold">
											{formatPrice(total)}
										</span>
									</div>

									<p className="mt-3 text-xs text-cocoa-500">
										{ready
											? `Pedido mínimo de ${formatPrice(MINIMUM_ORDER)} atingido. Pode fechar que a gente responde rapidinho.`
											: `Faltam ${formatPrice(missing)} para atingir o pedido mínimo de ${formatPrice(MINIMUM_ORDER)}.`}
									</p>

									<div className="mt-5 flex flex-col gap-2">
										<a
											href={whatsappLink(orderMessage(lines))}
											target="_blank"
											rel="noreferrer"
											aria-disabled={!ready}
											className={`tag block px-6 py-4 text-center transition-colors duration-300 ${
												ready
													? "bg-chrltt-500 text-paper hover:bg-chrltt-600"
													: "pointer-events-none bg-cocoa-200 text-cocoa-400"
											}`}
										>
											Pedir pelo WhatsApp
										</a>
										<a
											href={site.links.ifood}
											target="_blank"
											rel="noreferrer"
											className="tag block border border-cocoa-900/25 px-6 py-4 text-center transition-colors duration-300 hover:border-cocoa-900 hover:bg-cocoa-900 hover:text-paper"
										>
											Pedir pelo iFood ↗
										</a>
										<button
											type="button"
											onClick={clear}
											className="tag py-3 text-cocoa-400 transition-colors duration-300 hover:text-chrltt-600"
										>
											Esvaziar sacola
										</button>
									</div>
								</footer>
							</>
						)}
					</motion.aside>
				</>
			)}
		</AnimatePresence>
	);
}
