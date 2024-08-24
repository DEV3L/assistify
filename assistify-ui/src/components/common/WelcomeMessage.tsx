import { Box, Typography } from "@mui/material";

export interface WelcomeMessageProps {
  name?: string | null;
}

/**
 * Displays a welcome message with the user's name if available.
 *
 * @param {WelcomeMessageProps} props - The props for the component.
 * @returns {JSX.Element | null} The welcome message component.
 */
export const WelcomeMessage = ({
  name,
}: WelcomeMessageProps): JSX.Element | null => {
  return (
    <Box
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography variant="h4" component="h2" mt={2} color="text.primary">
        Welcome to Assistify
      </Typography>
      <Typography variant="body2" mt={1} color="text.secondary">
        Your AI Assistant Interaction Hub
      </Typography>
      {name && (
        <Typography variant="h6" mt={2} color="text.primary">
          Welcome, {name}
        </Typography>
      )}
    </Box>
  );
};
