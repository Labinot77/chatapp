"use client"

import { User } from "@prisma/client"
import Image from "next/image";

interface Props {
  users: User[];
}

const AvatarGroup = ({ users }: Props) => {
  const slicedUsers = users?.slice(0, 2)

  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    // 2: "bottom-0 right-0"
  }

  return (
    <div className="relative h-11 w-11">
      {slicedUsers?.map((user, index) => (
        <div 
        key={user.id}
        className={`absolute inline-block rounded-full border-2  overflow-hidden h-[32px] w-[32px]
         ${positionMap[index as keyof typeof positionMap]}`}>
          <Image 
          alt="Avatar"
          fill
          src={user.image}/>
        </div>
      ))}
    </div>
  )
}

export default AvatarGroup