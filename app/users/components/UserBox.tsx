"use client"

import Avatar from "@/components/Avatar";
import LoadingModal from "@/components/LoadingModa";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface Props {
  data: User;
}

const UserBox = ({ data }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios.post("/api/conversations", {
      userId: data.id,
    })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [data, router])

  return (
    <>
    {isLoading && <LoadingModal />}
      <div
        className="mt-1 w-full relative flex items-center space-x-3 p-3 hover:bg-neutral-600/40 rounded-lg transition cursor-pointer"
        onClick={handleClick}>
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium">{data.name}</p>
            </div>
          </div>

        </div>
      </div>
    </>

  )
}

export default UserBox