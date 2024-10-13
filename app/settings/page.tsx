"use client"

import { useConversation } from "@/hooks/useConversation";
import EmptyState from "@/components/EmptyState";


const page = () => {
  const {isOpen} = useConversation();

  
  return (
    <div className={`lg:pl-[26rem] lg:p-4 h-full lg:block ${isOpen ? 'block' : 'hidden'}`}>
      <h1 className="text-3xl font-bold text-neutral-100">
        User settings
      </h1>

      
    </div>
  )
}

export default page