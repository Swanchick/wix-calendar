class Calendar {
    #date;
    #arrow;
    #week;
    #eventManager;

    constructor() {
        this.#date = new Date();
        this.#arrow = new Arrow();
        this.#week = new Week();
        this.#eventManager = new EventManager();
    }

    start() {
        this.#week.build(this.#date);
        this.#updateArrow();

        setInterval(() => {this.#updateArrow()}, 1000);
    }

    #updateArrow() {
        this.#date = new Date();
        
        const arrowPosition = this.#getCurrentSecondsInPercentage();
        this.#arrow.setArrowPosition(arrowPosition);
    }

    #getCurrentSecondsInPercentage() {
        const FULL_DAY_IN_SECONDS = 3600 * 24;
        
        let seconds = this.#date.getSeconds();
        let minutesInSeconds = this.#date.getMinutes() * 60;
        let hoursInSeconds = this.#date.getHours() * 3600;

        return ((hoursInSeconds + minutesInSeconds + seconds) / FULL_DAY_IN_SECONDS) * 100;
    }
}