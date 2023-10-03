const elem = document.querySelector("#userInput");
const result = document.querySelector("#result");

elem.addEventListener("input", handleInput);

function handleInput(event) {
    const inputValue = event.target.value;

    const isPalindrome = checkIfPalindrome(inputValue);

    if (isPalindrome) {
        result.textContent = `${inputValue} is a palindrome`;
    } else {
        result.textContent = `${inputValue} is not a palindrome`;
    }
}

function checkIfPalindrome(number) {
    // Check to make sure number is positive
    if (number < 0) {
        return false;
    }

    // Put the number into an array for comparison
    const digits = Array.from(String(number));

    let left = 0;
    let right = digits.length - 1;

    while (left < right) {
        if (digits[left] !== digits[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
