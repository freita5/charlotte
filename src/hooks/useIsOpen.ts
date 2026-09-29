import { useEffect, useState } from "react";
import { isOpenNow } from "../data/site";

/**
 * Acompanha o horário do balcão. Avalia no fuso da loja (America/Sao_Paulo)
 * e reconferir de minuto em minuto, porque um sinal "aberto" congelado
 * durante a madrugada é pior do que nenhum sinal.
 */
export default function useIsOpen(intervalMs = 60_000) {
	const [open, setOpen] = useState(() => isOpenNow());

	useEffect(() => {
		const id = window.setInterval(() => setOpen(isOpenNow()), intervalMs);
		return () => window.clearInterval(id);
	}, [intervalMs]);

	return open;
}
