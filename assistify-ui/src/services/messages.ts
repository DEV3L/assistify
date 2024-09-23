import { SendMessageResponse } from "@/types/AssistifyTypes";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axiosInstance from "./axiosInstance";

export const usePostMessage = () => {
  const [thread, setThread] = useState<string | null>(null);
  const { data: session, status } = useSession();

  const postMessage = async (message: string): Promise<SendMessageResponse> => {
    if (status !== "authenticated" || !session?.idToken) {
      throw new Error("User is not authenticated");
    }

    try {
      const response = await axiosInstance.post<SendMessageResponse>(
        "/api/messages/send-message",
        { message, thread_id: thread }
      );
      setThread(response.data.thread_id);
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
