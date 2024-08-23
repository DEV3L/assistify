import AboutAssistify from "@/components/AboutAssistify";
import AssistifyHead from "@/components/common/AssistifyHead";

/**
 * About page to display the vision, goals, and values of Assistify.
 *
 * @returns {JSX.Element} The About page component.
 */
const About = (): JSX.Element => {
  return (
    <>
      <AssistifyHead title="About Assistify" />
      <AboutAssistify />
    </>
  );
};

export default About;
