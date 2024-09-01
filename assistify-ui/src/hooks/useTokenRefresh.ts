import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";

const TOKEN_REFRESH_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Custom hook to refresh the authentication token if it is about to expire.
 */
export const useTokenRefresh = (): null => {
  const { data: session, status } = useSession();

  const refresh = async (): Promise<void> => {
    if (status !== "authenticated" || !session) return;

    const { expires } = session;
    const expirationTime = new Date(expires).getTime();
    const currentTime = Date.now();

    if (expirationTime - currentTime >= TOKEN_REFRESH_THRESHOLD_MS) return;

    const refreshedSession = (await getSession()) as Session;
    if (refreshedSession.error === "RefreshAccessTokenError") {
      console.error("Failed to refresh access token");
    }
  };

  useEffect(() => {
    refresh();
  }, [status, session]);

  return null;
};
