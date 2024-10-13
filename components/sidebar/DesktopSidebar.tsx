"use client"

import { useRoutes } from "@/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";

interface Props {
  currentUser?: User;
}

const DesktopSidebar = ({ currentUser }: Props) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hidden lg:inset-y-0 lg:z-40 lg:p-2 lg:flex lg:flex-col justify-between bg-[#303030]">
        <ul 
        role="list"
        className="flex w-full justify-between items-center">
          {routes.map((route) => (
            <DesktopItem
            key={route.label}
            href={route.href}
            label={route.label}
            icon={route.icon}
            active={route.active}
            // onClick={route.onClick}
            />
          ))}
        </ul>
      {/* <nav className="mt-4 flex flex-col justify-between items-center">
          <div onClick={() => setIsOpen(!true)} 
          className="cursor-pointer hover:opacity-75 transition">
            <Avatar user={currentUser}/>
          </div>
      </nav> */}
    </div>
  )
}

export default DesktopSidebar