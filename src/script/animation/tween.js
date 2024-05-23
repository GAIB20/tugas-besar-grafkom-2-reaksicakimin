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
            case "quint":
                this.easingFunction = (t) => t * t * t * t * t;
                break;
            case "expo":
                this.easingFunction = (t) => t === 0 ? 0 : Math.pow(2, 10 * t - 10);
                break;
            case "circ":
                this.easingFunction = (t) => 1 - Math.sqrt(1 - Math.pow(t, 2));
                break;
            case "back":
                const c1 = 1.70158;
                const c3 = c1 + 1;
                this.easingFunction = (t) => c3 * t * t * t - c1 * t * t;
                break;
            case "elastic":
                const c4 = (2 * Math.PI) / 3;
                this.easingFunction = (t) => 
                    t === 0 ? 0
                    : t === 1 
                    ? 1
                    : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
                break;
            case "bounce": // yang ini ease out, sisanya in
                const n1 = 7.5625;
                const d1 = 2.75;

                this.easingFunction = (t) => {
                    if (t < 1 / d1) {
                        return n1 * t * t;
                    } else if (t < 2 / d1) {
                        return n1 * (t -= 1.5 / d1) * t + 0.75;
                    } else if (t < 2.5 / d1) {
                        return n1 * (t -= 2.25 / d1) * t + 0.9375;
                    } else {
                        return n1 * (t -= 2.625 / d1) * t + 0.984375;
                    }
                };
                break;
            default: // linear defaultnya
                this.easingFunction = (t) => t;
                break;
        }
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
