import { act, render, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { Provider } from "react-redux";
import { AuthState, authSlice, store } from "../../src/store";
import React from "react";
import { AUTH_STATUS } from "../../src/auth/types/AuthStatus";
import { configureStore } from "@reduxjs/toolkit";
import {
  initialState,
  notAuthenticatedState,
} from "../fixtures/authStates.fixture";
import { testUserCredentials } from "../fixtures/testUser.fixture";
import { calendarApi } from "../../src/api";

const getMockStore = (initialState: AuthState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: initialState,
    },
  });
};
describe("Pruebas en useAuthStore", () => {
  const expiredToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTRlNWE3NjEwOTBiNGY3ZGUxNmFiMjEiLCJuYW1lIjoiSm9yZ2UgVHJ1amlsbG8iLCJpYXQiOjE3MDM3MDM1NjYsImV4cCI6MTcwMzcxMDc2Nn0.RUO6JhKyJfbZrVrxd8RF2CvZZCe-EE3CiEdQ4s6Yow8";

  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockStore = getMockStore({ ...initialState });
  test("debe de regresar los valores por defecto", () => {
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    expect(result.current).toEqual({
      status: AUTH_STATUS.checking,
      errorMessage: undefined,
      user: {},
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });

  test("startingLogin debe de realizar el login correctamente", async () => {
    localStorage.clear();
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    expect(result.current.status).toBe(AUTH_STATUS.authenticated);
    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  });

  test("startingLogin debe de fallar el login", async () => {
    localStorage.clear();
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    await act(async () => {
      await result.current.startLogin({ email: "", password: "dasdas" });
    });

    const { errorMessage, status, user } = result.current;
    expect(errorMessage).not.toBe(undefined);
    expect(status).toBe(AUTH_STATUS.not_authenticated);
    expect(user).toEqual({});

    waitFor(() => expect(result.current.errorMessage).toBe(undefined));
  });

  test("startRegister debe crear un usuario", async () => {
    localStorage.clear();
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const spy = jest.spyOn(calendarApi, "post").mockResolvedValue({
      data: {
        ok: true,
        uid: "123456",
        name: "testUser",
        toeken: "some-token",
      },
    });
    await act(async () => {
      await result.current.startRegister({
        name: "Jorge",
        email: "a@b.com",
        password: "dasdas",
      });
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: AUTH_STATUS.authenticated,
      user: { name: "testUser", uid: "123456" },
    });

    spy.mockRestore();
  });

  test("startRegister debe fallars", async () => {
    localStorage.clear();
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startRegister({
        name: "Jorge",
        email: "jt@wdqa.com",
        password: "dasdas",
      });
    });

    const { errorMessage, status, user } = result.current;
    expect(errorMessage).toBe("Mail ya registrado");
    expect(user).toEqual({});
    expect(status).toBe(AUTH_STATUS.not_authenticated);
  });

  test("checkAuthToken debe fallar si no hay token", async () => {
    localStorage.clear();
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;
    expect(errorMessage).toBe("");
    expect(user).toEqual({});
    expect(status).toBe(AUTH_STATUS.not_authenticated);
  });

  //   test("debe autenticar un usuario si existe un token", async () => {
  //     const { data } = await calendarApi.post("/auth", testUserCredentials);
  //     console.log(data);
  //     localStorage.setItem("token", data.token);
  //     const mockStore = getMockStore({ ...initialState });
  //     const { result } = renderHook(() => useAuthStore(), {
  //       wrapper: ({ children }) => (
  //         <Provider store={mockStore}>{children}</Provider>
  //       ),
  //     });

  //     await act(async () => {
  //       await result.current.checkAuthToken();
  //     });
  //     const { errorMessage, status, user } = result.current;
  //     expect(errorMessage).toBe("");
  //     // expect(user).toEqual({});
  //     expect(status).toBe(AUTH_STATUS.authenticated);
  //   });
});
