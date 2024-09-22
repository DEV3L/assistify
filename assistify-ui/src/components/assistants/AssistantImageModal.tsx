import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { FC } from "react";

interface AssistantImageModalProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
  assistantName: string;
}

/**
 * Displays a modal with the assistant's image.
 *
 * @param open - Whether the modal is open.
 * @param onClose - Function to close the modal.
 * @param imageUrl - URL of the assistant's image.
 * @param assistantName - Name of the assistant.
 * @returns The AssistantImageModal component.
 */
export const AssistantImageModal: FC<AssistantImageModalProps> = ({
  open,
  onClose,
  imageUrl,
  assistantName,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle data-testid="assistant-modal-title">
        {assistantName}
      </DialogTitle>
      <DialogContent>
        <img src={imageUrl} alt={assistantName} style={{ width: "100%" }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
