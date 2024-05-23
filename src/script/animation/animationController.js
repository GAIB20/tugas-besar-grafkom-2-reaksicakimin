import { getScene } from '../../app/app.js'
import { AnimationObject } from '../animation/animationObject.js';
import { Transform } from '../animation/transform.js';
import { Tween } from '../animation/tween.js';

export default class AnimationController {
    constructor(animations = []) {
        this.scene = getScene();
        this.animations = animations;
        this.currentFrame = 0; // Current frame to update
        if (this.animations.length === 0) {
            this.loadMeshToAnimation(this.scene);
        }
    }

    loadMeshToAnimation(mesh) {
        if (mesh._name !== "Light") {
            const initialTransform = new Transform(mesh._position.clone(), mesh._rotation.clone(), mesh._scale.clone());
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
        if (mesh._name !== "Light") {
            const transform = new Transform(mesh._position.clone(), mesh._rotation.clone(), mesh._scale.clone());
            const animation = this.getAnimationByName(mesh._name);
            if (animation) {
                animation.updateFrame(this.currentFrame, transform);
            }
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

    applyCurrentFrameToScene() {
        this.applyFrameToMesh(this.scene);
    }

    applyFrameToMesh(mesh) {
        if (mesh._name !== "Light") {
            const animation = this.getAnimationByName(mesh._name);
            if (animation) {
                const frame = animation.getFrame(this.currentFrame);
                const currentTransform = new Transform(
                                            mesh._position,
                                            mesh._rotation,
                                            mesh._scale
                                        );
                const targetTransform = new Transform(
                                            frame.transform.position.clone(),
                                            frame.transform.rotation.clone(),
                                            frame.transform.scale.clone()
                                        );
                this.animatingMesh(currentTransform, targetTransform);
            }
        }
        mesh.children.forEach(child => {
            this.applyFrameToMesh(child);
        });
    }

    animatingMesh(currentTransform, targetTransform){
        const tween = new Tween();
        tween.start(currentTransform, targetTransform);
    }

    resetAnimations() {
        this.animations.forEach(animation => {
            animation.resetFrames();
        });
    }

    addFrame(index) {
        this.animations.forEach(animation => {
            animation.addFrame(index);
        });
    }

    deleteFrame(index) {
        this.animations.forEach(animation => {
            animation.deleteFrame(index);
        });
    }

    swapFrames(index1, index2) {
        this.animations.forEach(animation => {
            animation.swapFrames(index1, index2);
        });
    }

    static fromJSON(json) {
        return new AnimationController(
            json.animations.map(animation => AnimationObject.fromJSON(animation))
        );
    }

    toJSON() {
        return {
            animations: this.animations.map(animation => animation.toJSON())
        };
    }
}