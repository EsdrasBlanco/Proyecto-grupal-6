
import { z } from "zod";

export const createUserSchema = z.object({
  nombres: z
    .string()
    .trim()
    .min(1, "Los nombres son obligatorios")
    .max(100, "Los nombres no pueden superar 100 caracteres"),

  apellidos: z
    .string()
    .trim()
    .min(1, "Los apellidos son obligatorios")
    .max(100, "Los apellidos no pueden superar 100 caracteres"),

  ecorreo: z
    .string()
    .trim()
    .email("El correo electrónico no es válido")
    .max(100, "El correo no puede superar 100 caracteres")
    .toLowerCase(),

  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .refine(
      (value) => Buffer.byteLength(value, "utf8") <= 72,
      "La contraseña supera el límite permitido"
    ),

  telefono: z
    .string()
    .trim()
    .max(20, "El teléfono no puede superar 20 caracteres")
    .optional(),
}).strict();

export type CreateUserInput = z.infer<typeof createUserSchema>;
