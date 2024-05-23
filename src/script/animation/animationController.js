import { getScene } from '../../app/app.js'
import { AnimationObject } from '../animation/animationObject.js';
import { Transform } from '../animation/transform.js';

export default class AnimationController {
    constructor() {
        this.scene = getScene();
        this.animations = [];
        this.currentFrame = 0; // Current frame to update
        this.loadMeshToAnimation(this.scene);
    }

    loadMeshToAnimation(mesh) {
        if (mesh._name !== "Light" && mesh._name !== "Scene") {
            const initialTransform = new Transform(mesh._position, mesh._rotation, mesh._scale);
            const animation = new AnimationObject(mesh._name, 9, [{ transform: initialTransform }]);
            this.animations.push(animation);
        }

        mesh.children.forEach(child => {
            this.loadMeshToAnimation(child);
        });
    }

    updateCurrentFrame() {
        this.updateMeshFrame(this.scene);
    }

    updateMeshFrame(mesh) {
        if (mesh._name !== "Light" && mesh._name !== "Scene") {
            const transform = new Transform(mesh._position, mesh._rotation, mesh._scale);
            const animation = this.getAnimationByName(mesh._name);
            if (animation) {
                animation.updateFrame(this.currentFrame, transform);
            }
            console.log(mesh);
            console.log(this.animations[0]._frames[this.currentFrame].transform.scale);
        }
        mesh.children.forEach(child => {
            this.updateMeshFrame(child);
        });
    }

    setCurrentFrame(frameIndex) {
        if (frameIndex >= 0 && frameIndex < this.animations[0].getTotalFrames()) {
            this.currentFrame = frameIndex;
        } else {
            throw new Error("Frame index out of range");
        }
    }

    getAnimationByName(name) {
        return this.animations.find(animation => animation.getObjectName() === name);
    }

    getAnimations() {
        return this.animations;
    }
}