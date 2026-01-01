import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Crown, X } from "lucide-react";
import { toast } from "sonner";
import { removeMemberFromAlbum } from "@/services/api";
import useUserStore from "@/stores/useUserStore";

/**
 * Componente AlbumMembers - Muestra los miembros del álbum
 * @param {Array} members - Lista de usuarios miembros
 * @param {string} creatorId - ID del creador del álbum
 * @param {string} albumId - ID del álbum
 * @param {function} onAddMember - Callback para agregar miembro
 * @param {function} onMemberRemoved - Callback cuando se elimina un miembro
 */
function AlbumMembers({ members, creatorId, albumId, onAddMember, onMemberRemoved }) {
  const { user } = useUserStore();
  const [removingMemberId, setRemovingMemberId] = useState(null);

  // Verifica si el usuario actual es el creador
  const isCreator = user?.id === creatorId;

  // Maneja la eliminación de un miembro
  const handleRemoveMember = async (memberId) => {
    if (memberId === creatorId) {
      toast.error("No puedes eliminar al creador del álbum");
      return;
    }

    setRemovingMemberId(memberId);

    const { ok, message } = await removeMemberFromAlbum(albumId, memberId);

    if (!ok) {
      toast.error(message);
      setRemovingMemberId(null);
      return;
    }

    toast.success("Miembro eliminado del álbum");
    setRemovingMemberId(null);
    
    // Notificar al componente padre
    if (onMemberRemoved) {
      onMemberRemoved(memberId);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            Familia ({members.length} {members.length === 1 ? "miembro" : "miembros"})
          </CardTitle>
          {isCreator && (
            <Button size="sm" onClick={onAddMember}>
              <UserPlus className="w-4 h-4 mr-2" />
              Agregar
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {members.map((member) => {
            const isMemberCreator = member.id === creatorId;
            const canRemove = isCreator && !isMemberCreator;

            return (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium flex items-center gap-2">
                      {member.name} {member.lastname}
                      {isMemberCreator && (
                        <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          <Crown className="w-3 h-3" />
                          Creador
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                </div>

                {canRemove && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleRemoveMember(member.id)}
                    disabled={removingMemberId === member.id}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {/* Mensaje informativo */}
        <p className="text-xs text-muted-foreground mt-4 p-3 bg-muted/30 rounded-lg">
          💡 <strong>Tip:</strong> Los miembros pueden ver y subir fotos al álbum.
          {isCreator && " Como creador, puedes agregar o eliminar miembros."}
        </p>
      </CardContent>
    </Card>
  );
}

export default AlbumMembers;
