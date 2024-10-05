"use client"

import { useConversation } from '@/hooks/useConversation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from './ConversationBox';
import { FullConversationType } from '@/types';

interface Props {
  initialItems: FullConversationType[];
}

const ConversationList = ({ initialItems}: Props) => {
  const [items, setItems] = useState<FullConversationType[]>(initialItems);
  const router = useRouter();
  const { conversationId, isOpen} = useConversation();

  return (
    <aside className={`fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 
    ${isOpen ? 'hidden' : 'block w-full left-0'}`}>
      <div className='px-5'>
        <div className='flex justify-between mb-4 pt-4'>
          <div className='text-2xl fond-bold text-neutral-800 py-4'>
            Messages
          </div>
          <div className='rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:bg-opacity-75 transition'>
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.map((item, idx) => (
          <ConversationBox 
          key={item.id}
          data={item}
          selected={conversationId === item.id}
          />
        ))}
      </div>
    </aside>
    )
}

export default ConversationList