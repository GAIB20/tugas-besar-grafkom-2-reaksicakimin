export class Tween {
    constructor(duration = 1000, easingFunctionStr = "linear") {
        this.duration = duration;
        this.updateEasingFunction(easingFunctionStr);
        this.startTime = null;
        this.startTransform = null;
        this.endTransform = null;
        this.update = this.update.bind(this);
    }

    updateEasingFunction(str) {
        switch (str){
            case "sine":
                this.easingFunction = (t) => 1 - Math.cos(t * Math.PI / 2);
                break;
            case "quad":
                this.easingFunction = (t) => t * t;
                break;
            case "cubic":
                this.easingFunction = (t) => t * t * t;
                break;
            case "quart":
                this.easingFunction = (t) => t * t * t * t;
                break;
            case "expo":
                this.easingFunction = (t) => Math.pow(2, 10 * (t - 1));
                break;
            case "circ":
                this.easingFunction = (t) => 1 - Math.sqrt(1 - t * t);
                break;
            case "back":
                this.easingFunction = (t) => t * t * (2.70158 * t - 1.70158);
                break;
            case "elastic":
                this.easingFunction = (t) => -1 * Math.pow(4, -8 * t) * Math.sin((t * 6 - 1) * (2 * Math.PI) / 2) + 1;
                break;
            case "bounce":
                this.easingFunction = (t) => {
                    for (let a = 0, b = 1; 1; a += b, b /= 2) {
                        if (t >= (7 - 4 * a) / 11) {
                            return -Math.pow((11 - 6 * a - 11 * t) / 4, 2) + Math.pow(b, 2);
                        }
                    }
                };
                break;
            default: // linear defaultnya
                this.easingFunction = (t) => t;
                break;
        }
        console.log("Easing Function: ", this.easingFunction);
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
