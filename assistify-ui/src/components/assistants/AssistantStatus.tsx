/**
 * Displays the assistant's status with an icon.
 *
 * @param status - The assistant's status.
 * @returns The AssistantStatus component.
 */
import { Box, Typography } from "@mui/material";
import { AssistantStatusIcon } from "./AssistantStatusIcon";

interface AssistantStatusProps {
  status: string;
  model: string;
  provider: string;
}

export const AssistantStatus = ({
  status,
  model,
  provider,
}: AssistantStatusProps): JSX.Element => (
  <Box display="flex" alignItems="center">
    <Typography variant="body2" mr={0.5}>
      {status}
    </Typography>
    <AssistantStatusIcon status={status} />
    <Box ml={1}>
      - {model} ({provider})
    </Box>
  </Box>
);
