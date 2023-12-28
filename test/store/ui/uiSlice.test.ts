import { handleClose, handleOpen, uiSlice } from "../../../src/store";

describe("Pruebas en uiSlice", () => {
  test("debe de regresar el estado por defecto", () => {
    expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
  });

  test("debe cambiar el isDateModalOpen correctamente", () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, handleOpen());
    expect(state.isDateModalOpen).toBeTruthy();
    state = uiSlice.reducer(state, handleClose());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
