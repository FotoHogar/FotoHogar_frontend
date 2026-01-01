import Router from "@/router/Router";
import { Toaster } from "sonner";

/**
 * Componente principal de la aplicación
 * Configura el router y las notificaciones
 */
function App() {
  return (
    <>
      <Router />
      <Toaster position="top-center" richColors={true} />
    </>
  );
}

export default App;
