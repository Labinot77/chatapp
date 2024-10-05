import { usePathname } from "next/navigation"
import { useConversation } from "./useConversation";
import { useMemo } from "react";
import { FaCommentDots, FaUsers, FaCog } from 'react-icons/fa';





export const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(() => [
    {
      label: "Chat",
      href: '/conversation',
      icon: FaCommentDots, 
      active: pathname === '/conversation' || !!conversationId,
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
      icon: FaCog ,
      active: pathname === '/settings',
    },
  ], [pathname, conversationId]);

  return routes;
};