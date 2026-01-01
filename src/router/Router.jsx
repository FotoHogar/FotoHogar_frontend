import { BrowserRouter, Routes, Route } from "react-router";
import Login from "@/pages/Login";
import Albums from "@/pages/Albums";
import AlbumDetail from "@/pages/AlbumDetail";
import ProtectedRoute from "@/components/protected-route";

/**
 * Configuración de rutas de la aplicación
 * - /login: Página de inicio de sesión
 * - /: Lista de álbumes (protegida)
 * - /album/:albumId: Detalle de álbum (protegida)
 */
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Albums />} />
          <Route path="/album/:albumId" element={<AlbumDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
