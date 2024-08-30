import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const useTokenRefresh = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    const refresh = async () => {
      if (status === "authenticated" && session) {
        const expires = new Date(session.expires).getTime();
        if (expires - Date.now() < 5 * 60 * 1000) {
          await signIn("google");
        }
      }
    };
    refresh();
  }, [status, session]);

  return null;
};

export default useTokenRefresh;
