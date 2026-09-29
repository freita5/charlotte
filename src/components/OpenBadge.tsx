import useIsOpen from "../hooks/useIsOpen";

/**
 * Sinal de balcão: verde aberto, vermelho fechado. Avalia no fuso da loja
 * (America/Sao_Paulo) e reconferir sozinho de minuto em minuto.
 */
export default function OpenBadge({ className = "" }: { className?: string }) {
	const open = useIsOpen();

	return (
		<p className={`flex items-center gap-2.5 ${className}`}>
			<span className="relative flex h-2.5 w-2.5 shrink-0">
				{open && (
					<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-600 opacity-70" />
				)}
				<span
					className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
						open ? "bg-green-600" : "bg-chrltt-500"
					}`}
				/>
			</span>
			<span>{open ? "Aberto agora" : "Fechado agora"}</span>
		</p>
	);
}
