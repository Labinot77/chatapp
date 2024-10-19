"use client"

import { useConversation } from '@/hooks/useConversation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from './ConversationBox';
import { FullConversationType } from '@/types';
import GroupChatModal from './GroupChatModal';
import { User } from '@prisma/client';
import DesktopSidebar from '@/components/sidebar/DesktopSidebar';
import MobileFooter from '@/components/sidebar/MobileFooter';

interface Props {
  initialItems: FullConversationType[];
  users: User[]
  currentUser: User;
}

const ConversationList = ({ initialItems, users, currentUser}: Props) => {
  const [items, setItems] = useState<FullConversationType[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { conversationId, isOpen} = useConversation();

  return (
    <>
    <GroupChatModal 
    users={users}
    isOpen={isModalOpen} 
    onClose={() => setIsModalOpen(false)} />
    
    <aside className={`fixed lg:m-4 overflow-hidden inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:flex lg:flex-col lg:w-80  bg-[#303030] ${isOpen ? "hidden" : "block w-full left-0"}`}>
    <div className="px-5">
      <div className="flex justify-between mb-4 pt-4">
        <div className="text-2xl font-bold text-neutral-100">Messages</div>
        <div className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition" onClick={() => setIsModalOpen(true)}>
          <MdOutlineGroupAdd size={20} />
        </div>
      </div>
    </div>

      <div className='overflow-y-auto h-full'>
      {items.map((item) => (
        <ConversationBox
          key={item.id}
          data={item}
          selected={conversationId === item.id}
        />
      ))}
      </div>

    <DesktopSidebar currentUser={currentUser!} />
    <MobileFooter />
  </aside>
    </>
    )
}

export default ConversationList