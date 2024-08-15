import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import axiosInstance from "./axiosInstance";

export const fetchRandomNumber = async (): Promise<string> => {
  const response = await axiosInstance.get("/random-number");
  return response.data.message;
};

export const useFetchProtectedData = () => {
  const { data: session, status } = useSession();

  const fetchProtectedData = async (): Promise<any> => {
    if (status !== "authenticated" || !session?.idToken) {
      throw new Error("User is not authenticated");
    }

    try {
      const response = await axiosInstance.get("/protected");
      return response.data;
    } catch (error) {
      if (error) {
        const axiosError = error as AxiosError;
        console.error("Error Response:", axiosError.response?.data);
        throw new Error("Failed to fetch protected data");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  };

  return {
    fetchProtectedData,
    isAuthenticated: status === "authenticated",
  };
};

export const usePostMessage = () => {
  const { data: session, status } = useSession();

  const postMessage = async (message: string): Promise<any> => {
    if (status !== "authenticated" || !session?.idToken) {
      throw new Error("User is not authenticated");
    }

    try {
      const response = await axiosInstance.post("/send-message", { message });
      return response.data;
    } catch (error) {
      if (error) {
        const axiosError = error as AxiosError;
        console.error("Error Response:", axiosError.response?.data);
        throw new Error("Failed to send message");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  };

  return {
    postMessage,
    isAuthenticated: status === "authenticated",
  };
};
