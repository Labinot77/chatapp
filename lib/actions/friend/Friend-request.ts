"use server"

import { db } from "@/db"
import { findByEmail } from "../UserActions"


// need to pass also the inf about user that sends the request
export const sendFriendRequest = async (email: string) => {
  const user = await findByEmail(email)

  if (!user) {
    return null
  }

  // const friendRequest = await db.friendRequest.create({
  //   data: {
  //     userId: user.id,
  //     friendId: user.id,
  //   },
  // })

  // return friendRequest
}

export const acceptFriendRequest = async (friendRequestId: string) => {
  const friendRequest = await db.friendRequest.findUnique({
    where: {
      id: friendRequestId,
    },
  })

  if (!friendRequest) {
    return null
  }

  const user = await findByEmail(friendRequest.userId)
  const friend = await findByEmail(friendRequest.friendId)

  if (!user || !friend) {
    return null
  }

  // const friend = await db.friend.create({
  //   data: {
}