import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { getAlbums } from "@/services/api";
import useAlbumStore from "@/stores/useAlbumStore";
import AlbumCard from "@/components/album-card";
import CreateAlbumDialog from "@/components/create-album-dialog";
import Navbar from "@/components/navbar";

/**
 * Página Albums - Lista de álbumes del usuario
 */
function Albums() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { albums, setAlbums } = useAlbumStore();

  // Cargar álbumes al montar el componente
  useEffect(() => {
    const loadAlbums = async () => {
      setIsLoading(true);
      const { ok, data, message } = await getAlbums();

      if (!ok) {
        toast.error(message);
        return;
      }

      setAlbums(data);
      setIsLoading(false);
    };

    loadAlbums();
  }, [setAlbums]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Mis Álbumes</h1>
            <p className="text-muted-foreground">
              Organiza y comparte tus recuerdos familiares
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Crear álbum
          </Button>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando álbumes...</p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && albums.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No tienes álbumes aún
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Crear tu primer álbum
            </Button>
          </div>
        )}

        {/* Grid de álbumes */}
        {!isLoading && albums.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        )}
      </div>

      {/* Modal para crear álbum */}
      <CreateAlbumDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}

export default Albums;
