import Image from 'next/image'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'

interface Props {
  name: string
  image: string
}

const ChatLabel = ({ name, image }: Props) => {
  return (
    <div className="flex justify-between items-center">
    <div className="flex gap-2 items-center">
    <div className="bg-cover relative w-14 h-14">
      <Image
        src={image as string}
        alt="Picsum"
        fill
        className="rounded-full"
      />
    </div>
    <h1 className="text-2xl ">{name}</h1>
    </div>
    <BsThreeDots size={20} className="text-gray-500 mr-4" />
  </div>
  )
}

export default ChatLabel