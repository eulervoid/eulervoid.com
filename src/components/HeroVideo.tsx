import { DitheredMedia } from "./DitheredMedia";
import { Canvas } from "@react-three/fiber";
import { Pixelate } from "./Pixelate";

export default function HeroVideo() {
    return (
        <Canvas orthographic>
            <Pixelate pixelSize={2}>
                <DitheredMedia
                    videoUrl="/videos/sand.mp4"
                    imageUrl="/images/smileys.jpg"
                    noiseUrl="/images/blue_noise/64_LDR_LLL1_8.png"
                    brightness={1.0}
                    contrast={0.5}
                />
            </Pixelate>
        </Canvas>
    );
}
