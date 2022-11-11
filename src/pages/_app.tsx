// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { Toaster } from "react-hot-toast";

import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";

if (typeof window !== "undefined") {
  LogRocket.init("c3re02/exemplum");

  setupLogRocketReact(LogRocket);
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div>
        <Toaster />
      </div>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
