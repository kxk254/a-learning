export function validateInputToNumber(input) {
  if (String(input).trim() === "") {
    throw new Error("Empty value is not allowed");
  }

  const num = Number(input);

  if (!Number.isFinite(num)) {
    throw new Error("Input a valid Number");
  } else if (num < 0) {
    throw new Error("Negative is not allowed");
  }
  return num;
}
