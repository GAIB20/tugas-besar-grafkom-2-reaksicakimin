import WebGLRenderer from "../script/webgl/WebGLRenderer.js";
import Scene from "../script/objects/Scene.js";
import PerspectiveCamera from "../script/camera/PerspectiveCamera.js";
import OrthographicCamera from "../script/camera/OrthographicCamera.js";
import Mesh from "../script/objects/Mesh.js";
import BasicMaterial from "../script/material/BasicMaterial.js";
import PlaneGeometry from "../script/geometry/PlaneGeometry.js";
import BoxGeometry from "../script/geometry/BoxGeometry.js";

const canvas = document.querySelector('canvas');

const webgl = new WebGLRenderer(canvas);

const scene = new Scene();
// const camera = new OrthographicCamera(-canvas.width/2, canvas.width/2, -canvas.height/2, canvas.width/2, -1000, 1000);
const camera = new PerspectiveCamera(60, canvas.width/canvas.height, 0.01, 9999);
camera.position._z = 700;
console.log(camera)

// make a mesh
const geometry = new BoxGeometry(200, 200);
console.log(geometry)


const material = new BasicMaterial({});
console.log(material)

const mesh = new Mesh(geometry, material);
scene.add(mesh);

console.log(scene)

function render() {
  webgl.render(scene, camera);
  console.log(webgl)
}

render();