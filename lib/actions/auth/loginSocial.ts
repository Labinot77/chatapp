"use server"

import { signIn } from "@/auth"

export const loginSocial = async (provider: string) => {
  await signIn(provider, {
    redirectTo: "/conversations",
  })
}