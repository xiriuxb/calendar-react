import {
  Calendar,
  DateLocalizer,
  EventPropGetter,
  View,
  dateFnsLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es";
import { getMessagesEs } from "../helpers/getMessages";
import { CalendarEventBox } from "./CalendarEventBox";

import { useEffect, useState } from "react";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { CalendarEvent } from "../../store";
import { useAuthStore } from "../../hooks";
const locales = {
  es: es,
};

const localizer: DateLocalizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarComponent = () => {
  const { calendarEvents, setActiveCalEvent, startLoadingEvents } =
    useCalendarStore();
  const { openDateModal } = useUiStore();
  const { user } = useAuthStore();

  useEffect(() => {
    startLoadingEvents();
  }, []);

  const lastViewValue = localStorage.getItem("lastView")
    ? JSON.parse(localStorage.getItem("lastView")!)
    : "month";

  const [lastView, setLastView] = useState(lastViewValue);

  const handleClick = (calEvent: CalendarEvent) => {
    setActiveCalEvent(calEvent);
  };

  const handleDoubleClick = () => {
    openDateModal();
  };

  const handleViewChanged = (view: View) => {
    localStorage.setItem("lastView", JSON.stringify(view));
    setLastView(view);
  };

  const myEventPropGetter: EventPropGetter<any> = (
    event: CalendarEvent,
  ) => {
    const style = {
      backgroundColor:
        event.resource.user._id === user.uid ? "#347CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return { style };
  };

  return (
    <Calendar
      localizer={localizer}
      culture="es"
      events={calendarEvents}
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc( 100vh - 80px )'}}
      messages={getMessagesEs()}
      components={{ event: CalendarEventBox }}
      eventPropGetter={myEventPropGetter}
      onDoubleClickEvent={handleDoubleClick}
      onView={handleViewChanged}
      onSelectEvent={handleClick}
    ></Calendar>
  );
};

export default CalendarComponent;
