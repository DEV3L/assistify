import { useEffect, useState } from "react";
import { useFetchProtectedData } from "../services/service";

const ProtectedComponent = () => {
  const [data, setData] = useState(null);
  const { fetchProtectedData, isAuthenticated } = useFetchProtectedData();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          const result = await fetchProtectedData();
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

  return <div>{JSON.stringify(data)}</div>;
};

export default ProtectedComponent;
