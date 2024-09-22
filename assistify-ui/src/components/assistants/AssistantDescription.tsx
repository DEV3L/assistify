import { Typography } from "@mui/material";

interface AssistantDescriptionProps {
  summary: string;
}

/**
 * Displays the assistant's description.
 *
 * @param summary - The short summary of the assistant.
 * @returns The AssistantDescription component.
 */
export const AssistantDescription = ({
  summary,
}: AssistantDescriptionProps): JSX.Element => (
  <Typography variant="body2">{summary}</Typography>
);
