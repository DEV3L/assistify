import { Card, CardContent } from "@mui/material";
import React from "react";

interface BaseCardProps {
  children: React.ReactNode;
}

/**
 * BaseCard component to display a card with content.
 *
 * @param {BaseCardProps} props - The props for the component.
 * @returns {JSX.Element} The BaseCard component.
 */
const BaseCard = ({ children }: BaseCardProps): JSX.Element => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 1,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default BaseCard;
