import * as z from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registrationSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().optional(),
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .refine((password) => /\d/.test(password), {
      message: "Password must contain at least one digit",
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine(
      (password) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
      {
        message: "Password must contain at least one special character",
      },
    ),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  address: z.string().optional(),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const contactSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  subject: z.string().min(1, {
    message: "Subject is required",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters",
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const productQuantitySchema = z.object({
  quantity: z
    .number()
    .min(1, {
      message: "Quantity must be at least 1",
    })
    .default(1),
});

export type ProductQuantityFormValues = z.infer<typeof productQuantitySchema>;

export const cartItemQuantitySchema = z.object({
  quantity: z.number().min(1, {
    message: "Quantity must be at least 1",
  }),
});

export type CartItemQuantityFormValues = z.infer<typeof cartItemQuantitySchema>;

export const searchSchema = z.object({
  search: z.string(),
});

export type SearchFormValues = z.infer<typeof searchSchema>;
