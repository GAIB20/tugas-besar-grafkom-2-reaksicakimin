import * as THREE from 'three';

const canvas = document.querySelector('canvas');

// Create the scene
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
console.log(camera)

const geometry = new THREE.PlaneGeometry(5, 5);
console.log(geometry)

const material = new THREE.ShaderMaterial({
  vertexShader: `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `,
});
console.log(material)

const plane = new THREE.Mesh(geometry, material);
console.log(plane)

scene.add(plane);
console.log(scene)

function render() {
  renderer.render(scene, camera);
  
console.log(renderer)
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

render();
