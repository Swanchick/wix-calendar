class Arrow {
    #arrow;
    
    constructor() {
        this.#arrow = this.#findArrow();
    }

    #findArrow() {
        return document.getElementById("red-line");
    }

    setArrowPosition(percentage) {
        if (this.#arrow == null) {
            this.#arrow = this.#findArrow();

            return;
        }

        this.#arrow.style.top = `${percentage}%`;
    }
}


