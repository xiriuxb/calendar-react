import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, handleClose, handleOpen } from "../store";

export const useUiStore = () => {
  const { isDateModalOpen } = useSelector((state: RootState) => state.ui);

  const dispatch = useDispatch<AppDispatch>();

  const closeDateModal = () => {
    dispatch(handleClose());
  };
  const openDateModal = () => {
    dispatch(handleOpen());
  };

  return {
    isDateModalOpen,
    closeDateModal,
    openDateModal,
  };
};
