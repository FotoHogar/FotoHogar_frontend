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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createAlbum } from "@/services/api";
import useAlbumStore from "@/stores/useAlbumStore";
import useUserStore from "@/stores/useUserStore";

/**
 * Componente CreateAlbumDialog - Modal para crear un nuevo álbum
 * @param {boolean} open - Estado del modal
 * @param {function} onOpenChange - Función para cambiar el estado del modal
 */
function CreateAlbumDialog({ open, onOpenChange }) {
  const [isLoading, setIsLoading] = useState(false);
  // Estado del formulario con fechas de inicio y fin del viaje/evento
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: "",
    startDate: "", // Fecha de inicio del evento/viaje
    endDate: "",   // Fecha de fin del evento/viaje
  });

  const { addAlbum } = useAlbumStore();
  const { user } = useUserStore();

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
      // Crear el álbum con datos del mock
      const albumData = {
        ...formData,
        createdBy: user.id,
        members: [user.id],
        coverImage:
          formData.coverImage ||
          "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=300&fit=crop",
      };

      const { ok, data, message } = await createAlbum(albumData);

      if (!ok) {
        toast.error(message);
        return;
      }

      // Agregar el álbum al store
      addAlbum(data);
      toast.success("Álbum creado exitosamente");

      // Resetear formulario y cerrar modal
      setFormData({ title: "", description: "", coverImage: "", startDate: "", endDate: "" });
      onOpenChange(false);
    } catch (error) {
      toast.error("Error al crear el álbum");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nuevo álbum</DialogTitle>
          <DialogDescription>
            Crea un álbum para compartir fotos con tu familia
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: Título */}
          <div className="space-y-2">
            <Label htmlFor="title">Título del álbum *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ej: Vacaciones 2024"
              required
            />
          </div>

          {/* Campo: Descripción */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe el álbum..."
              rows={3}
            />
          </div>

          {/* Campos de fechas del evento/viaje */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Fecha de inicio</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Fecha de fin</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Campo: URL de imagen de portada (opcional) */}
          <div className="space-y-2">
            <Label htmlFor="coverImage">URL de imagen de portada (opcional)</Label>
            <Input
              id="coverImage"
              name="coverImage"
              type="url"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            <p className="text-xs text-muted-foreground">
              Si se deja vacío, se usará una imagen por defecto
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
              {isLoading ? "Creando..." : "Crear álbum"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateAlbumDialog;
