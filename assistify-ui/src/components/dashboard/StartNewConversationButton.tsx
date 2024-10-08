import { useNewThread } from "@/services/useNewThread";
import { ThreadResponse } from "@/types/AssistifyTypes";
import { Button } from "@mui/material";

interface StartNewConversationButtonProps {
  onNewThread: (newThread: ThreadResponse) => void;
  assistantId: string;
  assistantName: string;
  model: string;
}

const StartNewConversationButton: React.FC<StartNewConversationButtonProps> = ({
  onNewThread,
  assistantId,
  assistantName,
  model,
}) => {
  const { createNewThread } = useNewThread();

  const handleNewConversation = async () => {
    try {
      const response = await createNewThread(assistantId, assistantName, model);
      onNewThread(response);
    } catch (error) {
      console.error("Error starting new conversation:", error);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleNewConversation}>
      Start New Conversation
    </Button>
  );
};

export default StartNewConversationButton;
