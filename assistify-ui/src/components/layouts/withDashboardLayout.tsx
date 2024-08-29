import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import Drawer from "@/components/side-menu/Drawer";
import DrawerToggle from "@/components/side-menu/DrawerToggle";
import { MobileMenu } from "@/components/side-menu/MobileMenu";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import useMobile from "@/hooks/useMobile";
import Box from "@mui/material/Box";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ComponentType, useState } from "react";

const minDrawerWidth = 60;
const maxDrawerWidth = 240;

const withDashboardLayout = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  return (props: P) => {
    const { status } = useSession();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerExpanded, setDrawerExpanded] = useState(false);
    const router = useRouter();
    const mobile = useMobile();

    // Use the custom hook to handle authentication redirection
    useAuthRedirect();

    if (status === "loading") {
      return <LoadingSkeleton />;
    }

    const handleDrawerToggle = () => {
      setDrawerOpen(!drawerOpen);
    };

    const handleDrawerExpandToggle = () => {
      setDrawerExpanded(!drawerExpanded);
    };

    const drawerWidth = drawerExpanded ? maxDrawerWidth : minDrawerWidth;

    return (
      <>
        <MobileMenu handleDrawerToggle={handleDrawerToggle} />
        <Box sx={{ display: "flex" }}>
          <Drawer
            drawerOpen={drawerOpen}
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
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              mt: "var(--header-height)",
              ml: mobile ? undefined : `${drawerWidth}px`,
              p: 3,
              pt: mobile ? 5 : 3,
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
