import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  guestOnly?: boolean;
}

const ProtectedRoute = ({ allowedRoles, guestOnly = false }: ProtectedRouteProps) => {
  const token = localStorage.getItem("xy9a7b");
  const userRole = localStorage.getItem("userRole");

  // Map roles to their default layout paths
  const roleRedirects: Record<string, string> = {
    STUDENT: "/student",
    TEACHER: "/teacher",
    DEPARTMENT_HEAD: "/head",
    REGISTRAR: "/registrar",
    FINANCE: "/finance",
    DEAN: "/dean",
    VICE_DEAN: "/vice-dean",
    GENERAL_MANAGER: "/general-manager",
  };

  // If this route is exclusively for guests (like Login/Register pages)
  if (guestOnly) {
    if (token && userRole && roleRedirects[userRole]) {
      return <Navigate to={roleRedirects[userRole]} replace />;
    }
    return <Outlet />;
  }

  // --- STANDARD PROTECTED ROUTE LOGIC ---

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, but not authorized to view the page
  if (allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
    // Determine the route based on the user's actual role, or default to login
    const targetRoute = userRole && roleRedirects[userRole] ? roleRedirects[userRole] : "/login";
    return <Navigate to={targetRoute} replace />;
  }

  // If authenticated and authorized, render the child routes via Outlet
  return <Outlet />;
};

export default ProtectedRoute;