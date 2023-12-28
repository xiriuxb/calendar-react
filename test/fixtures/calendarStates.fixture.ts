import {
  CalendarEvent,
  CalendarState,
} from "../../src/store/calendar/calendarSlice";
export const events: CalendarEvent[] = [
  {
    _id: "1",
    start: new Date("2022-10-21 13:00:00"),
    end: new Date("2022-10-21 13:00:00"),
    title: "Cumpleaños de Melissa",
    resource: { notes: "Notas xD" },
  },
];

export const initialState = {
  isLoadingEvents: false,
  calEvents: [],
  activeCalEvent: null,
} as CalendarState;

export const calendarWithEventsState = {
  isLoadingEvents: false,
  calEvents: [...events],
  activeCalEvent: null,
} as CalendarState;

export const calendarWithActiveEventsState = {
  isLoadingEvents: false,
  calEvents: [...events],
  activeCalEvent: { ...events[0] },
} as CalendarState;
