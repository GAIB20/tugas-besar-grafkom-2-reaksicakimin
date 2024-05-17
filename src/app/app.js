import WebGLRenderer from "../script/webgl/WebGLRenderer.js";
import Scene from "../script/objects/Scene.js";
import PerspectiveCamera from "../script/camera/PerspectiveCamera.js";
import OrthographicCamera from "../script/camera/OrthographicCamera.js";
import ObliqueCamera from "../script/camera/ObliqueCamera.js";
import Mesh from "../script/objects/Mesh.js";
import PhongMaterial from "../script/material/PhongMaterial.js";
import BasicMaterial from "../script/material/BasicMaterial.js";
import BoxGeometry from "../script/geometry/BoxGeometry.js";
import { initializeCameraControls } from '../script/webutils/cameraControls.js';
import { buildHTML } from "../script/webutils/treeLoader.js";
import OrbitControl from "../script/control/OrbitControl.js"

const canvas = document.querySelector('canvas');

// Create a scene
const scene = new Scene();
scene._name = "Scene";

// Create a camera
let camera = new PerspectiveCamera(
  60, 
  canvas.width/canvas.height, 
  0.01, 
  9999
);
camera._position._z = 5;
initializeCameraControls(camera);
let control = new OrbitControl(camera, canvas);

// Camera projection type listener
const projectionType = document.getElementById("projection-type");
  projectionType.addEventListener("change", function() {
    const value = this.value;
    if (value === "perspective") {
      camera = new PerspectiveCamera(
        60, 
        canvas.width/canvas.height, 
        0.01, 
        9999
      );
      camera._position._z = 5;
    } else if (value === "orthographic") {
      camera = new OrthographicCamera(
        -canvas.clientWidth/380,
        canvas.clientWidth/380,
        canvas.clientHeight/380,
        -canvas.clientHeight/380,
        -1000,
        1000
      )
    } else if (value === "oblique") {
      camera = new ObliqueCamera(
        -canvas.clientWidth/380,
        canvas.clientWidth/380,
        canvas.clientHeight/380,
        -canvas.clientHeight/380,
        -1000,
        1000,
        90,
        90
      )
    }
    initializeCameraControls(camera);
    control = new OrbitControl(camera, canvas);
  });

// Create a mesh
const geometry = new BoxGeometry(1, 1, 1);
const material = new PhongMaterial();
console.log(material);
const mesh = new Mesh(geometry, material);
mesh._name = "Object"

const geometryc = new BoxGeometry(1, 1, 1);
const materialc = new BasicMaterial([0.5, 0, 0, 1]);
const meshc = new Mesh(geometryc, materialc);
meshc._position._x = 1.2;
meshc._name = "Object1"
mesh._children.push(meshc);

scene.add(mesh);


const geometry2 = new BoxGeometry(10, 10, 10);
const material2 = new BasicMaterial([1, 1, 1, 1]);
const mesh2 = new Mesh(geometry2, material2);
mesh2._position._x = 20;
mesh2._position._y = 100;
mesh2._position._z = -300;
mesh2._name = "Light"
scene.add(mesh2);

let json = scene.toJSON();
console.log(json);
var container = document.getElementById('container');
buildHTML(json, container);

// Render the scene
const gl = canvas.getContext('webgl');
const texture = loadTexture(gl, "cubeTexture.png");
function render() {
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  const webgl = new WebGLRenderer(canvas);
  requestAnimationFrame(render);
  webgl.render(scene, camera);
}
render();

function isPowerOf2(value) {
  return (value & (value - 1)) === 0;
}
function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Because images have to be downloaded over the internet
  // they might take a moment until they are ready.
  // Until then put a single pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    width,
    height,
    border,
    srcFormat,
    srcType,
    pixel,
  );

  const image = new Image();
  console.log(image.src);
  image.src = url;
  image.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    console.log(srcFormat, srcType, level);
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      srcFormat,
      srcType,
      image,
    );

    // WebGL1 has different requirements for power of 2 images
    // vs. non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      // Yes, it's a power of 2. Generate mips.
      console.log("power of 2")
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      // No, it's not a power of 2. Turn off mips and set
      // wrapping to clamp to edge
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };

  return texture;
}