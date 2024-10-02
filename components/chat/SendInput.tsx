import React from 'react'
import { TbSend } from "react-icons/tb";
import { FaRegImages } from "react-icons/fa";
import { CustomButton } from '../buttons/buttons';
import { Input } from '../ui/input';

const SendInput = () => {
  return (
    <main className='w-full flex gap-2 items-center pt-2'>
      <CustomButton icon={<FaRegImages size={18} />} pending={false} className='p-2'/>
      <Input type='text' placeholder='Type your message here...' className='w-full p-2 bg-slate-200 text-slate-900 rounded-3xl' />
      <CustomButton icon={<TbSend size={18} />} pending={false} className='p-2'/>
    </main>
  )
}

export default SendInput