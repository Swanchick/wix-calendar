class Month {
    readonly name: string;
    private internalDays: number;
    private isFebruary: boolean;
    
    constructor(name: string, days: number, isFebruary: boolean = false) {
        this.name = name;
        this.internalDays = days;
        this.isFebruary = isFebruary;
    }

    getDays(date: Date): number {
        if (!this.isFebruary) {
            return this.internalDays;
        }
        
        const isLeapYear = this.isLeapYear(date.getFullYear());
        const februaryDays = isLeapYear ? 29 : 28;

        return februaryDays;
    }

    private isLeapYear(year: number): boolean {
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    }    
}