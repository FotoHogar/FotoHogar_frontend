import { create } from "zustand";

/**
 * Store de Zustand para gestionar el estado de los álbumes y fotos
 */
const useAlbumStore = create((set, get) => ({
  // Estado inicial
  albums: [],
  currentAlbum: null,
  photos: [],
  selectedPhoto: null,

  /**
   * Establece la lista de álbumes
   * @param {Array} albums - Lista de álbumes
   */
  setAlbums: (albums) => {
    set({ albums });
  },

  /**
   * Establece el álbum actual
   * @param {object} album - Datos del álbum
   */
  setCurrentAlbum: (album) => {
    set({ currentAlbum: album });
  },

  /**
   * Agrega un nuevo álbum a la lista
   * @param {object} album - Nuevo álbum
   */
  addAlbum: (album) => {
    set((state) => ({
      albums: [...state.albums, album],
    }));
  },

  /**
   * Actualiza un álbum existente en la lista
   * @param {string} albumId - ID del álbum a actualizar
   * @param {object} updatedData - Datos actualizados del álbum
   */
  updateAlbum: (albumId, updatedData) => {
    set((state) => ({
      albums: state.albums.map((album) =>
        album.id === albumId ? { ...album, ...updatedData } : album
      ),
    }));
  },

  /**
   * Establece las fotos del álbum actual
   * @param {Array} photos - Lista de fotos
   */
  setPhotos: (photos) => {
    set({ photos });
  },

  /**
   * Agrega una nueva foto a la lista
   * @param {object} photo - Nueva foto
   */
  addPhoto: (photo) => {
    set((state) => ({
      photos: [...state.photos, photo],
    }));
  },

  /**
   * Elimina una foto de la lista
   * @param {string} photoId - ID de la foto a eliminar
   */
  removePhoto: (photoId) => {
    set((state) => ({
      photos: state.photos.filter((photo) => photo.id !== photoId),
    }));
  },

  /**
   * Establece la foto seleccionada para vista previa
   * @param {object} photo - Foto seleccionada
   */
  setSelectedPhoto: (photo) => {
    set({ selectedPhoto: photo });
  },

  /**
   * Obtiene un álbum por ID
   * @param {string} albumId - ID del álbum
   * @returns {object|undefined}
   */
  getAlbumById: (albumId) => {
    return get().albums.find((album) => album.id === albumId);
  },
}));

export default useAlbumStore;
