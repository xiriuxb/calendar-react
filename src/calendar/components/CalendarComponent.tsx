import {
  Calendar,
  DateLocalizer,
  View,
  dateFnsLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es";
import { getMessagesEs } from "../helpers/getMessages";
import { CalendarEventBox } from "./CalendarEventBox";

import { useState } from "react";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { CalendarEvent } from "../../store";
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
  const {calendarEvents,setActiveCalEvent} = useCalendarStore();
  const {openDateModal} = useUiStore();

  const lastViewValue = localStorage.getItem("lastView")
    ? JSON.parse(localStorage.getItem("lastView")!)
    : "month";

  const [lastView, setLastView] = useState(lastViewValue);

  const handleClick= (calEvent:CalendarEvent)=>{
    setActiveCalEvent(calEvent);
  }

  const handleDoubleClick = () => {
    openDateModal();
  };

  const handleViewChanged = (view: View) => {
    localStorage.setItem("lastView", JSON.stringify(view));
    setLastView(view);
  };
  return (
    <Calendar
      localizer={localizer}
      culture="es"
      events={calendarEvents}
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      messages={getMessagesEs()}
      components={{ event: CalendarEventBox }}
      onDoubleClickEvent={handleDoubleClick}
      onView={handleViewChanged}
      onSelectEvent={handleClick}
    ></Calendar>
  );
};

export default CalendarComponent;
