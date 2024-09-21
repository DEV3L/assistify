import { Assistant } from "@/types/AssistifyTypes";
import InfoIcon from "@mui/icons-material/Info";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { AssistantStatusIcon } from "./AssistantStatusIcon";

interface AssistantCardProps {
  assistant: Assistant;
}

/**
 * Displays assistant information in a card format.
 *
 * @param assistant - The assistant data to display.
 * @returns The AssistantCard component.
 */
export const AssistantCard = ({
  assistant,
}: AssistantCardProps): JSX.Element => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleInfoClick = () => {
    setShowFullDescription((prev) => !prev);
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        avatar={<Avatar src={assistant.image} alt={assistant.name} />}
        action={
          <Tooltip title="Detailed Description">
            <IconButton onClick={handleInfoClick}>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        }
        title={assistant.name}
        subheader={`${assistant.model} (${assistant.provider})`}
      />
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          <AssistantStatusIcon status={assistant.status} />
          <Typography variant="body2" ml={1}>
            {assistant.status}
          </Typography>
        </Box>
        <Typography variant="body2">
          {showFullDescription ? (
            <ReactMarkdown>{assistant.summary_full}</ReactMarkdown>
          ) : (
            assistant.summary_short
          )}
        </Typography>
        <Box mt={2}>
          <Typography variant="caption">
            Threads: {assistant.thread_ids.length} | Tokens Consumed:{" "}
            {assistant.token_count}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
