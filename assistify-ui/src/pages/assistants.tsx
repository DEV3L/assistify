import { AssistantCard } from "@/components/assistants/AssistantCard";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { withDashboardLayout } from "@/components/layouts/withDashboardLayout";
import { useFetchAssistants } from "@/services/assistants";
import { Assistant } from "@/types/AssistifyTypes";
import { Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

const AssistantsPage = (): JSX.Element => {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);
  const { fetchAssistants, isAuthenticated } = useFetchAssistants();

  const fetchData = useCallback(async () => {
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
  }, [isAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Your Assistants
      </Typography>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <Grid container spacing={2}>
          {assistants.map((assistant) => (
            <Grid item xs={12} key={assistant.assistant_id}>
              <AssistantCard assistant={assistant} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default withDashboardLayout(AssistantsPage);
