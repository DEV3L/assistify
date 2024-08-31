import { SideMenuItem } from "@/components/side-menu/SideMenuItem";
import { useMobile } from "@/hooks/useMobile";
import {
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { Box, List, Drawer as MuiDrawer } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

interface DrawerProps {
  drawerOpen: boolean;
  handleDisplayToggle: () => void;
  drawerWidth: number;
  drawerExpanded: boolean;
  currentPath: string;
}

export const Drawer = ({
  drawerOpen,
  handleDisplayToggle,
  drawerWidth,
  drawerExpanded,
  currentPath,
}: DrawerProps) => {
  const mobile = useMobile();
  const drawerVariant = mobile ? "temporary" : "permanent";
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const drawer = (
    <Box
      data-testid="drawer"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="calc(100vh - var(--header-height))"
    >
      <List sx={{ display: "flex", flexDirection: "column" }}>
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
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <SideMenuItem
          onClick={handleSignOut}
          icon={ExitToAppIcon}
          text="Sign Out"
          drawerExpanded={drawerExpanded}
          active={false}
        />
      </List>
    </Box>
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
        onClose={handleDisplayToggle}
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
