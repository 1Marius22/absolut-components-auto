import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();
  if (loading)
    return (
      <div className="container status-panel">Se verifică sesiunea...</div>
    );
  if (!isLoggedIn)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />;
}
