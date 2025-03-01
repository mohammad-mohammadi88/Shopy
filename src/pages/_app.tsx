import "@/styles/globals.css";
import store from "@Libs/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </Provider>
  )
}
