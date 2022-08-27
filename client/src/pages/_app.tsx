import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClinet = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClinet}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default MyApp;
