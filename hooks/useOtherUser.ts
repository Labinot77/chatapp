"use client"

import { useMemo } from "react"
import { User } from "@prisma/client"
import { FullConversationType } from "@/types"
import { useSession } from "next-auth/react"

const useOtherUser = (
  conversation: FullConversationType | { users: User[] }
) => {
  const { data: session } = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.user?.email;

    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );

    return otherUser[0];
  }, [session?.user?.email, conversation.users]);

  return otherUser;
};

export default useOtherUser;
