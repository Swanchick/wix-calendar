import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventDataBase } from "./eventData";

export type EventsState = Record<string, Array<EventDataBase>>;

const initialState: EventsState = {};

const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        setEvents: (_, action: PayloadAction<EventsState>) => {
            return action.payload;
        },
        addEvent: (state, action: PayloadAction<{dateKey: string, event: EventDataBase}>) => {
            const { dateKey, event } = action.payload;
            if (state[dateKey] === undefined) {
                state[dateKey] = [];
            }

            state[dateKey].push(event);
        }
    }
});


export const { setEvents, addEvent } = eventSlice.actions;
export default eventSlice.reducer;