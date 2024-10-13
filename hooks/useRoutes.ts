'use client'

import { usePathname } from "next/navigation"
import { useConversation } from "./useConversation";
import { useMemo } from "react";
import { FaCommentDots, FaUsers, FaCog, FaDoorClosed } from 'react-icons/fa';
import { signOut } from "@/auth";
import { logout } from "@/lib/actions/auth/logout";

export const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(() => [
    {
      label: "Chat",
      href: '/conversations',
      icon: FaCommentDots, 
      active: pathname === '/conversations' || !!conversationId,
    },
    {
      label: "Users",
      href: '/users',
      icon: FaUsers,
      active: pathname === '/users',
    },
    {
      label: "Settings",
      href: '/settings',
      icon: FaCog,
      active: pathname === '/settings',
    },
    // {
    //   label: 'Logout',
    //   href: "#",
    //   icon: FaDoorClosed ,
    //   onClick:() => logout(),
    // }
  ], [pathname, conversationId]);

  return routes;
};