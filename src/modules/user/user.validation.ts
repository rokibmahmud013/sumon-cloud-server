import { z } from 'zod';

export const UserValidationSchema = z.object({
  name: z.string(),
  avatar: z.string().optional(),
  email: z.string().email('Invalid email format'),
  gender: z
    .string()
    .optional()
    .refine(value => value === 'male' || value === 'female', {
      message: 'Gender must be either male or female',
    }),
  password: z.string(),
  isActive:z.boolean().optional(),
  role: z
    .string()
    .optional()
    .refine(value => value === 'user' || value === 'admin', {
      message: 'Role must be either "user" or "admin"',
    })
    .default('user'),
});
