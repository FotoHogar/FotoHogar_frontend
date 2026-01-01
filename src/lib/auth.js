import { getUsers } from "@/services/api";
import { sha256 } from "crypto-hash";
import { toast } from "sonner";

/**
 * Genera hash de la contraseña usando SHA-256
 * @param {string} password - Contraseña en texto plano
 * @returns {Promise<string>} Hash de la contraseña
 */
async function hashPassword(password) {
  return await sha256(password);
}

/**
 * Valida las credenciales del usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<{ok: boolean, message?: string, user?: object}>}
 */
export async function validateLogin(email, password) {
  // 1. Obtener todos los usuarios del mock API
  const { ok, message, data: users } = await getUsers();

  if (!ok) {
    toast.error(message);
    return { ok: false, message };
  }

  // 2. Buscar el usuario por email
  const user = users.find((u) => u.email === email);
  
  if (!user) {
    return {
      ok: false,
      message: "Error: Email y/o contraseña incorrectos",
    };
  }

  // 3. Verificar la contraseña
  const hashPwd = await hashPassword(password);

  if (hashPwd !== user.password) {
    return {
      ok: false,
      message: "Error: Email y/o contraseña incorrectos",
    };
  }

  return {
    ok: true,
    user,
  };
}
