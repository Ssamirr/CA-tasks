let companyName = document.getElementById("company-name");
let contactName = document.getElementById("contact-name");
let contactTitle = document.getElementById("contact-title");
let companyId = document.getElementById("company-id");
let allInputs = document.querySelectorAll(".inputs");
let suppliersForm = document.querySelector(".suppliers-form")
let suppliersButton = document.querySelector(".suppliers-button");

suppliersForm.addEventListener("submit", function () {
    event.preventDefault();
    let newProduct = {
        companyName: companyName.value,
        contactName: contactName.value,
        contactTitle: contactTitle.value
    }

    if (suppliersButton.classList.contains("add-button")) {
        fetch("https://northwind.vercel.app/api/suppliers", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(data => {
                getSuppliers()
            })
    }
    else {
        let itemId = companyId.value;
        fetch(`https://northwind.vercel.app/api/suppliers/${itemId}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(data => {
                getSuppliers()
            })
            suppliersButton.classList.replace("update-button", "add-button");
            suppliersButton.innerText = "Add";
    }

    emptyInputs();
})

function getSuppliers() {
    document.querySelector('tbody').innerHTML = "";
    fetch("https://northwind.vercel.app/api/suppliers")
        .then(res => res.json())
        .then(data => {
            document.querySelector(".suppliers").innerText = `Suppliers:${data.length}`;
            data.reverse().forEach(element => {
                showSuppliers(element);
            });
        })

}

function showSuppliers(item) {
    let itemId = item.id;

    let tr = document.createElement("tr");

    let tdCompanyName = document.createElement("td");
    tdCompanyName.innerText = item.companyName;

    let tdContactName = document.createElement("td");
    tdContactName.innerText = item.contactName;

    let tdContactTitle = document.createElement("td");
    tdContactTitle.innerText = item.contactTitle;

    let tdDeleteButton = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    tdDeleteButton.appendChild(deleteButton);

    deleteButton.addEventListener("click", function () {
        itemRemove(itemId);
    })

    let tdUpdateButton = document.createElement("td");
    let updateButton = document.createElement("button");
    updateButton.innerText = "Update";
    tdUpdateButton.appendChild(updateButton);

    updateButton.addEventListener("click", function () {
        itemUpdate(item)
    })

    tr.appendChild(tdCompanyName);
    tr.appendChild(tdContactName);
    tr.appendChild(tdContactTitle);
    tr.appendChild(tdDeleteButton);
    tr.appendChild(tdUpdateButton);

    document.querySelector("tbody").appendChild(tr);
}

function itemRemove(id) {

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });

    fetch(`https://northwind.vercel.app/api/suppliers/${id}`, {
        method: "DELETE",
    })
        .then(data => {
            getSuppliers()
        })
    if (suppliersButton.classList.contains("update-button")) {
        suppliersButton.classList.replace("update-button", "add-button");
        suppliersButton.innerText = "Add";
    }
    emptyInputs();
}

function itemUpdate(item) {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });

    companyName.value = item.companyName;
    contactName.value = item.contactName;
    contactTitle.value = item.contactTitle;
    companyId.value = item.id;
    suppliersButton.classList.replace("add-button", "update-button");
    suppliersButton.innerText = "Update";
}

function emptyInputs() {
    allInputs.forEach(function (e) {
        e.value = "";
    })
}

getSuppliers();