import { AssistantCard } from "@/components/assistants/AssistantCard";
import { UserAssistant } from "@/types/AssistifyTypes";
import { Box, Card, Grid, Typography } from "@mui/material";

interface UserAssistantsProps {
  assistants: UserAssistant[];
}

export const UserAssistants = ({
  assistants,
}: UserAssistantsProps): JSX.Element => {
  return (
    <Box mt={2}>
      <Typography variant="h5" gutterBottom>
        Subscribed Assistants
      </Typography>
      <Card>
        <Grid container spacing={2}>
          {assistants.map((assistant) => (
            <Grid item xs={12} key={assistant.id}>
              <AssistantCard assistant={assistant} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
};
