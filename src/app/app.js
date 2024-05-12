import WebGLRenderer from "../script/webgl/WebGLRenderer.js";
import Scene from "../script/objects/Scene.js";
import Camera from "../script/camera/Camera.js";
import Mesh from "../script/objects/Mesh.js";
import BasicMaterial from "../script/material/BasicMaterial.js";
import PlaneGeometry from "../script/geometry/PlaneGeometry.js";

const canvas = document.querySelector('canvas');

const webgl = new WebGLRenderer(canvas);

// render
const scene = new Scene();
const camera = new Camera();
scene.add(camera);

// make a mesh
const geometry = new PlaneGeometry(1000,1000);
const material = new BasicMaterial();
const mesh = new Mesh(geometry, material);
scene.add(mesh);

function render() {
  webgl.render(scene, camera);
}

render();