class Calendar {
    private date: Date = new Date();
    private week: Week = new Week();
    private eventManager: EventManager = new EventManager();
    private arrow: Arrow = new Arrow();

    constructor() {
        
    }

    start() {

    }

    private updateArrow() {

    }
}


// class Calendar {
//     #date;
//     #arrow;
//     #week;
//     #eventManager;

//     constructor() {
//         this.#date = new Date();
//         this.#eventManager = new EventManager();
//         this.#week = new Week(this.#eventManager, this.#date);
//         this.#arrow = new Arrow();
        
//         this.#eventManager.onFormSuccess = () => {
//             this.#week.clearAll();
//             this.#week.build(this.#date);

//             this.#arrow = new Arrow();
//         };

//         const currentDateElement = document.getElementById(CURRENT_DATE_ID);
//         currentDateElement.textContent = `${MONTH_NAMES[this.#date.getMonth()]} ${this.#date.getFullYear()}`
//     }

//     start() {
//         this.#week.build(this.#date);

//         this.#updateArrow();
//         setInterval(() => {this.#updateArrow()}, 1000);
//     }

//     #updateArrow() {
//         this.#date = new Date();
        
//         const arrowPosition = getCurrentSecondsInPercentage(this.#date);
//         this.#arrow.setArrowPosition(arrowPosition);
//     }
// }

