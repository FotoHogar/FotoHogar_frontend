# Estructura de Datos Mock - FotoHogar

## 👤 Usuarios

```javascript
{
  id: "1",
  name: "Juan",
  lastname: "Pérez",
  email: "juan@fotohogar.com",
  password: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", // SHA-256 de "123456"
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan"
}
```

### Usuarios Disponibles
1. **Juan Pérez** - `juan@fotohogar.com`
2. **María García** - `maria@fotohogar.com`

**Contraseña para todos**: `123456`

---

## 📚 Álbumes

```javascript
{
  id: "1",
  title: "Vacaciones en la Playa 2024",
  description: "Nuestro viaje familiar a Máncora",
  coverImage: "https://images.unsplash.com/photo-...",
  createdBy: "1", // ID del usuario creador
  members: ["1", "2"], // IDs de usuarios con acceso
  createdAt: "2024-01-15",
  photoCount: 8
}
```

### Álbumes Precargados
1. **Vacaciones en la Playa 2024** - 8 fotos
2. **Cumpleaños de Mamá** - 12 fotos
3. **Navidad 2023** - 15 fotos
4. **Paseo al Parque** - 6 fotos

---

## 📸 Fotos

```javascript
{
  id: "p1",
  albumId: "1",
  url: "https://images.unsplash.com/photo-...?w=800&h=600&fit=crop",
  thumbnail: "https://images.unsplash.com/photo-...?w=300&h=200&fit=crop",
  uploadedBy: "1", // ID del usuario que subió
  uploadedAt: "2024-01-15T10:30:00",
  caption: "Llegada a la playa"
}
```

### Imágenes de Unsplash
Todas las fotos usan URLs de Unsplash con parámetros de tamaño:
- **URL completa**: `w=800&h=600&fit=crop`
- **Thumbnail**: `w=300&h=200&fit=crop`

### Categorías de Fotos
- **Playa**: 8 fotos del álbum "Vacaciones en la Playa"
- **Celebración**: 12 fotos del álbum "Cumpleaños de Mamá"
- **Navidad**: 15 fotos del álbum "Navidad 2023"
- **Naturaleza**: 6 fotos del álbum "Paseo al Parque"

---

## 🔐 Seguridad

### Hashing de Contraseñas
```javascript
import { sha256 } from "crypto-hash";

// La contraseña "123456" se hashea como:
"8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"
```

### Validación de Login
```javascript
// 1. Buscar usuario por email
const user = users.find(u => u.email === email);

// 2. Hashear contraseña ingresada
const hashPwd = await sha256(password);

// 3. Comparar hashes
if (hashPwd !== user.password) {
  return { ok: false, message: "Credenciales incorrectas" };
}
```

---

## 🔄 Flujo de Datos

### 1. Login
```
Usuario ingresa credenciales
    ↓
validateLogin() busca usuario y valida password
    ↓
useUserStore.setUser() guarda usuario
    ↓
localStorage persiste datos (zustand/persist)
    ↓
Redirección a "/"
```

### 2. Ver Álbumes
```
useEffect en Albums.jsx
    ↓
getAlbums() retorna datos mock
    ↓
useAlbumStore.setAlbums() guarda en estado
    ↓
Renderiza grid de AlbumCard
```

### 3. Ver Detalle de Álbum
```
Click en álbum → navigate("/album/:id")
    ↓
useEffect en AlbumDetail.jsx
    ↓
getAlbumById() y getPhotosByAlbum()
    ↓
useAlbumStore.setCurrentAlbum() y setPhotos()
    ↓
Renderiza PhotoGallery
```

### 4. Crear Álbum
```
Click "Crear álbum" → Modal abierto
    ↓
Usuario llena formulario
    ↓
createAlbum() agrega al array MOCK_ALBUMS
    ↓
useAlbumStore.addAlbum() actualiza estado
    ↓
Nuevo álbum visible en la lista
```

### 5. Subir Foto
```
Click "Subir foto" → Modal abierto
    ↓
Usuario ingresa URL y caption
    ↓
uploadPhoto() agrega a MOCK_PHOTOS[albumId]
    ↓
useAlbumStore.addPhoto() actualiza estado
    ↓
Nueva foto visible en galería
```

---

## 📊 Persistencia

### LocalStorage Keys
```javascript
// Zustand persist
"user-storage" → { state: { user, isAuthenticated }, version: 0 }
```

### Datos en Memoria
```javascript
// Variables globales en src/services/api.js
MOCK_USERS       // Array de usuarios
MOCK_ALBUMS      // Array de álbumes
MOCK_PHOTOS      // Objeto con arrays de fotos por albumId
```

**Nota**: Al recargar la página, los álbumes y fotos creados se pierden (datos en memoria).
Solo el usuario autenticado persiste por localStorage.

---

## 🚀 Extensión a Backend Real

### Endpoints Sugeridos

```
POST   /api/auth/login              → Login
POST   /api/auth/logout             → Logout
GET    /api/auth/me                 → Usuario actual

GET    /api/albums                  → Lista de álbumes
POST   /api/albums                  → Crear álbum
GET    /api/albums/:id              → Detalle de álbum
PUT    /api/albums/:id              → Actualizar álbum
DELETE /api/albums/:id              → Eliminar álbum

GET    /api/albums/:id/photos       → Fotos del álbum
POST   /api/albums/:id/photos       → Subir foto (multipart/form-data)
DELETE /api/photos/:id              → Eliminar foto

POST   /api/albums/:id/members      → Agregar miembro
DELETE /api/albums/:id/members/:uid → Remover miembro
```

### Estructura de Respuestas

```javascript
// Éxito
{
  ok: true,
  data: { ... }
}

// Error
{
  ok: false,
  message: "Descripción del error"
}
```

### Manejo de Archivos

```javascript
// Cliente (FormData)
const formData = new FormData();
formData.append("photo", file);
formData.append("caption", "Descripción");

await fetch("/api/albums/:id/photos", {
  method: "POST",
  body: formData
});

// Servidor (Express + Multer)
const upload = multer({ dest: "uploads/" });
app.post("/api/albums/:id/photos", upload.single("photo"), async (req, res) => {
  // Procesar req.file
  // Guardar en base de datos
  // Retornar URL de la foto
});
```

---

## 🎯 Features Adicionales Sugeridos

1. **Comentarios en Fotos**: Agregar sistema de comentarios
2. **Likes/Reacciones**: Permitir reacciones a fotos
3. **Tags/Etiquetas**: Etiquetar personas en fotos
4. **Búsqueda**: Buscar fotos por caption, fecha, etiquetas
5. **Filtros**: Filtrar álbumes por fecha, miembros
6. **Notificaciones**: Notificar cuando se suben fotos nuevas
7. **Compartir**: Generar links de compartir con expiración
8. **Descargas**: Descargar álbum completo como ZIP
9. **Presentación**: Ver fotos como slideshow
10. **Edición**: Rotar, recortar, aplicar filtros

---

## 🔍 Debugging

### Ver Estado de Zustand
```javascript
// En Chrome DevTools Console
console.log(window.__ZUSTAND_STORES__);
```

### Ver LocalStorage
```javascript
// Chrome DevTools → Application → Local Storage
localStorage.getItem("user-storage");
```

### Limpiar Datos
```javascript
// Limpiar sesión
localStorage.clear();

// Recargar datos mock
// Recargar la página
```
