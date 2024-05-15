import WebGLRenderer from "../script/webgl/WebGLRenderer.js";
import Scene from "../script/objects/Scene.js";
import PerspectiveCamera from "../script/camera/PerspectiveCamera.js";
import OrthographicCamera from "../script/camera/OrthographicCamera.js";
import Mesh from "../script/objects/Mesh.js";
import BasicMaterial from "../script/material/BasicMaterial.js";
import PlaneGeometry from "../script/geometry/PlaneGeometry.js";
import BoxGeometry from "../script/geometry/BoxGeometry.js";
import { initializeCameraControls } from '../script/webutils/cameraControls.js';
import OrbitControl from "../script/control/OrbitControl.js"

const canvas = document.querySelector('canvas');

const scene = new Scene();
// const camera = new OrthographicCamera(-canvas.width/2, canvas.width/2, -canvas.height/2, canvas.width/2, -1000, 1000);
const camera = new PerspectiveCamera(60, canvas.width/canvas.height, 0.01, 9999);
camera._position._z = 5;
console.log(camera);

// Initialize camera controls
initializeCameraControls(camera);

const control = new OrbitControl(camera, canvas);


// Create a mesh
const geometry = new BoxGeometry(1, 1, 1);
console.log(geometry);

const material = new BasicMaterial([255,0,0,1]);
console.log(material);

const mesh = new Mesh(geometry, material);
mesh._rotation._y = 20;
mesh._rotation._x = 20;
scene.add(mesh);

const geometry2 = new PlaneGeometry(1000, 1000);
const material2 = new BasicMaterial([255,255,255,1]);
const mesh2 = new Mesh(geometry2, material2);
mesh2._position._y = -400;
mesh2._position._z = 1500;
mesh2._scale._z = -1;

scene.add(mesh2);

console.log(scene);

function renders() {
  const webgl = new WebGLRenderer(canvas);
  requestAnimationFrame(renders);
  webgl.render(scene, camera);
}

renders();
