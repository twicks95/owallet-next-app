import Head from "next/head";
import React from "react";

export default function Layout(props) {
  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {props.children}
    </div>
  );
}