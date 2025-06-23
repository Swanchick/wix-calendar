class Calendar {
    #date;
    #arrow;

    constructor() {
        console.log("Hi!");

        this.#date = new Date();
        this.#arrow = new Arrow();


        console.log(this.#arrow);

        console.log(this.#date);
        console.log(this.#date.getDay());
        console.log(this.#date.getDate());
        console.log(this.#date.getFullYear());
        console.log(this.#date.getMonth());
        console.log(this.#getTimes());
        console.log(this.#getCurrentSecondsInPrecentage());
    }

    start() {
        console.log("Starting the calendar!");
        this.#update();
        setInterval(() => {this.#update()}, 1000);
    }

    #update() {
        console.log("Update");
        
        const arrowPosition = this.#getCurrentSecondsInPrecentage();
        this.#arrow.setArrowPosition(arrowPosition);
    }

    #getTimes() {
        let times = [];
        let currentDayPart = "am";

        for (let i = 0; i < 24; i++) {
            if (i > 11) {
                currentDayPart = "pm";
            }

            let number = i % 12;
            if (number == 0) {
                number = 12;
            }

            let finalTime = `${number} ${currentDayPart}`;

            times.push(finalTime);
        }

        return times;
    }

    #getCurrentSecondsInPrecentage() {
        const FULL_TIME = 3600 * 24;
        
        let seconds = this.#date.getSeconds();
        let minutesInSeconds = this.#date.getMinutes() * 60;
        let hoursInSeconds = this.#date.getHours() * 3600;

        return (hoursInSeconds + minutesInSeconds + seconds) / FULL_TIME * 100;
    }
}

window.onload = (e) => {
    const calendar = new Calendar();
    calendar.start();
    
}