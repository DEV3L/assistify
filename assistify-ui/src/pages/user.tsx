import { StyledCard } from "@/components/common/StyledCard";
import { withDashboardLayout } from "@/components/layouts/withDashboardLayout";
import { Avatar, Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

/**
 * UserDetails component displays the authenticated user's information.
 *
 * @returns {JSX.Element} The UserDetails component.
 */
const UserDetails = (): JSX.Element => {
  const { data: session, status } = useSession();

  if (status !== "authenticated" || !session?.user) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const { name, email, image } = session.user;

  return (
    <StyledCard sx={{ maxWidth: 600, margin: "auto", p: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        {image ? (
          <Avatar
            src={image}
            alt={name ?? "User Avatar"}
            sx={{ width: 100, height: 100 }}
          />
        ) : (
          <Avatar sx={{ width: 100, height: 100 }}>
            <Typography variant="h1">{name?.charAt(0)}</Typography>
          </Avatar>
        )}
        <Typography variant="h4" component="h1" mt={2}>
          {name}
        </Typography>
        <Typography variant="body1" mt={1}>
          {email}
        </Typography>
      </Box>
    </StyledCard>
  );
};

export default withDashboardLayout(UserDetails);
