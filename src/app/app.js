import WebGLRenderer from "../script/webgl/WebGLRenderer.js";
import Scene from "../script/objects/Scene.js";
import PerspectiveCamera from "../script/camera/PerspectiveCamera.js";
import OrthographicCamera from "../script/camera/OrthographicCamera.js";
import ObliqueCamera from "../script/camera/ObliqueCamera.js";
import Mesh from "../script/objects/Mesh.js";
import PhongMaterial from "../script/material/PhongMaterial.js";
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
// const geometry = new BoxGeometry(1, 1, 1);
// const material = new PhongMaterial([255,0,0,1]);
// const mesh = new Mesh(geometry, material);
// mesh._name = "Object"

// const geometryc = new BoxGeometry(1, 1, 1);
// const materialc = new PhongMaterial([255,0,0,1]);
// const meshc = new Mesh(geometryc, materialc);
// meshc._position._x = 1.2;
// meshc._name = "Object1"
// mesh._children.push(meshc);

// scene.add(mesh);


const geometry2 = new BoxGeometry(10, 10, 10);
const material2 = new PhongMaterial([255,255,255,1]);
const mesh2 = new Mesh(geometry2, material2);
mesh2._position._x = 20;
mesh2._position._y = 100;
mesh2._position._z = -300;
mesh2._name = "Light"
scene.add(mesh2);

export function addMesh(mesh) {
  scene.add(mesh);
}

export function clearShapes() {
  scene.clearShapes();
}

let json = scene.toJSON();
console.log(json);
var container = document.getElementById('container');
buildHTML(json, container);

// Render the scene
function render() {
  const webgl = new WebGLRenderer(canvas);
  requestAnimationFrame(render);
  webgl.render(scene, camera);
}
render();
