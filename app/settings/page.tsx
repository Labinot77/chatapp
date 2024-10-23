"use client"

import Button from "@/components/buttons/button";
import { useConversation } from "@/hooks/useConversation";
import { logout } from "@/lib/actions/auth/logout";


const page = () => {
  const {isOpen} = useConversation();

  
  return (
    <div className={`lg:pl-[26rem] lg:p-4 h-full lg:block ${isOpen ? 'block' : 'hidden'}`}>
      <h1 className="text-3xl font-bold text-neutral-100">
        User settings
      </h1>

      <Button onClick={() => logout()}>
        Log out
      </Button>
    </div>
  )
}

export default page