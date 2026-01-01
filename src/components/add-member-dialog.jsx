import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { addMemberToAlbum, getUsers } from "@/services/api";

/**
 * Componente AddMemberDialog - Modal para agregar miembros al álbum
 * @param {boolean} open - Estado del modal
 * @param {function} onOpenChange - Función para cambiar el estado del modal
 * @param {string} albumId - ID del álbum
 * @param {Array} currentMembers - Miembros actuales del álbum
 * @param {function} onMemberAdded - Callback cuando se agrega un miembro
 */
function AddMemberDialog({ open, onOpenChange, albumId, currentMembers, onMemberAdded }) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Verificar si el usuario existe
      const { ok: usersOk, data: users } = await getUsers();

      if (!usersOk) {
        toast.error("Error al buscar usuarios");
        setIsLoading(false);
        return;
      }

      // Buscar usuario por email
      const userToAdd = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (!userToAdd) {
        toast.error("No se encontró un usuario con ese email");
        setIsLoading(false);
        return;
      }

      // Verificar si ya es miembro
      const isAlreadyMember = currentMembers.some((m) => m.id === userToAdd.id);

      if (isAlreadyMember) {
        toast.error("Este usuario ya es miembro del álbum");
        setIsLoading(false);
        return;
      }

      // Agregar miembro al álbum
      const { ok, data, message } = await addMemberToAlbum(albumId, userToAdd.id);

      if (!ok) {
        toast.error(message);
        return;
      }

      toast.success(`${userToAdd.name} fue agregado al álbum`);

      // Resetear formulario y cerrar modal
      setEmail("");
      onOpenChange(false);

      // Notificar al componente padre
      if (onMemberAdded) {
        onMemberAdded(userToAdd);
      }
    } catch (error) {
      toast.error("Error al agregar el miembro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar miembro familiar</DialogTitle>
          <DialogDescription>
            Invita a un familiar a este álbum usando su email
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email del familiar *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@email.com"
              required
              disabled={isLoading}
            />
          </div>

          {/* Información de usuarios disponibles */}
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm font-semibold mb-2">Usuarios registrados:</p>
            <div className="text-xs space-y-1 text-muted-foreground">
              <p>• juan@fotohogar.com - Juan Pérez</p>
              <p>• maria@fotohogar.com - María García</p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              En producción, podrías invitar a cualquier email.
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              <UserPlus className="w-4 h-4 mr-2" />
              {isLoading ? "Agregando..." : "Agregar miembro"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddMemberDialog;
