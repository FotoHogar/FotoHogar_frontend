/**
 * API Mock para FotoHogar
 * Simula llamadas a un backend real con datos en memoria
 */

// Simulación de delay de red
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// --- DATOS MOCK ---

// Usuarios mock
const MOCK_USERS = [
  {
    id: "1",
    name: "Juan",
    lastname: "Pérez",
    email: "juan@fotohogar.com",
    // Password: "123456" hasheado con SHA-256
    password: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan",
  },
  {
    id: "2",
    name: "María",
    lastname: "García",
    email: "maria@fotohogar.com",
    // Password: "123456" hasheado con SHA-256
    password: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
  },
];

// Álbumes mock con fechas de inicio y fin de eventos
const MOCK_ALBUMS = [
  {
    id: "1",
    title: "Vacaciones en la Playa 2024",
    description: "Nuestro viaje familiar a Máncora",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
    createdBy: "1",
    members: ["1", "2"],
    createdAt: "2024-01-15",
    startDate: "2024-01-15",
    endDate: "2024-01-22",
    photoCount: 8,
  },
  {
    id: "2",
    title: "Cumpleaños de Mamá",
    description: "Celebración del cumpleaños #60",
    coverImage: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
    createdBy: "2",
    members: ["1", "2"],
    createdAt: "2024-02-20",
    startDate: "2024-02-20",
    endDate: "2024-02-20",
    photoCount: 12,
  },
  {
    id: "3",
    title: "Navidad 2023",
    description: "Reunión familiar de fin de año",
    coverImage: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=300&fit=crop",
    createdBy: "1",
    members: ["1", "2"],
    createdAt: "2023-12-25",
    startDate: "2023-12-24",
    endDate: "2023-12-26",
    photoCount: 15,
  },
  {
    id: "4",
    title: "Paseo al Parque",
    description: "Día de picnic en familia",
    coverImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    createdBy: "1",
    members: ["1", "2"],
    createdAt: "2024-03-10",
    startDate: "2024-03-10",
    endDate: "2024-03-10",
    photoCount: 6,
  },
];

// Fotos mock
const MOCK_PHOTOS = {
  "1": [
    {
      id: "p1",
      albumId: "1",
      url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=300&h=200&fit=crop",
      uploadedBy: "1",
      uploadedAt: "2024-01-15T10:30:00",
      caption: "Llegada a la playa",
    },
    {
      id: "p2",
      albumId: "1",
      url: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=300&h=200&fit=crop",
      uploadedBy: "2",
      uploadedAt: "2024-01-15T12:00:00",
      caption: "Vista al mar",
    },
    {
      id: "p3",
      albumId: "1",
      url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
      uploadedBy: "1",
      uploadedAt: "2024-01-15T14:30:00",
      caption: "Atardecer",
    },
    {
      id: "p4",
      albumId: "1",
      url: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=300&h=200&fit=crop",
      uploadedBy: "2",
      uploadedAt: "2024-01-16T09:00:00",
      caption: "Palmeras",
    },
    {
      id: "p5",
      albumId: "1",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      uploadedBy: "1",
      uploadedAt: "2024-01-16T11:30:00",
      caption: "Olas del mar",
    },
    {
      id: "p6",
      albumId: "1",
      url: "https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1476673160081-cf065607f449?w=300&h=200&fit=crop",
      uploadedBy: "2",
      uploadedAt: "2024-01-16T16:00:00",
      caption: "Puesta de sol",
    },
    {
      id: "p7",
      albumId: "1",
      url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=300&h=200&fit=crop",
      uploadedBy: "1",
      uploadedAt: "2024-01-17T08:00:00",
      caption: "Playa solitaria",
    },
    {
      id: "p8",
      albumId: "1",
      url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=300&h=200&fit=crop",
      uploadedBy: "2",
      uploadedAt: "2024-01-17T10:30:00",
      caption: "Último día",
    },
  ],
  "2": [
    {
      id: "p9",
      albumId: "2",
      url: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=300&h=200&fit=crop",
      uploadedBy: "1",
      uploadedAt: "2024-02-20T15:00:00",
      caption: "El pastel",
    },
    {
      id: "p10",
      albumId: "2",
      url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=300&h=200&fit=crop",
      uploadedBy: "2",
      uploadedAt: "2024-02-20T15:30:00",
      caption: "Soplar las velas",
    },
    {
      id: "p11",
      albumId: "2",
      url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=200&fit=crop",
      uploadedBy: "1",
      uploadedAt: "2024-02-20T16:00:00",
      caption: "Decoración",
    },
    {
      id: "p12",
      albumId: "2",
      url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=300&h=200&fit=crop",
      uploadedBy: "2",
      uploadedAt: "2024-02-20T17:00:00",
      caption: "Los regalos",
    },
  ],
  "3": [
    {
      id: "p13",
      albumId: "3",
      url: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=300&h=200&fit=crop",
      uploadedBy: "1",
      uploadedAt: "2023-12-25T20:00:00",
      caption: "La cena navideña",
    },
    {
      id: "p14",
      albumId: "3",
      url: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=300&h=200&fit=crop",
      uploadedBy: "2",
      uploadedAt: "2023-12-25T21:00:00",
      caption: "El árbol decorado",
    },
  ],
  "4": [
    {
      id: "p15",
      albumId: "4",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop",
      uploadedBy: "1",
      uploadedAt: "2024-03-10T11:00:00",
      caption: "Naturaleza",
    },
    {
      id: "p16",
      albumId: "4",
      url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=200&fit=crop",
      uploadedBy: "2",
      uploadedAt: "2024-03-10T12:00:00",
      caption: "Montañas",
    },
  ],
};

// --- FUNCIONES DE LA API ---

/**
 * Obtiene todos los usuarios
 * @returns {Promise<{ok: boolean, data?: Array, message?: string}>}
 */
export async function getUsers() {
  try {
    await delay();
    return { ok: true, data: MOCK_USERS };
  } catch (error) {
    return {
      ok: false,
      message: String(error),
    };
  }
}

/**
 * Obtiene todos los álbumes
 * @returns {Promise<{ok: boolean, data?: Array, message?: string}>}
 */
export async function getAlbums() {
  try {
    await delay();
    return { ok: true, data: MOCK_ALBUMS };
  } catch (error) {
    return {
      ok: false,
      message: "Error al intentar obtener los álbumes.",
    };
  }
}

/**
 * Obtiene un álbum por ID
 * @param {string} albumId - ID del álbum
 * @returns {Promise<{ok: boolean, data?: object, message?: string}>}
 */
export async function getAlbumById(albumId) {
  try {
    await delay();
    const album = MOCK_ALBUMS.find(a => a.id === albumId);
    
    if (!album) {
      return {
        ok: false,
        message: "Álbum no encontrado",
      };
    }
    
    return { ok: true, data: album };
  } catch (error) {
    return {
      ok: false,
      message: String(error),
    };
  }
}

/**
 * Obtiene las fotos de un álbum
 * @param {string} albumId - ID del álbum
 * @returns {Promise<{ok: boolean, data?: Array, message?: string}>}
 */
export async function getPhotosByAlbum(albumId) {
  try {
    await delay();
    const photos = MOCK_PHOTOS[albumId] || [];
    return { ok: true, data: photos };
  } catch (error) {
    return {
      ok: false,
      message: "Error al intentar obtener las fotos.",
    };
  }
}

/**
 * Crea un nuevo álbum
 * @param {object} albumData - Datos del álbum (incluye fechas de inicio/fin)
 * @returns {Promise<{ok: boolean, data?: object, message?: string}>}
 */
export async function createAlbum(albumData) {
  try {
    await delay();
    const newAlbum = {
      id: String(MOCK_ALBUMS.length + 1),
      ...albumData,
      createdAt: new Date().toISOString(),
      photoCount: 0,
    };
    MOCK_ALBUMS.push(newAlbum);
    return { ok: true, data: newAlbum };
  } catch (error) {
    return {
      ok: false,
      message: "Error al crear el álbum.",
    };
  }
}

/**
 * Actualiza un álbum existente
 * @param {string} albumId - ID del álbum a actualizar
 * @param {object} albumData - Nuevos datos del álbum
 * @returns {Promise<{ok: boolean, data?: object, message?: string}>}
 */
export async function updateAlbum(albumId, albumData) {
  try {
    await delay();
    
    const albumIndex = MOCK_ALBUMS.findIndex((a) => a.id === albumId);
    
    if (albumIndex === -1) {
      return {
        ok: false,
        message: "Álbum no encontrado",
      };
    }

    // Actualizar solo los campos proporcionados
    MOCK_ALBUMS[albumIndex] = {
      ...MOCK_ALBUMS[albumIndex],
      ...albumData,
    };

    return { ok: true, data: MOCK_ALBUMS[albumIndex] };
  } catch (error) {
    return {
      ok: false,
      message: "Error al actualizar el álbum.",
    };
  }
}

/**
 * Simula la subida de una foto
 * @param {string} albumId - ID del álbum
 * @param {object} photoData - Datos de la foto
 * @returns {Promise<{ok: boolean, data?: object, message?: string}>}
 */
export async function uploadPhoto(albumId, photoData) {
  try {
    await delay(1000);
    
    const newPhoto = {
      id: `p${Date.now()}`,
      albumId,
      ...photoData,
      uploadedAt: new Date().toISOString(),
    };
    
    if (!MOCK_PHOTOS[albumId]) {
      MOCK_PHOTOS[albumId] = [];
    }
    
    MOCK_PHOTOS[albumId].push(newPhoto);
    
    // Actualizar contador de fotos del álbum
    const album = MOCK_ALBUMS.find(a => a.id === albumId);
    if (album) {
      album.photoCount += 1;
    }
    
    return { ok: true, data: newPhoto };
  } catch (error) {
    return {
      ok: false,
      message: "Error al subir la foto.",
    };
  }
}

/**
 * Elimina una foto
 * @param {string} albumId - ID del álbum
 * @param {string} photoId - ID de la foto
 * @returns {Promise<{ok: boolean, message?: string}>}
 */
export async function deletePhoto(albumId, photoId) {
  try {
    await delay();
    
    if (MOCK_PHOTOS[albumId]) {
      const index = MOCK_PHOTOS[albumId].findIndex(p => p.id === photoId);
      if (index !== -1) {
        MOCK_PHOTOS[albumId].splice(index, 1);
        
        // Actualizar contador de fotos del álbum
        const album = MOCK_ALBUMS.find(a => a.id === albumId);
        if (album) {
          album.photoCount = Math.max(0, album.photoCount - 1);
        }
        
        return { ok: true };
      }
    }
    
    return {
      ok: false,
      message: "Foto no encontrada.",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al eliminar la foto.",
    };
  }
}

/**
 * Agrega un miembro a un álbum
 * @param {string} albumId - ID del álbum
 * @param {string} userId - ID del usuario a agregar
 * @returns {Promise<{ok: boolean, data?: object, message?: string}>}
 */
export async function addMemberToAlbum(albumId, userId) {
  try {
    await delay();
    
    const album = MOCK_ALBUMS.find(a => a.id === albumId);
    
    if (!album) {
      return {
        ok: false,
        message: "Álbum no encontrado.",
      };
    }
    
    // Verificar si ya es miembro
    if (album.members.includes(userId)) {
      return {
        ok: false,
        message: "El usuario ya es miembro del álbum.",
      };
    }
    
    // Agregar el miembro
    album.members.push(userId);
    
    // Obtener datos del usuario
    const user = MOCK_USERS.find(u => u.id === userId);
    
    return { 
      ok: true, 
      data: user 
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al agregar el miembro.",
    };
  }
}

/**
 * Elimina un miembro de un álbum
 * @param {string} albumId - ID del álbum
 * @param {string} userId - ID del usuario a eliminar
 * @returns {Promise<{ok: boolean, message?: string}>}
 */
export async function removeMemberFromAlbum(albumId, userId) {
  try {
    await delay();
    
    const album = MOCK_ALBUMS.find(a => a.id === albumId);
    
    if (!album) {
      return {
        ok: false,
        message: "Álbum no encontrado.",
      };
    }
    
    // No permitir eliminar al creador
    if (album.createdBy === userId) {
      return {
        ok: false,
        message: "No se puede eliminar al creador del álbum.",
      };
    }
    
    // Verificar si es miembro
    const index = album.members.indexOf(userId);
    if (index === -1) {
      return {
        ok: false,
        message: "El usuario no es miembro del álbum.",
      };
    }
    
    // Eliminar el miembro
    album.members.splice(index, 1);
    
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message: "Error al eliminar el miembro.",
    };
  }
}

/**
 * Obtiene los datos completos de los miembros de un álbum
 * @param {string} albumId - ID del álbum
 * @returns {Promise<{ok: boolean, data?: Array, message?: string}>}
 */
export async function getAlbumMembers(albumId) {
  try {
    await delay();
    
    const album = MOCK_ALBUMS.find(a => a.id === albumId);
    
    if (!album) {
      return {
        ok: false,
        message: "Álbum no encontrado.",
      };
    }
    
    // Obtener datos completos de cada miembro
    const members = album.members
      .map(memberId => MOCK_USERS.find(u => u.id === memberId))
      .filter(user => user !== undefined);
    
    return { ok: true, data: members };
  } catch (error) {
    return {
      ok: false,
      message: "Error al obtener los miembros.",
    };
  }
}
