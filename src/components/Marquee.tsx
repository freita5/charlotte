interface Props {
	items: readonly string[];
	className?: string;
}

/** Ticker infinito. Duas trilhas idênticas lado a lado, então o loop fecha
 *  sem emenda. */
export default function Marquee({ items, className = "" }: Props) {
	const copy = [...items, ...items];

	return (
		<div
			className={`overflow-hidden border-y border-cocoa-900/10 bg-paper text-cocoa-700 ${className}`}
			aria-label={items.join(", ")}
		>
			<div className="marquee-track">
				{[0, 1].map((track) => (
					<div key={track} className="flex shrink-0" aria-hidden={track === 1}>
						{copy.map((item, index) => (
							<span
								key={`${track}-${index}`}
								className="tag flex shrink-0 items-center gap-6 py-4 pr-6"
							>
								{item}
								<span className="opacity-40">✳</span>
							</span>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
