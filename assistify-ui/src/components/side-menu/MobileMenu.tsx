import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Toolbar } from "@mui/material";

interface MobileMenuProps {
  handleDrawerToggle: () => void;
}

export const MobileMenu = ({ handleDrawerToggle }: MobileMenuProps) => {
  return (
    <Box
      sx={{
        mt: "var(--header-height)",
        position: "fixed",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            display: { sm: "none" },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </Box>
  );
};
