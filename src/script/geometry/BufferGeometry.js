import { Vector3, subtractVectors, addVectors, multiplyScalar, dotProduct, crossProduct } from "../utils/vector3.js";
import BufferAttribute from "./BufferAttribute.js";

class BufferGeometry {
	constructor() {
		this._attributes = {};
		this._indices = undefined;
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
		console.log("position", position);
		if (!position) return;
		
		let normal = this.getAttribute('normal');
		if (forceNewAttribute || !normal) {
			normal = new BufferAttribute(new Float32Array(position.length), position._size);
		}

		let pA = new Vector3, pB = new Vector3, pC = new Vector3;
		let cb = new Vector3, ba = new Vector3;

		// Cross product
		const crossVectors = (a, b, res) => {
			res.x = a.y * b.z - a.z * b.y;
			res.y = a.z * b.x - a.x * b.z;
			res.z = a.x * b.y - a.y * b.x;
		};

		// Normalize
		const normalize = (v, res) => {
			const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
			if (length > 0) {
				res[0] = v.x / length;
				res[1] = v.y / length;
				res[2] = v.z / length;
			}
		};

		for (let i = 0; i < position._data.length; i += 9) {
			pA.x = position._data[i + 0];
			pA.y = position._data[i + 1];
			pA.z = position._data[i + 2];

			pB.x = position._data[i + 3];
			pB.y = position._data[i + 4];
			pB.z = position._data[i + 5];

			pC.x = position._data[i + 6];
			pC.y = position._data[i + 7];
			pC.z = position._data[i + 8];

			cb = subtractVectors(pC, pB);
			ba = subtractVectors(pB, pA);

			let res = new Vector3;
			crossVectors(ba, cb, res);
			let resn = [0, 0, 0];
			normalize(res, resn);

			normal.set(i, resn);
			normal.set(i + 1, resn);
			normal.set(i + 2, resn);
		}

		for (let i = 0; i < position._data.length; i += 3) {
			normal.set(i + 3, normal.get(i));
			normal.set(i + 4, normal.get(i + 1));
			normal.set(i + 5, normal.get(i + 2));
		}

		this.setAttribute('normal', normal);
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