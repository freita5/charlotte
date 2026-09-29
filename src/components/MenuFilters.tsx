import { categories, type CategoryId } from "../data/products";

interface Props {
	value: CategoryId;
	query: string;
	count: number;
	onCategory: (value: CategoryId) => void;
	onQuery: (value: string) => void;
}

/** Filtros da lista da home: categoria + busca, como no app. */
export default function MenuFilters({
	value,
	query,
	count,
	onCategory,
	onQuery,
}: Props) {
	return (
		<div className="mt-10">
			<div className="flex flex-wrap gap-2">
				{categories.map((category) => {
					const isActive = category.id === value;

					return (
						<button
							key={category.id}
							type="button"
							onClick={() => onCategory(category.id)}
							aria-pressed={isActive}
							className={`tag border px-4 py-3 transition-colors duration-300 sm:px-5 ${
								isActive
									? "border-cocoa-900 bg-cocoa-900 text-paper"
									: "border-cocoa-900/25 text-cocoa-700 hover:border-cocoa-900"
							}`}
						>
							{category.label}
						</button>
					);
				})}
			</div>

			<div className="mt-8 flex items-center gap-3 border-b border-cocoa-900/20 pb-4">
				<svg
					viewBox="0 0 24 24"
					aria-hidden="true"
					className="h-5 w-5 shrink-0 text-cocoa-500"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<circle cx="11" cy="11" r="7" />
					<path d="m20 20-3.5-3.5" strokeLinecap="round" />
				</svg>
				<input
					type="search"
					value={query}
					onChange={(event) => onQuery(event.target.value)}
					placeholder="Buscar no cardápio"
					aria-label="Buscar no cardápio"
					className="w-full bg-transparent text-lg outline-none placeholder:text-cocoa-300"
				/>
				<span className="tag shrink-0 text-cocoa-400">{count}</span>
			</div>
		</div>
	);
}
