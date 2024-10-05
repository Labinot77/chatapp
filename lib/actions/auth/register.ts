"use server"

import { db } from "@/db";
import { findByEmail } from "@/lib/actions/UserActions";
import { saltAndHashPassword } from "@/lib/Miscellaneous";
import { UserRegisterValidation } from "@/lib/validations/UserValidation"
import { z } from "zod"


export const register = async (values: z.infer<typeof UserRegisterValidation>) => {
  const validatedFields = await UserRegisterValidation.safeParseAsync(values);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const { name, email, password } = validatedFields.data;
  const hasedPassword = saltAndHashPassword(password)

  const user = await findByEmail(email)

  if (user) {
    return { error: "User already exists!" };
  }

  try {
    await db.user.create({
      data: {
        name: name,
        email: email,
        password: hasedPassword,
      },
    });
    return {
      title: "Registration Success",
      description: "You are registered!",
      redirect: "/authentication/sign-in",
    }
  } catch (error) {
    return { error: "Registration Failed", description: "Something went wrong!" };
  }
}