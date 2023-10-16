"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider as JotaiProvider } from "jotai";
import React from "react";

function Providers({ children }: React.PropsWithChildren) {
  return <JotaiProvider>{children}</JotaiProvider>;
}

export default Providers;
