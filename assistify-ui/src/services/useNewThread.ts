import { ThreadResponse } from "@/types/AssistifyTypes";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import axiosInstance from "./axiosInstance";

export const useNewThread = () => {
  const { data: session, status } = useSession();

  const createNewThread = async (
    assistantId: string,
    assistantName: string,
    model: string
  ): Promise<ThreadResponse> => {
    if (status !== "authenticated" || !session?.idToken) {
      throw new Error("User is not authenticated");
    }

    try {
      const response = await axiosInstance.post<ThreadResponse>(
        "/api/threads",
        {
          assistant_id: assistantId,
          assistant_name: assistantName,
          model: model,
          provider: "OpenAI",
        }
      );
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
    createNewThread,
    isAuthenticated: status === "authenticated",
  };
};
