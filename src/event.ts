interface IEventStorage {
    title: string,
    description: string,
    startDate: Date,
    endDate: Date
}

class WixEvent implements IEventStorage {
    readonly title: string;
    readonly description: string;

    readonly startDate: Date;
    readonly endDate: Date;

    constructor(title: string, description: string, startDate: Date, endDate: Date) {
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    
    get formatTime(): string {
        let startHours = this.startDate.getHours();
        let startHoursStr = String(startHours).padStart(2, "0");

        let startMinutes = this.startDate.getMinutes();
        let startMinutesStr = String(startMinutes).padStart(2, "0");

        let endHours = this.endDate.getHours();
        let endHoursStr = String(endHours).padStart(2, "0");
        
        let endMinutes = this.endDate.getMinutes();
        let endMinutesStr = String(endMinutes).padStart(2, "0");

        return `${startHoursStr}:${startMinutesStr} - ${endHoursStr}:${endMinutesStr}`;
    }

    get element(): HTMLElement {
        const element = document.createElement("button");

        const titleElement = document.createElement("p");
        const title = document.createTextNode(this.title);
        titleElement.appendChild(title);
        titleElement.classList.add("event-panel-title");

        const timeElement = document.createElement("p");
        const time = document.createTextNode(this.formatTime);
        timeElement.appendChild(time);

        element.appendChild(titleElement);
        element.appendChild(timeElement);

        element.classList.add("event-mark");

        const startInPercentage = getCurrentSecondsInPercentage(this.startDate);
        const endInPercentage = getCurrentSecondsInPercentage(this.endDate);

        element.style.top = `${startInPercentage}%`;
        element.style.height = `${endInPercentage - startInPercentage}%`;

        return element;
    }

    get json(): IEventStorage {
        return this as IEventStorage;
    }
}
