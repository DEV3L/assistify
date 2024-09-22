import { Assistant } from "@/types/AssistifyTypes";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import Markdown from "markdown-to-jsx";

interface AssistantDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  assistant: Assistant;
}

/**
 * Dialog displaying detailed assistant information.
 *
 * @param open - Whether the dialog is open.
 * @param onClose - Function to handle closing the dialog.
 * @param assistant - The assistant data to display.
 * @returns The AssistantDetailsDialog component.
 */
export const AssistantDetailsDialog = ({
  open,
  onClose,
  assistant,
}: AssistantDetailsDialogProps): JSX.Element => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Avatar src={assistant.image} alt={assistant.name} />
        </Grid>
        <Grid item>
          <Typography variant="h6">{assistant.name}</Typography>
        </Grid>
      </Grid>
    </DialogTitle>
    <DialogContent>
      <Markdown>{assistant.summary_full}</Markdown>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);
