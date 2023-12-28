// import { backEventToFrontEvent } from "../../../src/helpers";
import {
  calendarSlice,
  handelDeleteEvent,
  handleActiveEvent,
  handleAddNewEvent,
  handleLoadEvents,
  handleLogoutCalendar,
  handleUpdateEvent,
} from "../../../src/store";
import {
  calendarWithActiveEventsState,
  calendarWithEventsState,
  events,
  initialState,
} from "../../fixtures/calendarStates.fixture";

describe("Pruebas en calendarSlice", () => {
  test("debeb de regresarl e estado por defecti", () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test("onSetActiveEvent debe activar el evento", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      handleActiveEvent(events[0])
    );

    expect(state.activeCalEvent).toEqual(events[0]);
  });

  test("onAddNewEvent debe agregar el evento", () => {
    const newEvent = {
      _id: "3",
      start: new Date("2022-10-21 13:00:00"),
      end: new Date("2022-10-21 13:00:00"),
      title: "Cumpleaños de Test",
      resource: { notes: "Notas xD de test" },
    };

    const state = calendarSlice.reducer(
      initialState,
      handleAddNewEvent(newEvent)
    );
    expect(state.calEvents.length).toBe(1);
  });

  test("onUpdateEvent debe agregar el evento", () => {
    const newEvent = {
      _id: "1",
      start: new Date("2022-10-21 13:00:00"),
      end: new Date("2022-10-21 16:00:00"),
      title: "Cumpleaños de Melissa actualizado",
      resource: { notes: "Notas xD de test" },
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      handleUpdateEvent(newEvent)
    );
    expect(state.calEvents[0].title).toContain(
      "Cumpleaños de Melissa actualizado"
    );
  });

  test("onLoadEvents debe establecer los eventos", () => {
    const initialState = calendarSlice.getInitialState();
    const newState = calendarSlice.reducer(
      initialState,
      handleLoadEvents(events)
    );

    console.log(newState);
    // expect(newState.calEvents).toEqual([backEventToFrontEvent(events[0])]);
  });

  test("handleDeleteEvent debe eliminar el evento activo", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventsState,
      handelDeleteEvent()
    );
    expect(state.calEvents.length).toBe(0);
  });

  test("handleLogoutCalendar debe eliminar todo del state", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventsState,
      handleLogoutCalendar()
    );
    expect(state).toEqual(initialState);
  });
});
