"use client"

import useOtherUser from '@/hooks/useOtherUser';
import Avatar from '@/components/Avatar';
import { Conversation, Message, User } from '@prisma/client';
import Link from 'next/link';
import React, { FC, useMemo } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2';
import AvatarGroup from '../../components/AvatarGroup';


interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  }
}
const Header = ({ conversation }: HeaderProps) => {
  const otherUser = useOtherUser(conversation)

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} users`
    }

    return "Active"
  }, [conversation])
  return (
    <div className='w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'>
      <div className='flex gap-3 items-center'>
        <Link
        className='lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'
        href={"/conversations"}>
          <HiChevronLeft size={32}/>
        </Link>
        {conversation.isGroup ? (
          <AvatarGroup users={conversation.users}/>
        ) : (
          <Avatar user={otherUser} />
        )}
        <div className='flex flex-col'>
          <div>
            {conversation.name || otherUser.name}
          </div>
          <div className='text-sm text-gray-500 font-light'>
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal 
      size={32}
      onClick={() => {}}
      className='transition hover:text-sky-600 text-gray-500 cursor-pointer' />
    </div>
  )
}

export default Header