import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { withDashboardLayout } from "@/components/layouts/withDashboardLayout";
import { useMobile } from "@/hooks/useMobile";
import { useFetchAssistants } from "@/services/assistants";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Assistant {
  assistant_id: string;
  name: string;
  model: string;
  status: string;
}

const AssistantsPage = () => {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);
  const { fetchAssistants, isAuthenticated } = useFetchAssistants();
  const isMobile = useMobile();

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

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Your Assistants
      </Typography>
      {(loading && <LoadingSkeleton />) || (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {!isMobile && <TableCell>ID</TableCell>}
                <TableCell>Name</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assistants.map((assistant) => (
                <TableRow key={assistant.assistant_id}>
                  {!isMobile && <TableCell>{assistant.assistant_id}</TableCell>}
                  <TableCell>{assistant.name}</TableCell>
                  <TableCell>{assistant.model}</TableCell>
                  <TableCell>{assistant.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default withDashboardLayout(AssistantsPage);
