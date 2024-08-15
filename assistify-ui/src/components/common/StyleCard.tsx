import { Card, CardContent, SxProps } from "@mui/material";

interface StyledCardProps {
  children: React.ReactNode;
  sx?: SxProps;
}

const StyledCard: React.FC<StyledCardProps> = ({ children, sx }) => (
  <Card
    sx={{
      maxWidth: 400,
      p: 4,
      bgcolor: "secondary.main",
      borderRadius: 2,
      boxShadow: 3,
      ...sx,
    }}
  >
    <CardContent>{children}</CardContent>
  </Card>
);

export default StyledCard;
