import { WelcomeMessage } from "@/components/common/WelcomeMessage";
import Message from "@/components/Message";
import Protected from "@/components/Protected";
import { Box, Button, Card, CardContent } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const DashBoard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

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
        <WelcomeMessage name={session?.user?.name} />
        <Box>
          <Button
            onClick={handleSignOut}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Sign out
          </Button>
        </Box>
        <Box>
          <Protected />
          <Message />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DashBoard;
