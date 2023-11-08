import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";
import { Event } from "react-big-calendar";

export interface CalendarEvent extends Event {
  _id: string;
}

interface CalendarState {
  calEvents: CalendarEvent[];
  activeCalEvent: CalendarEvent | null;
}

const myEventList: CalendarEvent[] = [
  {
    _id: "1",
    title: "Mi cumpleaños",
    resource: { user: { name: "Jorge" }, notes: "No lo sé Rick" },
    start: new Date(),
    end: addHours(new Date(), 2),
  },
];

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    calEvents: myEventList,
    activeCalEvent: null,
  } as CalendarState,
  reducers: {
    handleActiveEvent: (state, action) => {
      state.activeCalEvent = action.payload;
    },
    handleAddNewEvent: (state, acttion) => {
      state.calEvents.push(acttion.payload);
      state.activeCalEvent = null;
    },
    handleUpdateEvent: (state, action) => {
      state.calEvents = state.calEvents.map((el) => {
        if (el._id === action.payload._id) {
          return action.payload;
        }
        return el;
      });
    },
    handelDeleteEvent: (state) => {
      if(state.activeCalEvent){
        state.calEvents = state.calEvents.filter(el=>el._id!==state.activeCalEvent?._id);
        state.activeCalEvent = null;
      }
    },
  },
});

export const { handleActiveEvent, handleAddNewEvent, handleUpdateEvent, handelDeleteEvent } =
  calendarSlice.actions;
