import Object3D from "../objects/Object3D.js";
import BoxGeometry  from "../geometry/BoxGeometry.js";
import  PhongMaterial  from "../material/PhongMaterial.js";
import  Mesh  from "../objects/Mesh.js";
import { buildHTML } from "../webutils/treeLoader.js";

class TreeControls {
    constructor(scene) {
        this.scene = scene;
        this.object = scene;
        
        this.addObjectEventListeners();
        this.removeObjectEventListeners();
    }

    setObject(object) {
        this.object = object;
    }

    // addObject(event) {
    //     const geometry2 = new BoxGeometry(1, 1, 1);
    //     const material2 = new PhongMaterial({
    //         shininess: 32,
    //         ambient: [1, 1, 1, 1],
    //         diffuse: {
    //         color: [1, 1, 1, 1],
    //         texture: null,
    //         },
    //         specular: {
    //         color: [1, 1, 1, 1],
    //         texture: null
    //         },
    //         displacement: null,
    //         normal: null,
    //         textureOption: 0,
    //         textureType: 'off'
    //     });
    //     const mesh2 = new Mesh(geometry2, material2);
    //     mesh2._name = "kontol";
    //     mesh2._position._x = 1.2;

    //     this.object.add(mesh2);
    //     buildHTML(this.scene.toJSON(), document.getElementById('container'));
    // }

    addObjectEventListeners(){
        const addButton = document.getElementById("add-object");
        addButton.addEventListener("click", () => {
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
            mesh2._name = "kontol";
            mesh2._position._x = 1.2;

            this.object.add(mesh2);
            buildHTML(this.scene.toJSON(), document.getElementById('container'));
        });
    }

    removeObjectEventListeners(){
        const removeButton = document.getElementById("delete-object");
        removeButton.addEventListener("click", () => {
            this.scene.remove(this.object);
            buildHTML(this.scene.toJSON(), document.getElementById('container'));
        });
    }
}

export default TreeControls;