import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().toLowerCase().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, 'Please use at least 6 - 15 characters')
    .max(15, 'Please use at least 6 - 15 characters'),
});

export const updateDetailsSchema = z.object({
  email: z.string().toLowerCase().email({ message: 'Invalid email address' }),
  name: z.string().min(1, 'Name is required'),
});
