"use server"

import { auth } from "@/auth";
import { db } from "@/db"


// Get the other users and exclude the current user
export const getUsers = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    return []
  }

  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc"
      },
      where: {
        NOT: {
          email: session?.user?.email as string
        }
      }
    })

    return users
  } catch (error) {
    console.log("UserActions", error)
  }

}