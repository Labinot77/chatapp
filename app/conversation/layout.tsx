import Sidebar from "@/components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import { getConversations } from "@/lib/actions/conversations/Conversations";

export default async function ConversationLayout({
  children,
}: { children: React.ReactNode }) {
  const conversations = await getConversations();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations!} />
        {children}
      </div>
    </Sidebar>
  )
}