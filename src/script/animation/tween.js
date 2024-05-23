export class Tween {
    constructor(duration = 1000, easingFunction = null) {
        this.duration = duration;
        this.easingFunction = easingFunction || ((t) => t); // Linear by default
        this.startTime = null;
        this.startTransform = null;
        this.endTransform = null;
        this.update = this.update.bind(this);
    }

    start(startTransform, endTransform) {
        this.startTime = performance.now();
        this.startTransform = startTransform;
        this.endTransform = endTransform;
        this.update();
    }

    update() {
        const currentTime = performance.now();
        const elapsedTime = currentTime - this.startTime;
        const t = Math.min(elapsedTime / this.duration, 1);
        const alpha = this.easingFunction(t);
        this.startTransform.interpolateTo(this.endTransform, alpha);
        if (!this.isComplete(currentTime)) {
            requestAnimationFrame(this.update);
        }
    }

    isComplete(currentTime) {
        return currentTime - this.startTime >= this.duration;
    }
}
