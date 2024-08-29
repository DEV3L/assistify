import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Toolbar } from "@mui/material";

interface AppBarProps {
  handleDrawerToggle: () => void;
}

const AppBar = ({ handleDrawerToggle }: AppBarProps) => {
  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>
    </Toolbar>
  );
};

export default AppBar;
