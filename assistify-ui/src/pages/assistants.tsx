import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Assistant {
  id: string;
  name: string;
  model: string;
}

const AssistantsPage = () => {
  const { data: session } = useSession();
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssistants = async () => {
      try {
        const response = await axios.get("/api/assistants");
        setAssistants(response.data);
      } catch (error) {
        console.error("Failed to fetch assistants:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchAssistants();
    }
  }, [session]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Your Assistants
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Model</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assistants.map((assistant) => (
              <TableRow key={assistant.id}>
                <TableCell>{assistant.id}</TableCell>
                <TableCell>{assistant.name}</TableCell>
                <TableCell>{assistant.model}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AssistantsPage;
