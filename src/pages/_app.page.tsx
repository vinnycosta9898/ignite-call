import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { globalStyle } from "@/styles/global";
import "../lib/dayjs";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { NextSeo } from "next-seo";

globalStyle();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <NextSeo
          openGraph={{
            type: "website",
            locale: "pt-BR",
            url: "https://ignite-call.rocketseat.com.br",
            siteName: "Ignite Call",
          }}
          twitter={{
            handle: "@ignite",
            site: "@site",
            cardType: "summary_large_image",
          }}
        />
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  );
}
