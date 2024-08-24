import BaseCard from "@/components/common/BaseCard";
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
const SectionCard = ({ title, children }: SectionCardProps): JSX.Element => {
  return (
    <BaseCard>
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      {children}
    </BaseCard>
  );
};

export default SectionCard;
