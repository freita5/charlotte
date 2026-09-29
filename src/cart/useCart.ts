import { use } from "react";
import { CartContext } from "./cartContext";
import type { CartContextValue } from "./cartContext";

export function useCart(): CartContextValue {
	const context = use(CartContext);
	if (!context) throw new Error("useCart precisa estar dentro de <CartProvider>");
	return context;
}
