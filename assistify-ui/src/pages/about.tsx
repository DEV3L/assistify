import { AboutAssistify } from "@/components/about/AboutAssistify";
import { Box } from "@mui/material";

/**
 * About page to display the vision, goals, and values of Assistify.
 *
 * @returns {JSX.Element} The About page component.
 */
const About = (): JSX.Element => {
  return (
    <Box paddingTop="var(--header-height)">
      <AboutAssistify />
    </Box>
  );
};

export default About;
