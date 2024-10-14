import { StyledCard } from "@/components/common/StyledCard";
import { WelcomeMessage } from "@/components/common/WelcomeMessage";
import { useMobile } from "@/hooks/useMobile";
import { useLastThread } from "@/services/lastThread";
import { useFetchAssistants } from "@/services/useFetchAssistants";
import { AssistantResponse, ThreadResponse } from "@/types/AssistifyTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoadingSkeleton } from "../common/LoadingSkeleton";
import { Message } from "./Message";
import StartNewConversationButton from "./StartNewConversationButton";

export const DashBoard = () => {
  const router = useRouter();
  const { assistantId } = router.query;

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
        const assistants = await fetchAssistants();
        const selectedAssistant = assistantId
          ? assistants.assistants.find(
              (assistant) => assistant._id === assistantId
            )
          : assistants.assistants.find(
              (assistant) => assistant.name === "Assistify - Concierge"
            );
        setAssistant(selectedAssistant || null);
      } catch (error) {
        console.error("Error fetching last thread:", error);
      }
    };

    fetchLastThread();
    fetchConciergeAssistant();
  }, [assistantId]);

  const handleNewThread = (newThread: ThreadResponse) => {
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
        {thread && assistant ? (
          <Message assistant={assistant} thread={thread} />
        ) : (
          <LoadingSkeleton />
        )}
      </StyledCard>
    </>
  );
};
