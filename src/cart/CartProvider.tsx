import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { findProduct } from "../data/products";
import { CartContext } from "./cartContext";
import type { CartLine } from "./cartContext";

const STORAGE_KEY = "charlotte-cart";

const readStorage = (): Record<string, number> => {
	if (typeof window === "undefined") return {};

	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return {};
		const parsed: unknown = JSON.parse(raw);
		if (typeof parsed !== "object" || parsed === null) return {};

		return Object.fromEntries(
			Object.entries(parsed).filter(
				(entry): entry is [string, number] =>
					typeof entry[1] === "number" && entry[1] > 0,
			),
		);
	} catch {
		return {};
	}
};

export default function CartProvider({ children }: { children: ReactNode }) {
	const [qtys, setQtys] = useState<Record<string, number>>(readStorage);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(qtys));
	}, [qtys]);

	// fecha com Esc
	useEffect(() => {
		if (!open) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);

	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	const setQty = useCallback((slug: string, qty: number) => {
		setQtys((current) => {
			const next = { ...current };
			if (qty <= 0) delete next[slug];
			else next[slug] = Math.min(qty, 99);
			return next;
		});
	}, []);

	const increment = useCallback((slug: string) => {
		setQtys((current) => ({ ...current, [slug]: (current[slug] ?? 0) + 1 }));
	}, []);

	const clear = useCallback(() => setQtys({}), []);

	const lines = useMemo<CartLine[]>(
		() =>
			Object.entries(qtys)
				.map(([slug, qty]) => {
					const product = findProduct(slug);
					return product ? { product, qty } : null;
				})
				.filter((line): line is CartLine => line !== null),
		[qtys],
	);

	const value = useMemo(
		() => ({
			lines,
			count: lines.reduce((sum, line) => sum + line.qty, 0),
			total: lines.reduce(
				(sum, line) => sum + line.product.price * line.qty,
				0,
			),
			open,
			qtyOf: (slug: string) => qtys[slug] ?? 0,
			setQty,
			increment,
			clear,
			openCart: () => setOpen(true),
			closeCart: () => setOpen(false),
		}),
		[lines, open, qtys, setQty, increment, clear],
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
