import Mesh from "../objects/Mesh.js";
import { addMesh, clearShapes, getScene } from "../../app/app.js";
import Light from "../light/Light.js";
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
            // if(json.children[i].name == "Light") continue;
            if(json.children[i].type == "Light") continue;
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
        const filteredjson = this.removeLightObjects(scene.toJSON());
        var json = filteredjson;
        return json;
    }

    static removeLightObjects(json) {
        function filterChildren(children) {
            let filteredChildren = [];

            for (let i = 0; i < children.length; i++) {
                if (!(children[i].type == "Light")) {
                    children[i].children = filterChildren(children[i].children || []);
                    filteredChildren.push(children[i]);
                }
            }

            return filteredChildren;
        }

        return {
            ...json,
            children: filterChildren(json.children || [])
        };
    }

    static clear(){
        clearShapes();
    }
}

export default SaveLoad;