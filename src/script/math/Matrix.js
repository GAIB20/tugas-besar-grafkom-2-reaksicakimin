class Matrix {
  constructor(data=[], rowLength=0, colLength=0) {
    this._data = data;
    this._rowLength = rowLength;
    this._colLength = colLength;
  }

  // Public getter
  get size() { return this._data.length; }
  get row() { return this._rowLength; }
  get column() { return this._colLength; }
  get data() { return this._data; }
  get(i, j) { return this._data[i * this._colLength + j]; }

  // Matrix multiplication
  mul(m) {
    let result = [];
    for (let i = 0; i < this._rowLength; i++) {
      for (let j = 0; j < m._colLength; j++) {
        let sum = 0;
        for (let k = 0; k < this._colLength; k++) {
            sum += this.get(i, k) * m.get(k, j);
        }
        result.push(sum);
      }
    }

    return new Matrix(result, this._rowLength, m._colLength);
  }

  // Matrix premultiplication (reversed multiplication)
  premul(m) {
    return m.mul(this);
  }

  // Transpose matrix
  transpose() {
    const result = [];
    for (let i = 0; i < this._rowLength; i++) {
      for (let j = 0; j < this._colLength; j++) {
        result.push(this.get(j, i));
      }
    }

    return new Matrix(result, this._colLength, this._rowLength);
  }

  // Clone matrix
  clone() {
    return new Matrix([...this._data], this._rowLength, this._colLength);
  }

  // Print matrix
  print() {
    let str = "";
    for (let i = 0; i < this._rowLength; i++) {
      for (let j = 0; j < this._colLength; j++) {
        str += this.get(i, j) + " ";
      }
      str += "\n";
    }
  }
}

export default Matrix;