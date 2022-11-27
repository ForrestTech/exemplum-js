import { isTRPCClientError } from "utils/trpc";

export type FieldErrors = {
  message: string;
  code?: string;
  path: string[];
};

export class ApplicationError extends Error {
  constructor(message: string, errors: FieldErrors[]) {
    super(message);
    this.name = "ApplicationError";
    this.errors = errors;
  }
  errors: FieldErrors[];
}
interface isApplicationError {
  fieldErrors: FieldErrors[];
}

const isApplicationError = (error: unknown): error is isApplicationError => {
  return typeof error === "object" && error !== null && "fieldErrors" in error;
};

const cantHandle = {
  canHandle: false,
  applicationError: new ApplicationError("", []),
};

interface HasErrorMessage {
  message: string;
}

const hasErrorMessage = (error: unknown): error is HasErrorMessage => {
  return typeof error === "object" && error !== null && "message" in error;
};

const getErrorMessage = (error: unknown): string | undefined => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }

  if (hasErrorMessage(error)) {
    return error.message;
  }
  return undefined;
};

interface HandleError {
  canHandle: boolean;
  applicationError: ApplicationError;
}

export const handleError = (error: unknown): HandleError => {
  for (const handler of errorHandlers) {
    const { canHandle, applicationError } = handler(error);
    if (canHandle) {
      return { canHandle, applicationError };
    }
  }

  return cantHandle;
};

const handleUniqueConstraintError = (error: unknown): HandleError => {
  const errorMessage = getErrorMessage(error);
  if (!errorMessage) {
    return cantHandle;
  }

  const findKey = "Unique constraint failed on the fields: ";
  const isUniqueConstraintError = errorMessage.includes(findKey);

  if (!isUniqueConstraintError) {
    return cantHandle;
  }

  const fieldSection = errorMessage.split(findKey)[1];
  const field = fieldSection
    ? fieldSection.replaceAll("(", "").replaceAll(")", "").replaceAll("`", "")
    : undefined;

  return {
    canHandle: true,
    applicationError: {
      name: "ApplicationError",
      message: field
        ? `The ${field} must be unique.`
        : "Duplicate value detected.",
      errors: [
        {
          message: "The field must be unique.",
          code: "UNIQUE_CONSTRAINT_ERROR",
          path: field ? [field] : [],
        },
      ],
    },
  };
};

const handleApplicationError = (error: unknown): HandleError => {
  if (isTRPCClientError(error)) {
    return {
      canHandle: true,
      applicationError: new ApplicationError(
        error.data?.message ?? "An error occurred.",
        error.data?.fieldErrors ?? []
      ),
    };
  }

  return cantHandle;
};

const errorHandlers = [handleApplicationError, handleUniqueConstraintError];
