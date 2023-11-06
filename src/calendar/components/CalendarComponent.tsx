import {
  Calendar,
  DateLocalizer,
  Event,
  View,
  dateFnsLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay, addHours } from "date-fns";
import es from "date-fns/locale/es";
import { getMessagesEs } from "../helpers/getMessages";
import { CalendarEventBox } from "./CalendarEventBox";

import { useState } from "react";
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

const myEventList: Event[] = [
  {
    title: "Mi cumpleaños",
    resource: { user: { name: "Jorge" } },
    start: new Date(),
    end: addHours(new Date(), 2),
  },
];

const CalendarComponent = () => {
  const lastViewValue = localStorage.getItem("lastView")
    ? JSON.parse(localStorage.getItem("lastView")!)
    : "month";

  const [lastView, setLastView] = useState(lastViewValue);

  const handleDoubleClick = (event: Event) => {
    console.log({ dbClick: event });
  };

  const handleViewChanged = (view: View) => {
    localStorage.setItem("lastView", JSON.stringify(view));
    setLastView(view);
  };
  return (
    <Calendar
      localizer={localizer}
      culture="es"
      events={myEventList}
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      messages={getMessagesEs()}
      components={{ event: CalendarEventBox }}
      onDoubleClickEvent={handleDoubleClick}
      onView={handleViewChanged}
    ></Calendar>
  );
};

export default CalendarComponent;
