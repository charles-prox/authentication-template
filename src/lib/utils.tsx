export const transformError = (error: string) => {
  var pattern = /[^a-zA-Z0-9\s.]/g;
  const removeSymbols = error.replace(pattern, " ");

  return removeSymbols.charAt(0).toUpperCase() + removeSymbols.slice(1);
};
