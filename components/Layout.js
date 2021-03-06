import Head from "next/head";
import React from "react";

export default function Layout(props) {
  return (
    <div>
      <Head>
        <title>{props.title} | Owallet</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      {props.children}
    </div>
  );
}
