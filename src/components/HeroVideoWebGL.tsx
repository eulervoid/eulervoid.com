import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute vec2 a_uv;
  varying vec2 vUv;
  void main() {
    vUv = vec2(a_uv.x, 1.0 - a_uv.y);
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform sampler2D uTexture;
  uniform sampler2D uBlueNoiseTexture;
  uniform vec2 uResolution;
  uniform vec2 uTextureResolution;
  uniform vec2 uNoiseResolution;
  uniform float uContrast;
  uniform float uBrightness;
  varying vec2 vUv;

  float getLuminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }

  float applyContrast(float luminance) {
    return smoothstep(0.5 - uContrast / 2.0, 0.5 + uContrast / 2.0, luminance);
  }

  float applyBrightness(float luminance) {
    return luminance * uBrightness;
  }

  void main() {
    vec2 planeSize = uResolution;
    vec2 textureSize = uTextureResolution;
    float planeAspect = planeSize.x / planeSize.y;
    float textureAspect = textureSize.x / textureSize.y;

    vec2 scale;
    if (planeAspect > textureAspect) {
      scale = vec2(1.0, (textureAspect / planeAspect));
    } else {
      scale = vec2((planeAspect / textureAspect), 1.0);
    }

    vec2 coverUv = vUv - 0.5;
    coverUv *= scale;
    coverUv += 0.5;

    if (coverUv.x < 0.0 || coverUv.x > 1.0 || coverUv.y < 0.0 || coverUv.y > 1.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }

    vec2 noiseUv = gl_FragCoord.xy / uNoiseResolution;
    float noiseValue = texture2D(uBlueNoiseTexture, noiseUv).r;

    vec4 originalColor = texture2D(uTexture, coverUv);
    vec3 linearColor = pow(originalColor.rgb, vec3(2.2));
    float luminance = getLuminance(linearColor);
    luminance = applyBrightness(luminance);
    luminance = applyContrast(luminance);

    float dither = step(noiseValue, luminance);

    gl_FragColor = vec4(vec3(dither) * vec3(0.0, 0.05, 0.8), 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(
    gl: WebGLRenderingContext,
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader,
): WebGLProgram | null {
    const program = gl.createProgram();
    if (!program) return null;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    return program;
}

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
    });
}

type HeroVideoWebGLProps = {
    videoUrl: string;
    noiseUrl: string;
    brightness?: number;
    contrast?: number;
    pixelSize?: number;
};

export default function HeroVideoWebGL({
    videoUrl,
    noiseUrl,
    brightness = 1.0,
    contrast = 0.5,
    pixelSize = 2,
}: HeroVideoWebGLProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;

        const gl = canvas.getContext("webgl", {
            alpha: false,
            antialias: false,
        });

        if (!gl) {
            console.error("WebGL not supported");
            return;
        }

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
        if (!vertexShader || !fragmentShader) return;

        const program = createProgram(gl, vertexShader, fragmentShader);
        if (!program) return;

        // Look up uniform locations
        const uTextureLoc = gl.getUniformLocation(program, "uTexture");
        const uBlueNoiseTextureLoc = gl.getUniformLocation(program, "uBlueNoiseTexture");
        const uResolutionLoc = gl.getUniformLocation(program, "uResolution");
        const uTextureResolutionLoc = gl.getUniformLocation(program, "uTextureResolution");
        const uNoiseResolutionLoc = gl.getUniformLocation(program, "uNoiseResolution");
        const uContrastLoc = gl.getUniformLocation(program, "uContrast");
        const uBrightnessLoc = gl.getUniformLocation(program, "uBrightness");

        // Set up geometry
        const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
        const uvs = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        const positionLoc = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

        const uvBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
        const uvLoc = gl.getAttribLocation(program, "a_uv");
        gl.enableVertexAttribArray(uvLoc);
        gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

        let videoTexture: WebGLTexture | null = null;
        let noiseTexture: WebGLTexture | null = null;
        let animationId: number;
        let isActive = true;
        let noiseSize = { width: 64, height: 64 };
        let resizeTimeout: number | null = null;

        const resize = (displayWidth: number, displayHeight: number) => {
            const width = Math.max(1, Math.round(displayWidth / pixelSize));
            const height = Math.max(1, Math.round(displayHeight / pixelSize));
            canvas.width = width;
            canvas.height = height;
            gl.viewport(0, 0, width, height);
        };

        const render = () => {
            if (!isActive) return;

            if (video.readyState >= 2 && videoTexture) {
                gl.bindTexture(gl.TEXTURE_2D, videoTexture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
            }

            gl.useProgram(program);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, videoTexture);
            gl.uniform1i(uTextureLoc, 0);

            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, noiseTexture);
            gl.uniform1i(uBlueNoiseTextureLoc, 1);

            gl.uniform2f(uResolutionLoc, canvas.clientWidth, canvas.clientHeight);
            gl.uniform2f(
                uTextureResolutionLoc,
                video.videoWidth || 1920,
                video.videoHeight || 1080,
            );
            gl.uniform2f(uNoiseResolutionLoc, noiseSize.width, noiseSize.height);
            gl.uniform1f(uContrastLoc, contrast);
            gl.uniform1f(uBrightnessLoc, brightness);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationId = requestAnimationFrame(render);
        };

        const init = async () => {
            try {
                const noiseImg = await loadImage(noiseUrl);
                noiseSize = {
                    width: noiseImg.width,
                    height: noiseImg.height,
                };

                noiseTexture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, noiseTexture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, noiseImg);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

                videoTexture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, videoTexture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

                video.muted = true;
                video.loop = true;
                video.playsInline = true;
                video.crossOrigin = "anonymous";

                const canPlayNativeHls = () => {
                    return video.canPlayType("application/vnd.apple.mpegurl") !== "";
                };

                const setupHls = () => {
                    if (Hls.isSupported()) {
                        const hlsInstance = new Hls({
                            enableWorker: true,
                            lowLatencyMode: true,
                        });
                        hlsRef.current = hlsInstance;
                        hlsInstance.loadSource(videoUrl);
                        hlsInstance.attachMedia(video);
                        hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
                            video.play().catch((e) => console.error("Failed to play video:", e));
                        });
                    } else if (canPlayNativeHls()) {
                        video.src = videoUrl;
                    }
                };

                video.onloadedmetadata = () => {
                    const rect = canvas.getBoundingClientRect();
                    resize(rect.width, rect.height);
                    setIsReady(true);
                    render();
                };

                video.onerror = (e) => {
                    console.error("Failed to load video:", e);
                };

                setupHls();
            } catch (err) {
                console.error("Failed to initialize WebGL:", err);
            }
        };

        init();

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                // Debounce resize to prevent canvas flash
                if (resizeTimeout) {
                    clearTimeout(resizeTimeout);
                }
                resizeTimeout = window.setTimeout(() => {
                    resize(width, height);
                }, 10);
            }
        });
        resizeObserver.observe(canvas);

        return () => {
            isActive = false;
            cancelAnimationFrame(animationId);
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeObserver.disconnect();
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
            if (gl) {
                gl.deleteProgram(program);
                gl.deleteShader(vertexShader);
                gl.deleteShader(fragmentShader);
                if (videoTexture) gl.deleteTexture(videoTexture);
                if (noiseTexture) gl.deleteTexture(noiseTexture);
                gl.deleteBuffer(positionBuffer);
                gl.deleteBuffer(uvBuffer);
            }
        };
    }, [videoUrl, noiseUrl, brightness, contrast, pixelSize]);

    return (
        <div className="relative w-full h-full">
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
                style={{
                    imageRendering: "pixelated",
                    opacity: isReady ? 1 : 0,
                    transition: "opacity 0.3s ease",
                }}
            />
            <video ref={videoRef} className="hidden" playsInline muted loop />
        </div>
    );
}
