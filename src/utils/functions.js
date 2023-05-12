export const getErrorMessage = (error) => {
  error = error.substring(error.lastIndexOf("/") + 1, error.length - 2);
  return error;
};
export const getProgressBarVariant = (amount, max) => {
  const ratio = amount / max;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
};