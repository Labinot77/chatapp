import ConversationList from "./components/ConversationList";
import { getConversations } from "@/lib/actions/conversations/Conversations";
import { getUsers } from "@/lib/actions/UsersActions";
import { getCurrentUser } from "@/lib/actions/UserActions";

export default async function ConversationLayout({
  children,
}: { children: React.ReactNode }) {
  const conversations = await getConversations();
  const currentUser = await getCurrentUser();
  const users = await getUsers()
  return (      
    // <Sidebar>
      <div className="h-full">
        <ConversationList 
        initialItems={conversations!}
        users={users!} 
        currentUser={currentUser!}
        />
        {children}
      </div>
    // </Sidebar>
  )
}