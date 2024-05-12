let canvas = document.querySelector('canvas');

let gl = canvas.getContext('webgl');
if (!gl) {
  alert('Unable to initialize WebGL.');
}

function adjustCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width * dpr;
  const height = rect.height * dpr;
  
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
  }
}

// Adjust canvas size when resized
adjustCanvas();
const ro = new ResizeObserver(adjustCanvas);
ro.observe(canvas, { box: 'content-box' });


// Create shader
let vertexShader = createShader(gl, vertexShaderSource, ShaderType.VERTEX);
let fragmentShader = createShader(gl, fragmentShaderSource, ShaderType.FRAGMENT);

// Create program
let program = createProgram(gl, vertexShader, fragmentShader);
console.log(program);

gl.useProgram(program);