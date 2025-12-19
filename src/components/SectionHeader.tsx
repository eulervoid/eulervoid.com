type SectionHeaderProps = {
	title: string;
	description?: string;
};

export function SectionHeader({ title, description }: SectionHeaderProps) {
	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-3 mb-24">
			<h2 className="col-span-2">{title}</h2>
			{description && (
				<p className="col-span-2 md:col-start-3">{description}</p>
			)}
		</div>
	);
}
