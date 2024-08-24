import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const Header = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(status);
  }, [status]);

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
      <Typography variant="h6" noWrap component="div">
        Assistify
      </Typography>
      {status === "authenticated" ? (
        <>
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
        </>
      ) : null}
    </Box>
  );
};

export default React.memo(Header);
