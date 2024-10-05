"use client"

import Avatar from "@/components/Avatar";
import { useOtherUser } from "@/hooks/useOtherUser"
import { FullConversationType } from "@/types"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";


interface Props {
  data: FullConversationType,
  selected?: boolean,
}

const ConversationBox = ({ data, selected }: Props) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();


  const handleClick = useCallback(() => {
    router.push(`/conversation/${data.id}`);
  }, [data.id, router])

  const lastMessage = useMemo(() => {
    const allMessages = data.messages || [];

    return allMessages[allMessages.length - 1];
  }, [data.messages])

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email])


  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage])

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Send an image'
    }

    if (lastMessage?.body) {
      return lastMessage.body
    }

    return "Started a conversation"
  }, [lastMessage])
  return (
    <div 
    onClick={handleClick} 
    className={`w-full relative flex items-center space-x-3 bg-white hover:bg-neutral-100 rounded-lg transition cursor-pointer ${selected ? 'bg-neutral-100' : 'bg-white'}`}>
      <Avatar user={otherUser} />
    </div>
  )
}

export default ConversationBox