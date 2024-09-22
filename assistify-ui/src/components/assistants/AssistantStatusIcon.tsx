import { Lock, Public, Store, SvgIconComponent } from "@mui/icons-material";

interface AssistantStatusIconProps {
  status: string;
}

export const AssistantStatusIcon = ({
  status,
}: AssistantStatusIconProps): JSX.Element => {
  const statusIconMap: { [key: string]: SvgIconComponent } = {
    Public: Public,
    Market: Store,
    Private: Lock,
  };

  const IconComponent = statusIconMap[status] || Public;

  return <IconComponent sx={{ fontSize: ".9rem" }} />;
};
