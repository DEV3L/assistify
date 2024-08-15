import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  IconButton,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";

interface AppBarProps {
  handleDrawerToggle: () => void;
}

const AppBar = ({ handleDrawerToggle }: AppBarProps) => {
  const { data: session } = useSession();

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "secondary.main",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Assistify
        </Typography>
        {session && (
          <Box display="flex" alignItems="center">
            <Typography variant="body1" mr={2}>
              {session.user?.name}
            </Typography>
            <img
              src={session.user?.image ?? ""}
              alt="User Icon"
              style={{ borderRadius: "50%", width: 40, height: 40 }}
            />
          </Box>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
