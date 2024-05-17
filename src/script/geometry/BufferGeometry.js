import Vector3 from "../math/Vector3.js";
import BufferAttribute from "./BufferAttribute.js";

class BufferGeometry {
	constructor() {
		this._attributes = {};
		this._indices = undefined;
		this._useVertexColors = false;
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
		const texCoor = new Float32Array([
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
		]);
		const textureCoordinates = new BufferAttribute(texCoor, 2);
		this.setAttribute('textureCoord', textureCoordinates);
	}



	// JSON parser
	toJSON() {
		const attributes = {};
		for (let name in this._attributes) {
			attributes[name] = this._attributes[name].toJSON();
		}

		return {
			attributes,
			indices: this._indices ? this._indices.toJSON() : undefined,
		};
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