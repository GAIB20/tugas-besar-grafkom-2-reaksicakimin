import BoxGeometry from "../geometry/BoxGeometry.js";
import BasicMaterial from "../material/BasicMaterial.js";
import Mesh from "../objects/Mesh.js";
import { addMesh, clearShapes, getScene } from "../../app/app.js";

class SaveLoad {
    static load(json){
        var mesh = Mesh.fromJSON(json);
        addMesh(mesh);
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