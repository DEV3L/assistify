import { Box, Typography } from "@mui/material";

/**
 * AboutAssistify component to display the vision, goals, and values of Assistify.
 *
 * @returns {JSX.Element} The AboutAssistify component.
 */
const AboutAssistify = (): JSX.Element => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="background.default"
      p={3}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Assistify!
      </Typography>
      <Typography variant="body1" paragraph>
        At Assistify, our mission is to revolutionize professional workflows
        through the power of AI. Our platform connects you with specialized
        OpenAI Assistants to enhance programming, product management, and
        content creation productivity. By integrating secure and user-friendly
        tools, we aim to democratize AI access, making it an indispensable tool
        for professionals across various fields. Explore seamless collaboration
        and innovative solutions with Assistify—where AI meets productivity.
      </Typography>
    </Box>
  );
};

export default AboutAssistify;
