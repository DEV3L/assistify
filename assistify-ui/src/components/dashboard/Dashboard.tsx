import { StyledCard } from "@/components/common/StyledCard";
import { WelcomeMessage } from "@/components/common/WelcomeMessage";
import { Message } from "@/components/Message";
import { useMobile } from "@/hooks/useMobile";
import { useSession } from "next-auth/react";

export const DashBoard = () => {
  const mobile = useMobile();
  const { data: session } = useSession();

  return (
    <>
      <StyledCard
        sx={{
          maxWidth: mobile ? "100%" : 800,
          margin: "auto",
          p: mobile ? 0 : 2,
          mb: 1,
        }}
      >
        <WelcomeMessage />
      </StyledCard>
      <StyledCard
        sx={{
          maxWidth: mobile ? "100%" : 800,
          margin: "auto",
          p: mobile ? 0 : 2,
        }}
      >
        <Message />
      </StyledCard>
    </>
  );
};
