import { auth } from '@/auth'
import { CustomButton } from '@/components/buttons/buttons'
import SettingsForm from '@/components/forms/account/SettingsForm'
import { findByEmail, getUserData } from '@/lib/actions/UserActions'
import { wait } from '@/lib/Miscellaneous'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const session = await auth()
  console.log(session?.user?.id)
  if (!session?.user) redirect('/authentication/sign-in?callback/Url=/t/settings')

    const data = await getUserData(session.user.id as string)
    
    if (!data) {
      redirect('/authentication/sign-in?callback/Url=/t/settings')
    }

    await wait(6000)
  return (
    <div>
      <SettingsForm 
      email={data.email as string}
      image={data.image}
      name={data.name}
      id={data.id}
      />
    </div>
  )
}

export default page