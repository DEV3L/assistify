import SideMenuItem from "@/components/side-menu/SideMenuItem";
import useMobile from "@/hooks/useMobile";
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { List, Drawer as MuiDrawer } from "@mui/material";

interface DrawerProps {
  drawerOpen: boolean;
  handleDrawerToggle: () => void;
  drawerWidth: number;
  drawerExpanded: boolean;
  currentPath: string;
}

const Drawer = ({
  drawerOpen,
  handleDrawerToggle,
  drawerWidth,
  drawerExpanded,
  currentPath,
}: DrawerProps) => {
  const mobile = useMobile();
  const drawerVariant = mobile ? "temporary" : "permanent";

  const drawer = (
    <div>
      <List>
        <SideMenuItem
          href="/dashboard"
          icon={DashboardIcon}
          text="Dashboard"
          drawerExpanded={drawerExpanded}
          active={currentPath === "/dashboard"}
        />
        <SideMenuItem
          href="/assistants"
          icon={PersonIcon}
          text="Assistants"
          drawerExpanded={drawerExpanded}
          active={currentPath === "/assistants"}
        />
      </List>
    </div>
  );

  const drawerStyles = {
    boxSizing: "border-box",
    width: drawerWidth,
    backgroundColor: "secondary.main",
    transition: "width 0.3s",
    marginTop: "var(--header-height)",
    borderRight: "var(--border-slim-muted)",
  };

  const drawerSx = (variant: "permanent" | "temporary") => {
    const isTemporary = variant === "temporary";
    return {
      display: {
        xs: isTemporary ? "block" : "none",
        sm: isTemporary ? "none" : "block",
      },
      "& .MuiDrawer-paper": drawerStyles,
    };
  };

  return (
    <>
      <MuiDrawer
        variant={drawerVariant}
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={
          mobile
            ? {
                keepMounted: true,
              }
            : undefined
        }
        sx={drawerSx(drawerVariant)}
      >
        {drawer}
      </MuiDrawer>
    </>
  );
};

export default Drawer;
