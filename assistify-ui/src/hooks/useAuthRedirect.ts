import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useAuthRedirect = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!status || status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);
};

export default useAuthRedirect;
