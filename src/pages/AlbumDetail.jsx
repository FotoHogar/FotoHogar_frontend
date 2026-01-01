import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Users, Calendar, Edit } from "lucide-react";
import { toast } from "sonner";
import { getAlbumById, getPhotosByAlbum, getAlbumMembers } from "@/services/api";
import useAlbumStore from "@/stores/useAlbumStore";
import PhotoGallery from "@/components/photo-gallery";
import UploadPhotoDialog from "@/components/upload-photo-dialog";
import EditAlbumDialog from "@/components/edit-album-dialog";
import AlbumMembers from "@/components/album-members";
import AddMemberDialog from "@/components/add-member-dialog";
import Navbar from "@/components/navbar";

/**
 * Página AlbumDetail - Detalle de un álbum con sus fotos y miembros
 */
function AlbumDetail() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const { currentAlbum, photos, setCurrentAlbum, setPhotos } = useAlbumStore();

  // Cargar datos del álbum y sus fotos
  useEffect(() => {
    const loadAlbumData = async () => {
      setIsLoading(true);

      // Cargar información del álbum
      const albumResponse = await getAlbumById(albumId);
      if (!albumResponse.ok) {
        toast.error(albumResponse.message);
        navigate("/");
        return;
      }
      setCurrentAlbum(albumResponse.data);

      // Cargar miembros del álbum
      const membersResponse = await getAlbumMembers(albumId);
      if (membersResponse.ok) {
        setMembers(membersResponse.data);
      }

      // Cargar fotos del álbum
      const photosResponse = await getPhotosByAlbum(albumId);
      if (!photosResponse.ok) {
        toast.error(photosResponse.message);
        setPhotos([]);
      } else {
        setPhotos(photosResponse.data);
      }

      setIsLoading(false);
    };

    loadAlbumData();
  }, [albumId, navigate, setCurrentAlbum, setPhotos]);

  // Maneja cuando se agrega un nuevo miembro
  const handleMemberAdded = (newMember) => {
    setMembers((prev) => [...prev, newMember]);
  };

  // Maneja cuando se elimina un miembro
  const handleMemberRemoved = (memberId) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
  };

  // Maneja cuando se actualiza el álbum (fechas, descripción, etc.)
  const handleAlbumUpdated = (updatedAlbum) => {
    setCurrentAlbum(updatedAlbum);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando álbum...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentAlbum) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Botón volver */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a álbumes
        </Button>

        {/* Header del álbum */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{currentAlbum.title}</h1>
              <p className="text-muted-foreground mb-4">
                {currentAlbum.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {/* Fecha de creación */}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Creado: {new Date(currentAlbum.createdAt).toLocaleDateString("es-ES")}
                </div>
                
                {/* Fechas del evento/viaje */}
                {(currentAlbum.startDate || currentAlbum.endDate) && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Evento: {currentAlbum.startDate && new Date(currentAlbum.startDate).toLocaleDateString("es-ES")}
                    {currentAlbum.endDate && ` - ${new Date(currentAlbum.endDate).toLocaleDateString("es-ES")}`}
                  </div>
                )}
                
                {/* Número de miembros */}
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {members.length} {members.length === 1 ? "miembro" : "miembros"}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {/* Botón para editar álbum */}
              <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
              {/* Botón para subir foto */}
              <Button onClick={() => setIsUploadDialogOpen(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Subir foto
              </Button>
            </div>
          </div>
        </div>

        {/* Layout con 2 columnas: Galería y Miembros */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Galería de fotos - Columna principal */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">
              Fotos ({photos.length})
            </h2>
            <PhotoGallery photos={photos} members={members} />
          </div>

          {/* Miembros - Columna lateral */}
          <div>
            <AlbumMembers
              members={members}
              creatorId={currentAlbum.createdBy}
              albumId={albumId}
              onAddMember={() => setIsAddMemberDialogOpen(true)}
              onMemberRemoved={handleMemberRemoved}
            />
          </div>
        </div>
      </div>

      {/* Modal para subir foto */}
      <UploadPhotoDialog
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        albumId={albumId}
      />

      {/* Modal para editar álbum */}
      <EditAlbumDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        album={currentAlbum}
        onAlbumUpdated={handleAlbumUpdated}
      />

      {/* Modal para agregar miembro */}
      <AddMemberDialog
        open={isAddMemberDialogOpen}
        onOpenChange={setIsAddMemberDialogOpen}
        albumId={albumId}
        currentMembers={members}
        onMemberAdded={handleMemberAdded}
      />
    </div>
  );
}

export default AlbumDetail;
