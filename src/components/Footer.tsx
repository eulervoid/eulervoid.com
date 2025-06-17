import { Link } from "@tanstack/react-router";

export function Footer() {
	return (
		<div id="footer" className="section flex flex-col gap-18 py-20 border-t">
			<div className="flex flex-col gap-2 max-w-100">
				<h2>Let's talk!</h2>
				<p>
					Have a project in mind? I’ll be happy to hear from you and explore
					together if it’s a good fit.
				</p>
				<a
					href="mailto:josh@eulervoid.com"
					className="text-black bg-white self-start px-4 py-2 ligatures mt-7"
				>
					josh@eulervoid.com
				</a>
			</div>
			<div className="grid grid-cols-4 gap-x-12 gap-y-3">
				<span>(c) 2025</span>
				<Link to="/imprint" className="col-start-3">
					Imprint
				</Link>
				<a href="https://github.com/eulervoid">Github</a>
				<span className="text-white">eulervoid.com</span>
				<Link to="/privacy" className="col-start-3">
					Privacy
				</Link>
				<a href="https://instagram.com/eulervoid">Instagram</a>
			</div>
		</div>
	);
}
