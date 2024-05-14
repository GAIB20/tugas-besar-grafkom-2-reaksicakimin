import * as THREE from 'three';

const canvas = document.querySelector('canvas');

// Create the scene
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create the camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
camera.position.z = 5; // Move the camera away from the origin
console.log(camera)

// Create a geometry
const geometry = new THREE.PlaneGeometry(5, 5);
console.log(geometry)

// Create a custom shader material
const material = new THREE.ShaderMaterial({
  vertexShader: `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // Fully transparent
    }
  `,
});
console.log(material)

// Combine geometry and material into a mesh
const plane = new THREE.Mesh(geometry, material);
console.log(plane)

// Add the mesh to the scene
scene.add(plane);
console.log(scene)

// Render the scene from the perspective of the camera
function render() {
  renderer.render(scene, camera);
  
console.log(renderer)
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the rendering loop
render();
