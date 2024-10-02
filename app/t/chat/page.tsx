import { auth } from "@/auth";
import SendInput from "@/components/chat/SendInput";
import { getUserData } from "@/lib/actions/UserActions";
import Image from "next/image";
import React from "react";
import { BsThreeDots } from "react-icons/bs";

const page = async () => {
  const user = await auth()

  if (!user?.user) return <h1>Not authorized</h1>


  // const data = await getUserData(user?.user?.id as string)
  return (
    <main className="w-full h-full flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
        <div className="bg-cover relative w-14 h-14">
          <Image
            src={"https://picsum.photos/200/300"}
            alt="Picsum"
            fill
            className="rounded-full"
          />
        </div>
        <h1 className="text-2xl ">{user?.user?.name}</h1>
        </div>
        <BsThreeDots size={20} className="text-gray-500 mr-4" />
      </div>

    {/* CHAT  */}
      <div className="h-full w-full mt-2 overflow-y-auto">

      </div>

      <SendInput />
    </main>
  );
};

export default page;
