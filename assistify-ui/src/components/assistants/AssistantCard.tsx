import { AssistantResponse, UserAssistant } from "@/types/AssistifyTypes";
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
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { AssistantDescription } from "./AssistantDescription";
import { AssistantDetailsDialog } from "./AssistantDetailsDialog";
import { AssistantImageModal } from "./AssistantImageModal";
import { AssistantStatus } from "./AssistantStatus";

/**
 * Displays assistant information in a card format.
 *
 * @param assistant - The assistant data to display.
 * @returns The AssistantCard component.
 */
interface AssistantCardProps {
  assistant: AssistantResponse | UserAssistant;
}

/**
 * Type guard to check if assistant is of type AssistantResponse
 *
 * @param assistant - The assistant data to check.
 * @returns True if assistant is of type AssistantResponse, otherwise false.
 */
const isAssistantResponse = (
  assistant: AssistantResponse | UserAssistant
): assistant is AssistantResponse => {
  return (assistant as AssistantResponse).thread_ids !== undefined;
};

export const AssistantCard = ({
  assistant,
}: AssistantCardProps): JSX.Element => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const theme = useTheme();

  const handleInfoClick = () => {
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  const handleAvatarClick = () => {
    setImageOpen(true);
  };

  const handleImageClose = () => {
    setImageOpen(false);
  };

  return (
    <>
      <Card sx={{ width: "100%" }}>
        <CardHeader
          avatar={
            <Avatar
              src={assistant.image}
              alt={assistant.name}
              onClick={handleAvatarClick}
              style={{ cursor: "pointer" }}
            />
          }
          action={
            <Tooltip title="Detailed Description">
              <IconButton
                onClick={handleInfoClick}
                sx={{ color: theme.palette.primary.main }}
              >
                <InfoIcon />
              </IconButton>
            </Tooltip>
          }
          title={
            assistant.name.length == 0 ? "Unnamed Assistant" : assistant.name
          }
          subheader={
            <Box display="flex" alignItems="center">
              <AssistantStatus
                status={assistant.status}
                model={assistant.model}
                provider={assistant.provider}
              />
            </Box>
          }
          sx={{ paddingBottom: 0 }}
        />
        <CardContent sx={{ paddingBottom: "16px !important" }}>
          <AssistantDescription summary={assistant.summary_short} />
          <Box mt={1}>
            <Typography variant="caption">
              {isAssistantResponse(assistant) &&
                `Threads: ${assistant.thread_ids.length} | `}
              Tokens Consumed: {assistant.token_count ?? 0}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <AssistantDetailsDialog
        data-testid="assistant-details-dialog"
        open={detailsOpen}
        onClose={handleDetailsClose}
        assistant={assistant}
      />

      <AssistantImageModal
        open={imageOpen}
        onClose={handleImageClose}
        imageUrl={assistant.image}
        assistantName={assistant.name}
      />
    </>
  );
};
