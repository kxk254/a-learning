export function validateInputToNumber(input) {
  if (String(input).trim() === "") {
    throw new Error("Empty is now allowed");
  }
  const num = Number(input);
  if (!Number.isFinite(num)) {
    throw new Error("Enter a valid input");
  } else if (num < 0) {
    throw new Error("Negative is not allowed");
  }
  return num;
}
