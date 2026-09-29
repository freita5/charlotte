import { createContext } from "react";
import type { IProduct } from "../data/products";

export interface CartLine {
	product: IProduct;
	qty: number;
}

export interface CartContextValue {
	lines: CartLine[];
	count: number;
	total: number;
	open: boolean;
	/** quantidade de um slug específico (0 se não estiver no carrinho) */
	qtyOf: (slug: string) => number;
	setQty: (slug: string, qty: number) => void;
	increment: (slug: string) => void;
	clear: () => void;
	openCart: () => void;
	closeCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
