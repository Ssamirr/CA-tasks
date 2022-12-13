let addForm = document.querySelector(".category-add");
let formInputs = document.querySelectorAll(".input");
let nameInput = document.querySelector(".name-input");
let descriptionInput = document.querySelector(".description-input");
let toaster = document.querySelector(".toaster");
let menus = document.querySelectorAll(".menu-info");
let lists = document.querySelectorAll(".list");


lists.forEach(function (element) {
    element.addEventListener('click', function () {
        menus.forEach(function (info) {
            if (!info.classList.contains(element.getAttribute("name"))) {
                info.style.display = "none";
            } else {
                info.style.display = "block";
            }
        })
    })
})

addForm.addEventListener("submit", function () {
    event.preventDefault();
    add();
    formInputs.forEach(function (element) {
        element.value = "";
    })
})

function getSupplier() {
    network.get('/suppliers')
        .then(res => {
            res.forEach(data => {
                showSuppliers(data)
            })
        })
}

function showSuppliers(item) {
    let tr = document.createElement("tr");

    let tdCompanyName = document.createElement("td");
    tdCompanyName.innerText = item.companyName;

    let tdContactName = document.createElement("td");
    tdContactName.innerText = item.contactName;

    let tdContactTitle = document.createElement("td");
    tdContactTitle.innerText = item.contactTitle;

    let tdregion = document.createElement("td");
    tdregion.innerText = item.address.country;

    tr.appendChild(tdCompanyName);
    tr.appendChild(tdContactName);
    tr.appendChild(tdContactTitle);
    tr.appendChild(tdregion);

    document.querySelector(".tbody").appendChild(tr);
}

function add() {

    let newProduct = {
        name: nameInput.value,
        description: descriptionInput.value,
    }

    network.add('/categories', newProduct)
        .then(res => {
            let createToaster = document.createElement("div");
            createToaster.classList.add("toaster-add");
            createToaster.innerText = "Succes! Data is added";
            toaster.appendChild(createToaster);

            createToaster.classList.add("toaster-show");
            setInterval(function () {
                createToaster.remove();
            }, 5000);

        })
}

function getCustomers() {
    network.get('/customers')
        .then(res => {
            let filteredProducts = res.sort((a, b) => (a.companyName > b.companyName) ? 1 : ((b.companyName > a.companyName) ? -1 : 0))
            filteredProducts.forEach(data => {
                showCustomers(data)
            });

            let filteredCustomersLondon = res.filter(q => q.address?.city == "London");
            console.log("Customers in London ", filteredCustomersLondon);

        })
}

function deleteCustomers(id) {
    network.delete('/customers', id)
}

function showCustomers(item) {
    let tr = document.createElement("tr");

    let tdCompanyName = document.createElement("td");
    tdCompanyName.innerText = item.companyName;

    let tdContactName = document.createElement("td");
    tdContactName.innerText = item.contactName;

    let tdDelete = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    tdDelete.appendChild(deleteButton);

    deleteButton.addEventListener("click", function () {
        deleteCustomers(item.id);
        tr.remove();
    })




    tr.appendChild(tdCompanyName);
    tr.appendChild(tdContactName);
    tr.appendChild(tdDelete);

    document.querySelector(".tbody-customer").appendChild(tr);
}

function getOrdes() {
    network.get('/orders')
        .then(res => {
            let filteredProducts = res.sort((a, b) => a.orderDate.localeCompare(b.orderDate))
            filteredProducts.forEach(data => {
                showOrders(data)
            })
        })
}

function showOrders(item) {
    let tr = document.createElement("tr");

    let tdCustomerId = document.createElement("td");
    tdCustomerId.innerText = item.customerId;

    let tdEmployeeId = document.createElement("td");
    tdEmployeeId.innerText = item.employeeId;

    let tdOrderDate = document.createElement("td");
    tdOrderDate.innerText = item.orderDate;

    tr.appendChild(tdCustomerId);
    tr.appendChild(tdEmployeeId);
    tr.appendChild(tdOrderDate);

    document.querySelector(".tbody-orders").appendChild(tr);
}

function getProducts() {
    network.get('/products')
        .then(res => {
            let filteredProductsStartsC = res.filter(q => q.name?.startsWith("C"));
            console.log("Start with C", filteredProductsStartsC);

            let filteredProductsExpensive = res.sort((a, b) => b.unitPrice - a.unitPrice);
            console.log("Expensive Product ", filteredProductsExpensive[0]);

            let uptadedSum;
            let FilteredAverageStock = res.reduce(function (sum, number) {
                if (number.unitsInStock) {
                    uptadedSum = sum + number.unitsInStock
                }
                return uptadedSum
            }, 0)
            console.log("Average stock ", FilteredAverageStock / res.length);
        })
}



window.addEventListener("load", function () {
    getSupplier();
    getCustomers();
    getOrdes();
    getProducts();

    document.querySelector(".list").click()
})


