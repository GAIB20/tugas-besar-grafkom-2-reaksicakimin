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

export function buildHTML(json, parent) {
  parent.innerHTML = '';
  buildTree(json, parent);
}

export function buildTree(json, parent) {
  const div = document.createElement('div');
  div.classList.add('list');
  
  const input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('id', json.name);
  input.setAttribute('name', json.name);
  
  const label = document.createElement('label');
  label.setAttribute('for', json.name);
  label.textContent = json.name;
  
  div.appendChild(input);
  div.appendChild(label);
  
  if (json.children && json.children.length > 0) {
    const subDiv = document.createElement('div');
    subDiv.classList.add('items');
    json.children.forEach(child => {
      buildTree(child, subDiv);
    });
    div.appendChild(subDiv);
  }

  parent.appendChild(div);

  // Add event listener for checkbox
  input.addEventListener('change', event => {
    console.log(event.target.name);
    console.log(event.target.checked);
    logChildren(event.target);
  });
}

function logChildren(element) {
  const parentDiv = element.parentElement;
  const childrenDiv = parentDiv.querySelector('.items');
  if (childrenDiv) {
    const childCheckboxes = childrenDiv.querySelectorAll('input[type="checkbox"]');
    childCheckboxes.forEach(child => {
      console.log(`Child: ${child.name}, Checked: ${child.checked}`);
    });
  }
}
