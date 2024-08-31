import { ChatMessage } from "@/components/common/ChatMessage";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { usePostMessage } from "@/services/messages";
import { SendMessageResponse } from "@/types/AssistifyTypes";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const Message = () => {
  const [data, setData] = useState<SendMessageResponse | null>(null);
  const { postMessage, isAuthenticated } = usePostMessage();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          const result = await postMessage(
            "Briefly introduce yourself! And give me one idea on what you could help me with today."
          );
          setData(result);
        } catch (error) {
          console.error("Failed to fetch protected data:", error);
        }
      }
    };
    fetchData();
  }, []);

  if (!isAuthenticated) {
    return <div>Please log in to view this content.</div>;
  }

  if (!data) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <Typography mb={2} variant="subtitle2">
        Chat with Assistify
      </Typography>
      <ChatMessage
        userMessage="Briefly introduce yourself! And give me one idea on what you could help me with today."
        botResponse={data.response}
      />
    </>
  );
};
