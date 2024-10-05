
import { auth } from '@/auth'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { logout } from '@/lib/actions/auth/logout'
import { LogoutButton } from '../buttons/buttons'
import { UserSettings } from '../dropdown/UserSettings'
import { Separator } from '../ui/separator'

const AccountManagement = async () => {
  // later this is going to pass the props
  const session = await auth()

  if (!session?.user) {
    return <h1>asdaadad</h1>
  }

  return (
    <>
      <Separator />
    <main className='flex justify-between items-center w-full p-2'>

     <UserSettings image={session?.user.image as string} />      

      <LogoutButton />
    </main>
    </>
  )
}

export default AccountManagement