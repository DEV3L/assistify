import AssistifyHead from "@/components/common/AssistifyHead";
import { GoogleLogo } from "@/components/common/GoogleLogo";
import Header from "@/components/common/Header";
import StyledCard from "@/components/common/StyledCard";
import { Box, Button, Link, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchRandomNumber } from "../services/service";

const Login = () => {
  const [randomNumber, setRandomNumber] = useState<string | null>(null);

  useEffect(() => {
    const getRandomNumber = async () => {
      const number = await fetchRandomNumber();
      setRandomNumber(number);
    };
    getRandomNumber();
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <AssistifyHead />
      <StyledCard>
        <Header
          title="Welcome to Assistify"
          subtitle="Your AI Assistant Interaction Hub"
        />
        {randomNumber !== null && (
          <Typography variant="h6" mt={2} color="text.primary">
            Random Number: {randomNumber}
          </Typography>
        )}
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
