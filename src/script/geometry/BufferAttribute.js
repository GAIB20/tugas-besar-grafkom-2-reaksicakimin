class BufferAttribute {
  constructor(data, size, options = {}) {
    this._data = data;
    this._size = size;
    this._dtype = options.dtype || WebGLRenderingContext.FLOAT;
    this._normalize = options.normalize || false;
    this._stride = options.stride || 0;
    this._offset = options.offset || 0;
    this._isDirty = true;
  }

  // Public getter
  get data() { return this._data; }
  get size() { return this._size; }
  get dtype() { return this._dtype; }
  get normalize() { return this._normalize; }
  get stride() { return this._stride; }
  get offset() { return this._offset; }
  get isDirty() { return this._isDirty; }
  
  // Public setter
  set data(data) {
      this._data = data;
      this._isDirty = true;
  }
  set size(size) {
      this._size = size;
      this._isDirty = true;
  }
  set dtype(dtype) {
      this._dtype = dtype;
      this._isDirty = true;
  }
  set normalize(normalize) {
      this._normalize = normalize;
      this._isDirty = true;
  }
  set stride(stride) {
      this._stride = stride;
      this._isDirty = true;
  }
  set offset(offset) {
      this._offset = offset;
      this._isDirty = true;
  }

  // Marks the buffer as clean
  consume() {
    this._isDirty = false;
  }

  // Number of elements in the buffer
  get count() {
    return this._data.length / this._size;
  }

  // Length of the buffer
  get length() {
    return this._data.length;
  }

  // Set data at index
  set(index, data) {
    this._isDirty = true;
    const startIndex = index * this._size + this._offset;
    const endIndex = startIndex + this._size;
    let dataIndex = 0;
    for (let i = startIndex; i < endIndex; i++) {
      this._data[i] = data[dataIndex];
      dataIndex++;
    }
  }

  // Get data at index
  get(index, size) {
    index *= this._size;
    if (!size) size = this._size;
    const result = [];
    const startIndex = index + this._offset;
    const endIndex = startIndex + size;
    for (let i = startIndex; i < endIndex; i++) {
        result.push(this._data[i]);
    }
    return result;
  }


  // JSON parser
  toJSON() {
    return {
      data: this._data,
      size: this._size,
      dtype: this._dtype,
      normalize: this._normalize,
      stride: this._stride,
      offset: this._offset
    };
  }

  static fromJSON(json) {
    return new BufferAttribute(json.data, json.size, {
      dtype: json.dtype,
      normalize: json.normalize,
      stride: json.stride,
      offset: json.offset
    });
  }
}

export default BufferAttribute;