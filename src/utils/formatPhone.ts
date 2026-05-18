export function formatPhoneNumber(value: string) {
  if (!value) return "";

  // If the user tries to delete the prefix completely
  if (value === "+" || value === "+7" || value === "+7 ") return "";

  // Get only digits
  let digits = value.replace(/\D/g, "");
  if (!digits) return "";

  let res = "+7 ";
  
  // Determine if the first digit is a country code or the start of the number
  if (digits[0] === "7" || digits[0] === "8") {
    digits = digits.slice(1);
  }

  if (digits.length > 0) res += digits.substring(0, 3);
  if (digits.length >= 4) res += " " + digits.substring(3, 6);
  if (digits.length >= 7) res += " " + digits.substring(6, 8);
  if (digits.length >= 9) res += " " + digits.substring(8, 10);

  return res;
}
