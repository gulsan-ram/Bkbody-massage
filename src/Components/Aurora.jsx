import React, { useEffect, useRef } from 'react';

const VERT = `#version 300 es
in vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
out vec4 fragColor;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec3 rampColor;
    
    // Optimized Color Ramp
    if (uv.x < 0.5) {
        rampColor = mix(uColorStops[0], uColorStops[1], uv.x * 2.0);
    } else {
        rampColor = mix(uColorStops[1], uColorStops[2], (uv.x - 0.5) * 2.0);
    }

    float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
    height = exp(height);
    height = (uv.y * 2.0 - height + 0.2);
    float intensity = 0.6 * height;
    float auroraAlpha = smoothstep(0.2 - uBlend * 0.5, 0.2 + uBlend * 0.5, intensity);
    
    fragColor = vec4(intensity * rampColor * auroraAlpha, auroraAlpha);
}`;

// Helper: Hex string to normalized RGB array
const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
};

export default function Aurora({ 
    colorStops = ['#5227FF', '#7cff67', '#5227FF'], 
    amplitude = 1.0, 
    blend = 0.5,
    speed = 1.0 
}) {
  const ctnDom = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = ctnDom.current;
    const canvas = document.createElement('canvas');
    canvasRef.current = canvas;
    container.appendChild(canvas);

    const gl = canvas.getContext('webgl2', { alpha: true, antialias: true });
    if (!gl) return;

    // 1. Setup Program
    const createShader = (gl, type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);

    // 2. Setup Geometry (Full-screen triangle)
    const vertices = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // 3. Get Uniform Locations
    const locs = {
      time: gl.getUniformLocation(program, "uTime"),
      amplitude: gl.getUniformLocation(program, "uAmplitude"),
      colors: gl.getUniformLocation(program, "uColorStops"),
      res: gl.getUniformLocation(program, "uResolution"),
      blend: gl.getUniformLocation(program, "uBlend"),
    };

    // 4. State & Animation
    let animationFrame;
    const resize = () => {
      const { offsetWidth: w, offsetHeight: h } = container;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = (t) => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      const rgbStops = new Float32Array(colorStops.flatMap(hexToRgb));
      
      gl.uniform1f(locs.time, t * 0.001 * speed);
      gl.uniform1f(locs.amplitude, amplitude);
      gl.uniform1f(locs.blend, blend);
      gl.uniform2f(locs.res, canvas.width, canvas.height);
      gl.uniform3fv(locs.colors, rgbStops);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      animationFrame = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();
    animationFrame = requestAnimationFrame(render);

    // 5. Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
      container.removeChild(canvas);
    };
  }, [colorStops, amplitude, blend, speed]);

  return <div ref={ctnDom} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />;
}