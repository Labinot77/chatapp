import React from 'react'
import AccountManagement from './AccountManagement'
import { ModeToggle } from '../dropdown/Darkmode'
import { Input } from '../ui/input'
import { IoPersonSharp } from "react-icons/io5";
import { CustomButton } from '../buttons/buttons';
import { CgSearch } from 'react-icons/cg';



const Navbar = () => {
  return (
    <nav className='md:flex flex-col justify-between p-1 h-full hidden md:w-full md:max-w-[25vw] xl:max-w-[20vw] bg-accent-foreground rounded-lg '>
      <div>
        <div className='flex justify-between items-center'>
          <h1 className='text-4xl'>Chats</h1>
          <CustomButton pending={false} icon={<IoPersonSharp />} className='mr-5 p-2 text-xl rounded-xl' />
        </div>
        <div className='relative p-2 '>
          <CgSearch className='absolute top-1/2 left-3 transform -translate-y-1/2 text-xl text-gray-500' />
          <Input
            type='text'
            placeholder='Search'
            className='pl-10 mt-4 p-1 w-full text-xl rounded-xl '
          />
        </div>

      </div>

      {/* CHAT MESSAGES  */}
      <div className='h-full w-full overflow-y-auto'>


      </div>
      <AccountManagement />
    </nav>
  )
}

export default Navbar