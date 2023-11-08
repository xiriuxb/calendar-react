import CalendarComponent from "../components/CalendarComponent";
import { CalendarModal } from "../components/CalendarModal";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";
import { NavBar } from "../components/Navbar";

export const CalendarPage = () => {
  return (
    <div>
      <NavBar></NavBar>
      <CalendarComponent />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </div>
  );
};
