import Light from "../light/Light.js";

const data = {
    "name": "Scene",
    "position": [
        0,
        0,
        0
    ],
    "rotation": [
        0,
        0,
        0
    ],
    "scale": [
        1,
        1,
        1
    ],
    "children": [
        {
            "geometry": {
                "width": 10,
                "height": 10,
                "depth": 10,
                "type": "BoxGeometry"
            },
            "material": {
                "color": [
                    1,
                    1,
                    1,
                    1
                ],
                "type": "BasicMaterial"
            },
            "name": "Light",
            "position": [
                20,
                100,
                -300
            ],
            "rotation": [
                0,
                0,
                0
            ],
            "scale": [
                1,
                1,
                1
            ],
            "children": []
        },
        {
            "geometry": {
                "width": 1,
                "height": 1,
                "depth": 1,
                "type": "BoxGeometry"
            },
            "material": {
                "ambient": [
                    1,
                    1,
                    1,
                    1
                ],
                "diffuse": [
                    1,
                    1,
                    1,
                    1
                ],
                "specular": [
                    1,
                    1,
                    1,
                    1
                ],
                "shininess": 32,
                "texture": {
                    "image": "../../test/texture/wood.png"
                },
                "type": "PhongMaterial"
            },
            "name": "Object",
            "position": [
                0,
                0,
                0
            ],
            "rotation": [
                0,
                0,
                0
            ],
            "scale": [
                1,
                1,
                1
            ],
            "children": [
                {
                    "geometry": {
                        "width": 1,
                        "height": 1,
                        "depth": 1,
                        "type": "BoxGeometry"
                    },
                    "material": {
                        "ambient": [
                            1,
                            1,
                            1,
                            1
                        ],
                        "diffuse": [
                            1,
                            1,
                            1,
                            1
                        ],
                        "specular": [
                            1,
                            1,
                            1,
                            1
                        ],
                        "shininess": 32,
                        "texture": null,
                        "type": "PhongMaterial"
                    },
                    "name": "Object1",
                    "position": [
                        1.2,
                        0,
                        0
                    ],
                    "rotation": [
                        0,
                        0,
                        0
                    ],
                    "scale": [
                        1,
                        1,
                        1
                    ],
                    "children": []
                },
                {
                    "geometry": {
                        "width": 1,
                        "height": 1,
                        "depth": 1,
                        "type": "BoxGeometry"
                    },
                    "material": {
                        "color": [
                            1,
                            1,
                            1,
                            1
                        ],
                        "type": "BasicMaterial"
                    },
                    "name": "Object2",
                    "position": [
                        -1.2,
                        0,
                        0
                    ],
                    "rotation": [
                        0,
                        0,
                        0
                    ],
                    "scale": [
                        1,
                        1,
                        1
                    ],
                    "children": []
                }
            ]
        },
        {
            "geometry": {
                "width": 1,
                "height": 1,
                "depth": 1,
                "type": "HollowBoxGeometry"
            },
            "material": {
                "ambient": [
                    1,
                    1,
                    1,
                    1
                ],
                "diffuse": [
                    1,
                    1,
                    1,
                    1
                ],
                "specular": [
                    1,
                    1,
                    1,
                    1
                ],
                "shininess": 32,
                "texture": null,
                "type": "PhongMaterial"
            },
            "name": "Object3",
            "position": [
                2.4,
                0,
                0
            ],
            "rotation": [
                0,
                0,
                0
            ],
            "scale": [
                1,
                1,
                1
            ],
            "children": []
        }
    ]
}

function removeLightObjects(json) {
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

export function buildHTML(json, parent) {
  parent.innerHTML = '';
  
  const filteredjson = removeLightObjects(json);
//   console.log(json);
//   console.log(filteredjson);
  
  buildTree(filteredjson, parent);
}

let currentUnderlinedLabel = null;
export function buildTree(json, parent) {
  const div = document.createElement('div');
//   if(json.name == "Light") continue;
  div.classList.add('list');
  
  const label = document.createElement('label');
  label.setAttribute('for', json.name);
  label.textContent = json.name;
  div.appendChild(label);
  
  div.addEventListener('click', function(event) {
    event.stopPropagation();
    let selectedObject = document.getElementById('selected-object');
    if (currentUnderlinedLabel && currentUnderlinedLabel !== label) {
      currentUnderlinedLabel.style.textDecoration = '';
    }
    if (label.style.textDecoration === 'underline') {
      label.style.textDecoration = '';
      currentUnderlinedLabel = null;

      selectedObject.value = '';
    } else {
      label.style.textDecoration = 'underline';
      currentUnderlinedLabel = label;

      selectedObject.value = json.name;
    }
    
    selectedObject.dispatchEvent(new Event('change'));
  });

  if (json.children && json.children.length > 0) {
    const subDiv = document.createElement('div');
    subDiv.classList.add('items');
    json.children.forEach(child => {
      buildTree(child, subDiv);
    });
    div.appendChild(subDiv);
  }

  parent.appendChild(div);
}
