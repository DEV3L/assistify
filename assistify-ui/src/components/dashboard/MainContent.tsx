import DashBoard from "@/components/dashboard/Dashboard";
import { Box, Toolbar } from "@mui/material";

interface MainContentProps {
  drawerWidth: number;
}

const MainContent = ({ drawerWidth }: MainContentProps) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Toolbar />
      <DashBoard />
    </Box>
  );
};

export default MainContent;
