"use client"

import { CgSpinner } from 'react-icons/cg'
import { Button } from '../ui/button'
import { logout } from '@/actions/logout'
import { IoLogOutOutline } from "react-icons/io5";

interface CustomButtonProps {
  label?: string
  pending: boolean
  icon?: React.ReactNode
  className?: string
  onClick?: () => void
}

export const CustomButton = ({ label, pending, icon, className, onClick }: CustomButtonProps) => {
  return (
    <Button type='submit' onClick={onClick} className={className}>
      {pending ? <CgSpinner className="mr-2" /> : label ? <h1>{label}</h1> : icon}
    </Button>
  )
}


export const LogoutButton = () => {
  return (
    <Button variant="destructive" onClick={() => logout()} className='p-2'>
     <IoLogOutOutline size={22}/>
    </Button>
  )
}
