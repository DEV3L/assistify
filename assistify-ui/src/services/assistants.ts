import { ListAssistantsResponse } from "@/types/AssistifyTypes";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import axiosInstance from "./axiosInstance";

export const useFetchAssistants = () => {
  const { data: session, status } = useSession();

  const fetchAssistants = async (): Promise<ListAssistantsResponse> => {
    if (status !== "authenticated" || !session?.idToken) {
      throw new Error("User is not authenticated");
    }

    try {
      const response = await axiosInstance.get<ListAssistantsResponse>(
        "/assistants"
      );
      return response.data;
    } catch (error) {
      if (error) {
        const axiosError = error as AxiosError;
        console.error("Error Response:", axiosError.response?.data);
      }

      throw new Error("An unexpected error occurred");
    }
  };

  return {
    fetchAssistants,
    isAuthenticated: status === "authenticated",
  };
};
