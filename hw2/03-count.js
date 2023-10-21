const input = document.querySelector('input');
const result = document.querySelector('#results');

let userInput = '';

function handleKeyDown(event) {
    userInput = event.target.value + event.key;
    updateResults();
}

function updateResults() {
    const text = result.textContent;
    const pattern = new RegExp(
        `\\b${userInput.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
        'g',
    );
    const highlightedText = text.replace(
        pattern,
        (match) => `<span class="highlight">${match}</span>`,
    );
    result.innerHTML = highlightedText;
}

input.addEventListener('keydown', handleKeyDown);
