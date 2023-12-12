import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  CalendarEvent,
  RootState,
  handelDeleteEvent,
  handleActiveEvent,
  handleAddNewEvent,
  handleLoadEvents,
  handleUpdateEvent,
} from "../store";
import { calendarApi } from "../api";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

export const useCalendarStore = () => {
  const { calEvents, activeCalEvent } = useSelector(
    (state: RootState) => state.calendar
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const setActiveCalEvent = (event: CalendarEvent) => {
    dispatch(handleActiveEvent(event));
  };

  const startSavingEvent = async (calendarEvent: CalendarEvent) => {
    try {
      if (calendarEvent._id) {
        await calendarApi.put(`/events/${calendarEvent._id}`, {
          ...calendarEvent,
          user: user.uid,
          notes: calendarEvent.resource.notes,
        });
        dispatch(handleUpdateEvent({ ...calendarEvent, user: user.uid }));
        return;
      } else {
        await calendarApi.post("/events", {
          ...calendarEvent,notes: calendarEvent.resource.notes, user: user.uid,
        });
        dispatch(
          handleAddNewEvent({
            ...calendarEvent,
            user: user.uid,
            notes: calendarEvent.resource.notes,
          })
        );
      }
    } catch (error) {
      console.log(error);
      if(error instanceof AxiosError){
        Swal.fire('Error al guardar', error.response?.data.msg, 'error')
      }
    }
  };

  const startDeleteEvent = async() => {
    try {
      await calendarApi.delete(`/events/${activeCalEvent!._id}`);

      dispatch(handelDeleteEvent());
    } catch (error) {
      if(error instanceof AxiosError){
        Swal.fire('Error al eliminar', error.response?.data.msg, 'error')
      }
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      dispatch(handleLoadEvents(data.events));
    } catch (error) {
      console.log("Error loading events", error);
    }
  };

  return {
    calendarEvents: calEvents,
    setActiveCalEvent,
    activeCalEvent,
    startSavingEvent,
    startDeleteEvent,
    startLoadingEvents,
  };
};
