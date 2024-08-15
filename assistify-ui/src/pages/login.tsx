import AssistifyHead from "@/components/AssistifyHead";
import { AssistifyLogo } from "@/components/AssistifyLogo";
import { GoogleLogo } from "@/components/GoogleLogo";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
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
      <Card
        sx={{
          maxWidth: 400,
          p: 4,
          bgcolor: "secondary.main",
          borderRadius: 2,
          boxShadow: 3,
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
            {randomNumber !== null && (
              <Typography variant="h6" mt={2} color="text.primary">
                Random Number: {randomNumber}
              </Typography>
            )}
          </Box>
          <Button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<GoogleLogo />}
            sx={{
              mt: 3,
              bgcolor: "var(--btn-primary)",
              "&:hover": {
                bgcolor: "var(--btn-primary-hover)",
              },
              "&:focus": {
                outline: "none",
                boxShadow: "0 0 0 2px var(--btn-focus-ring)",
              },
            }}
          >
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
