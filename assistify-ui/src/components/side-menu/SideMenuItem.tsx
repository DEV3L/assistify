import { SvgIconComponent } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";

interface SideMenuItemProps {
  href: string;
  icon: SvgIconComponent;
  text: string;
  drawerExpanded: boolean;
}

const SideMenuItem = ({
  href,
  icon: Icon,
  text,
  drawerExpanded,
}: SideMenuItemProps) => {
  return (
    <Link href={href} passHref>
      <ListItemButton>
        <ListItemIcon>
          <Icon color="primary" />
        </ListItemIcon>
        {drawerExpanded && <ListItemText primary={text} />}
      </ListItemButton>
    </Link>
  );
};

export default SideMenuItem;
