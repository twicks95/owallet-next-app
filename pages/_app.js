import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import "../styles/globals.css";
import { IconContext } from "phosphor-react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <IconContext.Provider
        value={{
          color: "rgba(58, 61, 66, 0.8)",
          size: "1.2em",
          weight: "bold",
          mirrored: false,
        }}
      >
        <Head>
          <meta
            name="viewport"
            contenct="width=device-width, initial-scale=1"
          ></meta>
        </Head>
        <Component {...pageProps} />
      </IconContext.Provider>
    </>
  );
}

export default MyApp;
