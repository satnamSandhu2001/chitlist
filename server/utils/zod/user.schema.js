const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().toLowerCase().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, 'Please use at least 6 - 15 characters')
    .max(15, 'Please use at least 6 - 15 characters'),
});

const registerSchema = loginSchema
  .extend({
    name: z.string().min(1, 'Name is required'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

module.exports = { loginSchema, registerSchema };
