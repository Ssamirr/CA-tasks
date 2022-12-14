let addForm = document.querySelector(".category-add");
let formInputs = document.querySelectorAll(".input");
let nameInput = document.querySelector(".name-input");
let descriptionInput = document.querySelector(".description-input");
let toaster = document.querySelector(".toaster");
let menus = document.querySelectorAll(".menu-info");
let lists = document.querySelectorAll(".list");
let modal = document.querySelector(".supplier-modal");
let modalForm = document.querySelector(".modal-form");
let companyName = document.querySelector("#companyName");
let contactName = document.querySelector("#contactName");
let contactTitle = document.querySelector("#contactTitle");
let country = document.querySelector("#country");
let itemId = document.querySelector(".item-id");


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
    document.querySelector(".tbody").innerHTML = "";
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
    tdregion.innerText = item.address?.country;

    let tdUpdate = document.createElement("td");
    let updateButton = document.createElement("button");
    updateButton.innerText = "Update";
    tdUpdate.appendChild(updateButton);

    tr.appendChild(tdCompanyName);
    tr.appendChild(tdContactName);
    tr.appendChild(tdContactTitle);
    tr.appendChild(tdregion);
    tr.appendChild(tdUpdate);

    updateButton.addEventListener("click", function () {
        modal.classList.add("modal-show");
        companyName.value = item.companyName;
        contactName.value = item.contactName;
        contactTitle.value = item.contactTitle;
        country.value = item.address?.country;
        itemId.value = item.id;
        modalForm.addEventListener("submit", function () {
            event.preventDefault();
            updateSuppliers(item);
            modal.classList.remove("modal-show");
        })
    })

    document.querySelector(".tbody").appendChild(tr);
}

function updateSuppliers(item) {

    let newProduct = {
        ...item,
        companyName: companyName.value,
        contactName: contactName.value,
        contactTitle: contactTitle.value,
        address: {
            ...item.address,
            country: country.value
        },
        id: itemId.value
    }


    network.update(`/suppliers/${item.id}`, newProduct)
        .then(res => {
            getSupplier();
        })
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

            let filteredProductsBetween = res.filter(q => {
                let dateOrder = new Date(q.orderDate).getFullYear();
                return (dateOrder >= 1996 && dateOrder <= 1997)
            });
            console.log("Between 1996 and 1997 ", filteredProductsBetween)



            // find hated and beloved


            let filteredProductsMaxMin = res.map(q => {
                let allSum = 0;
                q.details.forEach(function (e) {
                    let belovedPrice = q.details[0].unitPrice;
                    let belovedQuantity = q.details[0].quantity;
                    let belovedDiscount = q.details[0].discount;
                    let sum = (belovedPrice * belovedQuantity) * (1 - belovedDiscount);
                    allSum += sum;
                })
                q.totalAmount = allSum;
            })

            let ordersData = [];
            res.forEach(element => {
                let customer = ordersData.find(q => q.customerId == element.customerId);
                if(!customer){
                    let newCustomer = {
                        customerId: element.customerId,
                        customerTotalAmount: element.totalAmount
                    };
                    ordersData.push(newCustomer);
                }
                else{
                    customer.customerTotalAmount = customer.customerTotalAmount + element.totalAmount;
                }
            });
            
            let sortedCustomer = ordersData.sort((a,b) => b.customerTotalAmount - a.customerTotalAmount);
            console.log("Beloved ",sortedCustomer[0]);
            console.log("Hated ",sortedCustomer[sortedCustomer.length-1]);

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


