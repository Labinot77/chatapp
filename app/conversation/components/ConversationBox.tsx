"use client"

import Avatar from "@/components/Avatar";
import { useOtherUser } from "@/hooks/useOtherUser"
import { FullConversationType } from "@/types"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from 'date-fns';
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
    };
    
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
    className={`w-full relative flex items-center space-x-3 p-3 bg-white hover:bg-neutral-100 rounded-lg transition cursor-pointer ${selected ? 'bg-neutral-100' : 'bg-white'}`}>
      <Avatar user={otherUser!} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
            {/* // Render the group chat name or the user name */}
              <p className="text-sm font-medium text-gray-900">{data.name || otherUser?.name}</p> 
              {lastMessage?.createdAt && (
                <p className="text-sm text-gray-400 font-light">
                  {format(new Date(lastMessage.createdAt), 'p')}
                </p>
              )}
            </div>
            <p className={`truncate text-sm ${hasSeen ? "text-gray-500" : 'text-black font-medium'}  `}>
              {lastMessageText}
            </p>
        </div>
      </div>
    </div>
  )
}

export default ConversationBox