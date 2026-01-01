import { Navigate, Outlet } from "react-router";
import useUserStore from "@/stores/useUserStore";

/**
 * Componente ProtectedRoute - Protege rutas que requieren autenticación
 * Si el usuario no está autenticado, redirige al login
 */
function ProtectedRoute() {
  const { isAuthenticated } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
