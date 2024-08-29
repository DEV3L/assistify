import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {}, [status]);

  const handleLogoClick = () => {
    router.push("/");
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
