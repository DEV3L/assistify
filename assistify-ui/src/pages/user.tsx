import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { StyledCard } from "@/components/common/StyledCard";
import { withDashboardLayout } from "@/components/layouts/withDashboardLayout";
import { UserAssistants } from "@/components/user/UserAssistants";
import { UserInfoCard } from "@/components/user/UserInfoCard";
import { useFetchUser } from "@/services/users";
import { UserResponse } from "@/types/AssistifyTypes";
import { Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

/**
 * UserDetails component displays the authenticated user's information.
 *
 * @returns {JSX.Element} The UserDetails component.
 */
const UserDetails = (): JSX.Element => {
  const [user, setUser] = useState<UserResponse>();
  const [loading, setLoading] = useState(true);

  const { fetchUser, isAuthenticated } = useFetchUser();

  const fetchData = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const data = await fetchUser();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        User Details
      </Typography>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <StyledCard sx={{ maxWidth: 600, margin: "auto", p: 4 }}>
            {user && <UserInfoCard user={user} />}
          </StyledCard>
          {user && user.assistants && (
            <UserAssistants assistants={user.assistants} />
          )}
        </>
      )}
    </>
  );
};

export default withDashboardLayout(UserDetails);
