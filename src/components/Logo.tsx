import { Link } from "@tanstack/react-router";

export function Logo() {
	return (
		<Link to="/" className="flex items-center gap-3">
			<img src="/images/eulercircle.png" className="w-9 pixel-art" />
			<span className="text-xl text-white">eulervoid</span>
		</Link>
	);
}
