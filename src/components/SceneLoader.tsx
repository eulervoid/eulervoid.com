// src/components/SceneLoader.jsx
import { Html, useProgress } from "@react-three/drei";

export function SceneLoader() {
	// useProgress tracks the loading progress of assets for Suspense
	const { progress } = useProgress();
	return (
		<Html center>
			{/* You can style this however you want */}
			<div style={{ fontSize: "1.5em", color: "white" }}>
				Loading scene... {Math.round(progress)}%
			</div>
		</Html>
	);
}
