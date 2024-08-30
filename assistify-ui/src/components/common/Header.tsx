import { useMenu } from "@/contexts/menuContext";
import useMobile from "@/hooks/useMobile";
import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const mobile = useMobile();
  const isAuthenticated = status === "authenticated";

  const { menuDisplayToggle: toggleMenu } = useMenu();

  const handleLogoClick = () => {
    if (mobile && isAuthenticated) {
      toggleMenu();
    } else {
      router.push("/");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 16px",
        backgroundColor: "secondary.main",
        height: "var(--header-height)",
        borderBottom: "var(--border-slim-muted)",
        position: "fixed",
        width: "100%",
        zIndex: 10,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        onClick={handleLogoClick}
        sx={{ cursor: "pointer" }}
      >
        <Image
          src="/assistify-logo.png"
          alt="Assistify Logo"
          width={40}
          height={40}
          priority
        />
        <Typography variant="h6" noWrap component="div" ml={1}>
          Assistify
        </Typography>
      </Box>
      {status === "authenticated" ? (
        <Box display="flex" alignItems="center">
          <Typography variant="body1" mr={2}>
            {session.user?.name}
          </Typography>
          <img
            src={session.user?.image ?? ""}
            alt="User Icon"
            style={{ borderRadius: "50%", width: 40, height: 40 }}
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default React.memo(Header);
