import { Card, CardContent, SxProps } from "@mui/material";
import React from "react";

interface StyledCardProps {
  children: React.ReactNode;
  sx?: SxProps;
}

/**
 * StyledCard to display a card with different styles based on the variant.
 *
 * @param {StyledCardProps} props - The props for the component.
 * @returns {JSX.Element} The StyledCard.
 */
const StyledCard = ({ children, sx }: StyledCardProps): JSX.Element => {
  const styles: SxProps = {
    p: 2,
    borderRadius: 2,
    boxShadow: 1,
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: 3,
    },
  };

  return (
    <Card sx={{ ...styles, ...sx }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default StyledCard;
