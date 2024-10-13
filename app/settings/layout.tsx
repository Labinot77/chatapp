import Sidebar from "@/components/sidebar/Sidebar";
import { getConversations } from "@/lib/actions/conversations/Conversations";
import { getUsers } from "@/lib/actions/UsersActions";
import { getCurrentUser } from "@/lib/actions/UserActions";
import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import MobileFooter from "@/components/sidebar/MobileFooter";

export default async function SettingsLayout({
  children,
}: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (      
      <div className="h-full">
      <aside className={`fixed lg:m-4 overflow-hidden inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:flex lg:justify-end lg:flex-col lg:w-80  `}>

    <DesktopSidebar currentUser={currentUser!} />
    <MobileFooter />
  </aside>
        {children}
      </div>
  )
}