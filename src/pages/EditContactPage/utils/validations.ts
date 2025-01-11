import z from 'zod';

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(3, 'First name must be at least 3 characters')
    .max(15, 'First name must not exceed 15 characters'),

  lastName: z
    .string()
    .min(3, 'Last name must be at least 3 characters')
    .max(15, 'Last name must not exceed 15 characters'),

  contactDescription: z
    .string()
    .min(10, 'Contact description must be at least 10 characters')
    .max(300, 'Contact description must not exceed 300 characters'),

  avatar: z.string().refine(
    (value) => {
      return value.includes('https://');
    },
    {
      message: 'Avatar URL must contain https://',
    },
  ),
});

export type TContact = z.infer<typeof contactSchema>;
