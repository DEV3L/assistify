import AppBar from "@/components/dashboard/AppBar";
import Drawer from "@/components/dashboard/Drawer";
import DrawerToggle from "@/components/dashboard/DrawerToggle";
import MainContent from "@/components/dashboard/MainContent";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { Box, CssBaseline } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";

const minDrawerWidth = 60;
const maxDrawerWidth = 240;

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerExpanded, setDrawerExpanded] = useState(false);

  // Use the custom hook to handle authentication redirection
  useAuthRedirect("/dashboard");

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerExpandToggle = () => {
    setDrawerExpanded(!drawerExpanded);
  };

  const drawerWidth = drawerExpanded ? maxDrawerWidth : minDrawerWidth;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar handleDrawerToggle={handleDrawerToggle} />
      <Drawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
        drawerExpanded={drawerExpanded}
      />
      <DrawerToggle
        drawerExpanded={drawerExpanded}
        handleDrawerExpandToggle={handleDrawerExpandToggle}
        minDrawerWidth={minDrawerWidth}
        maxDrawerWidth={maxDrawerWidth}
      />
      <MainContent drawerWidth={drawerWidth} />
    </Box>
  );
};

export default Dashboard;
