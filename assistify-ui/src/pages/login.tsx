import AssistifyHead from "@/components/AssistifyHead";
import { AssistifyLogo } from "@/components/AssistifyLogo";
import { GoogleLogo } from "@/components/GoogleLogo";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchRandomNumber } from "../services/service";

const Login = () => {
  const [randomNumber, setRandomNumber] = useState<string | null>(null);

  useEffect(() => {
    const getRandomNumber = async () => {
      const number = await fetchRandomNumber();
      setRandomNumber(number);
    };
    getRandomNumber();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <AssistifyHead />
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-2xl">
        <div className="text-center">
          <AssistifyLogo />
          <h2 className="mt-6 text-3xl font-bold text-white">
            Welcome to Assistify - :)
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Your AI Assistant Interaction Hub
          </p>
          {randomNumber !== null && (
            <p className="mt-2 text-lg text-white">
              Random Number: {randomNumber}
            </p>
          )}
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center"
        >
          <GoogleLogo />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
