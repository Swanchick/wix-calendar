import { RootState } from "../../store";
import { EventDataBase, EventData } from "./eventData";

export const selectEventsByDate = (state: RootState, dateKey: string): Array<EventData> => (state.events[dateKey].map((e) => ({
    title: e.title,
    description: e.description,
    startDate: new Date(e.startDate),
    endDate: new Date(e.endDate)
})));