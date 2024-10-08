import { StyledCard } from "@/components/common/StyledCard";
import { WelcomeMessage } from "@/components/common/WelcomeMessage";
import { Message } from "@/components/Message";
import { useMobile } from "@/hooks/useMobile";
import { useLastThread } from "@/services/lastThread";
import { useFetchAssistants } from "@/services/useFetchAssistants";
import { AssistantResponse, ThreadResponse } from "@/types/AssistifyTypes";
import { useEffect, useState } from "react";
import { LoadingSkeleton } from "../common/LoadingSkeleton";
import StartNewConversationButton from "./StartNewConversationButton";
export const DashBoard = () => {
  const mobile = useMobile();

  const [thread, setThread] = useState<ThreadResponse | null>(null);
  const [assistant, setAssistant] = useState<AssistantResponse | null>(null);

  const { getLastThread } = useLastThread();
  const { fetchAssistants } = useFetchAssistants();

  useEffect(() => {
    const fetchLastThread = async () => {
      try {
        const thread = await getLastThread();
        setThread(thread);
      } catch (error) {
        console.error("Error fetching last thread:", error);
      }
    };
    const fetchConciergeAssistant = async () => {
      try {
        const assistant = (await fetchAssistants()).assistants.find(
          (assistant) => assistant.name === "Assistify - Concierge"
        );
        setAssistant(assistant || null);
      } catch (error) {
        console.error("Error fetching last thread:", error);
      }
    };

    fetchLastThread();
    fetchConciergeAssistant();
  }, []);

  const handleNewThread = (newThread: ThreadResponse) => {
    console.log("newThread", newThread);
    setThread(newThread);
  };

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
        {assistant ? (
          <StartNewConversationButton
            onNewThread={handleNewThread}
            assistantId={assistant?._id || ""}
            assistantName={assistant?.name}
            model={assistant?.model}
          />
        ) : (
          <LoadingSkeleton />
        )}
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
