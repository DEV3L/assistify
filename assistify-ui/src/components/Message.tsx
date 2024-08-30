import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { useFetchAssistants } from "@/services/assistants";
import { usePostMessage } from "@/services/service";
import { ListAssistantsResponse } from "@/types/AssistifyTypes";
import { useEffect, useState } from "react";

const ProtectedComponent = () => {
  const [data, setData] = useState<ListAssistantsResponse | null>(null);
  const { postMessage, isAuthenticated } = usePostMessage();
  const { fetchAssistants } = useFetchAssistants();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          const result = await fetchAssistants();
          setData(result);
        } catch (error) {
          console.error("Failed to fetch protected data:", error);
        }
      }
    };
    fetchData();
  }, []);

  if (!isAuthenticated) {
    return <div>Please log in to view this content.</div>;
  }

  if (!data) {
    return <LoadingSkeleton />;
  }

  return <div>Message: {JSON.stringify(data)}</div>;
};

export default ProtectedComponent;
