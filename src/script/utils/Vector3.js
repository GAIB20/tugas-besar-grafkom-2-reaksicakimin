export class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    cross(v) {
        const x = this.y * v.z - this.z * v.y;
        const y = this.z * v.x - this.x * v.z;
        const z = this.x * v.y - this.y * v.x;
        return new Vector3(x, y, z);
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    normalize() {
        const len = this.length();
        if (len !== 0) {
            this.multiplyScalar(1 / len);
        }
        return this;
    }

    clone() {
        return new Vector3(this.x, this.y, this.z);
    }
}

function subtractVectors(a, b) {
    return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
}

function addVectors(a, b) {
    return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
}

function multiplyScalar(v, scalar) {
    return new Vector3(v.x * scalar, v.y * scalar, v.z * scalar);
}

function dotProduct(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}

function crossProduct(a, b) {
    return new Vector3(
        a.y * b.z - a.z * b.y,
        a.z * b.x - a.x * b.z,
        a.x * b.y - a.y * b.x
    );
}


export { subtractVectors, addVectors, multiplyScalar, dotProduct, crossProduct };