import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { useFetchAssistants } from "@/services/assistants";
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
  const { fetchAssistants, isAuthenticated } = useFetchAssistants();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          const data = await fetchAssistants();
          setAssistants(data.assistants);
        } catch (error) {
          console.error("Failed to fetch assistants:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [isAuthenticated]);

  if (loading) {
    return <LoadingSkeleton />;
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
