import { useEffect } from 'react';

const initStarfield = (canvas: HTMLCanvasElement) => {
  let gl: WebGLRenderingContext | null;
  try {
    gl = canvas.getContext('webgl', { antialias: false, depth: false, stencil: false, premultipliedAlpha: false });
  } catch (e) {
    gl = null;
  }
  if (!gl) return null;

  const vsSrc = `attribute vec2 p; varying vec2 v; void main(){ v = p*0.5+0.5; gl_Position = vec4(p,0.0,1.0); }`;
  const fsSrc = `precision highp float; varying vec2 v; uniform vec2 r; uniform float t;
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }
  float stars(vec2 uv){
    float s=0.0; 
    for(float i=0.0;i<3.0;i+=1.0){
      vec2 grid = uv*(2.0+i*1.7); 
      vec2 id=floor(grid);
      vec2 f=fract(grid)-0.5; 
      float n=hash(id+ i*11.0);
      float d=length(f + vec2(n-0.5, fract(n*3.7)-0.5)*0.6);
      s += smoothstep(0.06,0.0,d) * (0.6+(n*0.4));
      uv += vec2(0.01*i, 0.02*i);
    }
    return s;
  }
  void main(){
    vec2 uv = (v*r)/r.y;
    uv += vec2(t*0.02, 0.0);
    float s = stars(uv);
    float beam = exp(-25.0*abs(sin((v.y + t*0.12)*6.28318)));
    vec3 col = vec3(0.0);
    col += s * vec3(0.35,0.62,1.0);
    col += beam * vec3(0.0,0.92,1.0);
    gl_FragColor = vec4(col, 1.0);
  }`;
  
  const shader = (type: number, src: string) => { const sh = gl!.createShader(type)!; gl!.shaderSource(sh, src); gl!.compileShader(sh); return sh; };
  const pr = gl.createProgram()!;
  gl.attachShader(pr, shader(gl.VERTEX_SHADER, vsSrc));
  gl.attachShader(pr, shader(gl.FRAGMENT_SHADER, fsSrc));
  gl.linkProgram(pr);
  gl.useProgram(pr);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  
  const loc = gl.getAttribLocation(pr, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uR = gl.getUniformLocation(pr, 'r');
  const uT = gl.getUniformLocation(pr, 't');

  let animationFrameId: number;

  const fitCanvas = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
  };

  const draw = (ts: number) => {
    gl!.uniform2f(uR, canvas.width, canvas.height);
    gl!.uniform1f(uT, ts * 0.001);
    gl!.drawArrays(gl.TRIANGLES, 0, 6);
    animationFrameId = requestAnimationFrame(draw);
  };

  fitCanvas();
  animationFrameId = requestAnimationFrame(draw);
  
  window.addEventListener('resize', fitCanvas);

  return () => {
    window.removeEventListener('resize', fitCanvas);
    cancelAnimationFrame(animationFrameId);
  };
};

const useStarfield = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
    useEffect(() => {
        if (canvasRef.current) {
            const cleanup = initStarfield(canvasRef.current);
            return cleanup;
        }
    }, [canvasRef]);
};

export default useStarfield;
