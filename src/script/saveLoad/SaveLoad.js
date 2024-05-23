import Mesh from "../objects/Mesh.js";
import { addMesh, clearShapes, getScene } from "../../app/app.js";
import Scene from "../objects/Scene.js";

class SaveLoad {
    static load(json){
        // const meshes = [];
        // scene.children.forEach(child => {
        // if (child instanceof Mesh) {
        //     meshes.push(child);
        // }
        // });
        for (var i = 0; i < json.children.length; i++){
            if(json.children[i].name == "Light") continue;
            var mesh = Mesh.fromJSON(json.children[i]);
            addMesh(mesh);
        }

        const event = new CustomEvent('loadComplete', {
            detail: { message: 'Loading complete', data: json }
        });
        document.dispatchEvent(event);
    }

    static save(){
        // var scene = new Scene();
        // var mesh = getScene();
        // mesh.forEach(element => {
        //     scene.add(element);
        // });
        var scene = getScene();
        var json = scene.toJSON();
        return json;
    }

    static clear(){
        clearShapes();
    }
}

export default SaveLoad;