import { Route, Routes } from "react-router";
import { AUTH_STATUS } from "../auth/types/AuthStatus";
import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages/CalendarPage";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = () => {
  // const authStatus: AUTH_STATUS = AUTH_STATUS.not_authenticated;
  const { status, checkAuthToken } = useAuthStore();
  useEffect(() => {
    checkAuthToken();
  }, []);
  if (status === AUTH_STATUS.checking) {
    return <h3>Loading</h3>;
  }
  return (
    <Routes>
      {status.valueOf() !== AUTH_STATUS.authenticated ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to={"/auth/login"} />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/"/>}></Route>
        </>
      )}
    </Routes>
  );
};
