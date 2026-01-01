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
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { uploadPhoto } from "@/services/api";
import useAlbumStore from "@/stores/useAlbumStore";
import useUserStore from "@/stores/useUserStore";

/**
 * Componente UploadPhotoDialog - Modal para subir fotos al álbum
 * @param {boolean} open - Estado del modal
 * @param {function} onOpenChange - Función para cambiar el estado del modal
 * @param {string} albumId - ID del álbum
 */
function UploadPhotoDialog({ open, onOpenChange, albumId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState("url"); // "url" o "file"
  const [previewUrl, setPreviewUrl] = useState(""); // Preview de la imagen
  const [formData, setFormData] = useState({
    url: "",
    caption: "",
  });

  const { addPhoto } = useAlbumStore();
  const { user } = useUserStore();

  // Maneja los cambios en los inputs de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Si es la URL, actualizar el preview
    if (name === "url") {
      setPreviewUrl(value);
    }
  };

  // Maneja la selección de archivo local
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar que sea una imagen
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor selecciona un archivo de imagen");
      return;
    }

    // Crear URL temporal para preview
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
    
    // Simular conversión a base64 para el mock
    // En producción, esto se subiría a un servidor
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        url: reader.result, // Base64 de la imagen
      }));
    };
    reader.readAsDataURL(file);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const photoData = {
        url: formData.url,
        thumbnail: formData.url, // En producción, esto sería una versión miniatura
        caption: formData.caption,
        uploadedBy: user.id,
      };

      const { ok, data, message } = await uploadPhoto(albumId, photoData);

      if (!ok) {
        toast.error(message);
        return;
      }

      // Agregar la foto al store
      addPhoto(data);
      toast.success("Foto subida exitosamente");

      // Resetear formulario, preview y cerrar modal
      setFormData({ url: "", caption: "" });
      setPreviewUrl("");
      setUploadMethod("url");
      onOpenChange(false);
    } catch (error) {
      toast.error("Error al subir la foto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subir foto</DialogTitle>
          <DialogDescription>
            Agrega una nueva foto a este álbum
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Selector de método de subida */}
          <div className="space-y-2">
            <Label>Método de subida</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={uploadMethod === "url" ? "default" : "outline"}
                onClick={() => {
                  setUploadMethod("url");
                  setPreviewUrl("");
                  setFormData((prev) => ({ ...prev, url: "" }));
                }}
                className="flex-1"
              >
                Por URL
              </Button>
              <Button
                type="button"
                variant={uploadMethod === "file" ? "default" : "outline"}
                onClick={() => {
                  setUploadMethod("file");
                  setPreviewUrl("");
                  setFormData((prev) => ({ ...prev, url: "" }));
                }}
                className="flex-1"
              >
                Desde archivo
              </Button>
            </div>
          </div>

          {/* Campo: URL de la foto (solo si método es URL) */}
          {uploadMethod === "url" && (
            <div className="space-y-2">
              <Label htmlFor="url">URL de la foto *</Label>
              <Input
                id="url"
                name="url"
                type="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://ejemplo.com/foto.jpg"
                required
              />
            </div>
          )}

          {/* Campo: Archivo local (solo si método es file) */}
          {uploadMethod === "file" && (
            <div className="space-y-2">
              <Label htmlFor="file">Seleccionar imagen *</Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              <p className="text-xs text-muted-foreground">
                📁 Selecciona una imagen desde tu computadora (JPG, PNG, GIF, etc.)
              </p>
            </div>
          )}

          {/* Vista previa de la imagen */}
          {previewUrl && (
            <div className="rounded-lg overflow-hidden border bg-muted">
              <img
                src={previewUrl}
                alt="Vista previa"
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  toast.error("Error al cargar la imagen");
                }}
              />
            </div>
          )}

          {/* Campo: Descripción */}
          <div className="space-y-2">
            <Label htmlFor="caption">Descripción</Label>
            <Textarea
              id="caption"
              name="caption"
              value={formData.caption}
              onChange={handleChange}
              placeholder="Describe la foto..."
              rows={3}
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
              <Upload className="w-4 h-4 mr-2" />
              {isLoading ? "Subiendo..." : "Subir foto"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPhotoDialog;
