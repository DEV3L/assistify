import { ChatMessage } from "@/components/common/ChatMessage";
import { usePostMessage } from "@/services/messages";
import {
  AssistantResponse,
  SendMessageResponse,
  ThreadResponse,
} from "@/types/AssistifyTypes";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export interface Message {
  text: string;
  sender: "user" | "assistant";
  thread: ThreadResponse;
}

const welcomeMessage =
  "Briefly introduce yourself! And give me one idea on what you could help me with today.";

export const Message = ({
  thread,
  assistant,
}: {
  thread: ThreadResponse;
  assistant: AssistantResponse;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<string>("");
  const [isResponseLoading, setIsResponseLoading] = useState<boolean>(false);
  const { postMessage } = usePostMessage();

  useEffect(() => {
    if (thread.is_welcome_thread) {
      sendMessage(welcomeMessage);
    } else {
      setMessages(
        thread.messages.map((message) => ({
          text: message.message,
          sender: message.role,
          thread,
        }))
      );
    }
  }, [thread]);

  const handleSendMessage = async () => {
    sendMessage(userMessage);
  };

  const sendMessage = async (message: string) => {
    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: "user", thread },
      ]);
      setIsResponseLoading(true);
      const result: SendMessageResponse = await postMessage(message, thread.id);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: result.response, sender: "assistant", thread },
      ]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsResponseLoading(false);
      setUserMessage("");
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Typography mb={2} variant="subtitle2">
        Chat with {assistant.name}
      </Typography>
      <Box flex={1} overflow="auto" mb={2}>
        <ChatMessage
          messages={messages}
          isResponseLoading={isResponseLoading}
          assistant={assistant}
        />
      </Box>
      <Box display="flex" flexDirection="row" width="100%" mt="auto">
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <Button
          sx={{ ml: 2 }}
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};
