import { Link, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, User, Images } from "lucide-react";
import useUserStore from "@/stores/useUserStore";
import { toast } from "sonner";

/**
 * Componente Navbar - Barra de navegación principal
 */
function Navbar() {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  // Maneja el cierre de sesión
  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada");
    navigate("/login");
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo y título */}
        <Link to="/" className="flex items-center gap-2 font-semibold text-xl">
          <Images className="w-6 h-6" />
          FotoHogar
        </Link>

        {/* Menú de usuario */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden md:inline">
                {user?.name} {user?.lastname}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Botón de perfil - Muestra información del usuario */}
            <DropdownMenuItem className="cursor-pointer" onClick={() => {
              toast.info(`Usuario: ${user?.name} ${user?.lastname}\nEmail: ${user?.email}`);
            }}>
              <User className="w-4 h-4 mr-2" />
              Perfil
            </DropdownMenuItem>
            {/* Botón de mis álbumes - Navega a la página principal */}
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/")}>
              <Images className="w-4 h-4 mr-2" />
              Mis álbumes
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* Botón de cerrar sesión */}
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default Navbar;
