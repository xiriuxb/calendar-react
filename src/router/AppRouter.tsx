import { Route, Routes } from "react-router";
import { AuthStatus } from "../auth/types/AuthStatus";
import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages/CalendarPage";
import { Navigate } from "react-router-dom";

export const AppRouter = () => {
  const authStatus: AuthStatus = AuthStatus.AUTHENTICATED;
  return (
    <Routes>
      {authStatus.valueOf() !== AuthStatus.AUTHENTICATED ? (
        <Route path="/auth/*" element={<LoginPage />} />
      ) : (
        <Route path="/*" element={<CalendarPage />} />
      )}
      <Route path="/*" element={<Navigate to={"/auth/login"} />} />
    </Routes>
  );
};
