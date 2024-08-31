import { Avatar, Box, Paper, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

interface ChatMessageProps {
  userMessage: string;
  botResponse: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  userMessage,
  botResponse,
}) => {
  const { data: session, status } = useSession();

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Box display="flex" alignItems="center" mb={2} alignSelf="flex-end">
        <Avatar
          sx={{ width: 40, height: 40, mr: -0.75 }}
          src={session?.user?.image ?? ""}
          alt="User Avatar"
        />
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="subtitle1">{userMessage}</Typography>
        </Paper>
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="body1">{botResponse}</Typography>
        </Paper>
        <Avatar
          src="https://raw.githubusercontent.com/DEV3L/insight-genie/main/data/files/insight_genie.png"
          sx={{ width: 40, height: 40, ml: -0.75 }}
        />
      </Box>
    </Box>
  );
};

export default ChatMessage;
