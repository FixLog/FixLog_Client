import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface RouteGuardProps {
  isLoggedIn: boolean;
  children: ReactNode;
}

const RouteGuard = ({ isLoggedIn, children }: RouteGuardProps) => {
  const location = useLocation();
 
  if (!isLoggedIn) {
    return <Navigate to="/login-page" state={{ from: location }} replace />;
  }

  return children;
};

export default RouteGuard;
