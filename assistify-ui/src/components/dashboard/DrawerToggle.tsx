import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface DrawerToggleProps {
  drawerExpanded: boolean;
  handleDrawerExpandToggle: () => void;
  minDrawerWidth: number;
  maxDrawerWidth: number;
}

const DrawerToggle = ({
  drawerExpanded,
  handleDrawerExpandToggle,
  minDrawerWidth,
  maxDrawerWidth,
}: DrawerToggleProps) => {
  return (
    <IconButton
      onClick={handleDrawerExpandToggle}
      sx={{
        position: "absolute",
        top: "50%",
        left: drawerExpanded ? maxDrawerWidth - 20 : minDrawerWidth - 20,
        transform: "translateY(-50%)",
        backgroundColor: "secondary.main",
        color: "primary.main",
        transition: "left 0.3s",
        zIndex: 1300, // Ensure the button is above the drawer
      }}
    >
      {drawerExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </IconButton>
  );
};

export default DrawerToggle;
