import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, CalendarEvent, RootState, handelDeleteEvent, handleActiveEvent, handleAddNewEvent, handleUpdateEvent } from "../store";

export const useCalendarStore = () => {
  const { calEvents, activeCalEvent } = useSelector((state: RootState) => state.calendar);
  const dispatch = useDispatch<AppDispatch>();
  const setActiveCalEvent = (event:CalendarEvent) => {
    dispatch(handleActiveEvent(event))
  };

  const startSavingEvent = (calendarEvent:CalendarEvent) => {
    if(calendarEvent._id !=''){
      dispatch(handleUpdateEvent({...calendarEvent}));
    } else {
      const id = new Date().toDateString();
      dispatch(handleAddNewEvent({...calendarEvent, _id:id}));
    }
  }

  const deleteEvent = () => {
    dispatch(handelDeleteEvent());
  }

  return {
    calendarEvents: calEvents,
    setActiveCalEvent,
    activeCalEvent,
    startSavingEvent,
    deleteEvent,
  };
};
