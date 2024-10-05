"use server"

import { db } from "@/db";
import { getCurrentUser } from "../UserActions";

export const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id || !currentUser?.email) {
    return []
  }

  try {
    const conversations = await db.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc" // Order by last message
      },
      where: {
        userIds: {
          has: currentUser.id // Get the group only where the user id is included
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true, // Is the author of the message
            seen: true // Is an Array of users who have seen the message
          }
        },
      }
    })

    return conversations
  } catch (error) {
    return console.log("Conversations", error)
  }

}