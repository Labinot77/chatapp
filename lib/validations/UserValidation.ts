import { z } from "zod";
import { noSpaces } from "../Miscellaneous";

export const UserLoginValidation = z.object({
  email: z.string().email(),
  password: z.string().refine(noSpaces, {
    message: "Password cannot contain spaces",
  }),
})

export const UserRegisterValidation = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6).refine(noSpaces, {
    message: "Password cannot contain spaces",
  }),
  // confirmPassword: z.string().min(6),
})

export const SettingsFormValidation = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  image: z.string().optional(),
})