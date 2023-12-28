import { render, screen } from "@testing-library/react";
import { AppRouter } from "../../src/router/AppRouter";
import React from "react";
import { useAuthStore } from "../../src/hooks";
import { AUTH_STATUS } from "../../src/auth/types/AuthStatus";
import { MemoryRouter } from "react-router";
import { CalendarPage } from "../../src/calendar/pages/CalendarPage";

jest.mock("../../src/hooks/useAuthStore");
jest.mock("../../src/calendar/pages/CalendarPage", () => ({
  CalendarPage: () => <h1>Calendar Page</h1>,
}));

describe("Pruebas en <AppRouter />", () => {
  const mockCheckAuthToken = jest.fn();
  beforeEach(() => jest.clearAllMocks());
  test("debe mostrar la pantalla de carga y llamar checkAuth", () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      status: AUTH_STATUS.checking,
      checkAuthToken: mockCheckAuthToken,
    });
    render(<AppRouter />);
    expect(screen.getAllByText("Loading")).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  test("debe mostrar el login en caso de no estar autenticado", () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      status: AUTH_STATUS.not_authenticated,
      checkAuthToken: mockCheckAuthToken,
    });
    const { container } = render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText("Ingreso")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test("debe mostrar el calendario si está autenticado", () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      status: AUTH_STATUS.authenticated,
      checkAuthToken: mockCheckAuthToken,
    });
    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText("Calendar Page")).toBeTruthy();
  });
});
