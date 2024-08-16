import Head from "next/head";
import { useEffect } from "react";

const AssistifyHead = ({ title = "Assistify" }) => {
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

export default AssistifyHead;