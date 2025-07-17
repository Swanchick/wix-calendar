import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventData, EventDataBase } from "./eventData";
import { dateToKey } from "../../global";

export type EventsState = Record<string, Array<EventDataBase>>;

const initialState: EventsState = {};

const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        setEvents: (_, action: PayloadAction<EventsState>) => {
            return action.payload;
        },
        addEvent: (state, action: PayloadAction<EventData>) => {
            const event = action.payload;
            const dateKey = dateToKey(event.startDate!);
            if (state[dateKey] === undefined) {
                state[dateKey] = [];
            }

            const eventDataBase: EventDataBase = {
                datakey: dateKey,
                title: event.title!,
                description: event.description!,
                startDate: event.startDate!.toString(),
                endDate: event.endDate!.toString()
            };

            state[dateKey].push(eventDataBase);
        },
        addEventFromDataBase: (state, action: PayloadAction<EventDataBase>) => {
            const event = action.payload;
            const dateKey = event.datakey;
            if (state[dateKey] === undefined) {
                state[dateKey] = [];
            }

            state[dateKey].push(event);
        }
    }
});


export const { setEvents, addEvent } = eventSlice.actions;
export default eventSlice.reducer;