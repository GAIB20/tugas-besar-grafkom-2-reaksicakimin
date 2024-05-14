import WebGLRenderer from "../script/webgl/WebGLRenderer.js";
import Scene from "../script/objects/Scene.js";
import PerspectiveCamera from "../script/camera/PerspectiveCamera.js";
import Mesh from "../script/objects/Mesh.js";
import ShaderMaterial from "../script/material/ShaderMaterial.js";
import PlaneGeometry from "../script/geometry/PlaneGeometry.js";
import { vertexShaderSource, fragmentShaderSource } from "../script/webgl/Shaders.js";

const canvas = document.querySelector('canvas');

const scene = new Scene();

const renderer = new WebGLRenderer(canvas);
// renderer.setSize(window.innerWidth, window.innerHeight);
console.log(renderer)

// Create the camera
const camera = new PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
camera.position.z = 5; // Move the camera away from the origin
console.log(camera)

// Create a geometry
const geometry = new PlaneGeometry(5, 5);
console.log(geometry)

// Create a custom shader material
const material = new ShaderMaterial({
  vertexShader: vertexShaderSource,
  fragmentShader: fragmentShaderSource
});
console.log(material)

// Combine geometry and material into a mesh
const plane = new Mesh(geometry, material);
console.log(plane)

// Add the mesh to the scene
scene.add(plane);
console.log(scene)

// Render the scene from the perspective of the camera
function render() {
  webgl.render(scene, camera);
}

// // Handle window resize
// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });

// Start the rendering loop
render();