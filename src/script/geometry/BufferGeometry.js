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

		const pA = [0, 0, 0], pB = [0, 0, 0], pC = [0, 0, 0];
		const cb = [0, 0, 0], ab = [0, 0, 0];

		const crossVectors = (a, b, c) => {
			c[0] = a[1] * b[2] - a[2] * b[1];
			c[1] = a[2] * b[0] - a[0] * b[2];
			c[2] = a[0] * b[1] - a[1] * b[0];
		};

		const normalize = (v) => {
			const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
			if (length > 0) {
				v[0] /= length;
				v[1] /= length;
				v[2] /= length;
			}
		};

		for (let i = 0; i < position.length; i += 3) {
			pA[0] = position[i * 3 + 0];
			pA[1] = position[i * 3 + 1];
			pA[2] = position[i * 3 + 2];

			pB[0] = position[(i + 1) * 3 + 0];
			pB[1] = position[(i + 1) * 3 + 1];
			pB[2] = position[(i + 1) * 3 + 2];

			pC[0] = position[(i + 2) * 3 + 0];
			pC[1] = position[(i + 2) * 3 + 1];
			pC[2] = position[(i + 2) * 3 + 2];

			cb[0] = pC[0] - pB[0];
			cb[1] = pC[1] - pB[1];
			cb[2] = pC[2] - pB[2];

			ab[0] = pA[0] - pB[0];
			ab[1] = pA[1] - pB[1];
			ab[2] = pA[2] - pB[2];

			crossVectors(ab, cb, cb);
			normalize(cb);

			normal[i * 3 + 0] = cb[0];
			normal[i * 3 + 1] = cb[1];
			normal[i * 3 + 2] = cb[2];

			normal[(i + 1) * 3 + 0] = cb[0];
			normal[(i + 1) * 3 + 1] = cb[1];
			normal[(i + 1) * 3 + 2] = cb[2];

			normal[(i + 2) * 3 + 0] = cb[0];
			normal[(i + 2) * 3 + 1] = cb[1];
			normal[(i + 2) * 3 + 2] = cb[2];
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