
import { auth } from "@/auth"
import { FullConversationType } from "@/types"
import { User } from "@prisma/client"
import { useMemo } from "react"

export const useOtherUser = async (conversation: FullConversationType | { users: User[]}) => {
  const session = await auth()

  if (!session?.user?.email) {
    return null;
  }

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.user?.email;

    const otherUser = conversation.users.filter((user) => user.email !== currentUserEmail);

    return otherUser[0]
  }, [conversation.users, session?.user?.email])
  
  return otherUser
}