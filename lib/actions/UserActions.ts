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
// ! This is the same as above but more error handling and without passing the email because we get already get the user from the session called in the function
export const getCurrentUser = async () => {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return null
    }

    const currentUser = await db.user.findUnique({
      where: {
        id: session?.user?.id as string
      }
    })

    if (!currentUser) {
      return null
    }

    return currentUser
  } catch (error) {
    console.log("Error from UserActions", error)
  }
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

  if (!user) {
    return { error:"User not found", title: "Error", description: "There was a problem saving your user data." }
  }

  revalidatePath('/t/settings') 
}

// ---


