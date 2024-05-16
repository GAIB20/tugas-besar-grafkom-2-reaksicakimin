import BoxGeometry from "../geometry/BoxGeometry.js";
import BasicMaterial from "../material/BasicMaterial.js";
import Mesh from "../objects/Mesh.js";
import { addMesh, clearShapes } from "../../app/app.js";

class SaveLoad {
    static load(json){
        var mesh = Mesh.fromJSON(json);
        addMesh(mesh);
    }

    static save(){
        // Todo: save to json
    }

    static clear(){
        clearShapes();
    }
}

export default SaveLoad;