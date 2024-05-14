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

		let pA = [0, 0, 0], pB = [0, 0, 0], pC = [0, 0, 0];
		let cb = [0, 0, 0], ba = [0, 0, 0];

		const crossVectors = (a, b, res) => {
			res[0] = a[1] * b[2] - a[2] * b[1];
			res[1] = a[2] * b[0] - a[0] * b[2];
			res[2] = a[0] * b[1] - a[1] * b[0];
		};

		const normalize = (v, res) => {
			const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
			if (length > 0) {
				res[0] = v[0] / length;
				res[1] = v[1] / length;
				res[2] = v[2] / length;
			}
		};

		for (let i = 0; i < position._data.length; i += 9) {
			pA[0] = position._data[i + 0];
			pA[1] = position._data[i + 1];
			pA[2] = position._data[i + 2];

			pB[0] = position._data[i + 3];
			pB[1] = position._data[i + 4];
			pB[2] = position._data[i + 5];

			pC[0] = position._data[i + 6];
			pC[1] = position._data[i + 7];
			pC[2] = position._data[i + 8];

			cb[0] = pC[0] - pB[0];
			cb[1] = pC[1] - pB[1];
			cb[2] = pC[2] - pB[2];

			ba[0] = pB[0] - pA[0];
			ba[1] = pB[1] - pA[1];
			ba[2] = pB[2] - pA[2];

			let res = [0, 0, 0];
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