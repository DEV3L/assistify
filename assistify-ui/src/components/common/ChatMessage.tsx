import { Avatar, Box, Paper, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

interface ChatMessageProps {
  userMessage: string;
  botResponse: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  userMessage,
  botResponse,
}) => {
  const { data: session } = useSession();

  return (
    <Box flex={1}>
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar
          sx={{ width: 40, height: 40, mr: -0.75, alignSelf: "flex-start" }}
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
          src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p0nj1y1c0frdi728486q.png"
          sx={{ width: 40, height: 40, ml: -0.75, alignSelf: "flex-end" }}
        />
      </Box>
    </Box>
  );
};
