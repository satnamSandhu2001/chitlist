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
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ['confirmPassword'],
      });
    }
  });

const updateDetailsSchema = z.object({
  email: z.string().toLowerCase().email({ message: 'Invalid email address' }),
  name: z.string().min(1, 'Name is required'),
});

module.exports = { loginSchema, registerSchema, updateDetailsSchema };
