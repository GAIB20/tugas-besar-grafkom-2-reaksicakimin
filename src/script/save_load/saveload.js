import Mesh from "../objects/Mesh.js";
import { addMesh, clearShapes, getScene } from "../../app/app.js";

class SaveLoad {
    static load(json){
        console.log("JSON LENGTH", json.children.length);
        for (var i = 0; i < json.children.length; i++){
            var mesh = Mesh.fromJSON(json.children[i]);
            console.log("NOMOR ", i, " : ", mesh);
            addMesh(mesh);
        }
    }

    static save(){
        var scene = getScene();
        var json = scene.toJSON();
        console.log(json);
        return json;
    }

    static clear(){
        clearShapes();
    }
}

export default SaveLoad;