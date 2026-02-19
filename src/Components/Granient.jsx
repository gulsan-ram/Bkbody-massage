import React, { useEffect, useRef } from 'react';

const vertex = `#version 300 es
in vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;

#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);} 
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);} 
float noise(vec2 p){
    vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);
    float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);
    return 0.5+0.5*n;
}

void mainImage(out vec4 o, vec2 C){
    float t=iTime*uTimeSpeed;
    vec2 uv=C/iResolution.xy;
    float ratio=iResolution.x/iResolution.y;
    vec2 tuv=uv-0.5+uCenterOffset;
    tuv/=max(uZoom,0.001);

    float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
    tuv.y*=1.0/ratio;
    tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
    tuv.y*=ratio;

    float frequency=uWarpFrequency;
    float ws=max(uWarpStrength,0.001);
    float amplitude=uWarpAmplitude/ws;
    float warpTime=t*uWarpSpeed;
    tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
    tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);

    float b=uColorBalance;
    float s=max(uBlendSoftness,0.0);
    mat2 blendRot=Rot(radians(uBlendAngle));
    float blendX=(tuv*blendRot).x;
    float edge0=-0.3-b-s;
    float edge1=0.2-b+s;
    vec3 layer1=mix(uColor3,uColor2,S(edge0,edge1,blendX));
    vec3 layer2=mix(uColor2,uColor1,S(edge0,edge1,blendX));
    vec3 col=mix(layer1,layer2,S(0.5-b+s,-0.3-b-s,tuv.y));

    vec2 grainUv=uv*max(uGrainScale,0.001);
    if(uGrainAnimated>0.5) grainUv+=vec2(iTime*0.05); 
    float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
    col+=(grain-0.5)*uGrainAmount;

    col=(col-0.5)*uContrast+0.5;
    float luma=dot(col,vec3(0.2126,0.7152,0.0722));
    col=mix(vec3(luma),col,uSaturation);
    col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
    o=vec4(clamp(col,0.0,1.0),1.0);
}

void main(){
    vec4 o=vec4(0.0);
    mainImage(o,gl_FragCoord.xy);
    fragColor=o;
}`;

const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b];
};

const Grainient = ({
    timeSpeed = 0.25, colorBalance = 0.0, warpStrength = 1.0, warpFrequency = 5.0,
    warpSpeed = 2.0, warpAmplitude = 50.0, blendAngle = 0.0, blendSoftness = 0.05,
    rotationAmount = 500.0, noiseScale = 2.0, grainAmount = 0.1, grainScale = 2.0,
    grainAnimated = false, contrast = 1.5, gamma = 1.0, saturation = 1.0,
    centerX = 0.0, centerY = 0.0, zoom = 0.9, color1 = '#FF9FFC',
    color2 = '#5227FF', color3 = '#B19EEF', className = ''
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const canvas = document.createElement('canvas');
        Object.assign(canvas.style, { width: '100%', height: '100%', display: 'block' });
        container.appendChild(canvas);

        const gl = canvas.getContext('webgl2', { alpha: true, antialias: false });
        if (!gl) return;

        const createShader = (type, src) => {
            const s = gl.createShader(type);
            gl.shaderSource(s, src);
            gl.compileShader(s);
            return s;
        };

        const program = gl.createProgram();
        gl.attachShader(program, createShader(gl.VERTEX_SHADER, vertex));
        gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fragment));
        gl.linkProgram(program);
        gl.useProgram(program);

        // Full screen triangle (more efficient than a quad)
        const vertices = new Float32Array([-1, -1, 3, -1, -1, 3]);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const posLoc = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        const getLoc = (name) => gl.getUniformLocation(program, name);
        const locs = {
            iTime: getLoc('iTime'), iResolution: getLoc('iResolution'), uTimeSpeed: getLoc('uTimeSpeed'),
            uColorBalance: getLoc('uColorBalance'), uWarpStrength: getLoc('uWarpStrength'),
            uWarpFrequency: getLoc('uWarpFrequency'), uWarpSpeed: getLoc('uWarpSpeed'),
            uWarpAmplitude: getLoc('uWarpAmplitude'), uBlendAngle: getLoc('uBlendAngle'),
            uBlendSoftness: getLoc('uBlendSoftness'), uRotationAmount: getLoc('uRotationAmount'),
            uNoiseScale: getLoc('uNoiseScale'), uGrainAmount: getLoc('uGrainAmount'),
            uGrainScale: getLoc('uGrainScale'), uGrainAnimated: getLoc('uGrainAnimated'),
            uContrast: getLoc('uContrast'), uGamma: getLoc('uGamma'), uSaturation: getLoc('uSaturation'),
            uCenterOffset: getLoc('uCenterOffset'), uZoom: getLoc('uZoom'),
            uColor1: getLoc('uColor1'), uColor2: getLoc('uColor2'), uColor3: getLoc('uColor3')
        };

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = container.clientWidth;
            const h = container.clientHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };

        const ro = new ResizeObserver(resize);
        ro.observe(container);
        resize();

        let raf;
        const start = performance.now();
        const loop = (now) => {
            gl.uniform1f(locs.iTime, (now - start) * 0.001);
            gl.uniform2f(locs.iResolution, canvas.width, canvas.height);
            gl.uniform1f(locs.uTimeSpeed, timeSpeed);
            gl.uniform1f(locs.uColorBalance, colorBalance);
            gl.uniform1f(locs.uWarpStrength, warpStrength);
            gl.uniform1f(locs.uWarpFrequency, warpFrequency);
            gl.uniform1f(locs.uWarpSpeed, warpSpeed);
            gl.uniform1f(locs.uWarpAmplitude, warpAmplitude);
            gl.uniform1f(locs.uBlendAngle, blendAngle);
            gl.uniform1f(locs.uBlendSoftness, blendSoftness);
            gl.uniform1f(locs.uRotationAmount, rotationAmount);
            gl.uniform1f(locs.uNoiseScale, noiseScale);
            gl.uniform1f(locs.uGrainAmount, grainAmount);
            gl.uniform1f(locs.uGrainScale, grainScale);
            gl.uniform1f(locs.uGrainAnimated, grainAnimated ? 1.0 : 0.0);
            gl.uniform1f(locs.uContrast, contrast);
            gl.uniform1f(locs.uGamma, gamma);
            gl.uniform1f(locs.uSaturation, saturation);
            gl.uniform2f(locs.uCenterOffset, centerX, centerY);
            gl.uniform1f(locs.uZoom, zoom);
            gl.uniform3fv(locs.uColor1, hexToRgb(color1));
            gl.uniform3fv(locs.uColor2, hexToRgb(color2));
            gl.uniform3fv(locs.uColor3, hexToRgb(color3));

            gl.drawArrays(gl.TRIANGLES, 0, 3);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            gl.deleteProgram(program);
            gl.deleteBuffer(buffer);
            if (canvas.parentNode) container.removeChild(canvas);
        };
    }, [
        timeSpeed, colorBalance, warpStrength, warpFrequency, warpSpeed, warpAmplitude,
        blendAngle, blendSoftness, rotationAmount, noiseScale, grainAmount, grainScale,
        grainAnimated, contrast, gamma, saturation, centerX, centerY, zoom,
        color1, color2, color3
    ]);

    return <div ref={containerRef} className={`grainient-container ${className}`.trim()} style={{ width: '100%', height: '100%' }} />;
};

export default Grainient;