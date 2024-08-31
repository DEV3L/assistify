import useMobile from "@/hooks/useMobile";
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

export const DrawerToggle = ({
  drawerExpanded,
  handleDrawerExpandToggle,
  minDrawerWidth,
  maxDrawerWidth,
}: DrawerToggleProps) => {
  const mobile = useMobile();

  if (mobile) {
    return null;
  }

  return (
    <IconButton
      onClick={handleDrawerExpandToggle}
      sx={{
        position: "fixed",
        top: "50%",
        left: drawerExpanded ? maxDrawerWidth - 20 : minDrawerWidth - 20,
        transform: "translateY(-50%)",
        backgroundColor: "secondary.main",
        color: "primary.main",
        transition: "left 0.3s",
        zIndex: 1300,
      }}
    >
      {drawerExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </IconButton>
  );
};
