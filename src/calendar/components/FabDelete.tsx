import { useCalendarStore } from "../../hooks/useCalendarStore";

export const FabDelete = () => {
  const { deleteEvent, activeCalEvent } = useCalendarStore();

  const handleClick = () => {
    deleteEvent();
  };

  return (
    <button
      className={`btn btn-danger fab-danger`}
      style={{ display: activeCalEvent?._id != '' && activeCalEvent !=null ? '':'none' }}
      onClick={handleClick}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
