import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchRandomNumber } from "../services/service";

const AssistifyLogo = () => (
  <svg
    className="w-16 h-16 mx-auto"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="45" fill="#4F46E5" />
    <path d="M30 50 L50 30 L70 50 L50 70 Z" fill="white" />
    <circle
      cx="50"
      cy="50"
      r="10"
      fill="#4F46E5"
      stroke="white"
      strokeWidth="4"
    />
    <path
      d="M50 20 L50 35 M50 65 L50 80 M20 50 L35 50 M65 50 L80 50"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

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
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-2xl">
        <div className="text-center">
          <AssistifyLogo />
          <h2 className="mt-6 text-3xl font-bold text-white">
            Welcome to Assistify
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
          onClick={() => signIn("google")}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
