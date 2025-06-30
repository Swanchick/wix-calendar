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

        let event1 = new Event("Test 1", "Test", new Date(2025, 5, 30, 8, 0), new Date(2025, 5, 30, 9, 0));
        let event2 = new Event("Test 2", "Test", new Date(2025, 5, 30, 15, 0), new Date(2025, 5, 30, 16, 0));
        let event3 = new Event("Test 3", "Test", new Date(2025, 6, 1, 12, 0), new Date(2025, 6, 1, 13, 0));

        this.#eventManager.addEvent(event1);
        this.#eventManager.addEvent(event2);
        this.#eventManager.addEvent(event3);
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