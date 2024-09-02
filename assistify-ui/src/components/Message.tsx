import { ChatMessage } from "@/components/common/ChatMessage";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { usePostMessage } from "@/services/messages";
import { SendMessageResponse } from "@/types/AssistifyTypes";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const Message = () => {
  const [data, setData] = useState<SendMessageResponse | null>(null);
  const [userMessage, setUserMessage] = useState<string>("");
  const { postMessage, isAuthenticated } = usePostMessage();

  const handleSendMessage = async () => {
    if (userMessage.trim() === "") return;
    try {
      const result = await postMessage(userMessage);
      setData(result);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (!isAuthenticated) {
    return <div>Please log in to view this content.</div>;
  }

  return (
    <>
      <Typography mb={2} variant="subtitle2">
        Chat with Assistify
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
      {data ? (
        <ChatMessage userMessage={userMessage} botResponse={data.response} />
      ) : (
        <LoadingSkeleton />
      )}
    </>
  );
};
