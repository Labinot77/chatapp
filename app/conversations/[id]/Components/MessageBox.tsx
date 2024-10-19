"use client"

import Avatar from "@/components/Avatar";
import { FullMessageType } from "@/types";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";

interface Props {
  isLast?: boolean;
  data: FullMessageType;
}

const MessageBox = ({ isLast, data }: Props) => {
  const {data: session } = useSession();
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false)

  const isOwn = session?.user?.email === data?.sender?.email
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ")

  const container = `flex gap-3 p-4 
  ${isOwn && "justify-end"}`

  const avatar = `${isOwn && 'order-2'}`

  const body = `flex flex-col gap-2 
  ${isOwn && 'items-end'}`
  
  const message = `text-sm w-fit h-fit overflow-hidden 
  ${isOwn ? "bg-sky-500 text-white" : "bg-gray-300"}
  ${data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"}`

   return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {data.sender.name}
          </div>
          <div className="text-sm text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
      <div className={message}>
        <ImageModal 
        src={data.image || ""}
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        />
        {data.image ? (
          <Image 
          onClick={() => setImageModalOpen(true)}
          src={data.image}
          alt="Image"
          height={288}
          width={288}
          className="object-cover cursor-pointer hover:scale-110 transition translate"/>
        ) : (
          <p>
            {data.body}
          </p>
        )}
      </div>
      {isLast && isOwn && seenList.length > 0 && (
        <div className="text-xs font-light text-gray-500">
          {`Seen by ${seenList}`}
        </div>
      )}
      </div>
    </div>
  )
}

export default MessageBox