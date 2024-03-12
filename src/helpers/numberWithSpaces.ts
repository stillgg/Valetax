import { parseRuNumberFormat } from "./parseRuNumberFormat";

function numberWithSpaces(x?: string | number) {
  const num = parseRuNumberFormat(x);

  if (!num) return "";

  const lastFigure = num[num.length - 1];
  const isCommaUsed = num.slice(0, -2).includes(".");
  const isLastComma = lastFigure === ".";

  let insert = "";

  if (num.slice(-2) === ".0") insert = ",0";
  else if (!isCommaUsed && isLastComma) insert = ",";

  const res =
    new Intl.NumberFormat("ru-RU", {
      style: "decimal",
      maximumFractionDigits: 2,
    }).format(parseFloat(num)) + insert;

  return res;
}

export { numberWithSpaces };
