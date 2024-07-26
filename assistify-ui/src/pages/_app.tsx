import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

function AssistifyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default AssistifyApp;
