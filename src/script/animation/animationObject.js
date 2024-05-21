import { Transform } from "./transform";

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

    getFrame(index = 0) {
        if (index >= 0 && index < this._totalFrames) {
            return this._frames[index];
        } else {
            throw new Error("Frame index out of range");
        }
    }

    resetFrames(frame1 = new Transform()) {
        this._frames = Array.from({ length: this._totalFrames }, () => ({ transform: frame1 }));
    }

    getTotalFrames() {
        return this._totalFrames;
    }

    getObjectName() {
        return this._objectName;
    }
}