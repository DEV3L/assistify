import Head from "next/head";
import { useEffect } from "react";

export const AssistifyHead = ({ title = "Assistify" }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.png" />
    </Head>
  );
};
