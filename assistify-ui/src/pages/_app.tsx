import AssistifyHead from "@/components/common/AssistifyHead";
import Header from "@/components/common/Header";
import { MenuProvider } from "@/contexts/menuContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import theme from "../styles/theme";

function AssistifyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <AssistifyHead />
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MenuProvider>
            <Header />
            <Component {...pageProps} />
          </MenuProvider>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default AssistifyApp;
