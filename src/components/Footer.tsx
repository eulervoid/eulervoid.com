import { Link } from "@tanstack/react-router";

const linkClass = "transition-colors duration-100 hover:text-lime-300";

export function Footer() {
	return (
		<div id="footer" className="section flex flex-col gap-18 border-t">
			<div className="flex flex-col gap-2 max-w-100">
				<h2>Let's talk!</h2>
				<p>
					Have a project in mind? I'll be happy to hear from you and
					explore together if it's a good fit.
				</p>
				<a
					href="mailto:josh@eulervoid.com"
					className="text-black bg-white self-start px-4 py-2 ligatures mt-7 transition-colors duration-100 hover:bg-lime-300"
				>
					josh@eulervoid.com
				</a>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-3">
				<span>(c) 2025</span>
				<Link to="/imprint" className={`md:col-start-3 ${linkClass}`}>
					Imprint
				</Link>
				<a href="https://github.com/eulervoid" className={linkClass}>
					Github
				</a>
				<span className="text-white">eulervoid.com</span>
				<Link to="/privacy" className={`md:col-start-3 ${linkClass}`}>
					Privacy
				</Link>
				<a href="https://instagram.com/eulervoid" className={linkClass}>
					Instagram
				</a>
			</div>
		</div>
	);
}
