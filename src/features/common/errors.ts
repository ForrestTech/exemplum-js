// export class FieldErrors {
//   message: string;
//   path: string[];
//   constructor(message: string, path: string[]) {
//     this.message = message;
//     this.path = path;
//   }
// }

// export class ApplicationError extends Error {
//   constructor(message: string, code: string, errors: FieldErrors[]) {
//     super(message);
//     this.name = "ApplicationError";
//     this.code = code;
//     this.errors = errors;
//   }
//   code: string;
//   errors: FieldErrors[];
// }

export type FieldErrors = {
  message: string;
  code?: string;
  path: string[];
};

export class ApplicationError extends Error {
  constructor(message: string, code: string, errors: FieldErrors[]) {
    super(message);
    this.name = "ApplicationError";
    this.errors = errors;
  }
  errors: FieldErrors[];
}

interface HandleError {
  canHandle: boolean;
  applicationError?: ApplicationError;
}

const cantHandle = { canHandle: false };

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

const isUniqueConstraintError = (error: unknown): HandleError => {
  const errorMessage = getErrorMessage(error);
  if (!errorMessage) {
    return cantHandle;
  }

  const findKey = "Unique constraint failed on the fields: ";
  const isUniqueConstraintError = errorMessage.includes(findKey);

  if (!isUniqueConstraintError) {
    return { canHandle: false };
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

const isApplicationError = (error: unknown): HandleError => {
  console.log("try to handle errors", error);

  return { canHandle: false };
};

const errorHandlers = [isApplicationError, isUniqueConstraintError];

export const handleError = (error: unknown): HandleError => {
  for (const handler of errorHandlers) {
    const { canHandle, applicationError } = handler(error);
    if (canHandle) {
      return { canHandle, applicationError };
    }
  }

  return cantHandle;
};
