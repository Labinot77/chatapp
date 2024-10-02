"use server"

import { db } from "@/db"
import { z } from "zod"
import { SettingsFormValidation } from "../validations/UserValidation"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export const findByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email
    },
  })

  if (!user) {
    return null
  }

  return user
}

export const getUserData = async (userId: string) => {
  const data = await db.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  })

  return data
}

export const SaveUserData = async (values: z.infer<typeof SettingsFormValidation>) => {
  const session = await auth();

  const user = await db.user.update({
    where: {
      id: session?.user?.id
    },
    data: {
      name: values.name,
      email: values.email,
      image: values.image,
    }
  })

  revalidatePath('/t/settings') 
}
