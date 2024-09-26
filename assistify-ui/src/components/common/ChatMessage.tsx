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
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  messages,
  isResponseLoading,
}) => {
  const { data: session } = useSession();

  return (
    <Box flex={1}>
      {messages.map((message, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          mb={2}
          flexDirection={message.sender === "user" ? "row" : "row-reverse"}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              mr: message.sender === "user" ? -0.75 : 0,
              ml: message.sender === "assistant" ? -0.75 : 0,
              alignSelf: message.sender === "user" ? "flex-start" : "flex-end",
            }}
            src={
              message.sender === "user"
                ? session?.user?.image ?? ""
                : "https://i.postimg.cc/gLZrnC6d/assistify-product-owner.png"
            }
            alt={message.sender === "user" ? "User Avatar" : "Assistant Avatar"}
          />
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="body1">{message.text}</Typography>
          </Paper>
        </Box>
      ))}
      {isResponseLoading && (
        <Box data-testid="chat-loading-skeleton">
          <LoadingSkeleton />
        </Box>
      )}
    </Box>
  );
};
