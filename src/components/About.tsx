export function About() {
	return (
		<div id="about" className="section py-20 border-t space-y-12">
			<div className="grid grid-cols-4 gap-x-12 gap-y-3">
				<h2>About</h2>
				<p className="col-span-2 col-start-3">
					Since finishing my degree in Media Computer Science in 2015, I worked
					with starups and big cooperations alike, combining design thinking and
					creative problem solving with broad technical expertise.
				</p>
			</div>
			<div className="flex">
				<img
					src="/images/dude.gif"
					width="64"
					height="64"
					className="pixel-art"
				/>
			</div>
		</div>
	);
}
