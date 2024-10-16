import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import MobileFooter from './MobileFooter'
import { getCurrentUser } from '@/lib/actions/UserActions'

const Sidebar = async ({children}: {children: React.ReactNode}) => {
  const currentUser = await getCurrentUser();

  return (

    <div className='h-full p-4'>
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
        <main className='lg:pl-20 h-full'>
          {children}
        </main>
    </div>
  )
}

export default Sidebar