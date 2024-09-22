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
  assistant: Assistant;
}

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
          title={assistant.name}
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
        <CardContent>
          <AssistantDescription summary={assistant.summary_short} />
          <Box mt={1}>
            <Typography variant="caption">
              Threads: {assistant.thread_ids.length} | Tokens Consumed:{" "}
              {assistant.token_count}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <AssistantDetailsDialog
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
