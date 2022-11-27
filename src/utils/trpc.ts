// src/utils/trpc.ts
import superjson from "superjson";
import { httpBatchLink, loggerLink, TRPCClientError } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { inferRouterInputs, inferRouterOutputs, TRPCError } from "@trpc/server";
import { ApplicationError } from "@features/common/errors";

import type { AppRouter } from "../server/trpc/router/_app";

export function isTRPCClientError(
  cause: unknown
): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError;
}

export const throwTRPCError = (failed: ApplicationError) => {
  throw new TRPCError({
    code: "BAD_REQUEST",
    message: failed.message,
    cause: failed,
  });
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  ssr: false,
});

/**
 * Inference helpers
 * @example type HelloOutput = AppRouterTypes['example']['hello']['output']
 **/
export type AppRouterOutputTypes = inferRouterOutputs<AppRouter>;
export type AppRouterInputTypes = inferRouterInputs<AppRouter>;
