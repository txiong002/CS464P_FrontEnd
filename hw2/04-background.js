const button = document.querySelector("#mainButton");
let interval;
let isRunning = false;

// Generate random colors
function generateRandomColors() {
    const dimAlpha = 0.5; // enter a value between 0 and 1 for brightness
    const randomColors = `rgba(
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)},
        ${dimAlpha})`;
    return randomColors;
}

// Update button status
function updateButtonStatus() {
    const buttonStatus = document.querySelector("#mainButton");
    if (isRunning) {
        clearInterval(interval);
        buttonStatus.value = "Start";
        buttonStatus.classList.remove("btn-danger");
        buttonStatus.classList.add("btn-primary");
    } else {
        interval = setInterval(() => {
            document.body.style.backgroundColor = generateRandomColors();
        }, parseInt(document.querySelector("#userInput").value) * 1000);
        buttonStatus.value = "Stop";
        buttonStatus.classList.add("btn-danger");
    }
    isRunning = !isRunning;
}

button.addEventListener("click", updateButtonStatus);
