import { createSlice } from "@reduxjs/toolkit";
import { Event } from "react-big-calendar";
import { backEventToFrontEvent } from "../../helpers";

export interface CalendarEvent extends Event {
  _id?: string;
}

export interface UserResponse {
  name: string;
  _id: string;
}

export interface EventsResponse {
  id: string;
  start: string | Date;
  end: Date;
  title: string;
  notes: string;
  user: UserResponse;
}

export interface CalendarState {
  calEvents: CalendarEvent[];
  activeCalEvent: CalendarEvent | null;
  isLoadingEvents: boolean;
}

const myEventList: CalendarEvent[] = [];

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents: false,
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
      if (state.activeCalEvent) {
        state.calEvents = state.calEvents.filter(
          (el) => el._id !== state.activeCalEvent?._id
        );
        state.activeCalEvent = null;
      }
    },
    handleLoadEvents: (state, action) => {
      state.isLoadingEvents = false;
      action.payload.forEach((event: EventsResponse) => {
        const exist = state.calEvents.some(
          (dbEvent: CalendarEvent) => dbEvent._id === event.id
        );
        if (!exist) {
          state.calEvents.push(backEventToFrontEvent(event));
        }
      });
    },
    handleLogoutCalendar: (state) => {
      state.isLoadingEvents = false;
      state.activeCalEvent = null;
      state.calEvents = [];
    },
  },
});

export const {
  handleActiveEvent,
  handleAddNewEvent,
  handleUpdateEvent,
  handelDeleteEvent,
  handleLoadEvents,
  handleLogoutCalendar,
} = calendarSlice.actions;
