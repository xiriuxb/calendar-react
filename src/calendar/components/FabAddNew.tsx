import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveCalEvent } = useCalendarStore();

  const handleClick = () => {
        setActiveCalEvent({
            _id:'',
            title:'',
            start:new Date(),
            resource:{user:{name:'Jorge'}, notes:''}
        });
        openDateModal();
  }

  return (
    <button className="btn btn-primary fab" onClick={handleClick}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
