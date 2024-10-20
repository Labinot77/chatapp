'use client'
import { useEffect, useRef, useState } from "react"
import MessageBox from "./MessageBox"
import axios from "axios"
import { find } from "lodash"
import { FullMessageType } from "@/types"
import { useConversation } from "@/hooks/useConversation"
import { pusherClient } from "@/lib/pusher"

	

interface BodyProps {
  initialMessages:FullMessageType[]
}

export default function Body ({initialMessages}:BodyProps) {

  const [messages,setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)
  
  const {conversationId} = useConversation()

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  },[conversationId])

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView({behavior: "smooth"})

    const messagesHandler = (message:FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`)
      setMessages((current) => {
        if (find(current,{id:message.id})) {
          return current
        }

        return [...current,message]
      })

      bottomRef?.current?.scrollIntoView()
    }

    const updateMessageHandler = (newMessage:FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage
        }
        return currentMessage
      }))
    };


    pusherClient.bind('messages:new', messagesHandler)
    pusherClient.bind('message:update',updateMessageHandler)
    pusherClient.bind("messages:update", updateMessageHandler)
    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new',messagesHandler)
      pusherClient.unbind('message:update',updateMessageHandler)
    }
  }, [conversationId])

return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message,i) => (
        <MessageBox isLast={i === messages.length -1}
        key={message.id} data={message}/>
      ))}
      <div className="pt-24" ref={bottomRef}/>
    </div>
)
}