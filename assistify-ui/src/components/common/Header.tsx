import { AssistifyLogo } from "@/components/common/AssistifyLogo";
import { Box, Typography } from "@mui/material";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => (
  <Box textAlign="center">
    <AssistifyLogo />
    <Typography variant="h4" component="h2" mt={2} color="text.primary">
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="body2" mt={1} color="text.secondary">
        {subtitle}
      </Typography>
    )}
  </Box>
);

export default Header;
