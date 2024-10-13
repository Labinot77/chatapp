import { useParams } from "next/navigation";
import { useMemo } from "react";

export const useConversation = () => {
  const params = useParams();

  const conversationId = useMemo(() => {
    //! id is the name of the dynamic folder thus making it important to use it as a key for route params
    if (!params.id) return "";

    return params.id as string;
  }, [params?.id]);
 
  const isOpen = useMemo(() => !!conversationId, 
  [conversationId]);

  return useMemo(() => ({
    isOpen,
    conversationId,
  }), [isOpen, conversationId]);
  }

