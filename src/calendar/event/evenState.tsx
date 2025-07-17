import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventDataBase } from "./eventData";

export type EventsState = Record<string, Array<EventDataBase>>;

const initialState: EventsState = {
    "2025:6:17": [
        {
            datakey: "2025:6:17",
            title: "Test 1",
            description: "Hello World",
            startDate: (new Date(2025, 6, 17, 13)).toString(),
            endDate: (new Date(2025, 6, 17, 14)).toString()
        }
    ]
};

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