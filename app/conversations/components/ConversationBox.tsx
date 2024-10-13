"use client"

import Avatar from "@/components/Avatar";
import { FullConversationType } from "@/types"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from 'date-fns';
import { useCallback, useMemo } from "react";
import useOtherUser from "@/hooks/useOtherUser";
import AvatarGroup from "./AvatarGroup";


interface Props {
  data: FullConversationType,
  selected?: boolean,
}

const ConversationBox = ({ data, selected }: Props) => {
  const otherUser = useOtherUser(data)
  const session = useSession()
  const router = useRouter()

  const handleClick = useCallback(() => {
      router.push(`/conversations/${data.id}`)
  },[data.id, router])

  const lastMessage = useMemo(() => {
      const messages = data.messages || []

      return messages[messages.length -1]
  },[data.messages])


  const userEmail = useMemo(() => {
      return session.data?.user?.email 
  },[session.data?.user?.email])

  const hasSeen = useMemo(() => {
      if (!lastMessage) {
          return false
      }

  const seenArray = lastMessage.seen || []

  if (!userEmail) {
      return false
  }

  return seenArray.filter(user => user.email === userEmail).length !== 0
  
  },[userEmail,lastMessage])

  const lastMessageText = useMemo(() => {
      if (lastMessage?.image) {
          return 'Sent an iamge'
      }
      if (lastMessage?.body) {
          return lastMessage.body
      } 

      return 'Start a conversation'
  },[lastMessage])


  return (
    <div 
    onClick={handleClick} 
    className={`mt-1 w-full relative flex items-center space-x-3 hover:bg-[#404040] rounded-lg transition cursor-pointer p-3 text-neutral-100 ${selected ? 'bg-[#404040]' : 'bg-[#303030]'}`}>
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
            {/* //! Group name or other use name */}
              <p className="text-sm font-medium">{data.name || otherUser?.name}</p> 
              {lastMessage?.createdAt && (
                <p className="text-sm text-gray-400 font-light">
                  {format(new Date(lastMessage.createdAt), 'p')}
                </p>
              )}
            </div>
            <p className={`truncate text-sm ${hasSeen ? "text-gray-500" : 'text-neutral-500 font-medium'}  `}>
              {lastMessageText}
            </p>
        </div>
      </div>
    </div>
  )
}

export default ConversationBox