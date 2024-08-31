import { StyledCard } from "@/components/common/StyledCard";
import { WelcomeMessage } from "@/components/common/WelcomeMessage";
import { Message } from "@/components/Message";
import { useSession } from "next-auth/react";

export const DashBoard = () => {
  const { data: session } = useSession();

  return (
    <>
      <StyledCard
        sx={{
          maxWidth: 800,
          margin: "auto",
        }}
      >
        <WelcomeMessage name={session?.user?.name} />
      </StyledCard>
      <StyledCard
        sx={{
          maxWidth: 800,
          margin: "auto",
        }}
      >
        <Message />
      </StyledCard>
    </>
  );
};
