import Vector3 from "../math/Vector3.js";
import BufferAttribute from "./BufferAttribute.js";

class BufferGeometry {
	constructor() {
		this._attributes = {};
		this._indices = undefined;
		this._useVertexColors = true;
		this._color = [1, 1, 1, 1];
	}

	// Public getter
	get attributes() { return this._attributes; }
	get indices() { return this._indices; }

	setIndices(indices) {
		this._indices = indices;
		return this;
	}

	removeIndices() {
		this._indices = undefined;
		return this;
	}

	setAttribute(name, attribute) {
		this._attributes[name] = attribute;
		return this;
	}

	getAttribute(name) {
		return this._attributes[name];
	}

	deleteAttribute(name) {
		delete this._attributes[name];
		return this;
	}

	setColor() {
		const colors = new Float32Array(this._verticesLength * 3); 
		for (let i = 0; i < this._verticesLength; i += 3) {
			colors[i] = this._color[0];
			colors[i + 1] = this._color[1];
			colors[i + 2] = this._color[2];
		}
		this.setAttribute('color', new BufferAttribute(colors, 3));
		return this;
	}

	// Calculate normals
	calculateNormals(forceNewAttribute = false) {
		const position = this.getAttribute('position');
		if (!position) return;
		
		let normal = this.getAttribute('normal');
		if (forceNewAttribute || !normal) {
			normal = new BufferAttribute(new Float32Array(position.length), position._size);
		}

		let pA = new Vector3, pB = new Vector3, pC = new Vector3;
		let cb = new Vector3, ba = new Vector3;

		for (let i = 0; i < position._data.length; i += 3) {
			pA = Vector3.getBufferAttribute(position, i);
			pB = Vector3.getBufferAttribute(position, i + 1);
			pC = Vector3.getBufferAttribute(position, i + 2);

			cb = Vector3.subtractVectors(pC, pB);
			ba = Vector3.subtractVectors(pB, pA);

			let rCross = ba.cross(cb);
			let rNorm = rCross.normalize();
			let res = rNorm.toArray();

			normal.set(i, res);
			normal.set(i + 1, res);
			normal.set(i + 2, res);
		}
		this.setAttribute('normal', normal);
	}

	calculateTangents() {
		const position = this.getAttribute('position');
		const normal = this.getAttribute('normal');
		const texCoord = this.getAttribute('textureCoord');
		if (!position || !normal || !texCoord) return;

		let tangent = this.getAttribute('tangent');
		if (!tangent) {
			tangent = new BufferAttribute(new Float32Array(position.length), position._size);
		}
		let bitangent = this.getAttribute('bitangent');
		if (!bitangent) {
			bitangent = new BufferAttribute(new Float32Array(position.length), position._size);
		}

		let pA = new Vector3, pB = new Vector3, pC = new Vector3;
		let deltaV1 = 0, deltaV2 = 0;
		let deltaU1 = 0, deltaU2 = 0;
		let uvA = new Vector3, uvB = new Vector3, uvC = new Vector3;
		let edge1 = new Vector3, edge2 = new Vector3;
		let tangent1 = new Vector3, bitangent1 = new Vector3;
		for (let i = 0; i < position._data.length; i += 3) {
			pA = Vector3.getBufferAttribute(position, i);
			pB = Vector3.getBufferAttribute(position, i + 1);
			pC = Vector3.getBufferAttribute(position, i + 2);
			
			edge1 = Vector3.subtractVectors(pC, pB);
			edge2 = Vector3.subtractVectors(pB, pA);
			
			uvA = Vector3.getBufferAttribute(texCoord, i);
			uvB = Vector3.getBufferAttribute(texCoord, i + 1);
			uvC = Vector3.getBufferAttribute(texCoord, i + 2);
			// tangent1 = edge2.normalize();
			// bitangent1 = edge1.normalize();
			
			deltaU1 = uvC._x - uvB._x;
			deltaV1 = uvC._y - uvB._y;
			deltaU2 = uvB._x - uvA._x;
			deltaV2 = uvB._y - uvA._y;

			let f = 1.0 / (deltaU1 * deltaV2 - deltaU2 * deltaV1);
			if (f == Infinity || f == -Infinity || isNaN(f)) f = 0;
			let x = f *(deltaV2 * edge1._x - deltaV1 * edge2._x);
			let y = f * (deltaV2 * edge1._y - deltaV1 * edge2._y);
			let z = f * (deltaV2 * edge1._z - deltaV1 * edge2._z);
			tangent1.set(x, y, z);
			tangent1.normalize();
			

			bitangent1._x = f * (-deltaU2 * edge1._x + deltaU1 * edge2._x);
			bitangent1._y = f * (-deltaU2 * edge1._y + deltaU1 * edge2._y);
			bitangent1._z = f * (-deltaU2 * edge1._z + deltaU1 * edge2._z);
			bitangent1.normalize();

			tangent.set(i, tangent1.toArray());
			tangent.set(i + 1, tangent1.toArray());
			tangent.set(i + 2, tangent1.toArray());

			bitangent.set(i, bitangent1.toArray());
			bitangent.set(i + 1, bitangent1.toArray());
			bitangent.set(i + 2, bitangent1.toArray());
		}
		this.setAttribute('tangent', tangent);
		this.setAttribute('bitangent', bitangent);
	}



	// JSON parser
	toJSON() {
		// Note: sepertinya tidak perlu?

		// const attributes = {};
		// for (let name in this._attributes) {
		// 	attributes[name] = this._attributes[name].toJSON();
		// }

		// return {
		// 	attributes,
		// 	indices: this._indices ? this._indices.toJSON() : undefined,
		// };
	}

	static fromJSON(data) {
		const geometry = new BufferGeometry();
		for (let name in data.attributes) {
			geometry.setAttribute(name, BufferAttribute.fromJSON(data.attributes[name]));
		}

		if (data.indices)
			geometry.setIndices(BufferAttribute.fromJSON(data.indices));

		return geometry;
	}

}

export default BufferGeometry;