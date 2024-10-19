"use server"

import { signIn } from "@/auth"
import { findByEmail } from "@/lib/actions/UserActions"
import { UserLoginValidation } from "@/lib/validations/UserValidation"
import { z } from "zod"

export const login = async (values: z.infer<typeof UserLoginValidation>) => {
  const validatedFields = await UserLoginValidation.safeParseAsync(values);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const {email, password} = validatedFields.data;
  const user = await findByEmail(email);

  if (!user) {
    return { error: "Invalid credentials!" };
  }

  if (!user.email) {
    return { error: "Email not found!" };
  }


  try {
    const result = await signIn("credentials", {
      redirect: false, 
      email,
      password,
    })

    if (result.error) {
      return { error: "Invalid credentials!", description: "Login Failed" };
    }

    return {
      title: "Login Success",
      description: "You are logged in!",
      redirect: "/conversations",
    }
    
  } catch (error) {
    return { error: "Login Failed", description: "Something went wrong!" };
  }
}