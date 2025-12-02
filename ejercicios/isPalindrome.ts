function isPalindrome(word: string): boolean {
  const normalized = word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");

  const reversed = normalized.split("").reverse().join("");

  return normalized === reversed;
}
console.log(isPalindrome("pedro")); 
