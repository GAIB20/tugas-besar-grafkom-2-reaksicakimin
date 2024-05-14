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
camera.position[2] = 5;
console.log(camera)

// make a mesh
const geometry = new PlaneGeometry(5, 5);
console.log(geometry)

const material = new BasicMaterial({});
console.log(material)

const mesh = new Mesh(geometry, material);
console.log(mesh)

scene.add(mesh);
console.log(scene)

function render() {
  webgl.render(scene, camera);
  console.log(webgl)
}

render();