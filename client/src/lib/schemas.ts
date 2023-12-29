import { zfd } from "zod-form-data"
import { z } from "zod"

const userPasswordSchema = z.object({
  email: zfd.text(z.string().email()),
  password: zfd.text(
    z.string().min(8, "Password must be at least 8 characters long"),
  ),
})

const register = userPasswordSchema
  .extend({
    confirmPassword: zfd.text(
      z.string().min(8, "Password must be at least 8 characters long"),
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

const themeSchema = z.object({
  name: zfd.text(z.string().min(2, "Name must be at least 2 character long")),
  backgroundColor: z.string().min(4).max(9).regex(/^#/),
  secondaryBackgroundColor: z.string().min(4).max(9).regex(/^#/),
  textColor: z.string().min(4).max(9).regex(/^#/),
  iconColor: z.string().min(4).max(9).regex(/^#/),
  accentColor: z.string().min(4).max(9).regex(/^#/),
})

export const loginSchema = zfd.formData(userPasswordSchema)
export const registerSchema = zfd.formData(register)
export const themeFormSchema = zfd.formData(themeSchema)
