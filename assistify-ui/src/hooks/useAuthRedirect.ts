import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useAuthRedirect = (redirectTo: string) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push(redirectTo);
    } else if (!status || status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router, redirectTo]);
};

export default useAuthRedirect;
