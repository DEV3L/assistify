import { AssistifyLogo } from "@/components/AssistifyLogo";
import Message from "@/components/Message";
import Protected from "@/components/Protected";
import {
  Home as HomeIcon,
  Menu as MenuIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const drawerWidth = 60;

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated" || !session) {
    router.push("/login");
    return null;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {["Home", "Settings"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? (
                <HomeIcon sx={{ color: "#007acc" }} />
              ) : (
                <SettingsIcon sx={{ color: "#007acc" }} />
              )}
            </ListItemIcon>
            <ListItemText
              primary={text}
              sx={{ display: { xs: "none", sm: "block" } }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#1e1e1e",
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
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#1e1e1e",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#1e1e1e",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Card
          sx={{
            maxWidth: 800,
            margin: "auto",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
            p: 4,
          }}
        >
          <CardContent>
            <Box textAlign="center">
              <AssistifyLogo />
              <Typography
                variant="h4"
                component="h2"
                mt={2}
                color="text.primary"
              >
                Welcome to Assistify
              </Typography>
              <Typography variant="body2" mt={1} color="text.secondary">
                Your AI Assistant Interaction Hub
              </Typography>
              <Typography variant="h6" mt={2} color="text.primary">
                Welcome, {session.user?.name}
              </Typography>
              <Button
                onClick={() => signOut()}
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  bgcolor: "var(--btn-primary)",
                  "&:hover": {
                    bgcolor: "var(--btn-primary-hover)",
                  },
                  "&:focus": {
                    outline: "none",
                    boxShadow: "0 0 0 2px var(--btn-focus-ring)",
                  },
                }}
              >
                Sign out
              </Button>
              <Protected />
              <Message />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
