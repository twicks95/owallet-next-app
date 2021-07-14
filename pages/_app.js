import Head from "next/head";
import { Provider } from "react-redux";
import { useStore } from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { clientStore, persistor } from "redux/store";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { IconContext } from "phosphor-react";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
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
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
