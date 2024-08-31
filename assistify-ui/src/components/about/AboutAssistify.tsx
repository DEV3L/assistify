import {
  Build,
  Cloud,
  Code,
  Feedback,
  IntegrationInstructions,
  People,
  Security,
  Speed,
  Storage,
  VerifiedUser,
} from "@mui/icons-material";
import { Box, Grid, Link, Typography } from "@mui/material";
import { FeatureItem } from "./FeatureItem";
import { SectionCard } from "./SectionCard";

/**
 * AboutAssistify component to display the vision, goals, and values of Assistify.
 *
 * @returns {JSX.Element} The AboutAssistify component.
 */
export const AboutAssistify = (): JSX.Element => {
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
        Welcome to Assistify! At Assistify, our mission is to revolutionize
        professional workflows through the power of AI. Our platform connects
        you with specialized OpenAI Assistants to enhance programming, product
        management, and content creation productivity. By integrating secure and
        user-friendly tools, we aim to democratize AI access, making it an
        indispensable tool for professionals across various fields. Explore
        seamless collaboration and innovative solutions with Assistify—where AI
        meets productivity.
      </Typography>

      <Grid container spacing={4} mt={4}>
        <Grid item xs={12} md={6}>
          <SectionCard title="Key Features">
            <FeatureItem
              icon={Speed}
              title="AI-Powered Assistants"
              text="Our AI assistants harness the power of OpenAI to provide expert support in real-time, transforming how you approach complex tasks."
            />
            <FeatureItem
              icon={Security}
              title="Integrated Google Authentication"
              text="Experience secure, hassle-free access with our integrated Google authentication."
            />
            <FeatureItem
              icon={Build}
              title="User-Friendly Interface"
              text="Navigate with ease through our streamlined and intuitive user interface designed for optimal user experience."
            />
            <FeatureItem
              icon={People}
              title="Admin Dashboard"
              text="Control and customize your experience with our robust admin dashboard."
            />
            <FeatureItem
              icon={IntegrationInstructions}
              title="Third-Party Integrations"
              text="Expand your capabilities with seamless integrations with tools you already use."
            />
            <FeatureItem
              icon={Feedback}
              title="Continuous Improvement"
              text="Your feedback drives our evolution, ensuring Assistify stays ahead with the features you need."
            />
          </SectionCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <SectionCard title="Technology Stack">
            <FeatureItem
              icon={Code}
              title="Frontend"
              text="Next.js for dynamic, server-side rendered user experiences."
            />
            <FeatureItem
              icon={Code}
              title="Backend"
              text="Python FastAPI for high-performance backend services."
            />
            <FeatureItem
              icon={Storage}
              title="Database Management"
              text="PostgreSQL for data storage and MongoDB for flexible, document-based storage."
            />
            <FeatureItem
              icon={VerifiedUser}
              title="Authentication"
              text="Google OAuth for secure user authentication."
            />
            <FeatureItem
              icon={Cloud}
              title="Cloud Computing and Hosting"
              text="Fly.io for global availability and low-latency performance."
            />
            <FeatureItem
              icon={IntegrationInstructions}
              title="Integration"
              text="Trello for enhanced project management capabilities."
            />
          </SectionCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <SectionCard title="User Benefits">
            <Typography variant="body2">
              Assistify allows you to focus on what truly matters by automating
              routine tasks and providing intelligent insights. Collaborate
              effortlessly with team members and keep your data secure with our
              top-notch security measures.
            </Typography>
          </SectionCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <SectionCard title="Company Background">
            <Typography variant="body2">
              Assistify is developed by Justin Beall of Dev3loper.ai, a team
              dedicated to making AI accessible and practical for everyday
              professional tasks. For more information, visit{" "}
              <Link
                href="https://www.dev3loper.ai"
                target="_blank"
                rel="noopener"
              >
                dev3loper.ai
              </Link>
              .
              <br />
              <br />
              Ready to transform your workflow? Sign up today for a free trial
              or contact our sales team to learn more via the{" "}
              <Link
                href="https://www.dev3loper.ai/contact"
                target="_blank"
                rel="noopener"
              >
                contact page
              </Link>
              .
            </Typography>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
};
