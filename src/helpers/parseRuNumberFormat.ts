const parseRuNumberFormat = (num?: string | number): string => {
  const normolized = num
    ?.toString()
    .replace(/\u00A0/g, "")
    .replace(",", ".");

  if (isNaN(parseFloat(normolized))) return "";

  return normolized;
};

export { parseRuNumberFormat };
