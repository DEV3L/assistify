import { useMenu } from "@/contexts/menuContext";
import { SvgIconComponent } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";

interface SideMenuItemProps {
  href?: string;
  onClick?: () => void;
  icon: SvgIconComponent;
  text: string;
  drawerExpanded: boolean;
  active: boolean;
}

export const SideMenuItem = ({
  href,
  onClick,
  icon: Icon,
  text,
  drawerExpanded,
  active,
}: SideMenuItemProps) => {
  const { closeMenu } = useMenu();

  return (
    <Link
      href={href ?? "#"}
      passHref
      onClick={() => {
        closeMenu();
        onClick?.();
      }}
    >
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
