import { GoogleLogo } from "@/components/common/images/GoogleLogo";
import { StyledCard } from "@/components/common/StyledCard";
import { WelcomeMessage } from "@/components/common/WelcomeMessage";
import { Box, Button, Link } from "@mui/material";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="calc(100vh - var(--header-height))"
      bgcolor="background.default"
      p={3}
      paddingTop="var(--header-height)"
    >
      <StyledCard sx={{ minHeight: "200px" }}>
        <WelcomeMessage />
        <Button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<GoogleLogo />}
          sx={{ mt: 3 }}
        >
          Sign in with Google
        </Button>
        <Box mt={2} textAlign="center">
          <Link href="/about" color="primary">
            About Assistify
          </Link>
        </Box>
      </StyledCard>
    </Box>
  );
};

export default Login;
