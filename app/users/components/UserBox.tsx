"use client"

import Avatar from "@/components/Avatar";
import { useRoutes } from "@/hooks/useRoutes";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface Props {
  data: User;
}

const UserBox = ({ data }: Props) => {
  const router = useRouter();
  const [isloading, setIsloading] = useState(false);

  const handleClick = useCallback(() => {
    setIsloading(true);

    axios.post("/api/conversations", {
      userId: data.id,
    })
    .then((data) => {
      router.push(`/conversation/${data.data.id}`)
    })
    .finally(() => {
      setIsloading(false);
    });
  }, [data, router])

  console.log(data)
  return (
    <div
    className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer" 
    onClick={handleClick}>
      <Avatar user={data} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">{data.name}</p>
            </div>
        </div>

      </div>
    </div>
  )
}

export default UserBox