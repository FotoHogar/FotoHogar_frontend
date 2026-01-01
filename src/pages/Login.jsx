import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Images } from "lucide-react";
import { toast } from "sonner";
import { validateLogin } from "@/lib/auth";
import useUserStore from "@/stores/useUserStore";

/**
 * Página de Login
 * Permite a los usuarios iniciar sesión
 */
function Login() {
  const { isAuthenticated, setUser } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Si ya está autenticado, redirige a la página principal
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await validateLogin(formData.email, formData.password);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      // Guardar usuario en el store
      setUser(response.user);
      toast.success("¡Bienvenido a FotoHogar!");
      navigate("/");
    } catch (error) {
      toast.error("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Images className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Bienvenido a FotoHogar</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder a tus álbumes familiares
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo: Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
                disabled={isLoading}
              />
            </div>

            {/* Campo: Contraseña */}
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            {/* Botón de envío */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>

            {/* Información de credenciales de prueba */}
            <div className="mt-6 p-4 rounded-lg bg-muted">
              <p className="text-sm font-semibold mb-2">Credenciales de prueba:</p>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p>Email: juan@fotohogar.com</p>
                <p>Email: maria@fotohogar.com</p>
                <p>Contraseña: 123456</p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
