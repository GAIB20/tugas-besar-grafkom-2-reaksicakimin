import { getScene } from '../../app/app.js'
import { AnimationObject } from '../animation/animationObject.js';
import { Transform } from '../animation/transform.js';

export default class AnimationController {
    constructor(animations = []) {
        this.scene = getScene();
        this.animations = animations;
        this.currentFrame = 0; // Current frame to update
        this.loadMeshToAnimation(this.scene);
    }

    loadMeshToAnimation(mesh) {
        if (mesh._name !== "Light" && mesh._name !== "Scene") {
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
        if (mesh._name !== "Light" && mesh._name !== "Scene") {
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
        if (mesh._name !== "Light" && mesh._name !== "Scene") {
            const animation = this.getAnimationByName(mesh._name);
            if (animation) {
                const frame = animation.getFrame(this.currentFrame);
                mesh._position = frame.transform.position.clone();
                mesh._rotation = frame.transform.rotation.clone();
                mesh._scale = frame.transform.scale.clone();
            }
        }
        mesh.children.forEach(child => {
            this.applyFrameToMesh(child);
        });
    }

    resetAnimations() {
        this.animations.forEach(animation => {
            animation.resetFrames();
        });
    }
    
    static fromJSON(json) {
        return new AnimationController(
            json.animations.map(animation => AnimationObject.fromJSON(animation))
        );
    }

    static toJSON(animationController) {
        return {
            animations: animationController.animations.map(animation => AnimationObject.toJSON(animation))
        };
    }
}