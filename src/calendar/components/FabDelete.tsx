import { useCalendarStore } from "../../hooks/useCalendarStore";

export const FabDelete = () => {
  const { startDeleteEvent, activeCalEvent } = useCalendarStore();

  const handleClick = () => {
    startDeleteEvent();
  };

  return (
    <button
      aria-label="btn-delete"
      className={`btn btn-danger fab-danger`}
      style={{
        display:
          activeCalEvent?._id != "" && activeCalEvent != null ? "" : "none",
      }}
      onClick={handleClick}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
