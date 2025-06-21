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
      discard; 
  }
  
  vec2 noiseUv = gl_FragCoord.xy / uNoiseResolution;
  float noiseValue = texture2D(uBlueNoiseTexture, noiseUv).r;

  vec4 originalColor = texture2D(uTexture, coverUv);
  vec3 linearColor = pow(originalColor.rgb, vec3(2.2));
  float luminance = getLuminance(linearColor);
  luminance = applyBrightness(luminance);
  luminance = applyContrast(luminance);

  float dither = step(noiseValue, luminance);

  gl_FragColor = vec4(vec3(dither) * 0.6, 1.0);
}

