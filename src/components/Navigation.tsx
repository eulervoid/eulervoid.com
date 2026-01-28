import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Navigation() {
	return (
		<div className="section-px flex justify-between items-center gap-4 h-24 border-b">
			<Logo />
			<div className="flex gap-7 items-center">
				<Link
					to="/"
					activeProps={{
						className: "font-bold",
					}}
					hash="work"
					activeOptions={{ exact: true }}
					className="hidden md:block hover:text-lime-300"
				>
					Work
				</Link>
				<Link
					to="/"
					hash="timeline"
					activeProps={{
						className: "font-bold",
					}}
					activeOptions={{ exact: true }}
					className="hidden md:block hover:text-lime-300"
				>
					Timeline
				</Link>
				<Link
					to="/"
					hash="footer"
					activeProps={{
						className: "font-bold",
					}}
					activeOptions={{ exact: true }}
					className="text-black bg-white px-3 py-1 hover:bg-lime-300"
				>
					Contact
				</Link>
			</div>
		</div>
	);
}
