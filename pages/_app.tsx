import "@/styles/globals.css";
import type { AppProps } from "next/app";
import styles from "@/styles/Home.module.css";
import AppHeader from "@/components/organisms/AppHeader";
import CurrentUserProvider from "@/components/context/CurrentUserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CurrentUserProvider>
      <>
        <AppHeader />
        <main className={styles.main}>
          <Component {...pageProps} />
        </main>
      </>
    </CurrentUserProvider>
  );
}
