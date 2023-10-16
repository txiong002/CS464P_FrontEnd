const labelStyle = document.querySelectorAll("label");
const form = document.querySelector("form");

function handleSubmitForm(event) {
    event.preventDefault();

    const name = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;
    const regStatus = document.getElementById("regStatus").value;
    const coursesTaken = [];
    const checkedBoxes = document.getElementsByName("coursesTaken");
    const addComment = document.getElementById("comment").value;
    // const comment = addComment.value;

    checkedBoxes.forEach(function (checkedBox) {
        if (checkedBox.checked) {
            coursesTaken.push(checkedBox.value);
        }
    });

    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Registration Status: ${regStatus}`);
    console.log(`Courses taken: ${coursesTaken.join(", ")}`);
    console.log(`Comments: ${addComment}`);
}

labelStyle.forEach(function (label) {
    label.style.fontWeight = "bold";
});

form.addEventListener("submit", handleSubmitForm);
