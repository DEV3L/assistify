import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import AppBar from "@/components/side-menu/AppBar";
import Drawer from "@/components/side-menu/Drawer";
import DrawerToggle from "@/components/side-menu/DrawerToggle";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ComponentType, useState } from "react";

const minDrawerWidth = 60;
const maxDrawerWidth = 240;

const withDashboardLayout = (WrappedComponent: ComponentType) => {
  return (props: any) => {
    const { status } = useSession();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [drawerExpanded, setDrawerExpanded] = useState(false);
    const router = useRouter();

    // Use the custom hook to handle authentication redirection
    useAuthRedirect();

    if (status === "loading") {
      return <LoadingSkeleton />;
    }

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const handleDrawerExpandToggle = () => {
      setDrawerExpanded(!drawerExpanded);
    };

    const drawerWidth = drawerExpanded ? maxDrawerWidth : minDrawerWidth;

    return (
      <>
        <AppBar handleDrawerToggle={handleDrawerToggle} />
        <Box sx={{ display: "flex" }}>
          <Drawer
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            drawerWidth={drawerWidth}
            drawerExpanded={drawerExpanded}
            currentPath={router.pathname}
          />
          <DrawerToggle
            drawerExpanded={drawerExpanded}
            handleDrawerExpandToggle={handleDrawerExpandToggle}
            minDrawerWidth={minDrawerWidth}
            maxDrawerWidth={maxDrawerWidth}
            isMobile={window.innerWidth <= 600}
            mobileOpen={mobileOpen}
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              marginLeft: `${drawerWidth}px`,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <WrappedComponent {...props} />
          </Box>
        </Box>
      </>
    );
  };
};

export default withDashboardLayout;
