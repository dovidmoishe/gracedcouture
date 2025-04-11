import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Shared/Layout";
import useUserState from "@/core/useStore";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { Toaster } from "@/components/ui/toaster"
import { ModalProvider } from "@/components/ui/animated-modal";

export default function App({ Component, pageProps }: AppProps) {
  const setUserAsync = useUserState((state) => state.setUserAsync);

  useEffect(() => {
    setUserAsync();
  }, []);
  return (
    <Layout>
      <ModalProvider><Component {...pageProps} /></ModalProvider>
      <Toaster />
    </Layout>
  );
}
