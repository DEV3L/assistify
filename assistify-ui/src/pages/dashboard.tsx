import Protected from "@/components/Protected";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-2xl">
        <div className="space-y-6">
          <p className="text-xl text-white text-center">
            Welcome, {session?.user?.name}
          </p>
          <button
            onClick={() => signOut()}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign out
          </button>
        </div>
        <Protected />
      </div>
    </div>
  );
};

export default Dashboard;
