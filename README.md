# FotoHogar - Aplicación de Álbumes Fotográficos Familiares

## 📸 Descripción

FotoHogar es una aplicación web moderna que permite crear álbumes privados compartidos donde varios miembros de una familia o grupo pueden subir, organizar y visualizar fotografías de manera colaborativa.

## 🚀 Características

- **Autenticación de usuarios** con sistema de login seguro (SHA-256)
- **Gestión de álbumes**: Crear, visualizar, editar y organizar álbumes fotográficos
- **Fechas de eventos**: Agregar y editar fechas de inicio/fin de viajes o eventos
- **Gestión de familia**: Agregar y eliminar miembros de los álbumes
- **Visualización de miembros**: Ver quién tiene acceso a cada álbum
- **Permisos**: Solo el creador puede agregar/eliminar miembros y editar álbum
- **Galería de fotos**: Interfaz intuitiva con lightbox para ver fotos en detalle
- **Subida de fotos flexible**: 
  - Por URL de imagen
  - Desde archivos locales de tu computadora (JPG, PNG, GIF, etc.)
- **Información de subida**: Ver quién subió cada foto y cuándo
- **Diseño responsivo**: Optimizado para dispositivos móviles y desktop
- **Modo oscuro/claro**: Soporte completo con Tailwind CSS v4
- **Botones de perfil funcionales**: Acceso rápido a información y navegación

## 🛠️ Tecnologías

- **React 19** - Biblioteca UI moderna
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS v4** - Framework CSS utility-first
- **React Router** - Navegación y rutas
- **Zustand** - Gestión de estado simple y eficiente
- **Radix UI** - Componentes accesibles sin estilo
- **Sonner** - Notificaciones toast elegantes
- **Lucide React** - Iconos modernos

## 📁 Estructura del Proyecto

```
src/
├── assets/          # Imágenes y recursos estáticos
├── components/      # Componentes reutilizables
│   ├── ui/         # Componentes UI base (Button, Card, Dialog, etc.)
│   ├── album-card.jsx
│   ├── create-album-dialog.jsx
│   ├── photo-gallery.jsx
│   ├── upload-photo-dialog.jsx
│   ├── navbar.jsx
│   └── protected-route.jsx
├── hooks/           # Custom hooks (si se necesitan)
├── lib/            # Utilidades y funciones helper
│   ├── utils.js    # Funciones de utilidad (cn)
│   └── auth.js     # Lógica de autenticación
├── pages/          # Páginas de la aplicación
│   ├── Login.jsx
│   ├── Albums.jsx
│   └── AlbumDetail.jsx
├── router/         # Configuración de rutas
│   └── Router.jsx
├── services/       # Servicios y API
│   └── api.js      # Mock API
├── stores/         # Stores de Zustand
│   ├── useUserStore.js
│   └── useAlbumStore.js
├── App.jsx         # Componente principal
├── main.jsx        # Punto de entrada
└── index.css       # Estilos globales
```

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repo>
cd FotoHogar_frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## 👤 Credenciales de Prueba

La aplicación usa un sistema de autenticación mock con los siguientes usuarios:

**Usuario 1:**
- Email: `juan@fotohogar.com`
- Contraseña: `123456`

**Usuario 2:**
- Email: `maria@fotohogar.com`
- Contraseña: `123456`

## 📝 Funcionalidades Implementadas

### Login
- Formulario de autenticación con validación
- Redirección automática si ya está autenticado
- Persistencia de sesión en localStorage

### Lista de Álbumes
- Grid responsivo de tarjetas de álbumes
- Vista previa con imagen de portada
- Información de miembros y cantidad de fotos
- Botón para crear nuevos álbumes

### Detalle de Álbum
- Visualización de todas las fotos en grid
- Lightbox interactivo con navegación
- Subida de nuevas fotos (con URL)
- Eliminación de fotos
- Información del álbum

### Componentes UI
- **Button**: Múltiples variantes y tamaños
- **Card**: Contenedor flexible para contenido
- **Input/Textarea**: Campos de formulario estilizados
- **Dialog**: Modales accesibles
- **Dropdown Menu**: Menús desplegables
- **Label**: Etiquetas de formulario
- **Separator**: Líneas divisorias

## 🎨 Personalización

### Colores
Los colores se configuran en `src/index.css` usando variables CSS:
- Modo claro: Tonos suaves y limpios
- Modo oscuro: Contraste óptimo para baja iluminación

### Componentes
Todos los componentes UI están en `src/components/ui/` y pueden personalizarse fácilmente.

## 📦 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm run preview  # Vista previa de build
npm run lint     # Ejecuta ESLint
```

## 🔮 Próximos Pasos (Backend)

Esta es la versión frontend con datos mock. Para conectar con un backend real:

1. Reemplazar las funciones en `services/api.js` con llamadas fetch/axios reales
2. Implementar subida real de archivos (FormData)
3. Agregar gestión de permisos y roles
4. Implementar invitaciones a álbumes
5. Agregar búsqueda y filtros avanzados

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Desarrollo

Desarrollado con ❤️ usando React y Tailwind CSS.

