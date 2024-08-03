import { useSession } from "next-auth/react";

export const fetchRandomNumber = async (): Promise<string> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/random-number`);
    const data = await response.json();
    return data.message;
  };

export const useFetchProtectedData = () => {
  const { data: session, status } = useSession();

  const fetchProtectedData = async (): Promise<any> => {
    if (status !== "authenticated" || !session?.idToken) {
      throw new Error('User is not authenticated');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/protected`, {
      headers: {
        'Authorization': `Bearer ${session.idToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch protected data');
    }

    return response.json();
  };

  return {
    fetchProtectedData,
    isAuthenticated: status === "authenticated"
  };
};