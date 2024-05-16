class OrbitControl {
  constructor(camera, canvas, target=null) {
    this._camera = camera;
    this._readyToMove = false
    this._readyToRotate = false
    this._canvas = canvas;
    this.target = target;
    this._center = this._camera;
    this._canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
    this._canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
    this._canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
 }

  onMouseDown(event){
    if (event.button == 0) {
        this._readyToRotate = true;
    }
    if (event.button == 2) {
        this._readyToMove = true;
    }
  }

  onMouseUp(event){
    this._readyToMove = false;
    this._readyToRotate = false;
  }

  onMouseMove(event){
    if (this._readyToRotate){
      let yRotation = (this._center._rotation._x - event.movementY) ;
      let xRotation = (this._center._rotation._y - event.movementX) ;
      this._center._rotation.set (yRotation, xRotation, 0,)
    }
    else if (this._readyToMove){
      let yMove = event.movementY;
      let xMove = event.movementX;
      this._center._position._x -= xMove;
      this._center._position._y += yMove;
    }
  }
}

export default OrbitControl;