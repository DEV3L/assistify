import { UserResponse } from "@/types/AssistifyTypes";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import axiosInstance from "./axiosInstance";

export const useFetchUser = () => {
  const { data: session, status } = useSession();

  const fetchUser = async (): Promise<UserResponse> => {
    if (status !== "authenticated" || !session?.idToken) {
      throw new Error("User is not authenticated");
    }

    try {
      const response = await axiosInstance.get<UserResponse>("/api/users");
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
    fetchUser,
    isAuthenticated: status === "authenticated",
  };
};
