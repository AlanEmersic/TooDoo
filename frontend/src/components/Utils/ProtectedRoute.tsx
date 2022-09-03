import { Navigate, Outlet } from "react-router-dom";
import { ROUTE_PATHS } from "../../utils/routePaths";

const authenticated = (): boolean => {
  const user = localStorage.getItem("user") ? localStorage.getItem("user") : null;
  return !!user;
};

export default function ProtectedRoute() {
  const isAuthenticated = authenticated();

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTE_PATHS.Login} />;
}
