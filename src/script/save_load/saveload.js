import BoxGeometry from "../geometry/BoxGeometry.js";
import BasicMaterial from "../material/BasicMaterial.js";
import Mesh from "../objects/Mesh.js";
import { addMesh, clearShapes } from "../../app/app.js";

class SaveLoad {
    static load(json){
        if (json.type == 'Rig'){
            console.log("Rig");
            var geometry = new BoxGeometry(1, 1, 1);
            var material = new BasicMaterial([255, 0, 0, 1]);
            var parentMesh = new Mesh(geometry, material); // Mesh parent untuk children
            parentMesh._name = "Rig";
            for (var i = 0; i < json.children.length; i++){
                if (json.children[i].type === 'BoxGeometry'){
                    var geometry = new BoxGeometry(json.children[i].width, json.children[i].height, json.children[i].depth);
                    var material = new BasicMaterial([255, 0, 0, 1]); // Masih hardcode
                    var meshc = new Mesh(geometry, material);
                    meshc._position._x = json.children[i].position[0];
                    meshc._position._y = json.children[i].position[1];
                    meshc._position._z = json.children[i].position[2];
                    meshc._name = "Object";
                    parentMesh._children.push(meshc);
                }
            }
            addMesh(parentMesh);
        }
        else if (json.type === 'BoxGeometry') {
            console.log("BoxGeometry");
            var geometry = new BoxGeometry(json.width, json.height, json.depth);
            var material = new BasicMaterial([255, 0, 0, 1]); // Masih hardcode
            var mesh = new Mesh(geometry, material);
            mesh._position._x = json.position[0];
            mesh._position._y = json.position[1];
            mesh._position._z = json.position[2];
            mesh._name = "Object";
            addMesh(mesh);
        }
        console.log(json.type)
        console.log("!WORLD HELLO");
    }    

    static save(){
        // Todo: save to json
    }

    static clear(){
        clearShapes();
    }
}

export default SaveLoad;