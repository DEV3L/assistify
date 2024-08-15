import { AssistifyLogo } from "@/components/common/AssistifyLogo";
import Message from "@/components/Message";
import Protected from "@/components/Protected";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";

const UserProfile = () => {
  const { data: session } = useSession();

  return (
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
          <Typography variant="h4" component="h2" mt={2} color="text.primary">
            Welcome to Assistify
          </Typography>
          <Typography variant="body2" mt={1} color="text.secondary">
            Your AI Assistant Interaction Hub
          </Typography>
          <Typography variant="h6" mt={2} color="text.primary">
            Welcome, {session?.user?.name}
          </Typography>
          <Button
            onClick={() => signOut()}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Sign out
          </Button>
          <Protected />
          <Message />
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
