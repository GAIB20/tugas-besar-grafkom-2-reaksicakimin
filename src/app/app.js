import WebGLRenderer from "../script/webgl/WebGLRenderer.js";
import Scene from "../script/objects/Scene.js";
import PerspectiveCamera from "../script/camera/PerspectiveCamera.js";
import OrthographicCamera from "../script/camera/OrthographicCamera.js";
import Mesh from "../script/objects/Mesh.js";
import BasicMaterial from "../script/material/BasicMaterial.js";
import PlaneGeometry from "../script/geometry/PlaneGeometry.js";

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);
const webgl = new WebGLRenderer(canvas);
// render
const scene = new Scene();
// const camera = new OrthographicCamera(-canvas.width/2, canvas.width/2, -canvas.height/2, canvas.width/2, -1000, 1000);
const camera = new PerspectiveCamera(60, canvas.width/canvas.height, 0.01, 9999);
camera.position[2] = 700;
// camera.position[1] = -250;
// camera.position[0] = -400;
console.log(camera)

// make a mesh
const geometry = new PlaneGeometry(1000, 1000);
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