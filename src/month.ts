class Month {
    readonly name: string;
    private internalDays: number;
    readonly position: number;
    private isFebruary: boolean;
    
    constructor(name: string, days: number, position: number, isFebruary: boolean = false) {
        this.name = name;
        this.internalDays = days;
        this.position = position;
        this.isFebruary = isFebruary;
    }

    getDays(year: number): number {
        if (!this.isFebruary) {
            return this.internalDays;
        }
        
        const isLeapYear = this.isLeapYear(year);
        const februaryDays = isLeapYear ? 29 : 28;

        return februaryDays;
    }

    private isLeapYear(year: number): boolean {
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    }    
}