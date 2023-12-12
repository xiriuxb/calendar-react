import { parseISO } from "date-fns";
import { CalendarEvent, EventsResponse } from "../store";

export const backEventToFrontEvent = (evento: EventsResponse) => {
  
    return {
      title: evento.title,
      start: parseISO(evento.start.toString()),
      end:parseISO(evento.end.toString()),
      _id:evento.id,
      resource:{user:evento.user, notes:evento.notes}
    } as CalendarEvent;
};
