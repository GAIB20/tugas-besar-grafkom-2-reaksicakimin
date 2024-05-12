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
    if (forceNewAttribute || !normal)
			normal = new BufferAttribute(new Float32Array(position.length), 3);

    const vertexNormals = new Array(position.length).fill(0).map(() => [0, 0, 0]);

    function calculateFaceNormal(v1, v2, v3) {
			const edge1 = v2.map((val, i) => val - v1[i]);
			const edge2 = v3.map((val, i) => val - v1[i]);
			const normal = [
				edge1[1] * edge2[2] - edge1[2] * edge2[1],
				edge1[2] * edge2[0] - edge1[0] * edge2[2],
				edge1[0] * edge2[1] - edge1[1] * edge2[0]
			];
			return normal;
    }

		// Calculate face normals
    const indices = this.indices ? this.indices.data : null;
    for (let i = 0; i < position.length; i += 9) {
			const v1 = [position[i], position[i + 1], position[i + 2]];
			const v2 = [position[i + 3], position[i + 4], position[i + 5]];
			const v3 = [position[i + 6], position[i + 7], position[i + 8]];
			const faceNormal = calculateFaceNormal(v1, v2, v3);

			if (indices) {
				const index1 = indices[i / 3] * 3;
				const index2 = indices[i / 3 + 1] * 3;
				const index3 = indices[i / 3 + 2] * 3;
				vertexNormals[index1] += faceNormal[0];
				vertexNormals[index1 + 1] += faceNormal[1];
				vertexNormals[index1 + 2] += faceNormal[2];
				vertexNormals[index2] += faceNormal[0];
				vertexNormals[index2 + 1] += faceNormal[1];
				vertexNormals[index2 + 2] += faceNormal[2];
				vertexNormals[index3] += faceNormal[0];
				vertexNormals[index3 + 1] += faceNormal[1];
				vertexNormals[index3 + 2] += faceNormal[2];
			} else {
				for (let j = 0; j < 3; j++) {
					const index = (i / 3 + j) * 3;
					vertexNormals[index] += faceNormal[0];
					vertexNormals[index + 1] += faceNormal[1];
					vertexNormals[index + 2] += faceNormal[2];
				}
			}
    }

		// Normalize
    for (let i = 0; i < vertexNormals.length; i += 3) {
			const length = Math.sqrt(
				vertexNormals[i] * vertexNormals[i] +
				vertexNormals[i + 1] * vertexNormals[i + 1] +
				vertexNormals[i + 2] * vertexNormals[i + 2]
			);
			normal.set(i, vertexNormals[i] / length);
			normal.set(i + 1, vertexNormals[i + 1] / length);
			normal.set(i + 2, vertexNormals[i + 2] / length);
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