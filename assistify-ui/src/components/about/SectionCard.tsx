import { StyledCard } from "@/components/common/StyledCard";
import { Typography } from "@mui/material";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

/**
 * SectionCard component to display a section with a title and content.
 *
 * @param {SectionCardProps} props - The props for the component.
 * @returns {JSX.Element} The SectionCard component.
 */
export const SectionCard = ({
  title,
  children,
}: SectionCardProps): JSX.Element => {
  return (
    <StyledCard>
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      {children}
    </StyledCard>
  );
};
