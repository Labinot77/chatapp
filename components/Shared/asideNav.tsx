import React from 'react'
import AccountManagement from './AccountManagement'
import { ModeToggle } from '../dropdown/Darkmode'
import { Input } from '../ui/input'
import { IoPersonSharp } from "react-icons/io5";
import { CustomButton } from '../buttons/buttons';
import { CgSearch } from 'react-icons/cg';
import { auth } from '@/auth';
import { getUserData } from '@/lib/actions/UserActions';
import Link from 'next/link';
import Image from 'next/image';
import FriendCard from './FriendCard';
import { SendFriendRequest } from './SendFriendRequest';



const asideNav = async () => {
  const session = await auth();

  if (!session?.user) {
    return <h1>no session</h1>
  }

  const data = await getUserData(session.user.id as string)


  return (
    <nav className='md:flex flex-col justify-between p-1 h-full hidden md:w-full md:max-w-[25vw] xl:max-w-[20vw] bg-background-secondary rounded-lg '>
      <div>
        <div className='flex justify-between items-center'>
          <h1 className='text-4xl'>Chats</h1>
          <SendFriendRequest />
        </div>
        <div className='relative p-2 '>
          <CgSearch className='absolute top-1/2 left-3 transform -translate-y-1/2 text-xl' />
          <Input
            type='text'
            placeholder='Search'
            className='pl-10 mt-4 p-1 w-full text-xl rounded-xl '
          />
        </div>
      </div>

      {/* CHAT MESSAGES  */}
      <div className='flex flex-col gap-3 h-full w-full overflow-y-auto'>
        {/* {data?.friends.map((friend, idx) => (
        ))} */}

      </div>
      <AccountManagement />
    </nav>
  )
}

export default asideNav