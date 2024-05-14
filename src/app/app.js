import WebGLRenderer from "../script/webgl/WebGLRenderer.js";
import Scene from "../script/objects/Scene.js";
import PerspectiveCamera from "../script/camera/PerspectiveCamera.js";
import Mesh from "../script/objects/Mesh.js";
import BasicMaterial from "../script/material/BasicMaterial.js";
import PlaneGeometry from "../script/geometry/PlaneGeometry.js";

const canvas = document.querySelector('canvas');

const webgl = new WebGLRenderer(canvas);

// render
const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position[2] = 700;
camera.position[1] = 100;
console.log(camera)

// make a mesh
const geometry = new PlaneGeometry(100, 100);
console.log(geometry)


const material = new BasicMaterial({});
console.log(material)

const mesh = new Mesh(geometry, material);

console.log(mesh)
mesh.position[1] = -300;
// mesh.position[0] = 200;
// mesh.position[2] = -90;
mesh.scale[2] = -1;
scene.add(mesh);
scene.scale[2] = 1;
console.log(scene)

function render() {
  webgl.render(scene, camera);
  console.log(webgl)
}

render();