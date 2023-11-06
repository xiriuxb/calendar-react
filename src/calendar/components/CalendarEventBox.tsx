import { EventProps } from "react-big-calendar";

export const CalendarEventBox = (props: EventProps) => {
  const event = props.event;
  return (
    <>
      <strong>{event.title}</strong> - <span>{event.resource.user.name}</span>
    </>
  );
};
