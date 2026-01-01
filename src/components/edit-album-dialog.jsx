import { useState, useEffect } from "react";
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
import { Save } from "lucide-react";
import { toast } from "sonner";
import { updateAlbum } from "@/services/api";
import useAlbumStore from "@/stores/useAlbumStore";

/**
 * Componente EditAlbumDialog - Modal para editar información del álbum
 * @param {boolean} open - Estado del modal
 * @param {function} onOpenChange - Función para cambiar el estado del modal
 * @param {object} album - Datos actuales del álbum
 * @param {function} onAlbumUpdated - Callback cuando se actualiza el álbum
 */
function EditAlbumDialog({ open, onOpenChange, album, onAlbumUpdated }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentAlbum } = useAlbumStore();
  
  // Inicializar el formulario con los datos actuales del álbum
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: "",
    startDate: "",
    endDate: "",
  });

  // Actualizar el formulario cuando cambia el álbum
  useEffect(() => {
    if (album) {
      setFormData({
        title: album.title || "",
        description: album.description || "",
        coverImage: album.coverImage || "",
        startDate: album.startDate || "",
        endDate: album.endDate || "",
      });
    }
  }, [album]);

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
      // Actualizar el álbum
      const { ok, data, message } = await updateAlbum(album.id, formData);

      if (!ok) {
        toast.error(message);
        return;
      }

      // Actualizar el álbum en el store
      setCurrentAlbum(data);
      toast.success("Álbum actualizado exitosamente");

      // Cerrar modal y notificar al padre
      onOpenChange(false);
      if (onAlbumUpdated) {
        onAlbumUpdated(data);
      }
    } catch (error) {
      toast.error("Error al actualizar el álbum");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar álbum</DialogTitle>
          <DialogDescription>
            Actualiza la información del álbum. Por ejemplo, si el viaje terminó
            más tarde o la información cambió.
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>

          {/* Campos de fechas - Se pueden actualizar si el evento duró más/menos */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Fecha de inicio</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Campo: URL de imagen de portada */}
          <div className="space-y-2">
            <Label htmlFor="coverImage">URL de imagen de portada</Label>
            <Input
              id="coverImage"
              name="coverImage"
              type="url"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
              disabled={isLoading}
            />
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
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditAlbumDialog;
