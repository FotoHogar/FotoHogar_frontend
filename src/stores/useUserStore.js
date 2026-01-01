import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Store de Zustand para gestionar el estado del usuario autenticado
 * Persiste los datos en localStorage
 */
const useUserStore = create(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      isAuthenticated: false,

      /**
       * Establece el usuario autenticado
       * @param {object} user - Datos del usuario
       */
      setUser: (user) => {
        set({ user, isAuthenticated: true });
      },

      /**
       * Cierra la sesión del usuario
       */
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      /**
       * Obtiene los datos del usuario actual
       * @returns {object|null}
       */
      getUser: () => {
        return get().user;
      },
    }),
    {
      name: "user-storage", // Nombre de la clave en localStorage
    }
  )
);

export default useUserStore;
