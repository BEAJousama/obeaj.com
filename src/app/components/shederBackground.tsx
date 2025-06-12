"use client";

import { useEffect, useRef } from "react";

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl");

    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0, 1);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;

      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;

      void main() {
        vec2 fragCoord = gl_FragCoord.xy;
        
        const float DETAIL_START = 1.0;
        const float DETAIL_MAX = 9.0;
        const float DETAIL_MULT = 1.43;
        float CONTRAST = 1.0 / 3000.0;
        float MOVEMENT_VARIATION = 0.2;
        float MOVEMENT_SPEED = 1.0;
        float TIME_VARIATION = 1.0;
        float TUNNEL_WIDTH = iMouse.x / 50.0;
        float COLORFULNESS = 1.0 / 50.0;
        float COLOR_DECAY = 0.1;
        const float ITERATIONS = 100.0;

        float z = 0.0;
        vec4 color = vec4(0.0);

        for(float i = 0.0; i < ITERATIONS; i++) {
          vec3 p = 1.0 * z
              * normalize(vec3(2.0 * fragCoord, 0.0) - vec3(iResolution, 0.0));
          p.z -= iTime * MOVEMENT_SPEED;

          for(int j = 0; j < 8; j++) {
              float d = DETAIL_START * pow(DETAIL_MULT, float(j));
              if (d >= DETAIL_MAX) break;
              p += cos(d * p.yzx + MOVEMENT_VARIATION * z) / d;
          }

          float f = COLORFULNESS + COLOR_DECAY * abs(TUNNEL_WIDTH - length(p.xy));
          z += f;
          color += (cos(z + iTime * TIME_VARIATION + vec4(6.0, 1.0, 2.0, 3.0)) + 1.0) / f;
        }

        gl_FragColor = clamp(color * CONTRAST, 0.0, 1.0);
      }
    `;

    function createShader(type: number, source: string) {
      if (!gl) return null;
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) {
      console.error("Failed to create shaders");
      return;
    }
    
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Create fullscreen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const iMouseLocation = gl.getUniformLocation(program, "iMouse");

    let mouse = [0, 0];

    const updateMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = [e.clientX - rect.left, rect.height - (e.clientY - rect.top)];
    };

    canvas.addEventListener("mousemove", updateMouse);

    const startTime = performance.now();
    
    const render = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;

      // Resize canvas to match display size
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      // Set uniforms
      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(iTimeLocation, elapsed);
      gl.uniform2f(iMouseLocation, mouse[0], mouse[1]);

      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    return () => {
      canvas.removeEventListener("mousemove", updateMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ 
        position: "fixed", 
        top: 0, 
        left: 0,
        width: "100%",
        height: "100%"
      }}
    />
  );
}