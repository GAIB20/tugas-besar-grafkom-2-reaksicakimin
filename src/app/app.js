import WebGLRenderer from "../script/webgl/WebGLRenderer.js";
import Scene from "../script/objects/Scene.js";
import PerspectiveCamera from "../script/camera/PerspectiveCamera.js";
import OrthographicCamera from "../script/camera/OrthographicCamera.js";
import ObliqueCamera from "../script/camera/ObliqueCamera.js";
import Mesh from "../script/objects/Mesh.js";
import PhongMaterial from "../script/material/PhongMaterial.js";
import BasicMaterial from "../script/material/BasicMaterial.js";
import BoxGeometry from "../script/geometry/BoxGeometry.js";
import { initializeCameraControls } from '../script/webutils/cameraControls.js';
import { buildHTML } from "../script/webutils/treeLoader.js";
import OrbitControl from "../script/control/OrbitControl.js"
import HollowBoxGeometry from "../script/geometry/HollowBoxGeometry.js";
import Texture from "../script/material/Texture.js";
import Vector3 from "../script/math/Vector3.js";

const canvas = document.querySelector('canvas');

const webgl = new WebGLRenderer(canvas);

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
// const texture = new Texture('../../test/texture/wood.png');
// texture.load(webgl._gl);
// const geometry = new BoxGeometry(1, 1, 1);
// const material = new PhongMaterial({
//   shininess: 32,
//   lightPosition: new Vector3(20, 100, 300),
//   ambient: [1, 1, 1, 1],
//   diffuse: [1, 1, 1, 1],
//   specular: [1, 1, 1, 1],
//   texture: texture
// });
// const mesh = new Mesh(geometry, material);
// mesh._name = "Object"

// const geometry2 = new BoxGeometry(1, 1, 1);
// const material2 = new PhongMaterial({
//   shininess: 32,
//   lightPosition: new Vector3(20, 100, 300),
//   ambient: [1, 1, 1, 1],
//   diffuse: [1, 1, 1, 1],
//   specular: [1, 1, 1, 1]
// });
// const mesh2 = new Mesh(geometry2, material2);
// mesh2._position._x = 1.2;
// mesh2._name = "Object1"
// mesh._children.push(mesh2);
// scene.add(mesh);


// const geometry3 = new BoxGeometry(1, 1, 1);
// const material3 = new BasicMaterial([1, 1, 1, 1]);
// const mesh3 = new Mesh(geometry3, material3);
// mesh3._position._x = -1.2;
// mesh3._name = "Object2"
// scene.add(mesh3);


const geometry4 = new HollowBoxGeometry(1, 1, 1);
const material4 = new PhongMaterial({
  shininess: 32,
  lightPosition: new Vector3(20, 100, 300),
  ambient: [1, 1, 1, 1],
  diffuse: [1, 1, 1, 1],
  specular: [1, 1, 1, 1]
});
const mesh4 = new Mesh(geometry4, material4);
mesh4._position._x = 2.4;
mesh4._name = "Object3"
scene.add(mesh4);

let json = scene.toJSON();
console.log(json);
var container = document.getElementById('container');
buildHTML(json, container)

function render() {
  requestAnimationFrame(render);
  webgl.render(scene, camera);
}
render();

