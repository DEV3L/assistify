import {
  Home as HomeIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
  Toolbar,
} from "@mui/material";

interface DrawerProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  drawerWidth: number;
  drawerExpanded: boolean;
}

const Drawer = ({
  mobileOpen,
  handleDrawerToggle,
  drawerWidth,
  drawerExpanded,
}: DrawerProps) => {
  const drawer = (
    <div>
      <Toolbar />
      <List>
        {["Home", "Settings"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? (
                <HomeIcon color="primary" />
              ) : (
                <SettingsIcon color="primary" />
              )}
            </ListItemIcon>
            <ListItemText
              primary={text}
              sx={{ display: drawerExpanded ? "block" : "none" }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <MuiDrawer
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
            backgroundColor: "secondary.main",
            transition: "width 0.3s",
          },
        }}
      >
        {drawer}
      </MuiDrawer>
      <MuiDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "secondary.main",
            transition: "width 0.3s",
          },
        }}
        open
      >
        {drawer}
      </MuiDrawer>
    </>
  );
};

export default Drawer;
