import DashBoard from "@/components/dashboard/Dashboard";
import { Box, Toolbar } from "@mui/material";

export const MainContent = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
      }}
    >
      <Toolbar />
      <DashBoard />
    </Box>
  );
};
