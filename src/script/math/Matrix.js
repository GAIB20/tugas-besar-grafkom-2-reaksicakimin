class Matrix {
  constructor(data=[], rowLength=0, colLength=0) {
    this._data = data;
    this._rowLength = rowLength;
    this._colLength = colLength;
  }

  get size() {
    return this._data.length;
  }

  get row() {
    return this._rowLength;
  }

  get column() {
    return this._colLength;
  }

  get data() {
    return this._data;
  }

  get(i, j) {
    return this._data[i * this._colLength + j];
  }

  premul(m) {
    let result = [];
    for (let i = 0; i < m._rowLength; i++) {
      for (let j = 0; j < this._colLength; j++) {
        let sum = 0;
        for (let k = 0; k < m._colLength; k++) {
            sum += m.get(i, k) * this.get(k, j);
        }
        result.push(sum);
      }
    }

    return new Matrix(result, m._rowLength, this._colLength);
  }

  mul(m) {
    return m.premul(this);
  }

  transpose() {
    const result = [];
    for (let i = 0; i < this._rowLength; i++) {
      for (let j = 0; j < this._colLength; j++) {
        result.push(this.get(j, i));
      }
    }

    return new Matrix(result, this._colLength, this._rowLength);
  }

  print() {
    let str = "";
    for (let i = 0; i < this._rowLength; i++) {
      for (let j = 0; j < this._colLength; j++) {
        str += this.get(i, j) + " ";
      }
      str += "\n";
    }

    console.log(str);
  }
}