import { AssistantResponse } from "@/types/AssistifyTypes";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";

interface Message {
  text: string;
  sender: "user" | "assistant";
}

interface ChatMessageProps {
  messages: Message[];
  isResponseLoading: boolean;
  assistant: AssistantResponse;
  handleDetailsOpen: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  messages,
  isResponseLoading,
  assistant,
  handleDetailsOpen,
}) => {
  const { data: session } = useSession();

  return (
    <Box flex={1}>
      {messages.map((message, index) => {
        const isUser = message.sender === "user";
        return (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            mb={2}
            flexDirection={isUser ? "row" : "row-reverse"}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                cursor: isUser ? "default" : "pointer",
                mr: isUser ? -0.75 : 0,
                ml: !isUser ? -0.75 : 0,
                alignSelf: isUser ? "flex-start" : "flex-end",
              }}
              onClick={() => {
                !isUser && handleDetailsOpen();
              }}
              src={isUser ? session?.user?.image ?? "" : assistant.image}
              alt={isUser ? "User Avatar" : "Assistant Avatar"}
            />
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="body1">{message.text}</Typography>
            </Paper>
          </Box>
        );
      })}
      {isResponseLoading && (
        <Box data-testid="chat-loading-skeleton">
          <LoadingSkeleton />
        </Box>
      )}
    </Box>
  );
};
