class Calendar {
    #date;
    #arrow;
    #week;
    #eventManager;

    constructor() {
        this.#date = new Date();
        this.#arrow = new Arrow();
        this.#eventManager = new EventManager();
        this.#week = new Week(this.#eventManager);
    }

    start() {
        this.#week.build(this.#date);
        this.#updateArrow();

        setInterval(() => {this.#updateArrow()}, 1000);
    }

    #updateArrow() {
        this.#date = new Date();
        
        const arrowPosition = getCurrentSecondsInPercentage(this.#date);
        this.#arrow.setArrowPosition(arrowPosition);
    }

}


// let event = new Event("Test", "Test", new Date(2025, 5, 30, 14, 30), new Date(2025, 5, 30, 15, 30))