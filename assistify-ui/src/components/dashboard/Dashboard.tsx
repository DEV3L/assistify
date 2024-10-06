import { StyledCard } from "@/components/common/StyledCard";
import { WelcomeMessage } from "@/components/common/WelcomeMessage";
import { Message } from "@/components/Message";
import { useMobile } from "@/hooks/useMobile";
import { useLastThread } from "@/services/lastThread";
import { ThreadResponse } from "@/types/AssistifyTypes";
import { useEffect, useState } from "react";
import { LoadingSkeleton } from "../common/LoadingSkeleton";

export const DashBoard = () => {
  const mobile = useMobile();

  const [thread, setThread] = useState<ThreadResponse | null>(null);

  const { getLastThread } = useLastThread();

  useEffect(() => {
    const fetchLastThread = async () => {
      try {
        const thread = await getLastThread();
        setThread(thread);
      } catch (error) {
        console.error("Error fetching last thread:", error);
      }
    };

    fetchLastThread();
  }, []);

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
        {thread ? <Message thread={thread} /> : <LoadingSkeleton />}
      </StyledCard>
    </>
  );
};
