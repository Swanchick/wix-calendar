import { dateToKey } from "../../global";
import { RootState } from "../../store";
import { EventDataBase, EventData } from "./eventData";

export const selectEventsByDate = (state: RootState, date: Date): Array<EventData> => 
    (state.events[dateToKey(date)] || []).map((e) => ({
        title: e.title,
        description: e.description,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate)
}));