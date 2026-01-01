import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Trash2, User, Calendar } from "lucide-react";
import useAlbumStore from "@/stores/useAlbumStore";
import { deletePhoto } from "@/services/api";
import { toast } from "sonner";

/**
 * Componente PhotoGallery - Galería de fotos con lightbox
 * @param {Array} photos - Lista de fotos
 * @param {Array} members - Lista de miembros del álbum (para mostrar nombres)
 */
function PhotoGallery({ photos, members = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { removePhoto } = useAlbumStore();

  // Función helper para obtener nombre del usuario que subió la foto
  const getUserName = (userId) => {
    const member = members.find(m => m.id === userId);
    return member ? `${member.name} ${member.lastname}` : `Usuario ${userId}`;
  };

  // Abre el lightbox con la foto seleccionada
  const openLightbox = (index) => {
    setSelectedIndex(index);
  };

  // Cierra el lightbox
  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  // Navega a la foto anterior
  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  // Navega a la foto siguiente
  const goToNext = () => {
    setSelectedIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  // Elimina una foto
  const handleDelete = async (photo) => {
    const { ok, message } = await deletePhoto(photo.albumId, photo.id);
    
    if (!ok) {
      toast.error(message);
      return;
    }

    removePhoto(photo.id);
    toast.success("Foto eliminada");
    closeLightbox();
  };

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No hay fotos en este álbum aún
        </p>
      </div>
    );
  }

  const currentPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  return (
    <>
      {/* Grid de miniaturas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group bg-muted"
            onClick={() => openLightbox(index)}
          >
            <img
              src={photo.thumbnail}
              alt={photo.caption || `Foto ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Overlay al hacer hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white text-sm px-2 text-center line-clamp-2">
                {photo.caption || "Sin descripción"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-5xl p-0 border-0">
          {currentPhoto && (
            <div className="relative">
              {/* Botón cerrar */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={closeLightbox}
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Botón eliminar */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-14 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={() => handleDelete(currentPhoto)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              {/* Navegación anterior */}
              {photos.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              )}

              {/* Navegación siguiente */}
              {photos.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              )}

              {/* Imagen principal */}
              <div className="bg-black">
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.caption || "Foto"}
                  className="w-full max-h-[70vh] object-contain"
                />
              </div>

              {/* Información de la foto */}
              <div className="p-4 bg-background">
                <p className="text-sm mb-2">{currentPhoto.caption}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {getUserName(currentPhoto.uploadedBy)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(currentPhoto.uploadedAt).toLocaleDateString("es-ES")}
                  </div>
                  <div className="ml-auto">
                    {selectedIndex + 1} / {photos.length}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PhotoGallery;
