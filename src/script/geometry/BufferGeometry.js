import { Vector3 } from "../utils/vector3.js";
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

	// TODO: Could be wrong, modify if necessary
	calculateNormals(forceNewAttribute = false) {
		const position = this.getAttribute('position');
		if (!position) return;
		
		let normal = this.getAttribute('normal');
		if (forceNewAttribute || !normal) {
			normal = new BufferAttribute(new Float32Array(position.length), position._size);
		}

		const pA = new Vector3, pB = new Vector3, pC = new Vector3;
		const cb = new Vector3, ab = new Vector3;

		const crossVectors = (a, b, c) => {
			c.x = a.y * b.z - a.z * b.y;
			c.y = a.z * b.x - a.x * b.z;
			c.z = a.x * b.y - a.y * b.x;
		};

		const normalize = (v) => {
			const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
			if (length > 0) {
				v.x /= length;
				v.y /= length;
				v.z /= length;
			}
		};

		for (let i = 0; i < position.length; i += 3) {
			pA.x = position[i * 3 + 0];
			pA.y = position[i * 3 + 1];
			pA.z = position[i * 3 + 2];

			pB.x = position[(i + 1) * 3 + 0];
			pB.y = position[(i + 1) * 3 + 1];
			pB.z = position[(i + 1) * 3 + 2];

			pC.x = position[(i + 2) * 3 + 0];
			pC.y = position[(i + 2) * 3 + 1];
			pC.z = position[(i + 2) * 3 + 2];

			cb.x = pC.x - pB.x;
			cb.y = pC.y - pB.y;
			cb.z = pC.z - pB.z;

			ab.x = pA.x - pB.x;
			ab.y = pA.y - pB.y;
			ab.z = pA.z - pB.z;

			crossVectors(ab, cb, cb);
			normalize(cb);

			normal[i * 3 + 0] = cb.x;
			normal[i * 3 + 1] = cb.y;
			normal[i * 3 + 2] = cb.z;

			normal[(i + 1) * 3 + 0] = cb.x;
			normal[(i + 1) * 3 + 1] = cb.y;
			normal[(i + 1) * 3 + 2] = cb.z;

			normal[(i + 2) * 3 + 0] = cb.x;
			normal[(i + 2) * 3 + 1] = cb.y;
			normal[(i + 2) * 3 + 2] = cb.z;
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