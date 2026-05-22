export function validateInputToNumber(input) {
  if (String(input).trim() === "") {
    throw new Error("Empty is not allowed");
  }
  let num = Number(input);
  if (!Number.isFinite(num)) {
    throw new Error("Enter valid number");
  } else if (num < 0) {
    throw new Error("Negative is not allowed");
  }
  return num;
}
