import { AUTH_STATUS } from "../../../src/auth/types/AuthStatus";
import {
  authSlice,
  clearErrormessage,
  onBadLogin,
  onLogin,
} from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  initialState,
} from "../../fixtures/authStates.fixture";
import { testUserCredentials } from "../../fixtures/testUser.fixture";

describe("Pruebas en authSlice", () => {
  test("debe regresar el estado inicial", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test("debe de realizar un login", () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
    expect(state.status).toBe(AUTH_STATUS.authenticated);
    expect(state).toEqual({
      status: AUTH_STATUS.authenticated,
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });

  test("debe de realizar el logout", () => {
    const state = authSlice.reducer(authenticatedState, onBadLogin(undefined));
    expect(state).toEqual({
      status: AUTH_STATUS.not_authenticated,
      user: {},
      errorMessage: undefined,
    });
  });

  test("debe de realizar el logout con error", () => {
    const errorMessage = "Credenciales no válidas";
    const state = authSlice.reducer(
      authenticatedState,
      onBadLogin(errorMessage)
    );
    expect(state).toEqual({
      status: AUTH_STATUS.not_authenticated,
      user: {},
      errorMessage: errorMessage,
    });
  });

  test("debe limpiar el mensaje de error", () => {
    const errorMessage = "Credenciales no válidas";
    const state = authSlice.reducer(
      authenticatedState,
      onBadLogin(errorMessage)
    );
    const newState = authSlice.reducer(state, clearErrormessage());
    expect(newState.errorMessage).toBe(undefined);
  });
});
