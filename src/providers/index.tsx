"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { isProdcution } from "../lib/utils";
import { Provider as JotaiProvider } from "jotai";

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient());

  return (
    <JotaiProvider>
      <QueryClientProvider client={client}>
        <ReactQueryStreamedHydration>{children} </ReactQueryStreamedHydration>
        {!isProdcution() && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </JotaiProvider>
  );
}

export default Providers;
