"use client"

import { User } from "@prisma/client";
import Image from "next/image";

interface Props {
  user?: User;
}

const Avatar = ({ user }: Props) => {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:w-11 md:h-11">
        <Image 
        alt="user avatar"
        src={user?.image as string}
        fill/>
      </div>
      <span
      className="absolute block rounded-full bg-green-500 ring-2 ring-white right-0 top-0 h-2 w-2 md:h-3 md:w-3">

      </span>
    </div>
  )
}

export default Avatar