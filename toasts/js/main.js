let addButton = document.querySelector("#add-button");
let messageContent = document.querySelector("#message-content");
let toasts = document.querySelector("#toasts");
let successRadio = document.querySelector("#success");
let errorRadio = document.querySelector("#error");
let cancelable = document.querySelector("#cancelable");
let clearButton = document.querySelector("#clear-button");
let duration = document.querySelector("#duration");


addButton.addEventListener("click", function () {
    let value = messageContent.value.trim();
    if (!value.length) {
        if (successRadio.checked) {
            value = "Success!";
        } else {
            value = "Error.";
        }
    }

    let toastSuccess = document.createElement('div');
    toastSuccess.classList.add("toast", "success-toast");
    if (successRadio.checked) {
        toastSuccess.classList.replace("error-toast", "success-toast");
    } else {
        toastSuccess.classList.replace("success-toast", "error-toast");
    }

    let message = document.createElement('p');
    message.classList.add("message");
    message.innerText = value;
    toastSuccess.appendChild(message);

    if (cancelable.checked) {
        let cancelButton = document.createElement("button");
        cancelButton.classList.add("cancel-button");
        cancelButton.innerText = "X";
        toastSuccess.appendChild(cancelButton);
        cancelButton.addEventListener("click", function () {
            toastSuccess.remove();
        })
    }

    setInterval(function () {
        toastSuccess.remove();
    }, duration.value);


    toasts.appendChild(toastSuccess);
})

clearButton.addEventListener("click", function () {
    toasts.innerHTML = " ";
})