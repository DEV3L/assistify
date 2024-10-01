import { UserAssistant, UserMessage, UserThread } from "@/types/AssistifyTypes";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { AssistantStatus } from "../assistants/AssistantStatus";

interface UserThreadsProps {
  threads: UserThread[];
  assistants: UserAssistant[];
}

export const UserThreads = ({
  threads,
  assistants,
}: UserThreadsProps): JSX.Element => {
  const getAssistantById = (name: string): UserAssistant | undefined => {
    return assistants.find((assistant) => assistant.name === name);
  };

  return (
    <Box mt={2}>
      <Typography variant="h4" gutterBottom>
        Interaction History
      </Typography>
      {threads.map((thread) => {
        const assistant = getAssistantById(thread.assistant_name);

        if (!assistant) {
          return null;
        }

        const name =
          assistant.name.length == 0 ? "Unnamed Assistant" : assistant.name;
        const title = `${name} (${thread.id})`;

        return (
          <Card key={thread.id} sx={{ mb: 2 }}>
            <CardHeader
              avatar={
                <Avatar
                  src={assistant.image}
                  alt={assistant.name}
                  style={{ cursor: "pointer" }}
                />
              }
              title={title}
              subheader={
                <Box display="flex" alignItems="center">
                  <AssistantStatus
                    status={assistant.status}
                    model={assistant.model}
                    provider={assistant.provider}
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    - Tokens Consumed: {thread.token_count}
                  </Typography>
                </Box>
              }
              sx={{ paddingBottom: 0 }}
            />
            <CardContent>
              {thread.messages.map((message: UserMessage, index: number) => (
                <Box key={`message-number-${index}`} mt={1}>
                  <Typography variant="body2">
                    <strong>{message.role}:</strong> {message.message}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};
