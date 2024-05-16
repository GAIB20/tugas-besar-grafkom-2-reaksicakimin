export function buildHTML(json, parent) {
  var div = document.createElement('div');
  div.classList.add('list');
  
  var input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('id', json.name);
  input.setAttribute('name', json.name);
  var label = document.createElement('label');
  label.setAttribute('for', json.name);
  label.textContent = json.name;

  div.appendChild(input);
  div.appendChild(label);

  parent.appendChild(div);

  if (json.children && json.children.length > 0) {
    var subDiv = document.createElement('div');
    subDiv.classList.add('items');
    
    json.children.forEach(child => {
      buildHTML(child, subDiv);
    });
    
    div.appendChild(subDiv);
  }
}