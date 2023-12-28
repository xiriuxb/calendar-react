import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../../src/store";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";

jest.mock("../../../src/hooks/useCalendarStore");

describe("Pruebas en <FabDelete />", () => {
  const mockstartDeleteEvent = jest.fn();

  beforeEach(() => jest.clearAllMocks());
  test("debe mostrar el componente correctamente", () => {
    (useCalendarStore as jest.Mock).mockReturnValue({
      hasEventSelected: false,
    });
    render(<FabDelete></FabDelete>);
    const delBtn = screen.getByLabelText("btn-delete");
    expect(delBtn.classList).toContain("btn");
    expect(delBtn.classList).toContain("btn-danger");
    expect(delBtn.classList).toContain("fab-danger");
    expect(delBtn.style.display).toBe("none");
  });

  test("debe mostrar el boton si hay un evento activo", () => {
    (useCalendarStore as jest.Mock).mockReturnValue({
      activeCalEvent: { _id: "fdvg" },
    });
    render(<FabDelete></FabDelete>);
    const delBtn = screen.getByLabelText("btn-delete");
    expect(delBtn.classList).toContain("btn");
    expect(delBtn.classList).toContain("btn-danger");
    expect(delBtn.classList).toContain("fab-danger");
    expect(delBtn.style.display).toBe("");
  });

  test("debe llanar startDeleteEvent", () => {
    (useCalendarStore as jest.Mock).mockReturnValue({
      activeCalEvent: { _id: "fdvg" },
      startDeleteEvent: mockstartDeleteEvent,
    });
    render(<FabDelete></FabDelete>);
    const delBtn = screen.getByLabelText("btn-delete");
    fireEvent.click(delBtn);
    expect(mockstartDeleteEvent).toHaveBeenCalled();
  });
});
