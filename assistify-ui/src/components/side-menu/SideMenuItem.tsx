import { SvgIconComponent } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";

interface SideMenuItemProps {
  href: string;
  icon: SvgIconComponent;
  text: string;
  drawerExpanded: boolean;
  active: boolean;
}

const SideMenuItem = ({
  href,
  icon: Icon,
  text,
  drawerExpanded,
  active,
}: SideMenuItemProps) => {
  return (
    <Link href={href} passHref>
      <ListItemButton
        sx={{
          backgroundColor: active ? "primary.main" : "inherit",
          color: active ? "primary.contrastText" : "inherit",
          "&:hover": {
            backgroundColor: active ? "primary.dark" : "action.hover",
          },
        }}
      >
        <ListItemIcon>
          <Icon color={active ? "inherit" : "primary"} />
        </ListItemIcon>
        {drawerExpanded && <ListItemText primary={text} />}
      </ListItemButton>
    </Link>
  );
};

export default SideMenuItem;
