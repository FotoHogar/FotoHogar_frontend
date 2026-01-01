import { Link } from "react-router";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Users, Images } from "lucide-react";

/**
 * Componente AlbumCard - Tarjeta de álbum en la vista de lista
 * @param {object} album - Datos del álbum
 */
function AlbumCard({ album }) {
  return (
    <Link to={`/album/${album.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
        {/* Imagen de portada del álbum */}
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={album.coverImage}
            alt={album.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Badge con número de fotos */}
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
            <Images className="w-3 h-3" />
            {album.photoCount}
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">
            {album.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {album.description}
          </p>
        </CardContent>

        <CardFooter className="px-4 pb-4 pt-0 flex items-center gap-4 text-xs text-muted-foreground">
          {/* Fecha de creación */}
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(album.createdAt).toLocaleDateString("es-ES")}
          </div>
          {/* Número de miembros */}
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {album.members.length} miembros
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default AlbumCard;
