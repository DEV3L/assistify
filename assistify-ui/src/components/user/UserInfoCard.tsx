import { UserResponse } from "@/types/AssistifyTypes";
import { Avatar, Box, Typography } from "@mui/material";

interface UserInfoCardProps {
  user: UserResponse;
}

export const UserInfoCard = ({ user }: UserInfoCardProps): JSX.Element => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {user.image ? (
        <Avatar
          src={user.image}
          alt={user.name ?? "User Avatar"}
          sx={{ width: 100, height: 100 }}
        />
      ) : (
        <Avatar sx={{ width: 100, height: 100 }}>
          <Typography variant="h1">{user.name?.charAt(0)}</Typography>
        </Avatar>
      )}
      <Typography variant="h4" component="h1" mt={2}>
        {user.name}
      </Typography>
      <Typography variant="body1" mt={1}>
        {user.email}
      </Typography>
    </Box>
  );
};
