import { AUTH_STATUS } from "../../src/auth/types/AuthStatus";
import { AuthState } from "../../src/store/auth/authSlice";

export const initialState: AuthState = {
  status: AUTH_STATUS.checking,
  user: {},
  errorMessage: undefined,
};

export const authenticatedState: AuthState = {
  status: AUTH_STATUS.authenticated,
  user: { uid: "ABC", name: "Jorhe" },
  errorMessage: undefined,
};

export const notAuthenticatedState: AuthState = {
  status: AUTH_STATUS.not_authenticated,
  user: {},
  errorMessage: undefined,
};
