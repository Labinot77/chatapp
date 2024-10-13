"use client"

import UserBox from "./UserBox";
import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import MobileFooter from "@/components/sidebar/MobileFooter";
import { User } from "@prisma/client";

interface Props {
  items: User[];
  currentUser: User;
}

const UserList = ({ items, currentUser }: Props) => {
  return (
    <aside className={`fixed w-full lg:m-4 inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:flex lg:flex-col lg:w-80 bg-[#303030]`}>
      <div className="px-5 overflow-y-auto h-full">
        <div className="flex flex-col">
          <div className="text-2xl text-neutral-100 fond-bold py-4">
            Users
          </div>
        </div>
        {items.map((item) => (
          <UserBox
            key={item.id}   // Make sure to provide a unique key for each item
            data={item}     // Pass the user data as a prop
          />
        ))}
      </div>
      <DesktopSidebar currentUser={currentUser} />
      <MobileFooter />
    </aside>
  )
}

export default UserList