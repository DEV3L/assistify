import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { Drawer } from "@/components/side-menu/Drawer";
import { DrawerToggle } from "@/components/side-menu/DrawerToggle";
import { useMenu } from "@/contexts/menuContext";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { useMobile } from "@/hooks/useMobile";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";
import Box from "@mui/material/Box";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ComponentType, useState } from "react";

const minDrawerWidth = 60;
const maxDrawerWidth = 240;

export const withDashboardLayout = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  return (props: P) => {
    const { status } = useSession();
    const [drawerExpanded, setDrawerExpanded] = useState(false);
    const router = useRouter();
    const mobile = useMobile();
    const { showMenu, menuDisplayToggle } = useMenu();

    // Use the custom hook to handle authentication redirection
    useAuthRedirect();
    useTokenRefresh();

    if (status === "loading") {
      return <LoadingSkeleton />;
    }

    const handleDrawerExpandToggle = () => {
      setDrawerExpanded(!drawerExpanded);
    };

    const drawerWidth = drawerExpanded ? maxDrawerWidth : minDrawerWidth;

    return (
      <>
        <Box sx={{ display: "flex" }}>
          <Drawer
            drawerOpen={showMenu}
            handleDisplayToggle={menuDisplayToggle}
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
