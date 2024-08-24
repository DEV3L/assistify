import {
  Home as HomeIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
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
      <List>
        {["Home", "Settings"].map((text, index) => (
          <ListItemButton key={text}>
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
          </ListItemButton>
        ))}
      </List>
    </div>
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
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={drawerSx("temporary")}
      >
        {drawer}
      </MuiDrawer>
      <MuiDrawer variant="permanent" sx={drawerSx("permanent")} open>
        {drawer}
      </MuiDrawer>
    </>
  );
};

export default Drawer;
