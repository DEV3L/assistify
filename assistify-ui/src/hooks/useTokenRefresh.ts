import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";

export const useTokenRefresh = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    const refresh = async () => {
      if (status === "authenticated" && session) {
        const expires = new Date(session.expires).getTime();
        if (expires - Date.now() < 5 * 60 * 1000) {
          await getSession();
        }
      }
    };
    refresh();
  }, [status, session]);

  return null;
};
