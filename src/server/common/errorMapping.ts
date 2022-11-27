import { Failed } from "@features/common/result";
import { TRPCError } from "@trpc/server";

export const handleFailure = (failed: Failed) => {
  throw new TRPCError({
    code: "BAD_REQUEST",
    message: failed.message,
    cause: failed.errors,
  });
};
