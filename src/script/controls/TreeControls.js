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
        this.saveObjectEventListeners();
        this.loadObjectEventListeners();
    }

    setObject(object) {
        this.object = object;
    }

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

    saveObjectEventListeners(){
        const saveButton = document.getElementById("save-object");
        saveButton.addEventListener("click", () => {
            var jsonData = this.object.toJSON();
            var jsonString = JSON.stringify(jsonData);
            var blob = new Blob([jsonString], { type: 'application/json' });

            if ('showSaveFilePicker' in window) {
                const options = {
                    types: [{
                        description: 'JSON Files',
                        accept: {'application/json': ['.json']}
                    }],
                    suggestedName: 'exported_model.json'
                };
                window.showSaveFilePicker(options).then((handle) => {
                    handle.createWritable().then((writable) => {
                        // Event.event.preventDefault();
                        writable.write(blob).then(() => {
                            writable.close();
                            alert('File saved successfully.');
                        }).catch((error) => {
                            console.error('Failed to save file: ', error);
                            alert('Failed to save file.');
                        });
                    });
                }).catch((error) => {
                    console.error('Could not open file handle: ', error);
                    alert('Could not save file.');
                });
            } else {
                alert('The File System Access API is not supported by your browser.');
            }
        });
    }

    // importShapes(data){
    //     var jsonShapes = JSON.parse(data);
    //     var mesh = new Mesh.fromJSON(jsonShapes);
    //     this.object.add(mesh);

    //     buildHTML(this.scene.toJSON(), document.getElementById('container'));
    // }

    loadObjectEventListeners(){
        const loadButton = document.getElementById("load-object");
        loadButton.addEventListener("click", (event) => {
            // open file dialog
            var input = document.createElement("input");
            input.type = "file";
            input.accept = ".json";
            input.onchange = (event) => {
                var file = event.target.files[0];
                var reader = new FileReader();
                console.log(reader);
                reader.onload = () => {
                    // this.importShapes(reader.result);
                    var jsonShapes = JSON.parse(reader.result);
                    var mesh = Mesh.fromJSON(jsonShapes);
                    this.object.add(mesh);

                    buildHTML(this.scene.toJSON(), document.getElementById('container'));
                };
                reader.readAsText(file);
            };
            input.click();
        });
    }
}

export default TreeControls;