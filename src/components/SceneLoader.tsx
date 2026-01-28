// src/components/SceneLoader.jsx
import { Html, useProgress } from "@react-three/drei";

export function SceneLoader() {
	// useProgress tracks the loading progress of assets for Suspense
	const { progress } = useProgress();
	return (
		<Html center className="w-full h-full bg-red-600">
			{/* You can style this however you want */}
			<div
				style={{
					fontSize: "1.5em",
					color: "blue",
					background: "#ff0000",
				}}
				className="bg-red-600"
			>
				Loading scene... {Math.round(progress)}%
				<img src="/images/dude.gif" />
			</div>
		</Html>
	);
}
