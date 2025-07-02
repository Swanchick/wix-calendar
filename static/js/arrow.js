"use strict";
class Arrow {
    constructor() {
        this.arrow = document.getElementById(ARROW_ID);
    }
    setPosition(percentage) {
        if (this.arrow == null) {
            return;
        }
        this.arrow.style.top = `${percentage}%`;
    }
}
