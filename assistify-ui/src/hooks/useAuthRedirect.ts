import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const THROTTLE_TIME = 1_000;

const useAuthRedirect = (redirectTo: string) => {
  const { status } = useSession();
  const router = useRouter();
  const lastRedirectTime = useRef<number>(0);

  useEffect(() => {
    const now = Date.now();

    if (now - lastRedirectTime.current < THROTTLE_TIME) {
      return; // Skip if the last redirect was less than 1 second ago
    }

    if (router.pathname === redirectTo) {
      return; // Skip if already on the target page
    }

    if (status === "authenticated") {
      router.push(redirectTo);
    } else if (!status || status === "unauthenticated") {
      router.push("/login");
    }

    lastRedirectTime.current = now;
  }, [status, router, redirectTo]);
};

export default useAuthRedirect;
