const elem = document.querySelector("#userInput");
const result = document.querySelector("#result");

elem.addEventListener("input", handleInput);

function handleInput(event) {
    const inputValue = event.target.value;
    const resultElement = document.getElementById("result");

    if (inputValue < 0) {
        resultElement.classList.add("text-danger");
        resultElement.textContent = "Value must be a positive number";
    } else {
        const isPalindrome = checkIfPalindrome(inputValue);
        if (isPalindrome) {
            resultElement.classList.remove("text-danger");
            resultElement.classList.add("text-success");
            resultElement.textContent = `${inputValue} is a palindrome`;
        } else {
            resultElement.classList.remove("text-success");
            resultElement.classList.add("text-danger");
            resultElement.textContent = `${inputValue} is not a palindrome`;
        }
    }
}

function checkIfPalindrome(number) {
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
