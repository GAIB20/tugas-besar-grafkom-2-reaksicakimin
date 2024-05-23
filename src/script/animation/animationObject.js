import { Transform } from "./transform.js";

export class AnimationObject {
    constructor(
        objectName = "",
        totalFrames = 9,
        frames = []
    ) {
        this._objectName = objectName;
        this._totalFrames = totalFrames;
        this._frames = this._initializeFrames(frames, totalFrames);
    }

    _initializeFrames(_frames, _totalFrames) {
        if (_frames.length === 0) {
            _frames = Array.from({ length: _totalFrames }, () => ({ transform: new Transform() }));
        } else if (_frames.length < _totalFrames) {
            const lastFrame = _frames[_frames.length - 1];
            for (let i = _frames.length; i < _totalFrames; i++) {
                _frames.push(lastFrame);
            }
        }
        return _frames;
    }

    updateFrame(index = 0, newTransform = new Transform()) {
        if (index >= 0 && index < this._totalFrames) {
            this._frames[index] = { transform: newTransform };
        } else {
            throw new Error("Frame index out of range");
        }
    }

    resetFrames(frame1 = new Transform()) {
        this._frames = Array.from({ length: this._totalFrames }, () => ({ transform: frame1 }));
    }

    addFrame(index = this._totalFrames, newTransform = new Transform()) {
        if (index >= 0 && index <= this._totalFrames) {
            this._frames.splice(index, 0, { transform: newTransform });
            this._totalFrames++;
        } else {
            throw new Error("Frame index out of range");
        }
    }

    deleteFrame(index) {
        if (index >= 0 && index < this._totalFrames && this._totalFrames > 1) {
            this._frames.splice(index, 1);
            this._totalFrames--;
        } else {
            throw new Error("Frame index out of range");
        }
    }

    swapFrames(index1, index2) {
        if (index1 >= 0 && index1 < this._totalFrames && index2 >= 0 && index2 < this._totalFrames) {
            [this._frames[index1], this._frames[index2]] = [this._frames[index2], this._frames[index1]];
        } else {
            throw new Error("Frame index out of range");
        }
    }

    getTotalFrames() {
        return this._totalFrames;
    }

    getObjectName() {
        return this._objectName;
    }

    getFrame(index = 0) {
        index = index >= 0 ? index : 0;
        index = index < this._totalFrames ? index : this._totalFrames - 1;
        return this._frames[index];
    }

    static fromJSON(json) {
        return new AnimationObject(
            json.objectName,
            json.totalFrames,
            json.frames.map(frame => ({ transform: Transform.fromJSON(frame.transform) }))
        );
    }

    toJSON() {
        return {
            objectName: this._objectName,
            totalFrames: this._totalFrames,
            frames: this._frames.map(frame => ({ transform: frame.transform.toJSON() }))
        };
    }
}