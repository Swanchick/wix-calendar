export interface EventData {
    title: string | null;
    description: string | null;
    startDate: Date | null;
    endDate: Date | null;
}

export function dateToKey(date: Date): string {
    return `${date.getFullYear()}:${date.getMonth()}:${date.getDate()}`;
}