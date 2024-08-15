import { usePostMessage } from "@/services/service";
import { useEffect, useState } from "react";

const ProtectedComponent = () => {
  const [data, setData] = useState(null);
  const { postMessage, isAuthenticated } = usePostMessage();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          const result = await postMessage("Hello, world!");
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

  if (!data) return <div>Loading...</div>;

  return <div>Message: {JSON.stringify(data)}</div>;
};

export default ProtectedComponent;
