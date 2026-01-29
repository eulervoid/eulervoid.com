import { useRef, useState } from "react";
import { useFrame, extend, useThree } from "@react-three/fiber";
import { shaderMaterial, useTexture, useVideoTexture } from "@react-three/drei";
import { Vector2, ShaderMaterial, Texture, RepeatWrapping } from "three";

// Shaders and DitherMaterial setup remain identical
import vertexShader from "@src/shaders/DitherMaterial/vertexShader.glsl?raw";
import fragmentShader from "@src/shaders/DitherMaterial/fragmentShader.glsl?raw";

type DitherMaterialUniforms = {
    uTexture: Texture | null;
    uBlueNoiseTexture: Texture | null;
    uResolution: Vector2;
    uTextureResolution: Vector2;
    uNoiseResolution?: Vector2;
    uContrast?: number;
    uBrightness?: number;
};

const defaultUniforms: DitherMaterialUniforms = {
    uTexture: null,
    uBlueNoiseTexture: null,
    uResolution: new Vector2(),
    uTextureResolution: new Vector2(),
    uNoiseResolution: new Vector2(64),
    uContrast: 0.5,
    uBrightness: 5,
};

const DitherMaterial = shaderMaterial(defaultUniforms, vertexShader, fragmentShader);

export type DitherMaterialType = ShaderMaterial & DitherMaterialUniforms;

extend({ DitherMaterial });

type DitheredVideoProps = {
    noiseUrl: string;
    videoUrl: string;
    contrast?: number;
    brightness?: number;
};

type DitheredImageProps = {
    noiseUrl: string;
    imageUrl: string;
    contrast?: number;
    brightness?: number;
};

type DitheredMediaProps = {
    noiseUrl: string;
    imageUrl: string;
    videoUrl?: string;
    contrast?: number;
    brightness?: number;
};

function DitheredVideo({ videoUrl, noiseUrl, contrast, brightness }: DitheredVideoProps) {
    const { viewport } = useThree();
    const material = useRef<DitherMaterialType>(null);

    const noiseTexture = useTexture(noiseUrl, (texture) => {
        texture.wrapS = texture.wrapT = RepeatWrapping;
    });

    // useVideoTexture will suspend until the video metadata is loaded.
    const videoTexture = useVideoTexture(videoUrl, {
        muted: true,
        loop: true,
        start: true,
    });

    const videoSize = new Vector2(videoTexture.image.videoWidth, videoTexture.image.videoHeight);

    useFrame(({ size }) => {
        if (material.current) {
            material.current.uResolution.set(size.width, size.height);
        }
    });

    return (
        <mesh>
            <planeGeometry args={[viewport.width, viewport.height]} />
            <ditherMaterial
                key={DitherMaterial.key}
                ref={material}
                uTexture={videoTexture}
                uBlueNoiseTexture={noiseTexture}
                uTextureResolution={videoSize}
                uNoiseResolution={new Vector2(noiseTexture.width, noiseTexture.height)}
                uContrast={contrast}
                uBrightness={brightness}
            />
        </mesh>
    );
}

function DitheredImage({ imageUrl, noiseUrl, contrast, brightness }: DitheredImageProps) {
    const { viewport } = useThree();
    const material = useRef<DitherMaterialType>(null);

    const [imageSize, setImageSize] = useState(new Vector2(1, 1));

    const [imageTexture, noiseTexture] = useTexture([imageUrl, noiseUrl], ([img, noise]) => {
        noise.wrapS = noise.wrapT = RepeatWrapping;
        if (img.image) {
            const source = img.image as HTMLImageElement;
            setImageSize(new Vector2(source.width, source.height));
        }
    });

    useFrame(({ size }) => {
        if (material.current) material.current.uResolution.set(size.width, size.height);
    });

    return (
        <mesh>
            <planeGeometry args={[viewport.width, viewport.height]} />
            <ditherMaterial
                key={DitherMaterial.key}
                ref={material}
                uTexture={imageTexture}
                uBlueNoiseTexture={noiseTexture}
                uTextureResolution={imageSize}
                uContrast={contrast}
                uBrightness={brightness}
            />
        </mesh>
    );
}

export function DitheredMedia({
    videoUrl,
    imageUrl,
    noiseUrl,
    contrast,
    brightness,
}: DitheredMediaProps) {
    return videoUrl ? (
        <DitheredVideo
            videoUrl={videoUrl}
            noiseUrl={noiseUrl}
            contrast={contrast}
            brightness={brightness}
        />
    ) : (
        <DitheredImage
            imageUrl={imageUrl}
            noiseUrl={noiseUrl}
            contrast={contrast}
            brightness={brightness}
        />
    );
}
