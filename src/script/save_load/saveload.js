import Mesh from "../objects/Mesh.js";
import { addMesh, clearShapes, getScene } from "../../app/app.js";

class SaveLoad {
    static load(json){
        for (var i = 0; i < json.children.length; i++){
            var mesh = Mesh.fromJSON(json.children[i]);
            addMesh(mesh);
        }
    }

    static save(){
        var scene = getScene();
        var json = scene.toJSON();
        return json;
    }

    static clear(){
        clearShapes();
    }
}

export default SaveLoad;