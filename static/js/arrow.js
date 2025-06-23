class Arrow {
    #arrow;
    
    constructor() {
        this.#arrow = this.#findArrow();
    }

    #findArrow() {
        return document.getElementById(ARROW_ID);
    }

    setArrowPosition(percentage) {
        if (this.#arrow == null) {
            this.#arrow = this.#findArrow();

            return;
        }

        this.#arrow.style.top = `${percentage}%`;
    }
}


