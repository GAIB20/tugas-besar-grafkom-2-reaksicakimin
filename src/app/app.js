import WebGLRenderer from "../script/webgl/WebGLRenderer.js";
import Scene from "../script/objects/Scene.js";
import PerspectiveCamera from "../script/camera/PerspectiveCamera.js";
import OrthographicCamera from "../script/camera/OrthographicCamera.js";
import ObliqueCamera from "../script/camera/ObliqueCamera.js";
import Mesh from "../script/objects/Mesh.js";
import PhongMaterial from "../script/material/PhongMaterial.js";
import BasicMaterial from "../script/material/BasicMaterial.js";
import BoxGeometry from "../script/geometry/BoxGeometry.js";
import { buildHTML } from "../script/webutils/treeLoader.js";
import CameraControls from "../script/controls/CameraControls.js"
import HollowBoxGeometry from "../script/geometry/HollowBoxGeometry.js";
import HollowPyramidGeometry from "../script/geometry/HollowPyramidGeometry.js";
import HollowRingGeometry from "../script/geometry/HollowRingGeometry.js";
import NormalTexture from "../script/texture/NormalTexture.js";
import BumpTexture from "../script/texture/BumpTexture.js";
import EnvironmentTexture from "../script/texture/EnvironmentTexture.js";
import Vector3 from "../script/math/Vector3.js";
import ObjectControls from "../script/controls/ObjectControls.js";
import LightControls from "../script/controls/LightControls.js";
import DirectionalLight from "../script/light/DirectionalLight.js";
import MaterialControls from "../script/controls/MaterialControls.js";
import Object3D from "../script/objects/Object3D.js";
import TreeControls from "../script/controls/TreeControls.js";
import SpotLight from "../script/light/SpotLight.js";

const canvas = document.querySelector('canvas');

const webgl = new WebGLRenderer(canvas);

// Create a scene
var scene = new Scene();
scene._name = "Scene";

// Create a directional light
const light = new DirectionalLight();
light._name = "Light";
light._type = "Light";
scene.add(light);
const light2 = new DirectionalLight();
light2._name = "COKK";
light2._type = "Light";
scene.add(light2);

// console.log(light);

// Create a camera
let camera = new PerspectiveCamera(
  60, 
  canvas.width/canvas.height, 
  0.01, 
  9999
);
camera._position._z = 5;
let center = new Object3D();
center.add(camera);
let control = new CameraControls(camera, canvas, center);

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
    } else if (value === "orthographic") {
      camera = new OrthographicCamera(
        -canvas.clientWidth/380,
        canvas.clientWidth/380,
        -canvas.clientHeight/380,
        canvas.clientHeight/380,
        -1000,
        1000
      )
    } else if (value === "oblique") {
      camera = new ObliqueCamera(
        -canvas.clientWidth/380,
        canvas.clientWidth/380,
        -canvas.clientHeight/380,
        canvas.clientHeight/380,
        -1000,
        1000,
        90,
        90
      )
    }
    camera._position._z = 5;
    center = new Object3D();
    center.add(camera);
    control = new CameraControls(camera, canvas, center);
  });

// Textures
const concreteTexture = new NormalTexture(
  [
    "../../test/texture/concrete/Normal.jpg",
    "../../test/texture/concrete/Bump.png", 
    "../../test/texture/concrete/Diffuse.jpg", 
    "../../test/texture/concrete/Specular.jpg"
  ]
);
concreteTexture.load(webgl._gl);

const mudTexture = new NormalTexture(
  [
    "../../test/texture/mud/Normal.jpg",
    "../../test/texture/mud/Bump.png",
    "../../test/texture/mud/Diffuse.jpg",
    "../../test/texture/mud/Specular.jpg"
  ]
);
mudTexture.load(webgl._gl);

const environmentTexture = new EnvironmentTexture(
  [
    {src: '../../test/texture/pos-x.jpg',
      width: 512,
      height: 512
    },
    {src: '../../test/texture/neg-x.jpg',
      width: 512,
      height: 512
    },
    {src: '../../test/texture/pos-y.jpg',
      width: 512,
      height: 512
    },
    {src: '../../test/texture/neg-y.jpg',
      width: 512,
      height: 512
    },
    {src: '../../test/texture/pos-z.jpg',
      width: 512,
      height: 512
    },
    {src: '../../test/texture/neg-z.jpg',
      width: 512,
      height: 512
    }
  ]
)
environmentTexture.load(webgl._gl);

let textures = [concreteTexture, mudTexture, environmentTexture];
  
// Create a mesh
function loadTexture(mesh){
  if (mesh._material._texture){
    mesh._material._texture.load(webgl._gl);
  }
  for (let child of mesh.children) {
    loadTexture(child);
  }
}

export function addMesh(mesh) {
  loadTexture(mesh);
  scene.add(mesh);
}

export function getScene() {
  return scene;
}

export function clearShapes() {
  scene = new Scene();
  scene._name = "Scene";
  const light = new DirectionalLight();
  light._name = "Light";
  light._type = "Light";
  scene.add(light);
  let lightControls = new LightControls(scene,light);
  lightControls.buildLightHTML(scene.toJSON(), document.getElementById('container-light'));
  buildHTML(scene.toJSON(), document.getElementById('container'));
}

export function getWebGL() {
  return webgl._gl;
}


// PLAYGROUND

// TEXTURE
function __main__(){
  // CONCRETE
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new PhongMaterial({
    shininess: 32,
    ambient: [1, 1, 1, 1],
    diffuse: {
      color: [1, 1, 1, 1],
      texture: concreteTexture._diffuseTexture
    },
    specular: {
      color: [1, 1, 1, 1],
      texture: concreteTexture._specularTexture
    },
    displacement: concreteTexture._bumpTexture,
    normal: concreteTexture._normalTexture,
    textureOption: 1,
    textureType: 'concrete'
  });
  const mesh = new Mesh(geometry, material);
  mesh._name = "Object"
  scene.add(mesh);


  // ENVIRONMENT
  const geometry1 = new BoxGeometry(1, 1, 1);
  const material1 = new PhongMaterial({
    shininess: 32,
    ambient: [1, 1, 1, 1],
    diffuse: {
      color: [1, 1, 1, 1],
      texture: null
    },
    specular: {
      color: [1, 1, 1, 1],
      texture: null
    },
    displacement: null,
    normal: null,
    environment: environmentTexture,
    textureOption: 2,
    textureType: 'environment'
  });

  const mesh1 = new Mesh(geometry1, material1);
  mesh1._name = "Object1"
  mesh1._position._x = -1.2;
  scene.add(mesh1);

  // BASIC
  const geometry2 = new BoxGeometry(1, 1, 1);
  const material2 = new PhongMaterial({
    shininess: 32,
    ambient: [1, 1, 1, 1],
    diffuse: {
      color: [1, 1, 1, 1],
      texture: null,
    },
    specular: {
      color: [1, 1, 1, 1],
      texture: null
    },
    displacement: null,
    normal: null,
    textureOption: 0,
    textureType: 'off'
  });
  const mesh2 = new Mesh(geometry2, material2);
  mesh2._name = "Object2"
  mesh2._position._x = 1.2;
  scene.add(mesh2);

  
  const geometry3 = new BoxGeometry(1, 1, 1);
  const material3 = new BasicMaterial([1, 1, 1, 1]);
  const mesh3 = new Mesh(geometry3, material3);
  mesh3._name = "Object3"
  mesh3._position._x = -2.4;
  scene.add(mesh3);

  // HOLLOW BOX (MASIH EROR KALO DI RUN)
  const geometry4 = new HollowRingGeometry(1, 1, 1);
  const material4 = new PhongMaterial({
    shininess: 32,
    ambient: [1, 1, 1, 1],
    diffuse: {
      color: [1, 1, 1, 1],
      texture: null
    },
    specular: {
      color: [1, 1, 1, 1],
      texture: null
    },
    displacement: null,
    normal: null,
    textureOption: 0
  });
  const mesh4 = new Mesh(geometry4, material4);
  mesh4._position._x = 2.4;
  mesh4._name = "Object4"
  scene.add(mesh4);

  console.log(light);
}


// nyalain kode di bawah kalau mau aktifin dummy object
__main__()

// END OF PLAYGROUND
buildHTML(scene.toJSON(), document.getElementById('container'));
let lightControls = new LightControls(scene, light);
console.log("haloooo");
lightControls.buildLightHTML(scene.toJSON(), document.getElementById('container-light'));
// lightControls.buildLightHTML(scene.toJSON(), document.getElementById('container-light'));

let objectControls = new ObjectControls(scene);
let materialControls = new MaterialControls(scene, textures);
let treeControls = new TreeControls(scene);

  document.getElementById('selected-object').addEventListener('change', function(event) {
    const selectedObjectName = event.target.value;
    const selectedObject = scene.getObjectByName(selectedObjectName);
    const shapename = document.getElementById("shapename");
    console.log(selectedObject);
    if (selectedObject) {
      objectControls.setObject(selectedObject);
      materialControls.setMaterial(selectedObject._material);
      treeControls.setObject(selectedObject);

      shapename.value = selectedObject._name;

    }
    else if(selectedObject == null){
      shapename.value = "";
    }
  });

  document.getElementById('selected-light-object').addEventListener('change', function(event) {
    const selectedLightName = event.target.value;
    const selectedLight = scene.getObjectByName(selectedLightName);
    const lightName = document.getElementById("lightname");

    // console.log(selectedLight);
    
    console.log(selectedLight);
    if (selectedLight) {
      lightControls.setLight(selectedLight);

      // lightName.value = lightControls.getLight()._name;
    }
    else{
      // lightName.value = "";
    }
  })


// load listener
document.addEventListener('loadComplete', (event) => {
  let json = scene.toJSON();
  var container = document.getElementById('container');
  let lightControls = new LightControls(scene, light);
  buildHTML(json, container);
  lightControls.buildLightHTML(json, document.getElementById('container-light'));

  let objectControls = new ObjectControls(scene);
  document.getElementById('selected-object').addEventListener('change', function(event) {
    const selectedObjectName = event.target.value;
    const selectedObject = scene.getObjectByName(selectedObjectName);
    
    if (selectedObject) {
      objectControls.setObject(selectedObject);
    }
  });

});


function render() {
  requestAnimationFrame(render);
  webgl.render(scene, camera);
}
render();