import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {!session ? (
        <>
          <h1 className="text-2xl mb-4">Login</h1>
          <button
            onClick={() => signIn("google")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Sign in with Google
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl mb-4">Welcome, {session.user?.name}</h1>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign out
          </button>
        </>
      )}
    </div>
  );
}
