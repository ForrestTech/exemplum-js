const getErrorMessage = (error: unknown): string | undefined => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return undefined;
};

const isUniqueConstraintError = (
  errorMessage: string
): { canHandle: boolean; field: string | undefined; message: string } => {
  const findKey = "Unique constraint failed on the fields: ";
  const isUniqueConstraintError = errorMessage.includes(findKey);
  if (!isUniqueConstraintError) {
    return { canHandle: false, field: undefined, message: errorMessage };
  }

  const fieldSection = errorMessage.split(findKey)[1];
  const field = fieldSection
    ? fieldSection.replaceAll("(", "").replaceAll(")", "").replaceAll("`", "")
    : undefined;

  return {
    canHandle: isUniqueConstraintError,
    field: field,
    message: isUniqueConstraintError ? `The ${field} must be unique.` : "",
  };
};

const errorHandlers = [isUniqueConstraintError];

const cantHandle = { canHandle: false, field: undefined, message: "" };

export const errorHandler = (
  error: unknown
): {
  canHandle: boolean;
  field: string | undefined;
  message: string;
} => {
  const errorMessage = getErrorMessage(error);
  if (!errorMessage) return cantHandle;

  for (const handler of errorHandlers) {
    const { canHandle, field, message } = handler(errorMessage);
    if (canHandle) {
      return { canHandle: true, field, message };
    }
  }

  return cantHandle;
};
