const getErrorMessage = (error: unknown): string | undefined => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return undefined;
};

export const isUniqueConstraintError = (
  error: unknown
): { isError: boolean; field: string | undefined } => {
  const errorMessage = getErrorMessage(error);
  if (!errorMessage) return { isError: false, field: undefined };

  const findKey = "Unique constraint failed on the fields: ";
  const field = errorMessage.split(findKey)[1];
  return {
    isError: errorMessage.includes(findKey),
    field: field
      ? field.replaceAll("(", "").replaceAll(")", "").replaceAll("`", "")
      : undefined,
  };
};
