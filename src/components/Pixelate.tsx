import React, { useMemo, useLayoutEffect } from "react";
import { Scene, OrthographicCamera, NearestFilter } from "three";
import { useFrame, createPortal, useThree } from "@react-three/fiber";
import { useFBO, Plane } from "@react-three/drei";

type PixelateProps = {
    children: React.ReactNode;
    pixelSize?: number;
};

export function Pixelate({ children, pixelSize = 1.0 }: PixelateProps) {
    const { gl, size } = useThree();

    const { virtualScene, virtualCamera } = useMemo(() => {
        const scene = new Scene();
        const camera = new OrthographicCamera();
        return { virtualScene: scene, virtualCamera: camera };
    }, []);

    useLayoutEffect(() => {
        virtualCamera.left = size.width / -2;
        virtualCamera.right = size.width / 2;
        virtualCamera.top = size.height / 2;
        virtualCamera.bottom = size.height / -2;
        virtualCamera.near = 0.1;
        virtualCamera.far = 1000;
        virtualCamera.position.set(0, 0, 1);
        virtualCamera.updateProjectionMatrix();
    }, [size, virtualCamera]);

    const fbo = useFBO(size.width / pixelSize, size.height / pixelSize);

    useFrame(() => {
        gl.setRenderTarget(fbo);
        gl.clear();
        gl.render(virtualScene, virtualCamera);
        gl.setRenderTarget(null);
    });

    return (
        <>
            {createPortal(children, virtualScene)}
            <Plane args={[size.width, size.height]}>
                <meshBasicMaterial
                    map={fbo.texture}
                    map-magFilter={NearestFilter}
                    map-minFilter={NearestFilter}
                />
            </Plane>
        </>
    );
}
